---
title: "Come CARE decide le priorità in ROS2"
date: "2026-09-29"
category: "Robotica & Sistemi Real-Time"
topic: "Robotics"
tags: ["ROS2", "Robotica", "GoRules JDM", "PNRR Age-IT", "Real-Time", "Life Safety", "C++"]
excerpt: "Tabelle decisionali e regole di priorità per risolvere eventi in conflitto in un robot assistivo."
author: "Crescenzo Esposito"
---

## Quando un promemoria compete con attività di routine

Nel progetto PNRR Age-IT, il robot assistivo CARE doveva gestire promemoria per i farmaci insieme alle attività ordinarie. Un promemoria può essere confermato, rinviato o segnalato al caregiver dopo un timeout. Esplicitare questi esiti aiuta a ricostruire perché il robot ha selezionato o rinviato un’attività.

## Il mio contributo

Ho sviluppato il motore decisionale e il Priority Resolver e ho scritto il pacchetto ROS2 `care_planner`. Ho trasferito le regole da un’implementazione basata su Rete alle tabelle GoRules JDM. Una tabella rende più semplice ispezionare condizioni e regole. Il resolver gestisce le priorità e lo stato dei timer fra un evento e l’altro.

## Flusso decisionale

1. Un evento ROS2 raggiunge il planner.
2. La tabella valuta l’evento e seleziona l’azione applicabile.
3. Il resolver applica le priorità e segue lo stato del promemoria, incluse scadenza ed escalation.

L’integrazione ha permesso di provare le regole nel prototipo CARE. Per documentare la latenza servirebbe una traccia che misuri separatamente ricezione dell’evento ROS2, valutazione della regola e invio dell’azione.

[Progetto CARE e architettura](/projects/proj-care-decision-planner) · [Borsa di ricerca](/experience)
