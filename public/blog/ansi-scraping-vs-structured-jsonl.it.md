---
title: "Perché sono passato dalle schermate del terminale a JSONL"
date: "2026-09-28"
category: "Sistemi"
topic: "Systems"
tags: ["Python", "AsyncIO", "JSONL", "Terminale"]
excerpt: "Cosa va ricostruito da una schermata del terminale e cosa è già esplicito negli eventi della trascrizione."
author: "Crescenzo Esposito"
---

## La schermata dipende da ciò che è visibile

Sono partito dall’output in tmux perché era già disponibile. Per le risposte brevi funzionava. Su un output lungo le righe potevano andare a capo in base alla larghezza del pannello e un aggiornamento poteva sovrascrivere una riga precedente. Il bridge riceveva lo stato visibile in un dato momento e doveva dedurre cosa fosse accaduto.

## Seguire la trascrizione

L’agente scrive anche una trascrizione JSONL. Il bridge legge i nuovi record durante il turno e usa i loro campi per distinguere gli aggiornamenti intermedi dalla risposta finale. Così può aggiornare un solo messaggio di stato e formattare il risultato senza ricomporre le colonne del terminale.

## Il formato è una dipendenza

Il watcher dipende da dove l’applicazione scrive la trascrizione e dai campi che usa. Un cambio di formato può quindi richiedere di aggiornare il watcher anche quando il terminale continua a funzionare. Il terminale resta utile per ispezionare direttamente la sessione.

[Progetto del bridge Telegram](/projects/proj-agy-telegram)
