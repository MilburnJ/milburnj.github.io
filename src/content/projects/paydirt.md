---
title: paydirt — problem-mining agent
summary: A problem-mining agent — reads social platforms for real complaints, checks what already exists, and synthesizes grounded business hypotheses.
started: "2026-05-08"
ended: "2026-05-10"
status: paused
featured: true
order: 6
tools:
  - TypeScript
  - Next.js
  - Node.js
  - Postgres
  - pgvector
  - Drizzle ORM
  - Azure OpenAI
  - embeddings
tags:
  - agents
  - llm
  - embeddings
  - nlp
  - personal
repo: "https://github.com/MilburnJ/paydirt"
writeupOnly: false
---

An agent pipeline that turns internet complaining into a short list of defensible business
hypotheses. The name is mining slang for the layer where the actual ore is: the whole system is a
filter — hours of vented noise in, a handful of grounded ideas out.

**How it works.** Adapters pull from Reddit, Hacker News, GitHub Issues and the App Store. A
two-pass extraction pulls candidate pain points out of raw threads. Those get embedded (Azure
OpenAI) and clustered online with a nearest-centroid scheme, so recurring complaints collapse into
one scored, velocity-tracked cluster instead of a thousand duplicates. A search stage then checks
what already exists — Brave and Product Hunt, plus scraping incumbent review pages to mine
complaints *about the existing solutions*, which is where the actual openings hide. Only then does
a synthesis pass write a hypothesis, and a separate critic pass scores it and returns a verdict.

**The interesting problem** was slop. An LLM asked for business ideas will happily produce
plausible, generic garbage forever. Two things kept it honest: a strict anti-slop synthesis prompt,
and an independent critic pass that scores the output rather than trusting the generator to grade
itself. The clustering matters for the same reason — a hypothesis backed by one angry post is
noise; one backed by a cluster with rising velocity is a signal.

**Stack.** TypeScript · Next.js dashboard (browse, watchlist, vote — server actions) ·
Postgres + pgvector · Drizzle ORM · Azure OpenAI for embeddings and synthesis ·
node-cron orchestration. The dashboard falls back to mock data when the tables are empty, so the
UI is developable without running the pipeline.

Private repo — the portfolio entry is a write-up, not a code link.
