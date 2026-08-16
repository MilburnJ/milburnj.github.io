---
title: Document intelligence pipeline (Aurora)
summary: Production document-intelligence pipeline - classification and field extraction over inbound clinical documents on Azure.
started: "2026-02"
status: active
featured: true
order: 1
tools:
  - Python
  - Azure Document Intelligence
  - Azure Functions
  - Azure Blob Storage
  - PostgreSQL
  - Azure Key Vault
  - Bicep
tags:
  - ml
  - document-intelligence
  - azure
  - nlp
  - work
writeupOnly: true
---

**Problem.** A healthcare services organization received a high volume of inbound clinical
documents as unstructured faxes. Routing and keying them by hand was slow and error-prone.

**Approach.** Designed and shipped a production document-intelligence pipeline: custom
classification models sort each inbound document by type, purpose-built extractors pull the
fields that matter, and the results land in a relational store the downstream apps read. Built on
Azure - Document Intelligence for the models, Functions for orchestration, Blob Storage for
documents, PostgreSQL for structured output, Key Vault for secrets - with separate development
and production environments and infrastructure defined as code.

**Impact.** Owned the migration from development to production - data, trained models and
document storage - and the incident response that followed, including a same-day fix for a
classification outage caused by a model-configuration mismatch between environments. Established
the rule that models ship to an environment before the configuration points at them.

**Stack.** Python | Azure Document Intelligence | Azure Functions | Blob Storage | PostgreSQL |
Key Vault | Bicep/IaC
