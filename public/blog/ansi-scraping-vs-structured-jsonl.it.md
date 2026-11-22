---
title: "Perché sono passato dalle schermate del terminale a JSONL"
date: "2026-09-28"
category: "Ingegneria dei sistemi"
topic: "Systems"
tags: ["Python", "AsyncIO", "JSONL", "Terminale", "tmux"]
excerpt: "Una schermata tmux è una proiezione visiva, non un flusso di eventi. Perché leggere la trascrizione JSONL append-only ha sostituito lo scraping ANSI in agy-telegram."
author: "Crescenzo Esposito"
---

## Una cattura del terminale è una vista, non un log strutturato

Nella prima versione di `agy-telegram`, leggere le righe visibili da `tmux` sembrava la strada più rapida: il testo era già lì. Con risposte brevi funzionava.

Appena sono arrivate sessioni reali più lunghe, però, il modello ha mostrato tutti i suoi limiti:
- **A capo dipendente dalla larghezza:** ridimensionare il pannello `tmux` spezzava righe di codice e tabelle in punti arbitrari.
- **Sovrascritture ANSI:** barre di avanzamento e spinner riscrivevano righe precedenti prima che il bridge potesse interpretarle.
- **Fine turno indovinata a euristiche:** fotografare ciò che è visibile in un istante costringeva il bridge a *dedurre* se l'agente stesse ancora lavorando o avesse concluso.

## Seguire la trascrizione JSONL

L'agente scrive già una **trascrizione JSONL append-only** in cui ogni riga è un evento JSON autonomo. Spostare il watcher sui nuovi record JSONL ha eliminato ogni ambiguità:

1. **Testo integro:** il contenuto arriva come campo stringa pulito, indipendente dalle colonne del terminale.
2. **Tipi di evento espliciti:** chiamate ai tool, stati intermedi e risposta finale sono già separati — permettendo al bot Telegram di modificare un solo messaggio di stato durante il turno e pubblicare la risposta finale appena completata.

## Il compromesso reale: dipendenza dallo schema

Passare a JSONL scambia la *fragilità visiva* con l'**accoppiamento allo schema**. Il watcher dipende dal percorso del file e dai nomi dei campi scritti dall'agente: se il formato cambia, va aggiornato il parser anche se il terminale continua a funzionare. È comunque un compromesso nettamente migliore: uno schema strutturato segnala subito l'errore, mentre lo scraping ANSI degrada in silenzio. E `tmux` continua a fare benissimo il suo lavoro di interfaccia live quando torni alla scrivania.

[Scheda progetto agy-telegram](/projects/proj-agy-telegram) · [Controllare una sessione di coding da Telegram](/blog/agy-telegram-mobile-cockpit)
