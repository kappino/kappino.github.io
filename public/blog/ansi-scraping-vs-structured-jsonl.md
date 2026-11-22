---
title: "Why I Switched from Terminal Snapshots to Structured JSONL"
date: "2026-09-28"
category: "Systems Engineering"
topic: "Systems"
tags: ["Python", "AsyncIO", "JSONL", "Terminal", "tmux"]
excerpt: "Terminal screen captures are a visual projection, not a data stream. Here is why tailing an append-only JSONL transcript replaced brittle ANSI scraping in agy-telegram."
author: "Crescenzo Esposito"
---

## A terminal capture is a UI projection, not an event log

When I first built `agy-telegram`, capturing visible rows from `tmux` looked like the fastest path — the output was already sitting in the pane. For one-line replies, it seemed fine.

As soon as real coding sessions ran longer, the cracks appeared:
- **Width-dependent wrapping:** Line breaks changed whenever the `tmux` pane resized, mangling code blocks and Markdown tables.
- **Overwritten progress spinners:** In-place ANSI redraws erased earlier intermediate lines before the bridge could parse them.
- **Guessing turn boundaries:** Because a screen snapshot only reflects *what is visible right now*, the bridge had to apply fragile heuristics to infer whether the agent was still working or had finished its reply.

## Tailing structured JSONL instead

The coding agent already emits an **append-only JSONL transcript** where every line is a self-contained JSON event. Switching the watcher to tail new JSONL records eliminated every single ambiguity:

1. **Exact text fidelity:** Content arrives as a JSON string field rather than reconstructed terminal columns.
2. **Explicit event types:** Tool invocations, thinking/progress updates, and final responses carry distinct types — letting the Telegram bridge update a single live status message during execution and post the final reply cleanly the moment the turn ends.

## The honest trade-off: schema coupling

Reading JSONL trades *visual fragility* for **schema coupling**. The watcher now depends on the transcript path and field structure written by the agent; an upstream schema change can require updating the parser even when the terminal UI looks unchanged. In practice, that is a far better trade-off — structured formats break loudly and predictably, whereas ANSI scraping fails silently. Meanwhile, `tmux` stays right where it shines: as the live interactive terminal when you sit back down at your desk.

[agy-telegram project case study](/projects/proj-agy-telegram) · [Operating a local coding session from Telegram](/blog/agy-telegram-mobile-cockpit)
