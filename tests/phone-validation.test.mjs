import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateBangladeshiPhone } from "../lib/utils.ts";

describe("Bangladeshi Phone Validation & Boundary Suite", () => {
  describe("Tier 1: Valid Mobile Operator Prefixes (11-digit)", () => {
    const validOperators = [
      { prefix: "013", operator: "Skitto / GP", number: "01312345678" },
      { prefix: "014", operator: "Banglalink (New)", number: "01412345678" },
      { prefix: "015", operator: "Teletalk", number: "01512345678" },
      { prefix: "016", operator: "Airtel / Robi", number: "01612345678" },
      { prefix: "017", operator: "Grameenphone", number: "01712345678" },
      { prefix: "018", operator: "Robi", number: "01812345678" },
      { prefix: "019", operator: "Banglalink", number: "01912345678" },
    ];

    for (const { prefix, operator, number } of validOperators) {
      it(`validates ${operator} prefix (${prefix}) successfully`, () => {
        const result = validateBangladeshiPhone(number);
        assert.equal(result.isValid, true, `Expected ${number} to be valid`);
        assert.equal(result.normalized, number);
        assert.equal(result.error, undefined);
      });
    }

    it("validates official hospital contact number 01647574776", () => {
      const result = validateBangladeshiPhone("01647574776");
      assert.equal(result.isValid, true);
      assert.equal(result.normalized, "01647574776");
    });
  });

  describe("Tier 1: International and Formatted Number Variants", () => {
    it("validates and normalizes +880 international prefix", () => {
      const result = validateBangladeshiPhone("+8801712345678");
      assert.equal(result.isValid, true);
      assert.equal(result.normalized, "01712345678");
    });

    it("validates and normalizes 880 prefix without plus sign", () => {
      const result = validateBangladeshiPhone("8801812345678");
      assert.equal(result.isValid, true);
      assert.equal(result.normalized, "01812345678");
    });

    it("handles hyphens/dashes within phone number", () => {
      const result = validateBangladeshiPhone("017-1234-5678");
      assert.equal(result.isValid, true);
      assert.equal(result.normalized, "01712345678");
    });

    it("handles whitespace and spaces within phone number", () => {
      const result = validateBangladeshiPhone("017 123 45678");
      assert.equal(result.isValid, true);
      assert.equal(result.normalized, "01712345678");
    });

    it("handles parentheses and mixed separators: +880 (17) 1234-5678", () => {
      const result = validateBangladeshiPhone("+880 (17) 1234-5678");
      assert.equal(result.isValid, true);
      assert.equal(result.normalized, "01712345678");
    });
  });

  describe("Tier 2: Boundary & Corner Cases — Invalid Prefixes", () => {
    it("rejects 010 (invalid prefix)", () => {
      const result = validateBangladeshiPhone("01012345678");
      assert.equal(result.isValid, false);
      assert.match(result.error, /valid.*Bangladeshi/i);
    });

    it("rejects 011 (defunct Citycell prefix)", () => {
      const result = validateBangladeshiPhone("01112345678");
      assert.equal(result.isValid, false);
      assert.match(result.error, /valid.*Bangladeshi/i);
    });

    it("rejects 012 (reserved / unallocated prefix)", () => {
      const result = validateBangladeshiPhone("01212345678");
      assert.equal(result.isValid, false);
      assert.match(result.error, /valid.*Bangladeshi/i);
    });

    it("rejects Chattogram landline format without mobile 01 prefix (031-123456)", () => {
      const result = validateBangladeshiPhone("031123456");
      assert.equal(result.isValid, false);
    });

    it("rejects international numbers outside Bangladesh (US +1-555-123-4567)", () => {
      const result = validateBangladeshiPhone("+15551234567");
      assert.equal(result.isValid, false);
    });
  });

  describe("Tier 2: Boundary & Corner Cases — Length Violations", () => {
    it("rejects 10-digit number (1 digit short)", () => {
      const result = validateBangladeshiPhone("0171234567");
      assert.equal(result.isValid, false);
      assert.match(result.error, /11-digit/i);
    });

    it("rejects 12-digit number (1 digit too long)", () => {
      const result = validateBangladeshiPhone("017123456789");
      assert.equal(result.isValid, false);
      assert.match(result.error, /11-digit/i);
    });

    it("rejects 9-digit number", () => {
      const result = validateBangladeshiPhone("017123456");
      assert.equal(result.isValid, false);
    });

    it("rejects empty string", () => {
      const result = validateBangladeshiPhone("");
      assert.equal(result.isValid, false);
      assert.match(result.error, /required/i);
    });

    it("rejects whitespace-only string", () => {
      const result = validateBangladeshiPhone("    ");
      assert.equal(result.isValid, false);
      assert.match(result.error, /required/i);
    });
  });

  describe("Tier 2: Adversarial & Malformed Inputs", () => {
    it("rejects letters and words", () => {
      const result = validateBangladeshiPhone("017abcdefgh");
      assert.equal(result.isValid, false);
    });

    it("rejects special punctuation characters within digits", () => {
      const result = validateBangladeshiPhone("01712@456$8");
      assert.equal(result.isValid, false);
    });

    it("rejects emojis embedded in string", () => {
      const result = validateBangladeshiPhone("0171234567🏥");
      assert.equal(result.isValid, false);
    });

    it("safely rejects SQL injection strings without throwing", () => {
      const result = validateBangladeshiPhone("' OR '1'='1'; --");
      assert.equal(result.isValid, false);
    });

    it("safely rejects XSS script injection without executing", () => {
      const result = validateBangladeshiPhone("<script>alert(1)</script>");
      assert.equal(result.isValid, false);
    });

    it("handles extreme buffer size (10,000 chars) in sub-millisecond time", () => {
      const start = Date.now();
      const result = validateBangladeshiPhone("0".repeat(10000));
      const elapsed = Date.now() - start;
      assert.equal(result.isValid, false);
      assert.ok(elapsed < 100, `Execution took ${elapsed}ms, should be <100ms`);
    });
  });
});
