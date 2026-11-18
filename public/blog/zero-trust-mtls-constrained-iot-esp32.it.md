---
title: "Da dove parte la fiducia nel gateway IoT di CARE"
date: "2026-09-28"
category: "Sicurezza & Sistemi Embedded"
topic: "Security"
tags: ["mTLS", "ESP32", "MQTT", "HMAC", "IoT Security"]
excerpt: "Cosa ci ha insegnato una prova in laboratorio sulla fiducia nelle misurazioni, nelle connessioni MQTT e nei dati archiviati."
author: "Crescenzo Esposito"
---

## Una lettura può sembrare plausibile

Il gateway originale di CARE raccoglieva misurazioni da sensori biomedicali BLE e le inoltrava via MQTT. Nella prova di laboratorio il gateway ha accettato una lettura da un dispositivo che impersonava un sensore noto. Da qui è nata la domanda che volevo affrontare con il prototipo. Se una lettura sembra plausibile e arriva con un’identità familiare, quali prove ha il sistema della sua provenienza?

## Verificare la lettura prima dell’inoltro

Ho lavorato sul firmware ESP32 e sull’accesso a MQTT con certificati. Il firmware verifica un codice di autenticazione del messaggio prima di inoltrare la lettura. Questo richiede un mittente programmabile che produca il formato previsto, un vincolo concreto per un sistema che nasce attorno a periferiche biomedicali già esistenti.

Abbiamo assegnato certificati client distinti al gateway e al servizio di ingestione. Mosquitto usa quelle identità per applicare i permessi sui topic. Il certificato del gateway identifica chi ha aperto la connessione. Il controllo del payload dà al gateway un riscontro sulla provenienza della lettura che riceve.

## Conservare un record verificabile

Il prototipo salva le letture in SQLite e registra i digest in un contratto EVM. In fase di audit si può ricalcolare il digest e confrontarlo con quello registrato. Il confronto permette di verificare che il record conservato corrisponda a quello registrato. Il valore di quella verifica dipende dai controlli eseguiti prima che il dato entri nel sistema.

[Architettura e implementazione del gateway](/projects/proj-mtls-iot-gateway)
