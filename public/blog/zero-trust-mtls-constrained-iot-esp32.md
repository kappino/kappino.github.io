---
title: "Where trust starts in CARE’s IoT gateway"
date: "2026-09-28"
category: "Security & Embedded Systems"
topic: "Security"
tags: ["mTLS", "ESP32", "MQTT", "HMAC", "IoT Security"]
excerpt: "What a lab demo taught us about trusting a sensor reading, an MQTT connection, and a stored record."
author: "Crescenzo Esposito"
---

## A reading can look right

The original CARE gateway collected readings from BLE medical sensors and forwarded them over MQTT. In our lab demonstration, the original gateway accepted a reading from a device impersonating a known sensor. That result changed the question I wanted the prototype to answer. If a reading looks plausible and arrives under a familiar identity, what evidence does the system have about its source?

## Move the check before forwarding

I worked on the ESP32 firmware and the certificate-based MQTT setup. The firmware checks a message authentication code before forwarding a reading. That requires a programmable sender able to produce the expected format. This was a real design constraint for a system built around existing biomedical peripherals.

We also gave the gateway and the ingestion bridge distinct client certificates. Mosquitto uses those identities to enforce topic permissions. A gateway certificate establishes who opened the connection. The payload check is what gives the gateway evidence about the reading it receives.

## Keep a record that can be checked later

The prototype stores readings in SQLite and anchors digests in an EVM contract. An auditor can recompute a digest later and compare it with the recorded value. That check establishes whether a stored record still matches what was registered. Its value depends on the checks that ran before the record entered the system.

The EVM path adds transaction submission and confirmation to the prototype’s persistence workflow. I would keep that dependency if the audit needed a digest that could be checked independently of the application database.

[Gateway architecture and implementation](/projects/proj-mtls-iot-gateway)
