import { useCallback, useEffect, useRef, useState } from "react";

interface Meta {
  classes: string[];
  val_accuracy: number;
  params: number;
  trained: string;
}

type Status = "idle" | "loading" | "ready" | "error";

const SIZE = 280; // canvas is 10x the model's 28x28 input
const STROKE = 18;

/** A CNN I trained on Quick, Draw!, exported to ONNX and run entirely in your browser.
 *  No server, no API call — onnxruntime-web on the WASM backend. */
export default function SketchDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionRef = useRef<unknown>(null);
  const ortRef = useRef<typeof import("onnxruntime-web") | null>(null);
  const drawing = useRef(false);
  const hasInk = useRef(false);

  const [status, setStatus] = useState<Status>("idle");
  const [meta, setMeta] = useState<Meta | null>(null);
  const [preds, setPreds] = useState<{ label: string; p: number }[]>([]);
  const [error, setError] = useState<string>("");

  // ---- canvas setup ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineWidth = STROKE;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, SIZE, SIZE);
  }, []);

  // ---- lazy model load: ~10MB of WASM only after the visitor commits to drawing ----
  const load = useCallback(async () => {
    if (sessionRef.current || status === "loading") return;
    setStatus("loading");
    try {
      const ort = await import("onnxruntime-web");
      ort.env.wasm.numThreads = 1; // GitHub Pages can't send COOP/COEP, so no threading
      ort.env.wasm.simd = true;
      ortRef.current = ort;
      const [session, metaRes] = await Promise.all([
        ort.InferenceSession.create("/models/sketch.onnx", {
          executionProviders: ["wasm"],
          graphOptimizationLevel: "all",
        }),
        fetch("/models/sketch.classes.json").then((r) => r.json() as Promise<Meta>),
      ]);
      sessionRef.current = session;
      setMeta(metaRes);
      setStatus("ready");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setStatus("error");
    }
  }, [status]);

  // ---- inference ----
  const predict = useCallback(async () => {
    const canvas = canvasRef.current;
    const session = sessionRef.current as import("onnxruntime-web").InferenceSession | null;
    const ort = ortRef.current;
    if (!canvas || !session || !ort || !hasInk.current) return;

    // downsample 280x280 -> 28x28 through an offscreen canvas
    const small = document.createElement("canvas");
    small.width = 28;
    small.height = 28;
    const sctx = small.getContext("2d");
    if (!sctx) return;
    sctx.drawImage(canvas, 0, 0, 28, 28);
    const { data } = sctx.getImageData(0, 0, 28, 28);

    const input = new Float32Array(28 * 28);
    for (let i = 0; i < 28 * 28; i++) input[i] = data[i * 4] / 255; // white ink on black

    const out = await session.run({
      input: new ort.Tensor("float32", input, [1, 1, 28, 28]),
    });
    const logits = Array.from(out.logits.data as Float32Array);
    const max = Math.max(...logits);
    const exp = logits.map((v) => Math.exp(v - max));
    const sum = exp.reduce((a, b) => a + b, 0);
    const labels = meta?.classes ?? [];
    setPreds(
      exp
        .map((v, i) => ({ label: labels[i] ?? String(i), p: v / sum }))
        .sort((a, b) => b.p - a.p)
        .slice(0, 3)
    );
  }, [meta]);

  // ---- drawing handlers ----
  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * SIZE,
      y: ((e.clientY - r.top) / r.height) * SIZE,
    };
  };

  const down = (e: React.PointerEvent<HTMLCanvasElement>) => {
    void load();
    e.currentTarget.setPointerCapture(e.pointerId);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = pos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    // a dot, so a single tap still draws something
    ctx.lineTo(x + 0.01, y);
    ctx.stroke();
    drawing.current = true;
    hasInk.current = true;
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const up = () => {
    if (!drawing.current) return;
    drawing.current = false;
    void predict();
  };

  const clear = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, SIZE, SIZE);
    hasInk.current = false;
    setPreds([]);
  };

  return (
    <div className="rounded-card border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="flex flex-col gap-3">
          <canvas
            ref={canvasRef}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerLeave={up}
            style={{ width: SIZE, height: SIZE, touchAction: "none" }}
            className="cursor-crosshair rounded-lg border border-edge bg-black"
            aria-label="Drawing canvas — draw one of the listed objects"
            role="img"
          />
          <div className="flex items-center gap-3">
            <button
              onClick={clear}
              className="rounded-lg border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-edge hover:text-ink"
            >
              clear
            </button>
            <span className="font-mono text-[11px] text-muted">
              {status === "loading" && "loading model…"}
              {status === "ready" && meta && `${(meta.params / 1000).toFixed(0)}k params · runs in your browser`}
              {status === "idle" && "draw to load the model"}
              {status === "error" && "model unavailable"}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-ink">Draw one of these</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-2">
            {meta ? meta.classes.join(" · ") : "cat · fish · house · tree · car · star · sun · bicycle · umbrella · eye"}
          </p>

          <div className="mt-5 min-h-[7.5rem]">
            {status === "error" ? (
              <p className="text-sm text-muted">
                The model couldn&apos;t load here ({error}). The training code is in{" "}
                <code className="text-xs">ml/train_sketch_cnn.py</code>.
              </p>
            ) : preds.length === 0 ? (
              <p className="text-sm text-muted">
                A small convolutional net, trained on Google&apos;s Quick, Draw! data, exported to
                ONNX and run entirely on your machine — no server sees your drawing.
              </p>
            ) : (
              <ul className="flex flex-col gap-2.5" aria-live="polite">
                {preds.map((p, i) => (
                  <li key={p.label}>
                    <div className="mb-1 flex items-baseline justify-between gap-2">
                      <span
                        className={`text-sm ${i === 0 ? "font-medium text-ink" : "text-ink-2"}`}
                      >
                        {p.label}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-muted">
                        {(p.p * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-raised">
                      <div
                        className={`h-full rounded-full transition-[width] duration-300 ${
                          i === 0 ? "bg-accent" : "bg-edge"
                        }`}
                        style={{ width: `${Math.max(p.p * 100, 1.5)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {meta && (
            <p className="mt-4 font-mono text-[11px] text-muted">
              val accuracy {(meta.val_accuracy * 100).toFixed(1)}% · trained {meta.trained}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
