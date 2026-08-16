---
title: Pips
summary: Mobile creature-collection game with an AI-generated soft-3D art pipeline.
started: "2026-06-09"
ended: "2026-07-09"
status: paused
featured: false
order: 22
tools:
  - React Native
  - Expo
  - TypeScript
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

Mobile creature-collection game built with Expo/React Native. The engineering story worth telling
is the art pipeline: a 2026-07 pivot from pixel art to a soft-3D look, built as a repeatable
generate-and-key pipeline (text-to-image into image-to-3D) with a per-species styling seam so new
creatures inherit one treatment while varying anatomy, eyes and temperament. Also built an offline
three.js + headless-Chrome harness to verify 3D assets without running the app.

Private repo - the portfolio entry is a write-up, not a code link.
