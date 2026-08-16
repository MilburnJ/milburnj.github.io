# milburnj.github.io

Personal site of Jakeb Milburn — https://milburnj.github.io

**Content in `src/content/**` and `src/data/*.json` is generated. Do not edit it here.**
It is rendered from the `brain` vault (`projects/`, `career/`, `history/`) by
`scripts/portfolio_sync.py` in that repo, via the `/portfolio sync` skill. Editing a project
description or a résumé bullet here will be overwritten on the next sync — change it in the
vault instead.

What *is* edited here: layouts, components, styles, the ML demo, and the build/deploy setup.

## Stack

Astro 5 (static) · React islands · Tailwind v4 · MDX · deployed to GitHub Pages by Actions.

## Commands

    npm run dev          # local dev server
    npm run build        # static build into dist/
    npm run preview      # serve the build
    npm run resume-pdf   # render /resume to public/resume.pdf via headless Edge/Chrome

## Deploying

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes.
Repo setting required once: **Settings → Pages → Source = GitHub Actions**.
