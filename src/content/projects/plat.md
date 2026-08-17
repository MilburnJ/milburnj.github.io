---
title: plat — agent-native hosting platform
summary: An agent-native hosting platform — deploy the small apps agents write, from a contract-first app spec to a running URL.
started: "2026-07"
status: paused
featured: true
order: 7
tools:
  - TypeScript
  - Python
  - Azure
  - Bicep
  - Key Vault
  - Fly.io
  - Playwright
tags:
  - platform
  - azure
  - iac
  - agents
  - personal
writeupOnly: true
---

Personal project (confirmed 2026-08-16). Hosting built for the apps that coding agents actually
produce: small, 1–5-user tools that are too much work to deploy by hand and too small to justify
a platform team.

The design is **contract-first** — an app declares what it needs in a spec, and the control plane
turns that into infrastructure rather than the other way around. An Azure control plane with
Bicep infrastructure as code, Key Vault-backed configuration (with the ordering constraints that
implies — some secret references cannot exist before the resources they point at), a Fly.io
workload plane, and Playwright coverage of the auth/session path.

One service layer sits behind three adapters — a REST API, a typed client, and an MCP server — so
an agent deploying an app and a human clicking one go through the same code, with a cross-adapter
conformance suite proving they stay in step. A `plat` CLI sits on top. August added the human
half: a web dashboard, email-link auth, GitHub import, and Alembic migrations.

Notable engineering judgement: the end-to-end suite was proven by *mutation* rather than assumed —
deliberately breaking the credentials/CORS path to check whether the tests caught it. They didn't,
which is a finding worth more than a green run.
