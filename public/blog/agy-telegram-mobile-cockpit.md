---
title: "Operating a local coding session from Telegram"
date: "2026-09-28"
category: "Systems & Security"
topic: "Systems"
tags: ["Python", "Telegram", "tmux", "AsyncIO"]
excerpt: "How I connected a phone to an existing coding session and designed the feedback loop."
author: "Crescenzo Esposito"
---

## Keep the session where it is

The project started with a practical problem. I wanted to check an Antigravity session and respond to it from my phone without moving the running process out of tmux. The Python bridge polls Telegram over outbound HTTPS and checks the sender against a configured allowlist. The local process keeps its original tmux session.

## Make a prompt a single operation

An early implementation sent prompts as keystrokes. I switched to a tmux buffer so a multiline prompt could be pasted as a unit. The bridge sends Enter separately because inserting text and submitting it are two distinct interactions.

## Make the state visible

The bot edits one status message during a turn and sends the final result when it is available. That keeps the chat readable when a task has several intermediate steps. A local Unix socket gives other processes a separate path to send notifications.

Telegram remains part of the trust boundary. A permitted account can interact with the local session, and messages sent to Telegram pass through its infrastructure.

[Project details](/projects/proj-agy-telegram)
