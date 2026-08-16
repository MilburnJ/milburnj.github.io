#!/usr/bin/env python
"""Train the tiny sketch classifier that runs in the browser on this site.

    python ml/train_sketch_cnn.py --samples 12000 --epochs 6

Data: Google's Quick, Draw! bitmap dataset (28x28 grayscale, one .npy per class).
Model: a small CNN — deliberately tiny, because it ships to the browser as ONNX and
runs on onnxruntime-web's single-threaded WASM backend (GitHub Pages can't set the
COOP/COEP headers that threading needs).

Output: public/models/sketch.onnx + public/models/sketch.classes.json
"""
from __future__ import annotations

import argparse
import json
import time
import urllib.request
from pathlib import Path

import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / "ml" / ".data"
OUT = ROOT / "public" / "models"

# Ten classes that are fun to draw and visually distinct from each other.
CLASSES = ["cat", "fish", "house", "tree", "car", "star", "sun", "bicycle", "umbrella", "eye"]
BASE = "https://storage.googleapis.com/quickdraw_dataset/full/numpy_bitmap"


class SketchCNN(nn.Module):
    """~110k params. Two conv blocks, global pooling, one hidden layer."""

    def __init__(self, n_classes: int):
        super().__init__()
        self.c1 = nn.Conv2d(1, 16, 3, padding=1)
        self.c2 = nn.Conv2d(16, 32, 3, padding=1)
        self.c3 = nn.Conv2d(32, 64, 3, padding=1)
        self.fc1 = nn.Linear(64, 96)
        self.fc2 = nn.Linear(96, n_classes)
        self.drop = nn.Dropout(0.25)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = F.max_pool2d(F.relu(self.c1(x)), 2)   # 28 -> 14
        x = F.max_pool2d(F.relu(self.c2(x)), 2)   # 14 -> 7
        x = F.relu(self.c3(x))
        x = F.adaptive_avg_pool2d(x, 1).flatten(1)
        x = self.drop(F.relu(self.fc1(x)))
        return self.fc2(x)


def fetch(cls: str) -> Path:
    CACHE.mkdir(parents=True, exist_ok=True)
    path = CACHE / f"{cls}.npy"
    if path.exists():
        return path
    url = f"{BASE}/{cls.replace(' ', '%20')}.npy"
    print(f"  downloading {cls} ...", end="", flush=True)
    t0 = time.time()
    urllib.request.urlretrieve(url, path)
    print(f" {path.stat().st_size / 1e6:.0f} MB in {time.time() - t0:.0f}s")
    return path


def load(samples_per_class: int, seed: int = 0) -> tuple[np.ndarray, np.ndarray]:
    rng = np.random.default_rng(seed)
    xs, ys = [], []
    for i, cls in enumerate(CLASSES):
        # mmap so we never hold a 96 MB array per class in memory
        arr = np.load(fetch(cls), mmap_mode="r")
        idx = rng.choice(len(arr), size=min(samples_per_class, len(arr)), replace=False)
        xs.append(np.asarray(arr[np.sort(idx)], dtype=np.float32) / 255.0)
        ys.append(np.full(len(idx), i, dtype=np.int64))
        print(f"  {cls:<9} {len(idx):>6} samples")
    x = np.concatenate(xs).reshape(-1, 1, 28, 28)
    y = np.concatenate(ys)
    perm = rng.permutation(len(x))
    return x[perm], y[perm]


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--samples", type=int, default=12000, help="samples per class")
    ap.add_argument("--epochs", type=int, default=6)
    ap.add_argument("--batch", type=int, default=256)
    ap.add_argument("--lr", type=float, default=2e-3)
    args = ap.parse_args()

    torch.manual_seed(0)
    print(f"loading {len(CLASSES)} classes x {args.samples} samples")
    x, y = load(args.samples)
    split = int(len(x) * 0.9)
    xtr, ytr = torch.from_numpy(x[:split]), torch.from_numpy(y[:split])
    xva, yva = torch.from_numpy(x[split:]), torch.from_numpy(y[split:])
    print(f"train {len(xtr)} | val {len(xva)}")

    model = SketchCNN(len(CLASSES))
    n_params = sum(p.numel() for p in model.parameters())
    print(f"model: {n_params:,} parameters")
    opt = torch.optim.AdamW(model.parameters(), lr=args.lr)
    sched = torch.optim.lr_scheduler.OneCycleLR(
        opt, max_lr=args.lr, epochs=args.epochs,
        steps_per_epoch=(len(xtr) + args.batch - 1) // args.batch,
    )

    for epoch in range(args.epochs):
        model.train()
        total = 0.0
        for i in range(0, len(xtr), args.batch):
            xb, yb = xtr[i:i + args.batch], ytr[i:i + args.batch]
            opt.zero_grad()
            loss = F.cross_entropy(model(xb), yb)
            loss.backward()
            opt.step()
            sched.step()
            total += loss.item() * len(xb)
        model.eval()
        with torch.no_grad():
            acc = (model(xva).argmax(1) == yva).float().mean().item()
        print(f"epoch {epoch + 1}/{args.epochs}  loss {total / len(xtr):.4f}  val acc {acc:.4f}")

    # per-class accuracy tells you which classes the demo will embarrass itself on
    model.eval()
    with torch.no_grad():
        pred = model(xva).argmax(1)
    print("\nper-class validation accuracy:")
    for i, cls in enumerate(CLASSES):
        mask = yva == i
        if mask.any():
            print(f"  {cls:<9} {(pred[mask] == i).float().mean().item():.3f}")

    OUT.mkdir(parents=True, exist_ok=True)
    onnx_path = OUT / "sketch.onnx"
    torch.onnx.export(
        model,
        torch.zeros(1, 1, 28, 28),
        str(onnx_path),
        input_names=["input"],
        output_names=["logits"],
        dynamic_axes={"input": {0: "batch"}, "logits": {0: "batch"}},
        opset_version=13,
    )
    (OUT / "sketch.classes.json").write_text(
        json.dumps({"classes": CLASSES, "val_accuracy": round(acc, 4),
                    "params": n_params, "trained": time.strftime("%Y-%m-%d")}, indent=2),
        encoding="utf-8",
    )
    print(f"\nwrote {onnx_path} ({onnx_path.stat().st_size / 1024:.0f} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
