---
title: "Scraping ANSI vs Stream Strutturati JSONL nella Telemetria Remota di Agenti IA"
date: "2026-09-28"
category: "Architettura Asincrona"
tags: ["Google Antigravity", "Python", "AsyncIO", "JSONL", "Terminal", "DevOps"]
excerpt: "Un'analisi tecnica approfondita sul perché estrarre sequenze di escape ANSI grezze dai terminali fallisce con gli agenti IA, e come il monitoraggio di log di audit strutturati garantisca Markdown al 100% pulito."
author: "Crescenzo Esposito"
---

## Le Insidie dello Scraping dei Terminali

Quando si integrano agenti di terminale autonomi all'interno di interfacce di messaggistica terze (come Telegram), l'approccio più intuitivo è lo screen scraping: l'uso di utility di sistema come `tmux capture-pane -p` per catturare periodicamente il buffer visibile del terminale virtuale.

Tuttavia, in ambienti di produzione con assistenti di programmazione IA avanzati (come Google Antigravity), lo scraping dello schermo degenera rapidamente:

1. **Codici di Escape VT100 / ANSI Sporchi**: I codici colore ANSI, le sequenze di riposizionamento del cursore (`\x1B[2K`, `\x1B[1A`) e la sovrascrittura delle barre di avanzamento corrompono pesantemente il testo in uscita.
2. **Spezzamento dei Buffer e Troncamento da Line-Wrap**: Quando gli agenti emettono blocchi di codice da 400 righe o diff complessi, il wrapping delle colonne di tmux spezza l'evidenziazione della sintassi e taglia le parole sui confini del viewport.
3. **Artefatti di Scroll e Race Condition**: Se un utente interattivo o un processo concorrente scorre il pannello, lo scraper acquisisce istantanee storiche del buffer anziché lo stream di esecuzione attivo.

---

## La Soluzione: Watcher Asincrono dei Transcript di Audit

Google Antigravity produce nativamente un log di audit JSONL in modalità append-only per ogni singolo turno conversazionale:
`<appDataDir>/brain/<conversation-id>/.system_generated/logs/transcript.jsonl`

Ogni riga contiene un evento JSON serializzato che documenta con esattezza lo stato del planner:
- `PLANNER_RESPONSE` (passaggi di ragionamento, esecuzioni dei tool, output finale)
- `tool_calls` (parametri strutturati: `CommandLine`, `TargetFile`, `toolAction`)
- Token di `status` e `thinking`

### Implementazione dell'Asynchronous Turn Watcher

Anziché tentare di interpretare il terminale a caratteri, `agy-telegram` collega un tailer asincrono (`TranscriptWatcher`) direttamente al file di transcript della sessione attiva:

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
        # Legge i record JSONL appena aggiunti
        lines = read_new_lines(transcript_path, current_line_idx)
        
        for line in lines:
            record = json.loads(line)
            rec_type = record.get("type")
            content = record.get("content")
            tool_calls = record.get("tool_calls")
            
            if tool_calls:
                # Estrazione metadati granulari senza rumore ANSI
                action = extract_tool_action(tool_calls)
                await on_status(f"⚡ <b>Azione:</b> {action}")
                
            elif content:
                # Markdown puro pronto per il rendering HTML sicuro su Telegram
                await on_final(content)
                return
```

---

## Confronto Architetturale

| Dimensione | ANSI Terminal Screen Scraping | Watcher Strutturato JSONL |
| :--- | :--- | :--- |
| **Pulizia dell'Output** | Corrotta da caratteri di escape e sequenze VT100 | 100% Markdown puro e blocchi codice intatti |
| **Integrità dei Blocchi Codice** | Spezzata dal limite di colonne del terminale | Preservata intatta con identificatori di linguaggio |
| **Granularità dello Stato** | Difficile distinguere ragionamento ed esecuzione | Separazione esplicita tra `thinking`, `tool_calls` e `content` |
| **Overhead CPU** | Elevato (frequenti sottoprocessi shell `capture-pane`) | Minimo (tailing asincrono non bloccante su filesystem) |
| **Affidabilità di Parsing Mobile** | Bassa (frequenti crash del parser Telegram Markdown) | Massima (sanitizer deterministico verso HTML Telegram) |

---

## Preservare la Formattazione Avanzata su Mobile

Intercettando il Markdown strutturato direttamente dallo stream nativo, `agy-telegram` può convertire blocchi complessi nel subset HTML conforme di Telegram:
- `<pre><code class="language-python">` per syntax highlighting aware del linguaggio
- `<blockquote expandable>` per tracce di ragionamento estese
- Chunking intelligente del testo che rispetta i confini dei tag HTML per prevenire troncamenti

Esplora l'implementazione completa nel [Repository GitHub](https://github.com/kappino/agy-telegram).
