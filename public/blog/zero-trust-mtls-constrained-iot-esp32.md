---
title: "Mutual TLS on a memory-constrained ESP32"
date: "2026-09-28"
category: "Security & Embedded Systems"
topic: "Security"
tags: ["Zero-Trust", "mTLS", "ESP32", "OpenSSL", "Cryptography", "IoT Security", "FreeRTOS"]
excerpt: "How certificate configuration and session resumption affect connection time and memory use."
author: "Crescenzo Esposito"
---

## Device identity at the gateway

My project connected ESP32 telemetry to a Mosquitto broker. I worked on the firmware and the gateway configuration so each device had to authenticate with a client certificate before publishing. The broker used access rules keyed to the device identity to limit which topics it could use.

## Keeping the TLS setup practical

Certificate validation and connection setup use memory and keep the radio active. Switching the certificate setup and resuming a TLS 1.3 session address different parts of that cost. For an intermittently connected device, a useful experiment would record the hardware, firmware configuration, number of trials and whether each session was cold or resumed. Connection time and radio-on time should be reported separately.

## What the prototype demonstrates

The project walkthrough shows the broker rejecting an unauthenticated connection. The case study also describes a separate audit component that anchors telemetry digests without putting raw readings on-chain.

[Gateway architecture and example output](/projects/proj-mtls-iot-gateway)
