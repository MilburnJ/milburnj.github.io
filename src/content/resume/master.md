---
title: Résumé
updated: "2026-08-16"
---

# Jakeb Milburn

**Software Engineer**
jakemil2114@gmail.com · 443-717-1721 · Baltimore, MD · [linkedin.com/in/jakeb-milburn](https://www.linkedin.com/in/jakeb-milburn-23401a208/) · [github.com/MilburnJ](https://github.com/MilburnJ) · [milburnj.github.io](https://milburnj.github.io)

## Summary

Software engineer with an M.S. in Computer Science who ships across the stack. Production ML on
Azure (document classification and extraction), the TypeScript analytics platform a company runs
on, an iOS app on the App Store with OCR and subscriptions, agent tooling, and enough CUDA and MPI
to know where the time goes. Comfortable owning the whole path — model, pipeline, deployment, UI,
and the regression workflow that keeps the numbers honest.

## Skills

- **Machine learning & AI:** LLM fine-tuning and deployment (OpenAI, Llama, Hugging Face), RAG and embeddings, prompt engineering, document intelligence (classification, extraction, OCR), NLP (NER, sentiment), computer vision (segmentation, detection, image processing)
- **Languages:** Python, TypeScript/JavaScript, Java, C#, C/C++, Swift, SQL, HTML/CSS
- **Frameworks & libraries:** PyTorch, TensorFlow, Keras, scikit-learn, Hugging Face Transformers, NumPy, Pandas, OpenCV, Next.js, React, Drizzle ORM
- **Cloud & infrastructure:** Azure (Document Intelligence, Functions, Blob Storage, Key Vault, Bicep), AWS (SageMaker, Bedrock, Lambda, S3), GCP, PostgreSQL, SQL Server, Docker, GitHub Actions
- **Mobile:** Swift/SwiftUI, StoreKit 2, React Native/Expo, Kotlin/Android
- **Systems:** CUDA/cuBLAS, OpenMP, MPI, performance profiling (Nsight Compute)

## Experience

### Aurora — Software Engineer (2025-08 – Present)



- Designed and shipped a production document-intelligence pipeline on Azure — custom classification models and field extractors over inbound clinical documents — orchestrated through Azure Functions, Blob Storage and PostgreSQL across separate dev and production environments.
- Owned the development-to-production migration of that platform (data, trained models, document storage) and the incident response that followed, resolving a classification outage caused by a model-configuration mismatch between environments.
- Built an operational analytics platform in TypeScript/Next.js over a SQL reporting warehouse covering provider utilization, billing performance, accounts receivable and provider productivity — now the organization's primary reporting surface.
- Reconciled HR/payroll and billing data sources with conflicting identifiers and naming, and made role-scoped access fail closed rather than open.
- Introduced a golden-file regression workflow that captures report output and diffs it on every change, so reported numbers cannot silently drift.

### IncNow: Agents and Corporations — Software Engineer (2022-05 – 2024-09, summers) · Wilmington, DE

- Designed, fine-tuned and deployed LLMs for a production AI-powered customer-service assistant across web and Slack.
- Built RAG pipelines with vector-store integration and tuned embeddings for contextual retrieval and factual response generation.
- Ran prompt engineering and error analysis to iteratively improve response accuracy and fluency.
- Maintained training logs and evaluation metrics supporting continuous deployment on AWS Lambda and SageMaker.
- Integrated intelligent document handling and form parsing through OCR and NLP pipelines.

### University of Delaware, DeepREAL Lab — AI/ML Researcher (2024-02 – 2024-05)

- Led research on scalable multi-class classification of marine terrain using CNNs and U-Net with ResNet backbones.
- Processed large sonar and bathymetric datasets, engineered preprocessing pipelines, and trained models evaluated with IoU/Dice.
- Contributed reproducible ML workflows with modular code and documented hyperparameter-tuning strategies.

### ZipCode Wilmington — Augmented Reality Engineer Intern (2023-05 – 2023-07)

- Developed a real-time AR learning app using WebAR and JavaScript for 3D rendering and object tracking.
- Applied computer vision to improve marker-based interaction, app latency and responsiveness.

## Projects

### brain — agentic second brain (2026)
Claude-operated personal knowledge system: a markdown + SQLite vault as the single source of truth, custom skills that turn meeting transcripts into structured notes, tasks and project logs, a Next.js dashboard, and unattended scheduled automation.

### Julienne — iOS app, App Store (2026)
Cooking app built in SwiftUI: grocery-receipt scanning (OCR plus a normalization layer for thermal-print abbreviations) that builds a pantry, an LLM assistant that suggests meals from it, StoreKit 2 subscriptions, Supabase sync, and GitHub Actions CI for app, backend and site.

### Seafloor sediment segmentation (2025)
U-Net with ResNet backbones over seafloor imagery and bathymetry across 17 substrate classes; **IoU ≈ 0.74**. Paired with a FathomNet scaling study on underwater detection datasets.

### RFdiffusion generative evaluation (2025)
Evaluated a diffusion model for constrained protein backbone design — unconditional generation, symmetric oligomer design and hotspot-guided binders — scored through the ProteinMPNN → AlphaFold loop.

### Optimizing matrix multiplication (2024)
Successive optimization from naive loops through cache blocking to CUDA/cuBLAS, profiled with Nsight Compute against an OpenBLAS baseline.

## Education

**University of Delaware** — M.S. Computer Science (2025-05); Artificial Intelligence Certificate (2025-05)
Coursework: computer vision, machine learning, large-scale machine learning, NLP, artificial intelligence, data mining, AI for bioengineering and bioinformatics, computer architecture, algorithm design and analysis, parallel computing, mobile robot programming, automata theory, cybersecurity, HCI.

**University of Delaware** — B.S. Computer Science, concentration in Artificial Intelligence and Robotics (2024-12)

Student-athlete, UD Men's Crew (2020-09 – 2025-05)
