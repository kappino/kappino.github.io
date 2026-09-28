---
title: "Building an Open-Source Mobile Cockpit for Google Antigravity"
date: "2026-09-28"
category: "Systems & Security"
tags: ["Google Antigravity", "Python", "Telegram", "AsyncIO", "DevOps", "Open Source"]
excerpt: "How we engineered a secure, zero-attack-surface mobile gateway and terminal mirror for Google Antigravity using Python AsyncIO, Tmux buffers, and Human-in-the-Loop approval."
author: "Crescenzo Esposito"
---

## The Problem: The Mobile Divide in Autonomous AI Sysadmins

Autonomous AI coding and sysadmin agents—such as **Google Antigravity (`agy`)**—are transforming infrastructure operations. From running bash diagnostics to refactoring full-stack repositories, having an agent resident in your homelab or cloud hypervisor enables continuous automated workflow execution.

However, operating these agents from a mobile device has historically presented a painful compromise:
1. **Raw Mobile SSH**: Terrible on-screen keyboard UX, frequent terminal disconnects, and unreadable ANSI escape codes when viewing diffs on a phone.
2. **Insecure Web Wrappers**: Exposing a web GUI requires opening inbound ports or running insecure reverse proxies directly to execution-privileged daemons.
3. **Loss of Interactivity**: Most webhook bots only allow fire-and-forget prompts, lacking the ability to handle interactive Human-in-the-Loop approvals when the agent attempts sensitive operations (e.g., `rm -rf`, `systemctl`, `iptables`).

To solve this, we engineered **[agy-telegram](https://github.com/kappino/agy-telegram)**: an open-source, production-ready mobile cockpit designed for 1-to-1 secure orchestration.

---

## High-Level System Architecture

`agy-telegram` acts as an asynchronous bi-directional bridge between Telegram's messaging cloud and the local Antigravity runtime hosted inside a Linux container.

```mermaid
flowchart TD
    subgraph Mobile
        TG[Telegram Mobile App]
    end

    subgraph Host Infrastructure (Linux / Proxmox CT)
        subgraph agy-telegram Daemon
            BOT[Telegram Bot Core (python-telegram-bot)]
            TW[JSONL Transcript Watcher]
            TM[Tmux Mirror Engine]
            SENTINEL[Unix Socket Sentinel Server]
        end

        subgraph Local Agent Environment
            TMUX[Tmux Session: aegis:0.0]
            AGY[Antigravity CLI (agy)]
            AUDIT[transcript.jsonl Audit Log]
        end
    end

    TG <-->|HTTPS Outbound Long Polling| BOT
    BOT <-->|Instant Tmux Buffer Injection| TM
    TM <-->|Bidirectional PTY I/O| TMUX
    TMUX <--> AGY
    AGY -->|Structured Stream| AUDIT
    AUDIT -->|Async Tail Stream| TW
    TW -->|Live Status & Clean HTML| BOT
    SENTINEL -->|Proactive Alerts| BOT
```

---

## 3 Core Engineering Breakthroughs

### 1. Zero Inbound Attack Surface & Strict 1-to-1 Whitelist
Instead of exposing incoming webhooks or opening ports on your firewall, `agy-telegram` relies strictly on outbound HTTPS long-polling (`getUpdates`). 

At the application gateway layer, any packet originating from an unapproved Telegram User ID is dropped silently before entering any message processing pipeline:

```python
def is_authorized(self, update: Update) -> bool:
    if not update.effective_user:
        return False
    user_id = update.effective_user.id
    if user_id not in self.config.telegram.allowed_users:
        logger.warning(f"Unauthorized access dropped: {user_id}")
        return False
    return True
```

### 2. Instant Prompt Ingestion: Eliminating Typing Latency
Initial prototypes relied on `tmux send-keys -l "<prompt>"`, which emulated keyboard input character-by-character. For 1,000-word engineering prompts, this created several seconds of noticeable lag.

We resolved this by writing the prompt directly into a temporary Tmux copy buffer and invoking `paste-buffer`:

```python
async def send_input(self, text: str, press_enter: bool = True):
    # Set internal tmux buffer instantly
    proc_buf = await asyncio.create_subprocess_exec("tmux", "set-buffer", "-b", "agy_input", text)
    await proc_buf.wait()

    # Paste buffer into the target console with 0ms latency
    proc_paste = await asyncio.create_subprocess_exec("tmux", "paste-buffer", "-b", "agy_input", "-t", self.target)
    await proc_paste.wait()

    if press_enter:
        proc_enter = await asyncio.create_subprocess_exec("tmux", "send-keys", "-t", self.target, "Enter")
        await proc_enter.wait()
```

### 3. Unified Dynamic Message UX with Interactive Approvals
Rather than flooding the Telegram chat with ephemeral status notifications, `agy-telegram` creates a **single message** per turn:
1. It initiates with `💭 Elaborazione in corso...`.
2. As the agent triggers tools, it edits the message in place showing high-level actions (`⚡ Azione: <summary>`) and compact code previews (`<pre><code>...</code></pre>`).
3. If the agent reaches a security gate requiring permission, the status message morphs *in-place* into an interactive prompt with `[ ✅ Approva ]` and `[ ❌ Rifiuta ]` inline buttons.
4. Once the final turn output is compiled, the status message is cleanly deleted, leaving only the pristine, syntax-highlighted response.

---

## Proactive Alerts via Unix Domain Socket

In addition to handling incoming queries, `agy-telegram` provides a local CLI utility, `agy-notify`, allowing system monitors, cron jobs, and SIEM platforms (like Splunk or Fail2ban) to push instant notifications directly to Telegram:

```bash
# Push alert from a security monitoring script
agy-notify --level alert \
           --title "Splunk SIEM Alert" \
           --message "Brute force attack detected on CT 120 (Storage Hub). Threshold exceeded: 15 failed logins in 60s."
```

---

## Conclusion & Open-Source Availability

`agy-telegram` demonstrates that mobile infrastructure management does not require compromising between speed, security, and developer ergonomics. 

The full codebase, including Systemd service configurations and unit tests, is available on GitHub under the MIT License:
👉 **[kappino/agy-telegram](https://github.com/kappino/agy-telegram)**
