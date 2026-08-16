---
title: Optimizing matrix multiplication
summary: Successive optimization of matmul from naive loops through cache blocking to CUDA/cuBLAS, profiled with Nsight.
started: "2024-11"
ended: "2024-12"
status: done
featured: true
order: 8
tools:
  - C++
  - CUDA
  - cuBLAS
  - OpenBLAS
  - Nsight Compute
tags:
  - hpc
  - cuda
  - systems
repo: "https://github.com/MilburnJ/matrix_optimization"
writeupOnly: false
---

Systems depth for ML-infrastructure work: what actually moves matmul performance once you look past the CPU - caches, prefetching, then the GPU.
