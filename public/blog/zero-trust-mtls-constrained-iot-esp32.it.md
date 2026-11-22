---
title: "Da dove parte la fiducia nel gateway IoT di CARE"
date: "2026-02-20"
category: "Sicurezza e sistemi embedded"
topic: "Security"
tags: ["mTLS", "ESP32", "MQTT", "HMAC-SHA256", "X.509", "IoT Security"]
excerpt: "Dopo aver iniettato letture false in laboratorio con un ESP32 malevolo, ho messo in sicurezza tre confini: verifica HMAC-SHA256 sull'ESP32, Mosquitto con mTLS/ACL X.509 e ancoraggio dei digest su Ganache locale."
author: "Crescenzo Esposito"
---

## Una lettura falsa può sembrare del tutto plausibile

Il prototipo originale di CARE raccoglieva misurazioni da sensori biomedicali BLE e le inoltrava al backend su MQTT in chiaro. I sensori venivano riconosciuti solo tramite indirizzo configurato, mentre il client MQTT pubblicava senza TLS né credenziali.

Nella prova di laboratorio all'Università di Salerno, un **ESP32 malevolo** che impersonava un sensore noto è riuscito a iniettare misurazioni fittizie accettate senza errori dalla pipeline. Quell'esperimento ha cambiato la domanda di progetto: *se un valore clinico sembra plausibile e arriva con un'identità familiare, quali prove crittografiche ha davvero ciascuno strato del sistema?*

## Confine 1: verificare il payload BLE prima dell'inoltro

Ho sviluppato il firmware del gateway ESP32 in **C++ (PlatformIO, mbedTLS)** in modo che verifichi un tag **HMAC-SHA256** su ogni lettura BLE *prima* di passarla al client MQTT. Qualsiasi pacchetto con firma assente o non valida viene scartato direttamente sull'edge.

Questa scelta comporta un vincolo concreto: la verifica HMAC richiede un **sensore BLE programmabile** capace di generare il payload firmato. Molti dispositivi biomedicali commerciali sono chiusi e non permettono firmware custom; in un contesto clinico reale, quindi, questo livello richiede sensori programmabili (come Movesense MD) oppure meccanismi di sicurezza BLE a livello di pairing.

## Confine 2: mTLS (TLS 1.3) e ACL per topic su certificati X.509

Proteggere il payload BLE non basta se il canale verso il broker resta aperto. Ho configurato **Mosquitto in Docker** con **mTLS (TLS 1.3)**, assegnando **certificati client X.509 distinti** al gateway ESP32 e al bridge Python di ingestione.

Mosquitto lega direttamente l'identità del certificato alle **ACL sui topic MQTT**:
- il gateway può pubblicare *solo* sui propri topic di telemetria;
- il bridge di ingestione ha permessi di sola sottoscrizione su quei topic.

I due controlli non sono ridondanti: **mTLS dimostra quale gateway ha aperto la connessione**, mentre **l'HMAC sull'edge verifica che la lettura provenga davvero dal sensore autorizzato** e non da uno spoofer BLE nella stanza.

```mermaid
sequenceDiagram
  participant S as Sensore BLE programmabile
  participant GW as Gateway ESP32 (C++ / mbedTLS)
  participant MQ as Broker Mosquitto (Docker · TLS 1.3)
  participant BR as Bridge Python e SQLite
  participant SC as Smart Contract Solidity (Ganache locale)

  S->>GW: Payload BLE + HMAC-SHA256
  alt HMAC assente o non valido
    GW--xGW: Scarta il pacchetto sull'edge
  else HMAC-SHA256 valido
    GW->>MQ: Publish MQTT via mTLS (verifica ACL X.509)
    MQ->>BR: Consegna telemetria autenticata
    BR->>BR: Salva la lettura grezza in SQLite
    BR->>SC: Ancora digest SHA-256 + flag criticità
  end
```

## Confine 3: rilevare alterazioni dello storico (e i suoi limiti)

Dopo aver salvato la lettura in **SQLite**, il bridge Python calcola un **digest SHA-256** e lo registra (senza mai scrivere dati clinici in chiaro) in uno **smart contract Solidity su rete locale Ganache**.

In fase di audit è possibile ricalcolare gli hash dal database e confrontarli con i digest ancorati per individuare eventuali alterazioni dello storico. Conviene però restare lucidi su cosa garantisce davvero questo strato:
- l'ancoraggio **rende rilevabili modifiche successive al database**, ma *non* impedisce l'ingresso di dati falsi se mancano i controlli a monte;
- introduce il costo di una transazione nel flusso di persistenza, utile solo quando l'audit richiede un riferimento di integrità separato dal database applicativo.

[Architettura, codice e demo del gateway](/projects/proj-mtls-iot-gateway)
