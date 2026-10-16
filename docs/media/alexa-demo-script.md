# Iris for Alexa+: demo video script

This is the script for the Alexa+ demo video. `iris-demo.mp4` in this folder is the Iris Desk Voice phone-app video, not the Alexa+ demo.

```
IRIS FOR ALEXA+ — DEMO (target 2:45, hard limit 3:00)
0:00–0:15  Title: "Iris for Alexa+". Caption: "AI voice. Simulated Alexa+ host."
  VO: "A message says your wallet will be shut off unless you verify it now. Is it real? Iris answers out loud, and it never touches your wallet."
0:15–0:50  Simulated Alexa+ page (npm run sim). Type or speak:
  "Someone in a direct message says they're support and asks for my recovery phrase."
  Iris (check_scam): verdict, reason, next steps, spoken.
  Follow-up: "What now?" → next steps again, shorter.
0:50–1:20  "Is phantom-app dot support safe?"
  Iris (check_link): lookalike domain. Caption: "Iris never opens the link."
1:20–1:55  Paste a public Solana signature.
  Iris (explain_transaction): programs, findings and balance changes in plain words. Caption: "One read-only call to a public RPC."
1:55–2:25  Under the hood: terminal.
  npm run conformance → 13 of 13 Streamable HTTP rules pass.
  Caption: "No private key. No signing code. Stores nothing. Logs no arguments."
2:25–2:45  Close: repo link github.com/elghaly-dev/iris-alexa (MIT).
  VO: "Iris for Alexa+, by Wyndham Heaven at elghaly. Ask before you click."
Rules: follow the repo banned-words list; no messaging-app name; no country or city; every spoken claim must match what the code does.
```
