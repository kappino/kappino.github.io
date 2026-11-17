---
title: "Mutual TLS su ESP32 con memoria limitata"
date: "2026-09-28"
category: "Sicurezza & Sistemi Embedded"
topic: "Security"
tags: ["Zero-Trust", "mTLS", "ESP32", "OpenSSL", "Crittografia", "IoT Security", "FreeRTOS"]
excerpt: "Come la configurazione dei certificati e la ripresa delle sessioni incidono su tempi di connessione e memoria."
author: "Crescenzo Esposito"
---

## Identità del dispositivo al gateway

Il progetto trasferisce la telemetria di un ESP32 a un broker Mosquitto. Ho lavorato al firmware e alla configurazione del gateway affinché ogni dispositivo debba autenticarsi con un certificato client prima di pubblicare. Le regole del broker associano all’identità del dispositivo i topic a cui può accedere.

## I costi di TLS su un dispositivo a risorse limitate

La verifica dei certificati e l’apertura della connessione usano memoria e tengono attiva la radio. Cambiare la configurazione dei certificati e riprendere una sessione TLS 1.3 agiscono su costi diversi. Su un nodo che si connette a intervalli, una prova dovrebbe documentare hardware, configurazione del firmware, numero di ripetizioni e tipo di sessione. Tempo di connessione e durata di attività della radio vanno misurati separatamente.

## Che cosa mostra il prototipo

Negli output della scheda si vede il broker rifiutare una connessione non autenticata. La scheda descrive anche un componente di audit separato, che registra impronte della telemetria senza salvare le letture grezze sulla blockchain.

[Architettura del gateway e output di esempio](/projects/proj-mtls-iot-gateway)
