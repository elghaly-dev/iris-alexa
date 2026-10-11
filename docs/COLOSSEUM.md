# Iris Desk Voice — Colosseum Solana World’s Fair

**Track:** Solana / Crypto World’s Fair  
**Main entry:** **Iris Desk Voice** (web app) — https://github.com/elghaly-dev/elghaly-35-voice  
Iris helps people understand suspicious wallet messages and decide what to do next, without connecting a wallet.  
**Companions:** iris-mobile (Android voice app) and iris-alexa (this repo, read-only safety triage over MCP).  
**Public person:** Wyndham Heaven · **Company:** elghaly · **Site:** https://elghaly.dev  

## Repos

| Piece | Repo | Notes |
|-------|------|--------|
| **Iris Desk Voice web app (main entry)** | https://github.com/elghaly-dev/elghaly-35-voice | Paste a message or link, get a status, the evidence and the next step. Runs in the browser; no wallet connect. Voice desk with a text mode. App: https://iris-desk-voice.onrender.com |
| Android voice app (companion) | https://github.com/Alarm2024/iris-mobile | APK **[v0.1.0](https://github.com/Alarm2024/iris-mobile/releases/tag/v0.1.0)**; devnet by default; every send shown on a card and signed in Phantom or Solflare; never holds a key |
| Safety triage over MCP (companion) | https://github.com/elghaly-dev/iris-alexa | Read-only: link check, transaction explain, scam patterns, cleanup steps. No wallet, no keys |
| Web triage page | https://iris-35.elghaly.dev | Read-only; public RPC; no wallet connect, no keys |

## What judges should open

1. **App:** https://iris-desk-voice.onrender.com (Render free plan: the first load after idle can take 30 to 60 seconds; `/api/health` shows the server state)  
2. **Main repo:** https://github.com/elghaly-dev/elghaly-35-voice — pitch in `docs/PITCH.md`, demo in `docs/DEMO-COLOSSEUM.md`, what is new since 2026-10-10 in `CHANGELOG.md`  
3. **Companion, Android:** https://github.com/Alarm2024/iris-mobile and its v0.1.0 APK  
4. **Companion, MCP:** this repo — run locally, then open `/sim` (text box always works)  

## Honest scope

**Iris Desk Voice (web app, main entry)**  
- Three statuses: known malicious, suspicious, unknown. It never says "safe".  
- The check runs in the page: nothing pasted is sent, links are shown as text and never opened, and no wallet connects. Pasted recovery words get "Stop" and the box is cleared.  
- Tested on 25 synthetic messages: 10 of 10 scams detected, 1 false positive out of 10 normal messages (see `docs/FIXTURES.md` in that repo). No user study yet.  
- Voice audio goes to AssemblyAI, and the page says so before the mic turns on. Text mode sends nothing.  

**iris-mobile (companion)**  
- Android voice app for a Solana wallet: devnet by default, every send shown on a card and signed in the wallet app (Mobile Wallet Adapter). Never handles private keys.  

**iris-alexa (companion)**  
- Read-only MCP + `/sim` stand-in for an MCP host. Does **not** claim to run on a real Alexa+ device.  
- No Amazon / Alexa logos or sounds.  
- Seed phrases are refused by the server; tooling is read-only and safety-oriented.  

## Media

- **Main entry pitch and demo:** record from `docs/PITCH.md` (about 2:45) and `docs/DEMO-COLOSSEUM.md` (about 2:40) in elghaly-35-voice, upload Unlisted, and paste the links here and in the Colosseum form.  
- **Companion (iris-mobile) videos:** demo https://youtu.be/fj_CTDCyNsc · pitch https://youtu.be/8mVTWrI32zQ · app demo file https://github.com/Alarm2024/iris-mobile/releases/tag/demo-video  

Copies of the companion videos are under `docs/media/` (`iris-demo.mp4`, `iris-pitch.mp4`; scripts in `demo-script.md`, `pitch-script.md`).

## Checklist before submit (deadline Tue Oct 13, 06:59 UTC)

- [ ] Main repo in the Colosseum form: elghaly-35-voice, with the app URL  
- [ ] New pitch and demo for the web app recorded, Unlisted, links pasted  
- [ ] Open `/api/health` a minute before judging so the free instance is awake  
- [ ] Optional: iris-mobile and iris-alexa linked as companions, not as the main repo  
- [ ] Public times in **UTC only** on any post or event text  

## Related docs in-repo

- `docs/DEVPOST.md` — Alexa+ / Devpost narrative for iris-alexa  
- `docs/FRICTION_LOG.md` — build friction notes
