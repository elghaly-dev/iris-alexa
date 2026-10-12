import assert from "node:assert/strict";
import { get, type Server } from "node:http";
import { after, before, describe, it } from "node:test";
import { startServer, STATIC_PAGES } from "../src/http.js";

function fetchPage(port: number, path: string, method = "GET"): Promise<{ status: number; type: string; body: string }> {
  return new Promise((resolve, reject) => {
    const req = get({ host: "127.0.0.1", port, path, method }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve({ status: res.statusCode ?? 0, type: String(res.headers["content-type"] ?? ""), body }));
    });
    req.on("error", reject);
  });
}

describe("privacy and terms pages", () => {
  let server: Server;
  let port = 0;

  before(async () => {
    server = await startServer({ host: "127.0.0.1", port: 0, env: {} });
    const address = server.address();
    port = typeof address === "object" && address ? address.port : 0;
  });
  after(() => new Promise<void>((resolve) => server.close(() => resolve())));

  for (const path of ["/privacy", "/terms"]) {
    it(`GET ${path} serves the HTML page`, async () => {
      const r = await fetchPage(port, path);
      assert.equal(r.status, 200);
      assert.match(r.type, /^text\/html/);
      assert.match(r.body, /<title>[^<]+— Iris for Alexa\+<\/title>/);
      assert.match(r.body, /support@elghaly\.dev/);
      assert.match(r.body, /elghaly/);
    });
  }

  it("the pages say the sim page is simulated and Iris never takes a seed phrase", () => {
    for (const html of Object.values(STATIC_PAGES)) {
      assert.match(html, /simulated Alexa\+ page, not a real Alexa device/);
      assert.match(html, /seed phrase/);
    }
  });

  it("the pages carry no phone number, street address or messaging app", () => {
    for (const html of Object.values(STATIC_PAGES)) {
      const text = html.replace(/<[^>]+>/g, " ").replace(/\b\d{4}-\d{2}-\d{2}\b/g, "DATE");
      assert.doesNotMatch(text, /\+?\d[\d\s().-]{8,}\d/, "phone-like number");
      assert.doesNotMatch(text, /\b(street|st\.|road|avenue|suite|floor|p\.?o\.? box)\b/i, "street address");
      assert.doesNotMatch(text, /telegram|whatsapp|egypt|cairo|\bLLC\b/i);
    }
  });

  it("a page path with another method still gets no page", async () => {
    const r = await fetchPage(port, "/privacy", "POST");
    assert.notEqual(r.status, 200);
  });
});
