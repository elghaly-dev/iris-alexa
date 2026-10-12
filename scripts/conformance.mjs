#!/usr/bin/env node
// Streamable HTTP conformance check for a running Iris server (MCP spec 2025-11-25).
// Usage: npm run conformance [-- http://127.0.0.1:3000]
// Prints one row per rule and exits 1 if any rule fails. Sends no seed phrase and no
// secret: the seed-phrase rule uses the public BIP-39 test words.
import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";

const BASE = new URL(process.argv[2] ?? process.env.IRIS_URL ?? "http://127.0.0.1:3000");
const MCP = new URL("/mcp", BASE);
const VERSION = "2025-11-25";
const TEST_WORDS = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

function send({ method = "POST", path = MCP.pathname, headers = {}, body = "" } = {}) {
  const base = {
    host: MCP.host,
    "content-type": "application/json",
    accept: "application/json, text/event-stream",
    "mcp-protocol-version": VERSION,
  };
  const all = { ...base, ...headers };
  for (const [k, v] of Object.entries(all)) if (v === null) delete all[k];
  if (body) all["content-length"] = String(Buffer.byteLength(body));
  const request = MCP.protocol === "https:" ? httpsRequest : httpRequest;
  return new Promise((resolve, reject) => {
    const req = request({ hostname: MCP.hostname, port: MCP.port, path, method, headers: all }, (res) => {
      let text = "";
      res.setEncoding("utf8");
      res.on("data", (c) => (text += c));
      res.on("end", () => resolve({ status: res.statusCode ?? 0, headers: res.headers, body: text }));
    });
    req.on("error", reject);
    req.end(body);
  });
}

function rpcMessage(body) {
  const data = body.trimStart().startsWith("{") ? body : (body.match(/^data: (.*)$/m)?.[1] ?? "{}");
  return JSON.parse(data);
}

const rpc = (id, method, params) => JSON.stringify({ jsonrpc: "2.0", id, method, ...(params ? { params } : {}) });

const RULES = [
  ["initialize answers with spec " + VERSION, async () => {
    const r = await send({ body: rpc(1, "initialize", { protocolVersion: VERSION, capabilities: {}, clientInfo: { name: "conformance", version: "1" } }) });
    const m = rpcMessage(r.body);
    return r.status === 200 && m.result?.protocolVersion === VERSION ? true : `HTTP ${r.status}, version ${m.result?.protocolVersion}`;
  }],
  ["GET /mcp is 405 with Allow: POST", async () => {
    const r = await send({ method: "GET" });
    return r.status === 405 && /POST/.test(String(r.headers.allow)) ? true : `HTTP ${r.status}`;
  }],
  ["foreign Host header is 403", async () => {
    const r = await send({ headers: { host: "evil.example" }, body: rpc(2, "tools/list") });
    return r.status === 403 || `HTTP ${r.status}`;
  }],
  ["foreign Origin is 403", async () => {
    const r = await send({ headers: { origin: "https://evil.example" }, body: rpc(3, "tools/list") });
    return r.status === 403 || `HTTP ${r.status}`;
  }],
  ["Accept without text/event-stream is 406", async () => {
    const r = await send({ headers: { accept: "application/json" }, body: rpc(4, "tools/list") });
    return r.status === 406 || `HTTP ${r.status}`;
  }],
  ["unknown MCP-Protocol-Version is 400", async () => {
    const r = await send({ headers: { "mcp-protocol-version": "1999-01-01" }, body: rpc(5, "tools/list") });
    return r.status === 400 || `HTTP ${r.status}`;
  }],
  ["non-JSON Content-Type is 415", async () => {
    const r = await send({ headers: { "content-type": "text/plain" }, body: rpc(6, "tools/list") });
    return r.status === 415 || `HTTP ${r.status}`;
  }],
  ["invalid JSON is 400", async () => {
    const r = await send({ body: "{not json" });
    return r.status === 400 || `HTTP ${r.status}`;
  }],
  ["a JSON-RPC batch is refused on " + VERSION, async () => {
    const r = await send({ body: `[${rpc(7, "tools/list")}]` });
    return r.status === 400 || `HTTP ${r.status}`;
  }],
  ["a body over 64 KB is 413", async () => {
    const r = await send({ body: rpc(8, "tools/call", { name: "check_scam", arguments: { situation: "a".repeat(70 * 1024) } }) });
    return r.status === 413 || `HTTP ${r.status}`;
  }],
  ["tools/list: 5 read-only tools, each with an outputSchema", async () => {
    const r = await send({ body: rpc(9, "tools/list") });
    const tools = rpcMessage(r.body).result?.tools ?? [];
    const bad = tools.filter((t) => t.annotations?.readOnlyHint !== true || !t.outputSchema).map((t) => t.name);
    return tools.length === 5 && bad.length === 0 ? true : `${tools.length} tools, not ok: ${bad.join(", ") || "-"}`;
  }],
  ["a check returns structuredContent equal to the text block", async () => {
    const r = await send({ body: rpc(10, "tools/call", { name: "check_link", arguments: { url: "phantom-app.support" } }) });
    const res = rpcMessage(r.body).result ?? {};
    const same = res.content?.[0]?.text && JSON.stringify(JSON.parse(res.content[0].text)) === JSON.stringify(res.structuredContent);
    return same && typeof res.structuredContent?.summary === "string" ? true : "structuredContent missing or different";
  }],
  ["a pasted seed phrase is refused and not echoed", async () => {
    const r = await send({ body: rpc(11, "tools/call", { name: "check_scam", arguments: { situation: TEST_WORDS } }) });
    const res = rpcMessage(r.body).result ?? {};
    return res.isError === true && res.structuredContent?.refused === true && !r.body.includes(TEST_WORDS) ? true : "not refused, or echoed";
  }],
];

let failed = 0;
console.log(`Iris conformance against ${MCP.href}\n`);
console.log("| Result | Rule | Detail |\n| --- | --- | --- |");
for (const [name, check] of RULES) {
  let outcome;
  try {
    outcome = await check();
  } catch (error) {
    outcome = `error: ${error instanceof Error ? error.message : error}`;
  }
  if (outcome !== true) failed++;
  console.log(`| ${outcome === true ? "pass" : "FAIL"} | ${name} | ${outcome === true ? "" : outcome} |`);
}
console.log(`\n${RULES.length - failed} of ${RULES.length} rules pass.`);
process.exit(failed ? 1 : 0);
