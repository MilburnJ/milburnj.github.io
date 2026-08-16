---
title: I rebuilt this site so I never have to update it again
date: "2026-08-16"
summary: "The site you're reading is generated from a markdown vault that a coding agent maintains. Here's the architecture and why it beats editing HTML."
tags:
  - astro
  - agents
  - automation
draft: false
---

Every portfolio site dies the same way. You build it, it's great, and then you ship something
worth adding and don't feel like opening the repo. Six months later the newest thing on it is
six months old.

So this rebuild started from a different question: not "what should the site look like" but
"what would make updating it free?"

## The vault is the source of truth

Everything on this site — every project, the timeline, the résumé, this post — is generated from
a markdown vault on my machine that an agent maintains. Projects are files with frontmatter.
The résumé is a file. My history is a file. A sync script projects the public-safe subset into
this site's content collections and commits it.

That means the update path for "I shipped something" is a one-line capture, not a code change.
The site is a render target, not a place where facts live.

## Public by exception, not by default

Most of what I work on is at an employer, which creates an obvious problem: the most impressive
work is the least publishable.

The compromise is a confidentiality gate. Employer projects carry two sections — a public-safe
summary and internal notes — and only the first is ever eligible to leave the vault. On top of
that sits a list of banned terms: internal system names, source systems, incident dates. Every
outbound string is checked against it, and a hit aborts the sync rather than warning about it.
It's a small amount of code that lets me talk about the shape of my work without ever leaking
its internals.

Fail-closed is the whole design. A publishing pipeline that warns is a publishing pipeline that
eventually publishes the wrong thing at 11pm.

## Show, don't tell

The other thing I wanted: stop describing machine learning work and let people run some.

The sketch classifier on the home page is a small CNN — about thirty thousand parameters —
trained on Google's Quick, Draw! dataset, exported to ONNX and executed in your browser on
WebAssembly. It's ~89% accurate on ten classes and the weights are 121 KB, which is smaller than
most hero images. Nothing you draw leaves your machine, because there's no server to send it to.

Constraint worth knowing: GitHub Pages can't send the COOP/COEP headers that WebAssembly
threading needs, so it runs single-threaded. For a model this size that's irrelevant, which is
exactly why the model is this size.

## Stack

Astro 5 for the static shell, React only inside the interactive pieces, Tailwind v4, deployed by
GitHub Actions. The résumé page doubles as the PDF source — one renderer, so the download can
never disagree with the page.

The best part isn't any of that. It's that the next time I ship something, I'll write one line
about it, and this site will already know.
