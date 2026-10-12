# Iris for Alexa+ — demo video script (≤ 2:45)

**Total time:** about 2 minutes 40 seconds. **Hard cap:** 2:45.

**On-screen rules for every shot:** show the banner **“Simulated Alexa+ page — not a real Alexa device”** at the top of `/sim`. No API keys, `.env`, seed phrases, wallet addresses you control, or personal contact details on screen. Use placeholder URLs and public example text only.

**Voice:** your voice or a labeled AI voice. First spoken line says this is a simulation.

---

## Shot list and lines

| # | Time | Shot | Spoken line |
|---|------|------|-------------|
| 1 | 0:00–0:12 | Title card: **Iris for Alexa+**, subtitle **Simulated demo — not Amazon Alexa**, repo name `elghaly-dev/iris-alexa`, MIT. | “This is Iris for Alexa+, a simulated Alexa Plus style demo for the Amazon Developer Hackathon. It is not a real Alexa device, and the full source is public on GitHub.” |
| 2 | 0:12–0:28 | Browser: `npm install` and `npm start` in a terminal (env vars hidden). Cut to `http://127.0.0.1:3000/sim` with the **simulated** banner visible. | “You clone the repo, install, and start the server locally. No AWS billing is required. The sim page sends the same MCP calls a host would send to slash mcp.” |
| 3 | 0:28–0:55 | Type a synthetic scam line in the box (example: “Reply with your 24 word phrase to verify your wallet”). Tap **check_scam**. Show spoken summary and verdict **scam**; optionally expand **raw result** briefly. | “Ask whether a message is a scam. Iris runs fixed rules, returns a verdict, and a short summary meant to be read aloud. A pasted seed phrase is refused on the server before any rule reads it.” |
| 4 | 0:55–1:18 | **check_link** with `phantom.com.attacker.example` (or similar lookalike). Show **scam** / lookalike result. | “For links, Iris judges the hostname without opening the page. Official domains, lookalikes, and reported hosts each get a clear verdict.” |
| 5 | 1:18–1:38 | Hold **hold to talk** (or type): “what now?” after the scam answer. Show follow-up clean-up steps or repeat. | “The sim page supports simple follow-ups like ‘what now’ and ‘say that again’, the way a voice assistant might.” |
| 6 | 1:38–1:58 | Terminal: second window `npm run conformance`; scroll the **13 of 13 rules pass** table. | “Two hundred seventy-six unit tests and thirteen Streamable HTTP conformance checks guard the MCP endpoint, headers, and structured results.” |
| 7 | 1:58–2:18 | Quick montage: `/privacy` and `/terms` in browser; highlight **Effective date** and **simulated Alexa+ page** wording. | “Privacy and terms pages ship with the server. Iris stores no tool inputs and does not log what you send.” |
| 8 | 2:18–2:40 | End card: GitHub link, **Simulated demo**, **Wyndham Heaven · elghaly**, hackathon name. | “Iris is read-only: no wallet connect, no signing, no payments. This was a simulation built with open tools and MCP. Thank you.” |

---

## B-roll checklist

- [ ] Simulated banner visible in every `/sim` clip  
- [ ] No secrets in terminal history or browser fields  
- [ ] Under 3:00 total runtime (target 2:40)  
- [ ] Source repo URL on end card  
