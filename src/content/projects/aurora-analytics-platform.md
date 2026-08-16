---
title: Operational analytics platform (Aurora)
summary: Operational analytics platform over a SQL reporting warehouse - utilization, billing, A/R and provider productivity.
started: "2025-12"
status: active
featured: true
order: 2
tools:
  - TypeScript
  - Next.js
  - React
  - Drizzle ORM
  - SQL Server
  - PostgreSQL
  - Playwright
tags:
  - analytics
  - typescript
  - nextjs
  - data
  - work
writeupOnly: true
---

**Problem.** Operational reporting for a multi-site healthcare provider group was scattered
across exports and source systems, so the same question produced different numbers depending on
who asked and when.

**Approach.** Built an operational analytics platform in TypeScript/Next.js over a SQL reporting
warehouse, covering provider utilization, billing performance, accounts receivable and provider
productivity. Reconciled HR/payroll and billing sources whose identifiers and spellings disagree,
made role-scoped access fail closed rather than open, and added a golden-file regression workflow
that captures report output and diffs it on every change so numbers cannot silently drift.

**Impact.** One place the organization reads its operating numbers from, with a verification
workflow that catches regressions before anyone sees them. Still the primary system I work on.

**Stack.** TypeScript | Next.js | React | Drizzle ORM | SQL Server | PostgreSQL | Playwright
