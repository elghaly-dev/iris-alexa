import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { followUp, route } from "../sim/route.js";

const SIG88 = "1".repeat(88);
const SIG87 = "2".repeat(87);
const SEED = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

describe("utterance router", () => {
  it("sends a URL to check_link", () => {
    assert.deepEqual(route("https://phantom.com/claim."), {
      name: "check_link",
      arguments: { url: "https://phantom.com/claim" },
    });
  });

  it("sends a bare domain to check_link", () => {
    assert.deepEqual(route("is phanton.app a real site"), {
      name: "check_link",
      arguments: { url: "phanton.app" },
    });
  });

  it("sends a short link to check_link", () => {
    assert.deepEqual(route("check bit.ly/free-sol"), {
      name: "check_link",
      arguments: { url: "bit.ly/free-sol" },
    });
  });

  it("sends a www host to check_link", () => {
    assert.deepEqual(route("www.solflare.com"), {
      name: "check_link",
      arguments: { url: "www.solflare.com" },
    });
  });

  it("hears a spoken domain as check_link", () => {
    assert.deepEqual(route("is phantom dot com official"), {
      name: "check_link",
      arguments: { url: "phantom.com" },
    });
  });

  it("prefers a URL over a tip and over a signature", () => {
    assert.equal(route(`tip me about https://solscan.io/tx/${SIG88}`).name, "check_link");
    assert.equal(route(`tip me about https://solscan.io/tx/${SIG88}`).arguments.url, `https://solscan.io/tx/${SIG88}`);
  });

  it("sends an 88-character base58 signature to explain_transaction", () => {
    assert.deepEqual(route(`what did this signature do ${SIG88}`), {
      name: "explain_transaction",
      arguments: { signature: SIG88 },
    });
  });

  it("sends an 87-character base58 signature to explain_transaction", () => {
    assert.deepEqual(route(SIG87), {
      name: "explain_transaction",
      arguments: { signature: SIG87 },
    });
  });

  it("prefers a signature over clean-up words", () => {
    assert.deepEqual(route(`clean up my wallet ${SIG87}`), {
      name: "explain_transaction",
      arguments: { signature: SIG87 },
    });
  });

  it("does not treat a shorter or longer token as a signature", () => {
    assert.equal(route("3".repeat(86)).name, "check_scam");
    assert.equal(route("4".repeat(89)).name, "check_scam");
    assert.equal(route("0".repeat(88)).name, "check_scam");
  });

  it("maps a bare tip to safety_tip general", () => {
    assert.deepEqual(route("give me a tip"), {
      name: "safety_tip",
      arguments: { topic: "general" },
    });
  });

  it("maps remind me plus a topic", () => {
    assert.deepEqual(route("remind me about seed phrases"), {
      name: "safety_tip",
      arguments: { topic: "seed_phrase" },
    });
    assert.equal(route("safety tip on links").arguments.topic, "links");
    assert.equal(route("remind me about approvals").arguments.topic, "approvals");
    assert.equal(route("a tip about qr codes").arguments.topic, "qr_codes");
    assert.equal(route("tip on a qr code").arguments.topic, "qr_codes");
    assert.equal(route("remind me about support").arguments.topic, "support");
  });

  it("maps clean up and I got hacked onto a device", () => {
    assert.deepEqual(route("clean up my iphone"), {
      name: "clean_up_steps",
      arguments: { target: "iphone" },
    });
    assert.deepEqual(route("I got hacked on android"), {
      name: "clean_up_steps",
      arguments: { target: "android" },
    });
    assert.deepEqual(route("please clean-up the wallet"), {
      name: "clean_up_steps",
      arguments: { target: "wallet" },
    });
    assert.equal(route("clean up my i phone").arguments.target, "iphone");
    assert.equal(route("clean up my wallet and then my iphone").arguments.target, "wallet");
  });

  it("leaves clean-up with no device on check_scam", () => {
    assert.deepEqual(route("clean up"), { name: "check_scam", arguments: { situation: "clean up" } });
    assert.equal(route("I got hacked").name, "check_scam");
    assert.equal(route("someone told me to reconnect my wallet").name, "check_scam");
  });

  it("sends everything else to check_scam", () => {
    assert.deepEqual(route("they said reply with your seed phrase to claim the airdrop"), {
      name: "check_scam",
      arguments: { situation: "they said reply with your seed phrase to claim the airdrop" },
    });
    assert.deepEqual(route("  hello  "), { name: "check_scam", arguments: { situation: "hello" } });
  });

  it("sends a seed phrase to check_scam so the server can refuse it", () => {
    const call = route(SEED);
    assert.equal(call.name, "check_scam");
    assert.equal(call.arguments.situation, SEED);
    assert.equal(Object.hasOwn(call, "refused"), false);
    assert.equal(Object.hasOwn(call.arguments, "refused"), false);
  });
});

describe("spoken follow-ups", () => {
  const afterLink = { tool: "check_link" as const, spoken: "Stop. That is a lookalike of Phantom." };
  const afterCleanup = { tool: "clean_up_steps" as const, target: "iphone", spoken: "Open Settings." };

  it("'what now?' after a check gives the wallet clean-up steps", () => {
    for (const said of ["what now?", "What now", "okay, what should I do now?", "now what", "what do I do"]) {
      assert.deepEqual(followUp(said, afterLink), { kind: "call", call: { name: "clean_up_steps", arguments: { target: "wallet" } } }, said);
    }
  });

  it("'what now?' after clean-up steps keeps the same device", () => {
    assert.deepEqual(followUp("what next?", afterCleanup), { kind: "call", call: { name: "clean_up_steps", arguments: { target: "iphone" } } });
  });

  it("'say that again' repeats and 'stop' stops", () => {
    assert.deepEqual(followUp("say that again", afterLink), { kind: "repeat" });
    assert.deepEqual(followUp("Repeat that.", afterLink), { kind: "repeat" });
    assert.deepEqual(followUp("stop", afterLink), { kind: "stop" });
    assert.deepEqual(followUp("never mind", null), { kind: "stop" });
  });

  it("needs a previous answer before repeating or 'what now?'", () => {
    assert.equal(followUp("say that again", null), null);
    assert.equal(followUp("what now?", null), null);
  });

  it("a longer message that contains those words is a new question, not a follow-up", () => {
    for (const said of [
      "Stop! Your wallet will be deactivated, what now? Click phantom-verify.app",
      "they said repeat your seed phrase to support",
      "what should I do about this airdrop claim link",
    ]) {
      assert.equal(followUp(said, afterLink), null, said);
    }
  });
});
