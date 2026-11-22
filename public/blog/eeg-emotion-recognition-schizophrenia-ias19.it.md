---
title: "Cosa riesce a distinguere l’EEG indossabile in SPECTRA"
date: "2026-09-02"
category: "ML biomedico e signal processing"
topic: "Biomedical"
tags: ["EEG", "Machine Learning", "Signal Processing", "PICARD-ICA", "Schizofrenia", "IAS-19", "Springer LNNS"]
excerpt: "Dal segnale grezzo EEG a 14 canali al paper da primo autore su Springer LNNS: perché la pulizia degli artefatti viene prima dei modelli e dove stanno i limiti metodologici su 21 partecipanti."
author: "Crescenzo Esposito"
---

## Partire dal segnale grezzo, non dal modello

Un caschetto EEG wireless riduce drasticamente l'attrito nella ricerca clinica rispetto a una cuffia ospedaliera da 64 canali, ma produce tracce molto sensibili al rumore. Per la mia tesi triennale (relatrice Prof.ssa M. Staffa, in collaborazione con Psichiatria Federico II) abbiamo acquisito **EEG wireless a 14 canali (Emotiv EPOC X, 256 Hz)** su **21 partecipanti** durante una baseline di 30 secondi, un gioco di memoria e tre clip video emotive da due minuti.

Prima di addestrare qualsiasi classificatore, ho confrontato **tre pipeline di preprocessing in MATLAB/EEGLAB** (segmentazione sui marker, filtro passa-banda 1–45 Hz e notch a 50 Hz, pulizia automatica, **PICARD-ICA** e **ICLabel**). Mettere a confronto le tracce grezze e pulite del canale F3 mostra chiaramente quanto un offset DC o un battito di ciglia possano dominare l'ampiezza del segnale rispetto all'attività corticale in microvolt.

## Due domande di classificazione distinte

Dal segnale pulito ho estratto in **Python** la **densità spettrale di potenza (Welch PSD)**, la potenza nelle bande alfa/beta e l'**asimmetria frontale** su finestre da 4 secondi con sovrapposizione del 50%, confrontando più classificatori **scikit-learn** (MLP, Random Forest, SVM, k-NN, Decision Tree) su due compiti separati:

1. **Classificazione dei gruppi clinici** (7 controlli sani, 6 pazienti con schizofrenia responsiva al trattamento, 8 con schizofrenia resistente al trattamento).
2. **Classificazione delle clip video** tra i tre stimoli emotivi proposti.

Nelle tabelle 3 e 4 del paper IAS-19 il miglior MLP raggiunge il **97,2% sui gruppi** e l'**84,6% sulle clip** in validazione stratificata 5-fold, mentre l'abstract pubblicato riassume prudentemente i risultati fino al **95%**. Va inoltre distinta la domanda del secondo esperimento: riconoscere *quale clip fosse in riproduzione* misura la risposta allo stimolo, che non coincide automaticamente con l'emozione soggettiva riferita dal partecipante.

## Il peso della validazione su un campione esplorativo

Con **21 partecipanti** e finestre EEG sovrapposte, il modo in cui vengono costruiti i fold decide quanto un risultato sia generalizzabile. Il paper riporta una validazione stratificata 5-fold senza specificare se tutte le finestre di uno stesso soggetto siano rimaste confinate nello stesso fold.

Il passo successivo per verificare la generalizzazione su pazienti mai visti è una **validazione subject-independent** (Leave-One-Subject-Out o GroupKFold), mantenendo normalizzazione, selezione delle feature e tuning rigorosamente dentro i fold di addestramento.

[Paper pubblicato su Springer LNNS (DOI)](https://doi.org/10.1007/978-3-032-33874-7_13) · [Dettagli pubblicazione e BibTeX](/research) · [Scheda progetto SPECTRA](/projects/proj-spectra-eeg)
