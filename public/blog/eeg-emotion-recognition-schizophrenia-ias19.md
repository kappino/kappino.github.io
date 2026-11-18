---
title: "What wearable EEG could distinguish in SPECTRA"
date: "2026-09-30"
category: "Biomedical ML & Robotics"
topic: "Biomedical"
tags: ["EEG", "Biomedical ML", "Signal Processing", "PICARD-ICA", "Schizophrenia", "IAS-19"]
excerpt: "Why I compared three EEG cleaning pipelines, and what changed when we asked the classifier to distinguish clips."
author: "Crescenzo Esposito"
---

## Start with the signal

For my bachelor’s thesis, I worked with wearable EEG recorded during a baseline, a memory game, and three film clips. I compared three preprocessing pipelines. Looking at the raw and cleaned traces side by side helped me see how much a baseline offset or a blink could change the signal before we even computed a feature. We aligned the recordings to event markers so the analysis could refer back to the part of the session that produced each segment.

## Ask two different questions

We used the EEG features to classify three participant groups and, in a separate experiment, three video clips. The best MLP in the full paper reached 97.2% accuracy for groups and 84.6% for clips under the reported cross-validation. Each clip supplied a stimulus label. Participants also rated their responses, so predicting which clip was playing answers a different question from predicting how the person felt.

## Test what carries over

With 21 participants and overlapping EEG windows, the unit of validation matters. The paper reports stratified five-fold validation and leaves open whether all windows from each participant stayed in the same fold. To check how much of the result carries over to a new participant, I would hold out entire participants and repeat feature selection and tuning within the training folds.

[Full paper on Springer](https://link.springer.com/chapter/10.1007/978-3-032-33874-7_13) · [Publication details and BibTeX](/research) · [SPECTRA project](/projects/proj-spectra-eeg)
