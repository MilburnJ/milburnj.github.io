import { useEffect, useState } from "react";

export interface RepoSnapshot {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  pushed_at: string;
}

interface Props {
  /** build-time snapshot from the vault — shown instantly and used if the API is unreachable */
  snapshot: RepoSnapshot[];
  snapshotDate: string;
  user: string;
}

/** Live repo activity, with the build-time snapshot as both the first paint and the fallback.
 *  GitHub's unauthenticated API is rate-limited per IP, so a visitor may well get a 403 — the
 *  page must never look broken because of that. */
export default function GitHubActivity({ snapshot, snapshotDate, user }: Props) {
  const [repos, setRepos] = useState<RepoSnapshot[]>(snapshot);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=6`, {
      signal: ac.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: RepoSnapshot[]) => {
        if (!Array.isArray(data) || data.length === 0) return;
        setRepos(
          data.slice(0, 6).map((r) => ({
            name: r.name,
            description: r.description,
            url: r.url,
            language: r.language,
            pushed_at: (r.pushed_at ?? "").slice(0, 10),
          }))
        );
        setLive(true);
      })
      .catch(() => {
        /* rate-limited or offline — the snapshot stands */
      });
    return () => ac.abort();
  }, [user]);

  if (repos.length === 0) return null;

  return (
    <section aria-labelledby="activity-heading">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="activity-heading" className="text-sm font-semibold tracking-tight text-ink">
          Recent activity
        </h2>
        <p className="font-mono text-xs text-muted">
          {live ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-good" aria-hidden />
              live from GitHub
            </span>
          ) : (
            `snapshot · ${snapshotDate}`
          )}
        </p>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {repos.map((r) => (
          <li key={r.name}>
            <a
              href={r.url ?? `https://github.com/${user}/${r.name}`}
              target="_blank"
              rel="noopener"
              className="block rounded-card border border-line px-4 py-3 transition-colors hover:border-edge"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate font-mono text-sm text-ink">{r.name}</span>
                <span className="shrink-0 font-mono text-[11px] text-muted">{r.pushed_at}</span>
              </div>
              {r.description && (
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                  {r.description}
                </p>
              )}
              {r.language && (
                <p className="mt-1.5 text-[11px] text-accent">{r.language}</p>
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
