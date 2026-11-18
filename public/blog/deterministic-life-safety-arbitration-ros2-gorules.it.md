---
title: "Come CARE decide le priorità in ROS2"
date: "2026-09-29"
category: "Robotica"
topic: "Robotics"
tags: ["ROS2", "Python", "GoRules JDM", "PNRR Age-IT"]
excerpt: "Un esercizio è già in corso quando scatta un promemoria. Seguiamo la decisione dalle tabelle GoRules al coordinatore ROS2."
author: "Crescenzo Esposito"
---

## Scade un promemoria mentre è in corso un esercizio

Immaginiamo un ciclo in cui è già in corso un esercizio cognitivo e arriva il momento di un promemoria per un farmaco. È un esempio ricostruito dal codice del planner e dalle sue tabelle decisionali. La domanda è che cosa fa ciascun componente con la stessa fotografia dello stato.

## Perché dividere la decisione in due?

La prima implementazione usava `durable_rules`. Il passaggio alle tabelle GoRules ha reso condizioni ed esiti consultabili nel grafo.

All’inizio abbiamo scelto le tabelle decisionali visuali per permettere al personale sanitario e ad altri operatori non tecnici di aggiornare regole e terapie senza modificare il codice ROS2. Per la demo abbiamo usato un insieme fisso di regole per i casi standard. Il planner recuperava terapie pianificate, misurazioni ed esercizi cognitivi dalle API del backend, preparava i dati di ingresso per Zen Engine e valutava lo stesso grafo `medicine9.json` su quei dati.

Il grafo GoRules stabilisce quali azioni sono applicabili. La tabella dei farmaci controlla l’orario, lo snooze e lo stato in attesa. Nella finestra del promemoria può produrre `REMIND_FARMACO`. Dopo la scadenza, una voce ancora in attesa può invece produrre `ESCALATE`. Indipendentemente, la tabella degli esercizi può restituire `WAIT` per un esercizio già in corso. Un nodo di espressione raccoglie gli esiti in liste distinte.

Il planner Python su ROS2 coordina poi quegli esiti. Nel grafo si leggono insieme le condizioni. Nel planner si vede quando viene aggiornato lo stato e quale esito diventa un comando.

## Che cosa succede in quel ciclo?

| Esito del grafo | Comportamento del planner |
| --- | --- |
| L’esercizio restituisce `WAIT` | Attende il feedback e sospende le attività opzionali. |
| La tabella dei farmaci restituisce `REMIND_FARMACO` | Imposta lo snooze e include il promemoria nella lista di comandi inviata al coordinatore. |
| Un farmaco ancora in attesa restituisce poi `ESCALATE` | Invia un comando indirizzato all’integrazione per il caregiver. |

L’esercizio può restare in corso mentre il planner inoltra il promemoria. Il codice permette di seguire il comando fino alla pubblicazione sul coordinatore. La consegna alla persona richiederebbe una verifica separata.

[Progetto CARE e architettura](/projects/proj-care-decision-planner)
