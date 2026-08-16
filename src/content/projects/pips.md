---
title: Pips
summary: A fitness game where real workouts are the only way to grow your creatures — 28 species, no pay-to-win.
started: "2025-11-29"
ended: "2026-07-09"
status: paused
featured: false
order: 22
tools:
  - React Native
  - Expo
  - TypeScript
  - Supabase
  - Strava API
  - Three.js
  - Playwright
tags:
  - game
  - mobile
  - 3d
  - generative-ai
  - personal
repo: "https://github.com/MilburnJ/Pips"
writeupOnly: false
---

*Move your body. Grow your Pips.* A cross-platform companion game where real-world workouts level
up, evolve and hatch a collection of creatures. The design constraint that shapes everything:
**no mechanic ever sells creature power.** The only input is actually moving.

Starters map to activity types — water to swimming, earth to running, air to biking — and any
supported workout grants XP, with a 40% bonus when the activity matches the creature's affinity.
Simple loop, but it means the game can't be short-circuited by spending, which is also what keeps
the compliance posture clean (there's a doc for that: loot-box stance and privacy, written before
the store listing rather than after).

Built with Expo/React Native and TypeScript over Supabase, with Strava integration for real
workout data and a mock mode that drives the entire loop — XP, levels, evolutions, eggs, battles —
with no accounts or keys, so the game is developable offline. The engine has unit tests and is
mirrored into Supabase functions so client and server agree on the rules. 28 species with
documented rarities and odds.

The 2026-07 stretch was an art pivot: from pixel art to a soft-3D look, built as a repeatable
generate-and-key pipeline (text-to-image into image-to-3D) with a per-species styling seam so new
creatures inherit one treatment while varying anatomy, eyes and temperament. I also built an
offline three.js + headless-Chrome harness to check 3D assets without launching the app.

Started as a Swift prototype (*Fit Creatures*, 2025-11) before moving cross-platform.

Private repo — the portfolio entry is a write-up, not a code link.
