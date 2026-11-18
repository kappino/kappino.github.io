---
title: "Why I switched from terminal snapshots to JSONL"
date: "2026-09-28"
category: "Systems"
topic: "Systems"
tags: ["Python", "AsyncIO", "JSONL", "Terminal"]
excerpt: "What a terminal snapshot leaves implicit and what the transcript exposes as separate events."
author: "Crescenzo Esposito"
---

## A screen capture is a view

I started with the output visible in tmux because it was already available. That worked for short replies. Longer output could wrap at the pane width, and a progress update could overwrite an earlier line. The capture preserved what was visible at a given moment, so the bridge still had to infer what had happened.

## Follow the transcript

The agent also writes a JSONL transcript. The bridge follows the new records during a turn and uses their fields to tell intermediate activity from the final response. That made it possible to update a single status message and format a final reply without reconstructing it from terminal columns.

## The format is a dependency

The watcher depends on where the application writes its transcript and which fields it uses. A format change can affect the watcher even when the terminal itself behaves as before. The terminal remains useful as a live interface for inspecting the session.

[Telegram bridge project](/projects/proj-agy-telegram)
