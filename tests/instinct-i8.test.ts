import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkScam } from "../src/scam.js";
import { INSTINCT_MUST_FLAG, INSTINCT_MUST_NOT_FLAG } from "./fixtures/instinct-i8.js";

describe("Instinct phrase table (I-8): must flag", () => {
  assert.equal(INSTINCT_MUST_FLAG.length, 20);
  for (const sample of INSTINCT_MUST_FLAG) {
    it(`${sample.id} flags as ${sample.pattern}`, () => {
      const report = checkScam(sample.line);
      assert.equal(report.verdict, "scam", `${sample.id}: ${sample.line.slice(0, 60)}`);
      assert.ok(
        [report.pattern, ...report.also_matched].includes(sample.pattern),
        `${sample.id}: expected ${sample.pattern}, got ${report.pattern}`,
      );
      assert.ok(sample.source.length > 0, sample.id);
    });
  }
});

describe("Instinct phrase table (I-8): must not flag", () => {
  assert.equal(INSTINCT_MUST_NOT_FLAG.length, 50);
  for (const sample of INSTINCT_MUST_NOT_FLAG) {
    it(`${sample.id} stays no_known_pattern`, () => {
      const report = checkScam(sample.line);
      assert.equal(report.verdict, "no_known_pattern", `${sample.id}: ${sample.line.slice(0, 60)}`);
      assert.equal(report.pattern, null, sample.id);
    });
  }
});
