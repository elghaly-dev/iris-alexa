# Iris for Alexa+ — Devpost text

Amazon Developer Hackathon, Alexa+ track. Deadline: Oct 23.
Repo: https://github.com/elghaly-dev/iris-alexa (MIT)
YouTube link: pending

**Simulation (read this first):** We did not test on a retail Alexa+ device. The voice experience is shown on a **simulated Alexa+ page at `/sim` — not a real Alexa device** (no Amazon or Alexa logos or sounds). The page and server source are in this public repo so judges can run the same calls locally.

---

## Project name
Iris for Alexa+

## Tagline
Ask whether a crypto message is a scam. Iris checks the words, the link, or a public Solana transaction. Read-only. It never touches your wallet.

## Inspiration
People often get a DM or link when they are away from a desk: “Is this real?” Iris started as a browser page that sends nothing to us. For Alexa+, the same checks sit behind a self-hosted MCP server, with every answer written to be spoken aloud.

## What it does
Iris is a self-hosted, read-only MCP server with five tools:

- **check_scam:** you describe what happened or read out the message. Fixed rules cover nine patterns: seed-phrase request, fake support DM, fake airdrop, doubling giveaway, unlimited approval, authority change, an urgent "verify wallet" link, "validate or be deactivated", and a QR code to scan with the wallet. Iris answers with a verdict, the reason, and next steps.
- **check_link:** gives a verdict on a URL or domain without opening it: official, lookalike, punycode, lure words in the host, a reported host, or a short link it can't see through.
- **explain_transaction:** takes a public Solana signature and returns the programs, findings and balance changes in plain words. It makes one call to a public RPC.
- **safety_tip:** one short reminder on general safety, seed phrases, links, approvals, support or QR codes.
- **clean_up_steps:** a checklist you follow yourself on an iPhone, an Android phone or a wallet.

Each result carries a short `summary` written to be spoken.

What Iris refuses, in one fixed shape:
- a pasted 12- or 24-word seed phrase, refused before any rule reads it;
- price or buy/sell questions;
- requests to connect, sign in with, sign or approve anything with a wallet.

A clean result says "This is not a clearance."

## How we built it
- **Server:** TypeScript on Node 22, using the official MCP TypeScript SDK (`@modelcontextprotocol/server` and `@modelcontextprotocol/node`) over Streamable HTTP, spec 2025-11-25. Zod schemas for every tool input.
- **Decoder:** the transaction decoder is the same one the Iris web page uses (`sol-decode.js`).
- **`/mcp` endpoint, hardened:** Host and Origin checks; 405 for GET and DELETE; 406 unless Accept lists both `application/json` and `text/event-stream`; 400 for an unknown `MCP-Protocol-Version`; 415 for a non-JSON body, 413 over 64 KB; 202 for `notifications/initialized`; every error body is fixed text.
- **Privacy:** the server stores no tool inputs and does not log them. Error logs may record just the error kind. Privacy and terms are served at `/privacy` and `/terms`.
- **Structured results:** every tool declares an `outputSchema` and returns `structuredContent` next to the same JSON as text.
- **Simulated host:** `/sim` posts the same JSON-RPC a host sends, shows the spoken `summary`, optional browser speech, hold-to-talk via Web Speech API, and a deterministic router (`sim/route.js`, no model).
- **Tests:** 276 unit tests plus `npm run conformance` (13 Streamable HTTP rules against a running server).

## What changed since Aug 31, 2026

| When | What |
|------|------|
| Sep 12 | New repo: self-hosted Streamable HTTP MCP server (spec 2025-11-25), five read-only tools. |
| Sep–Oct | Hardened `/mcp` (Host, Origin, Accept, protocol version, size limits, fixed error bodies). |
| Oct 11 | Privacy and terms pages; `outputSchema` / `structuredContent` on all tools; `npm run conformance`; spoken follow-ups on `/sim` (“what now?”, “say that again”, “stop”). |
| Oct 12 | Devpost pack: simulation wording on `/sim`, privacy/terms contact and effective dates, demo video script; fixture README example uses a lookalike domain. |

## Challenges we ran into
- **Two kinds of error.** A tool can fail inside a normal result, or the request can fail as JSON-RPC. The sim page had to show both as errors, not as a “no pattern” verdict.
- **Answers arrive as an event stream.** Streamable HTTP can send tool results as SSE frames; clients must parse both shapes.
- **Writing for the ear.** We added a one-sentence `summary` to every result and kept safety tips short enough to say in one breath.

## Accomplishments that we're proud of
- No code path can sign, send, connect or approve.
- A pasted seed phrase is refused before any rule reads it; it is not sent to the RPC, stored, or logged.
- 276 tests and 13 conformance rules pass, plus a banned-word check on README, source, tests, and sim.

## What we learned
- Streamable HTTP is small but exact: Accept, status codes, `202` for notifications, and protocol version all matter.
- For voice, the spoken sentence matters as much as the data behind it.
- A clean result must say plainly that it isn't a clearance.

## What's next for Iris
- Connect to a real Alexa+ host and test by voice when access is available.
- Rules in more languages (today other languages may get `no_known_pattern`, which is not a clearance).

## Built with
TypeScript, Node.js, Model Context Protocol (Streamable HTTP), Zod, tsx, Solana JSON-RPC, optional self-hosting (no AWS required for the demo)

## Try it (local, no billing)
```bash
git clone https://github.com/elghaly-dev/iris-alexa.git
cd iris-alexa && npm install && npm start
# Simulated Alexa+ page (not a real device): http://127.0.0.1:3000/sim
# MCP endpoint:                         http://127.0.0.1:3000/mcp
# Privacy / terms:                      http://127.0.0.1:3000/privacy  and  /terms
```

In a second terminal, with the server running:
```bash
npm run conformance
npm test
```

You can also point MCP Inspector at `http://127.0.0.1:3000/mcp` (Streamable HTTP, spec 2025-11-25).

## Note for judges
This submission is a **simulated Alexa+ experience** with source included. Tested with MCP Inspector and `/sim`, not on a retail Alexa+ device. Iris gives no financial, legal or medical advice, stores no personal data, and takes no payments. Builder: **Wyndham Heaven**, brand **elghaly**.
