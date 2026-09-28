---
title: "ANSI Scraping vs Structured JSONL Streams in Remote AI Agent Telemetry"
date: "2026-09-28"
category: "Async Architecture"
tags: ["Google Antigravity", "Python", "AsyncIO", "JSONL", "Terminal", "DevOps"]
excerpt: "A technical deep dive into why scraping raw ANSI escape sequences from virtual terminal panes fails for AI agents, and how tailing structured audit logs yields 100% clean Markdown."
author: "Crescenzo Esposito"
---

## The Pitfall of Scraping Terminal Screens

When integrating autonomous terminal agents into third-party messaging interfaces, the most intuitive path is terminal scraping: using utilities like `tmux capture-pane -p` to periodically grab the visible terminal buffer.

However, in production environments with AI coding assistants (such as Google Antigravity), screen-scraping rapidly degenerates:

1. **Dirty VT100 / ANSI Escape Codes**: ANSI color codes, cursor repositioning sequences (`\x1B[2K`, `\x1B[1A`), and progress bar overwrites corrupt output text.
2. **Buffer Splitting & Wrap Truncation**: When agents emit 400-line code blocks or diffs, tmux line wrapping breaks syntax highlighting and slices words across terminal column boundaries.
3. **Scroll Artifacts & Race Conditions**: If an interactive user or another script scrolls the pane, the scraper captures historical buffer snapshots instead of the active execution stream.

---

## The Solution: Structured Audit Transcript Watcher

Google Antigravity natively produces an append-only JSONL log for every conversation step at:
`<appDataDir>/brain/<conversation-id>/.system_generated/logs/transcript.jsonl`

Each line contains a serialized JSON event documenting the exact planner state:
- `PLANNER_RESPONSE` (reasoning steps, tool executions, user-facing output)
- `tool_calls` (structured parameters: `CommandLine`, `TargetFile`, `toolAction`)
- `status` and `thinking` tokens

### Asynchronous Turn Watcher Implementation

Rather than capturing the terminal, `agy-telegram` attaches an asynchronous stream tailer (`TranscriptWatcher`) directly to the active session's transcript file:

```python
async def watch_turn(
    self,
    transcript_path: Path,
    start_line: int,
    on_status: Callable[[str], Coroutine[Any, Any, None]],
    on_final: Callable[[str], Coroutine[Any, Any, None]],
    timeout_seconds: int = 300,
):
    current_line_idx = start_line
    last_status_sent = ""

    while elapsed < timeout_seconds:
        await asyncio.sleep(0.3)
        # Read newly appended JSONL records
        lines = read_new_lines(transcript_path, current_line_idx)
        
        for line in lines:
            record = json.loads(line)
            rec_type = record.get("type")
            content = record.get("content")
            tool_calls = record.get("tool_calls")
            
            if tool_calls:
                # Granular metadata extraction without ANSI noise
                action = extract_tool_action(tool_calls)
                await on_status(f"⚡ <b>Azione:</b> {action}")
                
            elif content:
                # 100% clean Markdown ready for rich Telegram HTML rendering
                await on_final(content)
                return
```

---

## Architectural Comparison

| Dimension | ANSI Terminal Screen Scraping | Structured JSONL Watcher |
| :--- | :--- | :--- |
| **Output Cleanliness** | Corrupted by escape chars and VT100 control sequences | 100% pristine Markdown and code blocks |
| **Code Block Integrity** | Broken by terminal width wrapping | Preserved intact with language identifiers |
| **State Granularity** | Hard to distinguish reasoning vs execution | Explicit separation of `thinking`, `tool_calls`, and `content` |
| **CPU Overhead** | High (frequent `capture-pane` shell subprocesses) | Minimal (asynchronous filesystem tailing) |
| **Mobile Parsing Reliability** | Poor (frequent Markdown parse crashes) | High (deterministic Telegram HTML sanitizer) |

---

## Preserving Rich Formatting on Mobile

By intercepting clean Markdown directly from the structured stream, `agy-telegram` can parse and convert complex formatting into compliant Telegram HTML:
- `<pre><code class="language-python">` for language-aware syntax highlighting
- `<blockquote expandable>` for extensive reasoning traces
- Smart text chunking respecting tag boundaries to prevent message truncation

Explore the full implementation in the [GitHub Repository](https://github.com/kappino/agy-telegram).
