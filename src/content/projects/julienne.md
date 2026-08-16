---
title: Julienne — shipped iOS cooking app
summary: An iOS cooking app on the App Store — scan a grocery receipt, get a pantry, and ask an assistant what to cook with it.
started: "2026-04-22"
ended: "2026-06-04"
status: paused
featured: true
order: 2
tools:
  - Swift
  - SwiftUI
  - Supabase
  - StoreKit 2
  - OCR
  - LLM
  - GitHub Actions
  - Xcode Cloud
metrics:
  - Shipped to the App Store
tags:
  - ios
  - swift
  - llm
  - ocr
  - shipped
  - personal
repo: "https://github.com/MilburnJ/julienne"
writeupOnly: false
---

An iOS app on the App Store. Point the camera at a grocery receipt and it becomes your pantry;
then an assistant named Juli suggests what to actually cook with what you have, tracks what you
made, and learns your preferences.

**The hard part is the receipt.** Grocery receipts are close to worst-case OCR: thermal print,
abbreviations, inconsistent casing, and store-specific codes — `GV WHP CRM 8Z` has to become
"whipping cream" before anything downstream works. That's an OCR pass feeding a normalization
layer (`OCRService` → `ReceiptNormalizer` → `IngredientNameNormalizer`), with a streaming review
screen so the user corrects the model rather than waiting on it. Same problem shape as production
document extraction, in a consumer app where a wrong line item is immediately obvious to the user.

**The assistant** is grounded rather than freeform: it disambiguates when a request is
underspecified, confirms preferences instead of assuming them, and shows its lineage on a
suggestion so a recommendation can be traced back to what's in the pantry.

**Shipping it was the other half.** StoreKit 2 subscriptions with a paywall and App Store Server
API validation, Sign in with Apple, a Supabase backend with cross-device sync, a written privacy
policy, event instrumentation as a build-time habit rather than an afterthought, and GitHub
Actions pipelines for the iOS build, the backend, and the marketing site.

Private repo — the portfolio entry is a write-up. The app itself is public on the App Store.
