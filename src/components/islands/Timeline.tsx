import { useMemo, useState } from "react";

export interface Entry {
  date: string;
  end?: string;
  title: string;
  type: "education" | "job" | "project" | "milestone" | "cert" | "talk" | "post";
  project?: string;
  body: string;
}

const TYPES: { key: Entry["type"] | "all"; label: string }[] = [
  { key: "all", label: "Everything" },
  { key: "job", label: "Roles" },
  { key: "project", label: "Projects" },
  { key: "education", label: "Education" },
  { key: "milestone", label: "Milestones" },
];

const DOT: Record<Entry["type"], string> = {
  job: "bg-accent",
  project: "bg-good",
  education: "bg-warning",
  cert: "bg-warning",
  milestone: "bg-edge",
  talk: "bg-edge",
  post: "bg-edge",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function label(date: string): string {
  if (date === "present") return "now";
  const [y, m] = date.split("-");
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
}

function span(e: Entry): string {
  return e.end ? `${label(e.date)} – ${label(e.end)}` : label(e.date);
}

export default function Timeline({ entries }: { entries: Entry[] }) {
  const [filter, setFilter] = useState<Entry["type"] | "all">("all");

  const shown = useMemo(
    () =>
      [...entries]
        .filter((e) => filter === "all" || e.type === filter)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [entries, filter]
  );

  const years = useMemo(() => {
    const by = new Map<string, Entry[]>();
    for (const e of shown) {
      const y = e.date.slice(0, 4);
      if (!by.has(y)) by.set(y, []);
      by.get(y)!.push(e);
    }
    return [...by.entries()];
  }, [shown]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: entries.length };
    for (const e of entries) c[e.type] = (c[e.type] ?? 0) + 1;
    return c;
  }, [entries]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter timeline">
        {TYPES.filter((t) => counts[t.key]).map((t) => {
          const on = filter === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              aria-pressed={on}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                on
                  ? "border-accent bg-accent-soft text-ink"
                  : "border-line text-muted hover:border-edge hover:text-ink"
              }`}
            >
              {t.label}
              <span className="ml-1.5 tabular-nums opacity-60">{counts[t.key]}</span>
            </button>
          );
        })}
      </div>

      <div className="relative">
        {/* the rail */}
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-line via-line to-transparent sm:left-[calc(5rem+7px)]"
          aria-hidden
        />
        <ol className="flex flex-col gap-8">
          {years.map(([year, items]) => (
            <li key={year}>
              <div className="mb-4 flex items-baseline gap-4">
                <span className="hidden w-20 shrink-0 text-right font-mono text-sm text-muted sm:block">
                  {year}
                </span>
                <span className="font-mono text-sm text-muted sm:hidden">{year}</span>
              </div>
              <ul className="flex flex-col gap-6">
                {items.map((e, i) => (
                  <li key={`${e.date}-${i}`} className="flex gap-4">
                    <span className="hidden w-20 shrink-0 pt-0.5 text-right font-mono text-xs text-muted sm:block">
                      {span(e)}
                    </span>
                    <span
                      className={`relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-4 border-canvas ${DOT[e.type]}`}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1 pb-1">
                      <p className="font-mono text-xs text-muted sm:hidden">{span(e)}</p>
                      <h3 className="text-[15px] font-medium leading-snug text-ink">{e.title}</h3>
                      {e.body && (
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{e.body}</p>
                      )}
                      {e.project && (
                        <a
                          href={`/projects/${e.project}`}
                          className="mt-2 inline-block text-xs text-accent hover:underline"
                        >
                          read the write-up →
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>

      {shown.length === 0 && (
        <p className="rounded-card border border-dashed border-edge px-4 py-10 text-center text-sm text-muted">
          Nothing here yet.
        </p>
      )}
    </div>
  );
}
