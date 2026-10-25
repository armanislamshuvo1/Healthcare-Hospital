import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateBangladeshiPhone, cn } from "../lib/utils.ts";

describe("Adversarial Challenger Suite: lib/utils.ts", () => {
  describe("1. validateBangladeshiPhone: Prefix Testing", () => {
    it("accepts valid operator prefixes (013 through 019)", () => {
      const validPrefixes = ["013", "014", "015", "016", "017", "018", "019"];
      for (const prefix of validPrefixes) {
        const num = `${prefix}12345678`;
        const res = validateBangladeshiPhone(num);
        assert.equal(res.isValid, true, `Prefix ${prefix} should be valid`);
        assert.equal(res.normalized, num);
        assert.equal(res.error, undefined);
      }
    });

    it("accepts valid prefixes with +880 international code", () => {
      const res = validateBangladeshiPhone("+8801712345678");
      assert.equal(res.isValid, true);
      assert.equal(res.normalized, "01712345678");
    });

    it("accepts valid prefixes with 880 code (no +)", () => {
      const res = validateBangladeshiPhone("8801812345678");
      assert.equal(res.isValid, true);
      assert.equal(res.normalized, "01812345678");
    });

    it("accepts 016 official hospital contact format", () => {
      const res = validateBangladeshiPhone("01600000000");
      assert.equal(res.isValid, true);
      assert.equal(res.normalized, "01600000000");
    });

    it("rejects invalid prefix 010", () => {
      const res = validateBangladeshiPhone("01012345678");
      assert.equal(res.isValid, false);
      assert.ok(res.error);
    });

    it("rejects invalid prefix 011 (former Citycell, defunct)", () => {
      const res = validateBangladeshiPhone("01112345678");
      assert.equal(res.isValid, false);
      assert.ok(res.error);
    });

    it("rejects invalid prefix 012 (unallocated)", () => {
      const res = validateBangladeshiPhone("01212345678");
      assert.equal(res.isValid, false);
      assert.ok(res.error);
    });

    it("rejects invalid prefix with international +880 (e.g. +88012...)", () => {
      const res = validateBangladeshiPhone("+8801212345678");
      assert.equal(res.isValid, false);
    });

    it("rejects landline area codes (02 Dhaka, 031 Chattogram)", () => {
      assert.equal(validateBangladeshiPhone("0212345678").isValid, false);
      assert.equal(validateBangladeshiPhone("031123456").isValid, false);
    });

    it("rejects international numbers outside Bangladesh", () => {
      assert.equal(validateBangladeshiPhone("+12025550123").isValid, false);
      assert.equal(validateBangladeshiPhone("+447911123456").isValid, false);
      assert.equal(validateBangladeshiPhone("+919876543210").isValid, false);
    });
  });

  describe("2. validateBangladeshiPhone: Length Boundary Testing", () => {
    it("rejects empty string", () => {
      const res = validateBangladeshiPhone("");
      assert.equal(res.isValid, false);
      assert.equal(res.error, "Phone number is required.");
    });

    it("rejects whitespace-only strings (spaces, tabs, newlines)", () => {
      assert.equal(validateBangladeshiPhone("   ").isValid, false);
      assert.equal(validateBangladeshiPhone("\t\n  ").isValid, false);
    });

    it("rejects single digit inputs", () => {
      assert.equal(validateBangladeshiPhone("0").isValid, false);
      assert.equal(validateBangladeshiPhone("1").isValid, false);
    });

    it("rejects short numbers (emergency 999, helpline 16263)", () => {
      assert.equal(validateBangladeshiPhone("999").isValid, false);
      assert.equal(validateBangladeshiPhone("16263").isValid, false);
    });

    it("rejects 8-digit numbers", () => {
      assert.equal(validateBangladeshiPhone("01712345").isValid, false);
    });

    it("rejects 9-digit numbers", () => {
      assert.equal(validateBangladeshiPhone("017123456").isValid, false);
    });

    it("rejects 10-digit number starting with 0 (1 digit short)", () => {
      const res = validateBangladeshiPhone("0171234567");
      assert.equal(res.isValid, false);
      assert.match(res.error, /11-digit/i);
    });

    it("rejects 12-digit number starting with 0 (1 digit too long)", () => {
      const res = validateBangladeshiPhone("017123456789");
      assert.equal(res.isValid, false);
      assert.match(res.error, /11-digit/i);
    });

    it("rejects 13-digit number starting with 0", () => {
      assert.equal(validateBangladeshiPhone("0171234567890").isValid, false);
    });

    it("rejects +880 followed by extra leading 0 (+88001712345678)", () => {
      assert.equal(validateBangladeshiPhone("+88001712345678").isValid, false);
    });

    it("rejects excessively long number (100 digits)", () => {
      assert.equal(validateBangladeshiPhone("017" + "1".repeat(97)).isValid, false);
    });
  });

  describe("3. validateBangladeshiPhone: Symbols, Characters & Injection", () => {
    it("handles benign formatting separators (spaces, dashes, parentheses)", () => {
      assert.equal(validateBangladeshiPhone("017-1234-5678").isValid, true);
      assert.equal(validateBangladeshiPhone("017 123 45678").isValid, true);
      assert.equal(validateBangladeshiPhone("+880 (17) 1234-5678").isValid, true);
      assert.equal(validateBangladeshiPhone("+880 (17) 1234-5678").normalized, "01712345678");
    });

    it("rejects dots/periods as separators (017.1234.5678)", () => {
      const res = validateBangladeshiPhone("017.1234.5678");
      assert.equal(res.isValid, false);
    });

    it("rejects letters mixed with digits", () => {
      assert.equal(validateBangladeshiPhone("017abcdefgh").isValid, false);
      assert.equal(validateBangladeshiPhone("0171234567a").isValid, false);
      assert.equal(validateBangladeshiPhone("O1712345678").isValid, false); // Letter O
    });

    it("rejects special characters (@, #, $, %, ^, *, !)", () => {
      assert.equal(validateBangladeshiPhone("01712@456$8").isValid, false);
      assert.equal(validateBangladeshiPhone("#01712345678").isValid, false);
      assert.equal(validateBangladeshiPhone("01712345678#").isValid, false);
      assert.equal(validateBangladeshiPhone("*01712345678*").isValid, false);
    });

    it("rejects multiple leading plus signs (++8801712345678)", () => {
      assert.equal(validateBangladeshiPhone("++8801712345678").isValid, false);
    });

    it("rejects protocol prefixes (tel:01712345678)", () => {
      assert.equal(validateBangladeshiPhone("tel:01712345678").isValid, false);
    });

    it("rejects SQL injection, XSS and HTML payloads safely", () => {
      assert.equal(validateBangladeshiPhone("' OR '1'='1").isValid, false);
      assert.equal(validateBangladeshiPhone("<script>alert(1)</script>").isValid, false);
      assert.equal(validateBangladeshiPhone("1; DROP TABLE users;--").isValid, false);
    });
  });

  describe("4. validateBangladeshiPhone: Null, Undefined & Type Safety", () => {
    it("safely handles null input without throwing", () => {
      const res = validateBangladeshiPhone(null);
      assert.equal(res.isValid, false);
      assert.equal(res.error, "Phone number is required.");
    });

    it("safely handles undefined input without throwing", () => {
      const res = validateBangladeshiPhone(undefined);
      assert.equal(res.isValid, false);
      assert.equal(res.error, "Phone number is required.");
    });

    it("tests behavior when non-string (number/object) is passed", () => {
      // In JavaScript runtime, forms or API payloads might supply numbers or objects
      try {
        const res = validateBangladeshiPhone(1712345678);
        // If it didn't throw, check validity
        assert.ok(typeof res.isValid === "boolean");
      } catch (err) {
        // Document if it throws TypeError: phone.trim is not a function
        assert.ok(err instanceof TypeError, "Throws TypeError if non-string passed");
      }
    });
  });

  describe("5. cn Utility: Tailwind Conflict Resolution & Class Merging", () => {
    it("merges conflicting padding classes, preserving the latter", () => {
      const result = cn("p-4", "p-8");
      assert.equal(result, "p-8");
    });

    it("merges conflicting margin classes, preserving the latter", () => {
      const result = cn("m-2", "m-4");
      assert.equal(result, "m-4");
    });

    it("merges conflicting text colors", () => {
      const result = cn("text-red-500", "text-blue-500");
      assert.equal(result, "text-blue-500");
    });

    it("merges conflicting background colors", () => {
      const result = cn("bg-red-500", "bg-teal-600");
      assert.equal(result, "bg-teal-600");
    });

    it("merges conflicting display utilities", () => {
      const result = cn("block", "hidden");
      assert.equal(result, "hidden");
    });

    it("merges conflicting flex direction", () => {
      const result = cn("flex-row", "flex-col");
      assert.equal(result, "flex-col");
    });

    it("handles shorthand overriding directional utilities (px/py vs p)", () => {
      const result = cn("px-4 py-2", "p-6");
      assert.equal(result, "p-6");
    });

    it("handles directional overriding shorthand (p-6 vs px-4)", () => {
      const result = cn("p-6", "px-4");
      assert.equal(result, "p-6 px-4");
    });

    it("correctly handles conditional falsy values, null, undefined, boolean", () => {
      const isVisible = false;
      const isActive = true;
      const result = cn(
        "base-class",
        isVisible && "should-not-exist",
        isActive && "text-white",
        null,
        undefined,
        false
      );
      assert.equal(result, "base-class text-white");
    });

    it("handles nested arrays and object inputs (clsx feature)", () => {
      const result = cn(
        ["p-2", "text-sm"],
        { "bg-teal-600": true, "bg-red-500": false },
        "p-4"
      );
      assert.equal(result, "text-sm bg-teal-600 p-4");
    });

    it("evaluates custom color handling (teal palette)", () => {
      const result = cn("text-teal-600", "text-teal-800");
      assert.equal(result, "text-teal-800");
    });
  });
});
