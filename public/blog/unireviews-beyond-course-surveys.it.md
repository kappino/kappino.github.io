---
title: "Cosa manca nei questionari universitari? Da qui nasce UniReviews"
date: "2026-11-18"
category: "Backend e modellazione dati"
topic: "Systems"
tags: ["MongoDB", "Flask", "Esse3", "Università"]
excerpt: "Una recensione dopo l’esame può aiutare chi si prepara e dare all’ateneo un modo per leggere le esperienze degli studenti."
author: "Crescenzo Esposito"
---

## La domanda che arriva dopo l’esame

Se compilo un questionario prima dell’appello, posso dire se le lezioni erano chiare. Solo dopo aver sostenuto l’esame posso raccontare se le domande rispecchiavano il programma, quanto mi è servito il materiale consigliato e dove ho sottovalutato il carico di lavoro.

Da questa differenza è nato UniReviews, il prototipo che ho sviluppato per Basi di Dati II. Volevo che chi prepara un esame potesse leggere esperienze concrete, fare domande e confrontare più risposte. La stessa raccolta poteva dare all’ateneo un modo per capire se un problema segnalato da uno studente ricorreva anche in altre recensioni.

UniReviews è il seguito naturale di **ParthenoAnswer**, un progetto che ho realizzato alla triennale, per l’esame di Tecnologie Web, con **Riccardo Aiello** e **Aniello Genovese**. ParthenoAnswer era uno spazio per domande e risposte sugli insegnamenti e indicava già quando chi interveniva aveva superato l’esame. Con UniReviews ho ripreso quell’idea per raccogliere recensioni strutturate dopo l’appello e renderle consultabili anche da chi si occupa della qualità didattica.

## Che cosa verifica Esse3

L’integrazione usa le API di Esse3 per sincronizzare gli esami superati. Quando arriva una recensione, UniReviews confronta il codice dell’insegnamento con quelli presenti nel libretto sincronizzato. Se trova una corrispondenza, aggiunge un badge di verifica. Il badge riguarda il superamento dell’esame. Il lettore può comunque confrontare opinioni diverse sulla stessa prova.

Nel prototipo le recensioni conservano un riferimento all’autore. Per offrire recensioni anonime servirebbe anche limitare quali dati dell’autore possono uscire dalle API.

## Dalla discussione al cruscotto

Per uno studente è utile sapere perché altri hanno trovato un esame difficile. Per chi si occupa di qualità didattica è utile poter vedere se i giudizi sulla difficoltà si concentrano in un insegnamento o ricorrono in un intero corso di studio. Ho costruito un cruscotto che permette di passare da dipartimento a corso di studio e infine all’insegnamento, con filtri e distribuzioni delle valutazioni.

La partecipazione volontaria influenza chi scrive e quali esperienze arrivano al cruscotto. Userei quei segnali per scegliere dove approfondire con studenti e docenti.

## Come ho popolato la demo

Per provare il catalogo e il cruscotto con testi scritti da studenti, ho usato il dataset pubblico di recensioni della University of Waterloo. L’ETL abbina i titoli degli insegnamenti di Waterloo a quelli di Salerno con un indice invertito, dando più peso alle parole meno comuni (IDF). Poi associa i testi ai codici dei corsi di Salerno e li carica in MongoDB con autori simulati. I testi provengono da recensioni di Waterloo. Gli abbinamenti ai corsi di Salerno servono a popolare la demo e non rappresentano valutazioni raccolte a Salerno. [Dataset Course Reviews University of Waterloo su Kaggle](https://www.kaggle.com/datasets/anthonysusevski/course-reviews-university-of-waterloo)

## Una scelta che si vede nel database

Ho salvato le statistiche calcolate nel documento dell’insegnamento per semplificare la lettura del catalogo. La recensione e il riepilogo vengono aggiornati in operazioni distinte. Se una scrittura si interrompe a metà, il riepilogo può restare indietro. È il compromesso tecnico più interessante del progetto, perché lega la velocità di consultazione a come si gestisce la coerenza in scrittura.

[Modello dati, architettura e benchmark di UniReviews](/projects/proj-unireviews)
