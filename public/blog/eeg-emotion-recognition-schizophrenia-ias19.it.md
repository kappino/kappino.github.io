---
title: "Che cosa distingueva l’EEG indossabile in SPECTRA"
date: "2026-09-30"
category: "Biomedical ML & Robotics"
topic: "Biomedical"
tags: ["EEG", "Machine Learning", "Elaborazione dei segnali", "PICARD-ICA", "Schizofrenia", "IAS-19"]
excerpt: "Perché ho confrontato tre pipeline di pulizia EEG e cosa è cambiato quando abbiamo chiesto al modello di distinguere le clip."
author: "Crescenzo Esposito"
---

## Partire dal segnale

Per la tesi triennale ho lavorato su registrazioni EEG acquisite durante una baseline, un gioco di memoria e tre clip. Ho confrontato tre pipeline di preprocessing. Mettere fianco a fianco le tracce grezze e quelle pulite mi ha aiutato a vedere quanto un offset o un battito di ciglia potesse alterare il segnale prima ancora di calcolare una feature. Abbiamo allineato le registrazioni ai marker degli eventi per collegare ogni segmento alla fase sperimentale corrispondente.

## Fare due domande diverse

Abbiamo usato le feature EEG per classificare tre gruppi di partecipanti e, in un esperimento separato, tre clip. Nella validazione stratificata a cinque fold su 21 partecipanti, il miglior MLP ha raggiunto il 97,2% di accuratezza per i gruppi e l’84,6% per le clip. Il paper non specifica il raggruppamento dei fold per partecipante. Ogni clip aveva un’etichetta legata allo stimolo. I partecipanti hanno anche valutato la propria risposta, quindi riconoscere la clip e stimare l’emozione riferita sono due compiti distinti.

## Verificare cosa si generalizza

Con 21 partecipanti e finestre EEG sovrapposte, conta come sono stati costruiti i fold. Il paper descrive una validazione stratificata a cinque fold e lascia aperto se tutte le finestre della stessa persona siano rimaste nello stesso fold. Per capire quanto il risultato si trasferisca a persone nuove, terrei fuori interi partecipanti e ripeterei selezione delle feature e tuning all’interno dei fold di addestramento.

[Paper su Springer](https://link.springer.com/chapter/10.1007/978-3-032-33874-7_13) · [Dettagli della pubblicazione e BibTeX](/research) · [Progetto SPECTRA](/projects/proj-spectra-eeg)
