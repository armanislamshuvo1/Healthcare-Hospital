import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const PROJECT_ROOT = path.resolve(".");

function getFiles(dir, extensions = [".tsx", ".ts", ".jsx", ".js"]) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next" && entry.name !== ".agents") {
        files.push(...getFiles(fullPath, extensions));
      }
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

describe("Layout & Clinical Content Verification Suite", () => {
  const constantsPath = path.join(PROJECT_ROOT, "lib/constants.ts");
  const constantsContent = fs.readFileSync(constantsPath, "utf-8");

  describe("Tier 1: Hospital Identity & Location Accuracy", () => {
    it("verifies hospital name is exactly 'Healthcare Hospital'", () => {
      assert.match(constantsContent, /name:\s*["']Healthcare Hospital["']/);
    });

    it("verifies hospital address is '106 E K.B. Fazlul Kader Rd, Chattogram 4203, Bangladesh'", () => {
      assert.match(constantsContent, /fullAddress:\s*["']106 E K\.B\. Fazlul Kader Rd, Chattogram 4203/);
    });

    it("verifies display phone format matches 016******* pattern", () => {
      assert.match(constantsContent, /displayPhone:\s*["']016\*{7}["']/);
    });

    it("verifies dial phone uses valid Bangladeshi mobile number", () => {
      assert.match(constantsContent, /dialPhone:\s*["']\+?8801600000000["']/);
      assert.match(constantsContent, /emergencyDialPhone:\s*["']\+?8801600000000["']/);
    });

    it("verifies 24/7 emergency readiness is declared", () => {
      assert.match(constantsContent, /emergencyHours:\s*["']24\/7/i);
    });
  });

  describe("Tier 1: Consultant Doctor Credentials & Schedule", () => {
    it("verifies consultant name is 'Dr. A.S.M. Rashedul Hasan'", () => {
      assert.match(constantsContent, /name:\s*["']Dr\. A\.S\.M\. Rashedul Hasan["']/);
    });

    it("verifies qualifications include MBBS and FCPS (Medicine)", () => {
      assert.match(constantsContent, /degrees:\s*\[[\s\S]*?MBBS[\s\S]*?FCPS[\s\S]*?Medicine[\s\S]*?\]/);
    });

    it("verifies internal medicine specialty", () => {
      assert.match(constantsContent, /specialty:\s*["'][^"']*Medicine/i);
    });

    it("verifies OPD chamber schedule contains consultation hours", () => {
      assert.match(constantsContent, /schedule:\s*\[/);
      assert.match(constantsContent, /Chamber 201/i);
      assert.match(constantsContent, /5:00 PM/);
    });
  });

  describe("Tier 1: Hospital Leadership & Core Values", () => {
    it("verifies Dr. Abdul Karim is Managing Director with MBBS, CCD (BIRDEM)", () => {
      assert.match(constantsContent, /name:\s*["']Dr\. Abdul Karim["']/);
      assert.match(constantsContent, /Managing Director/);
      assert.match(constantsContent, /MBBS, CCD \(BIRDEM\)/);
    });

    it("verifies Mr. Anwar Kamal is Hospital Manager", () => {
      assert.match(constantsContent, /name:\s*["']Mr\. Anwar Kamal["']/);
      assert.match(constantsContent, /Hospital Manager/);
    });

    it("verifies exactly 3 core values: Care, Compassion, Excellence", () => {
      assert.match(constantsContent, /title:\s*["']Care["']/);
      assert.match(constantsContent, /title:\s*["']Compassion["']/);
      assert.match(constantsContent, /title:\s*["']Excellence["']/);
    });

    it("verifies 3 clinical services: OPD, Emergency Ward, Medicine Ward", () => {
      assert.match(constantsContent, /title:\s*["']Consultant OPD["']/);
      assert.match(constantsContent, /title:\s*["']24\/7 Emergency Ward["']/);
      assert.match(constantsContent, /title:\s*["']General Medicine Ward["']/);
    });
  });

  describe("Tier 2: RFC-Compliant Telephone Protocol Scheme (tel:) Validation", () => {
    it("audits all tel: links in source code to ensure strict dialing format", () => {
      const allFiles = [
        ...getFiles(path.join(PROJECT_ROOT, "app")),
        ...getFiles(path.join(PROJECT_ROOT, "components")),
      ];

      // Match href={`tel:...`} or href="tel:..."
      const telPattern = /href=\{`tel:([^`]+)`\}|href=["']tel:([^"']+)["']/g;
      let totalTelLinksFound = 0;

      for (const file of allFiles) {
        const content = fs.readFileSync(file, "utf-8");
        let match;
        while ((match = telPattern.exec(content)) !== null) {
          totalTelLinksFound++;
          const target = match[1] || match[2];

          if (target.startsWith("${")) {
            // Expression like ${HOSPITAL_INFO.dialPhone}
            assert.match(
              target,
              /\$\{(?:HOSPITAL_INFO\.(?:dialPhone|emergencyDialPhone)|phone|req\.phoneNumber)\}/,
              `File ${path.basename(file)} interpolates unrecognized telephone variable: ${target}`
            );
          } else {
            const isValidTel = /^(?:\+?880|0)?1[3-9]\d{8}$/.test(target);
            assert.ok(
              isValidTel,
              `File ${path.basename(file)} has invalid literal tel: scheme: "${target}"`
            );
          }
        }
      }

      assert.ok(totalTelLinksFound >= 4, `Expected at least 4 tel: links across layout, found ${totalTelLinksFound}`);
    });

    it("verifies constants.ts dialPhone values conform strictly to E.164 / BD dialable regex", () => {
      const dialPhoneMatch = constantsContent.match(/dialPhone:\s*["']([^"']+)["']/);
      const emergencyDialPhoneMatch = constantsContent.match(/emergencyDialPhone:\s*["']([^"']+)["']/);

      assert.ok(dialPhoneMatch, "dialPhone must be present in constants.ts");
      assert.ok(emergencyDialPhoneMatch, "emergencyDialPhone must be present in constants.ts");

      const dialPhone = dialPhoneMatch[1];
      const emergencyDialPhone = emergencyDialPhoneMatch[1];

      // E.164 format: +8801XXXXXXXXX
      assert.match(dialPhone, /^\+8801[3-9]\d{8}$/, `dialPhone ${dialPhone} must be valid E.164`);
      assert.match(emergencyDialPhone, /^\+8801[3-9]\d{8}$/, `emergencyDialPhone ${emergencyDialPhone} must be valid E.164`);
    });
  });
});
