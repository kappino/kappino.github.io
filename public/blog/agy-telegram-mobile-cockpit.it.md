---
title: "Seguire una sessione di coding da Telegram"
date: "2026-09-28"
category: "Sistemi e sicurezza"
topic: "Systems"
tags: ["Python", "Telegram", "tmux", "AsyncIO"]
excerpt: "Come ho collegato una sessione già avviata al telefono e progettato gli aggiornamenti di stato."
author: "Crescenzo Esposito"
---

## Lasciare la sessione dov’è

Volevo controllare una sessione Antigravity e rispondere dal telefono lasciando il processo già attivo in tmux. Il bridge Python interroga Telegram via HTTPS in uscita e verifica che il mittente sia nella lista degli utenti autorizzati. Il processo locale conserva la sua sessione tmux.

## Incollare il prompt in un’unica operazione

La prima versione inviava il prompt come sequenza di tasti. Sono passato a un buffer tmux per incollare in un’unica operazione anche un testo su più righe. Il bridge invia Invio separatamente perché inserire il testo e inviarlo sono due azioni distinte.

## Rendere visibile lo stato

Il bot aggiorna un solo messaggio durante il turno e invia il risultato finale appena disponibile. La chat resta leggibile anche con più aggiornamenti intermedi. Un socket Unix locale offre agli altri processi un canale dedicato per inviare notifiche.

Telegram fa parte del perimetro di fiducia. Un account autorizzato può interagire con la sessione locale e i messaggi transitano dall’infrastruttura di Telegram.

[Scheda progetto](/projects/proj-agy-telegram)
