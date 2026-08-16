---
title: Seafloor sediment segmentation (U-Net)
summary: Semantic segmentation of seafloor imagery + bathymetry across 17 sediment classes, U-Net with ResNet backbones.
started: "2025-02"
ended: "2025-07"
status: done
featured: true
order: 4
tools:
  - Python
  - PyTorch
  - torchvision
  - OpenCV
  - GeoPandas
  - scikit-learn
metrics:
  - IoU ~0.74 on held-out set
  - 17 substrate classes
tags:
  - ml
  - computer-vision
  - research
repo: "https://github.com/MilburnJ/SeafloorSegmentation"
writeupOnly: false
---

Research work from the UD DeepREAL Lab. RGB imagery paired with bathymetry, class-weighted cross-entropy, cosine-annealed LR, IoU/Dice evaluation. Paired with the FathomNet scaling study as one marine-CV story.
