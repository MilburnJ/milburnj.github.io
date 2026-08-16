---
title: brain - agentic second brain
summary: An agentic second brain - a Claude-operated vault, custom skills, and a dashboard that runs my week.
started: "2026-08-16"
status: active
featured: true
order: 3
tools:
  - Claude Code
  - Python
  - TypeScript
  - Next.js
  - React
  - SQLite
  - Tailwind
tags:
  - ai
  - agents
  - claude
  - nextjs
  - personal
writeupOnly: true
---

A personal knowledge system operated by Claude rather than by hand. A markdown vault plus SQLite
is the single source of truth; custom skills do the work (route inbox captures, turn meeting
transcripts into notes/tasks/people updates, write daily briefings, draft standups, run the weekly
review, build a career timeline, and generate this site); a Next.js dashboard renders the same
files; Windows Task Scheduler runs the loop unattended.

The interesting part is the architecture: skills as prompt-level programs, a file-shaped state
machine, deterministic Python for scanning and a language model for synthesis, and a strict
"draft only, never send" boundary around anything that leaves the building.

Private repo - the portfolio entry is a write-up, not a code link.
