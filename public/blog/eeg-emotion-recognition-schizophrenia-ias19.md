---
title: "What Wearable EEG Could Distinguish in SPECTRA"
date: "2026-09-02"
category: "Biomedical ML & Signal Processing"
topic: "Biomedical"
tags: ["EEG", "Biomedical ML", "Signal Processing", "PICARD-ICA", "Schizophrenia", "IAS-19", "Springer LNNS"]
excerpt: "From raw 14-channel wearable EEG to a first-author Springer LNNS paper: why artifact rejection came first, what classifiers actually learned across 21 participants, and where validation boundaries matter."
author: "Crescenzo Esposito"
---

## Start with the raw signal, not the model

Wearable EEG makes clinical experimentation far more accessible than lab-grade 64-channel caps — but raw wireless traces are unforgiving. For my bachelor's thesis (supervised by Prof. M. Staffa in collaboration with Psychiatry at Federico II), we recorded **14-channel wireless EEG (Emotiv EPOC X, 256 Hz)** across **21 participants** during a 30-second baseline, a memory game, and three two-minute emotional video clips.

Before touching a single classifier, I compared **three MATLAB/EEGLAB preprocessing pipelines** (event-marker segmentation, 1–45 Hz bandpass + 50 Hz notch filtering, automatic cleaning, **PICARD-ICA**, and **ICLabel**). Plotting raw vs. cleaned channel F3 side by side made one lesson unmistakable: a single DC offset or eye blink can dwarf microvolt cortical activity and dominate spectral features if left uncorrected.

## Asking two separate classification questions

From the cleaned recordings, I extracted **Welch power spectral density (PSD)**, alpha/beta band power, and **frontal hemispheric asymmetry** features in Python across 4-second windows with 50% overlap, then benchmarked multiple **scikit-learn** models (MLP, Random Forest, SVM kernels, k-NN, Decision Tree) on two distinct tasks:

1. **Clinical group classification** (7 healthy controls, 6 treatment-responsive, 8 treatment-resistant schizophrenia participants).
2. **Stimulus clip classification** across the three emotional video clips.

In the full IAS-19 paper (Tables 3–4), the top MLP reached **97.2% group accuracy** and **84.6% clip accuracy** under stratified five-fold validation — while the published abstract conservatively summarizes group performance as **up to 95%**. Notice also the conceptual gap on Task 2: predicting *which video clip was playing* is a stimulus-recognition task, which differs from decoding each participant's self-reported emotional state.

## Why validation methodology matters most on small cohorts

With **21 participants** and overlapping 4-second EEG windows, the unit of validation defines what the accuracy metric actually proves. Because the paper reports stratified five-fold validation without specifying whether all windows from a given participant were kept strictly inside one fold, subject-level generalization remains an open question.

In follow-up clinical work, the decisive test would be **subject-independent holdout** (Leave-One-Subject-Out or GroupKFold), keeping all feature scaling, selection, and hyperparameter tuning strictly inside each training fold.

[Published paper on Springer LNNS (DOI)](https://doi.org/10.1007/978-3-032-33874-7_13) · [Publication details & BibTeX](/research) · [SPECTRA case study](/projects/proj-spectra-eeg)
