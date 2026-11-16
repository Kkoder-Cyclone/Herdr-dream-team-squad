# Herdr Dream Team Squad

![License](https://img.shields.io/badge/license-MIT-green) ![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue) ![Herdr](https://img.shields.io/badge/herdr-TUI-orange) [🇷🇺 Русский](README.md)

**Dream Team Squad** is a four-agent team for Herdr TUI, assembled per the [herdr-setup skill](https://github.com/Kkoder-Cyclone/Herdr-skill-setup):

- **Mayak** (Claude) — lead: goal, plan, routing, acceptance;
- **Hermes** (Hermes) — deputy: audit, review, coordination;
- **Forge** (OpenCode) — heavy code and servers;
- **Grok** (Grok) — bridge: fast research, drafts, relay.

Route: **user → Mayak → Hermes → Forge / Grok → Mayak → user**.

Verified stack: **Herdr TUI**.

## Commands

```
a dream all                    # raise all four
a dream mayak                  # Mayak only
a dream check                  # statuses
a dream mayak <project-dir>    # run in a project folder
```

Idempotent: a live agent reports "already running", no duplicates.

## What's inside

| File | Purpose |
|---|---|
| `docs/ARCHITECTURE.md` | Roles, route, Git cycle |
| `docs/SETUP.md` | Step-by-step assembly with screenshots |
| `agents/` | Workspaces: mayak, veter, forge, iskra |
| `examples/wrappers/` | Working engine dream.js + dream.cmd |
| `screenshots/` | Screenshots (TUI only) |

## License

[MIT](LICENSE)
