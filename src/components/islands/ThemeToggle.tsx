import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/** The inline script in Base.astro sets the theme before paint; this only flips it. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) ?? "dark");
  }, []);

  const flip = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — the choice just won't persist */
    }
    setTheme(next);
  };

  return (
    <button
      onClick={flip}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="ml-1 rounded-lg border border-line px-2 py-1.5 text-muted transition-colors hover:border-edge hover:text-ink"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {theme === "dark" ? (
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        ) : (
          <>
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M12 2v2.2M12 19.8V22M22 12h-2.2M4.2 12H2M19.07 4.93l-1.55 1.55M6.48 17.52l-1.55 1.55M19.07 19.07l-1.55-1.55M6.48 6.48 4.93 4.93"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </button>
  );
}
