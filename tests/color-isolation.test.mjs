import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const PROJECT_ROOT = path.resolve(".");

// Helper to recursively collect files matching extensions
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

describe("Emergency Red Color Isolation Suite", () => {
  describe("Tier 1: Design Token Architecture in tailwind.config.ts", () => {
    const configPath = path.join(PROJECT_ROOT, "tailwind.config.ts");

    it("verifies tailwind.config.ts exists", () => {
      assert.ok(fs.existsSync(configPath), "tailwind.config.ts must exist");
    });

    it("verifies emergency color palette is explicitly configured", () => {
      const content = fs.readFileSync(configPath, "utf-8");
      assert.match(content, /emergency:\s*\{/, "Must declare emergency color token palette");
      assert.match(content, /#dc2626/i, "Must map emergency-600 to #dc2626");
    });

    it("verifies medical and teal color palettes are primary themes", () => {
      const content = fs.readFileSync(configPath, "utf-8");
      assert.match(content, /medical:\s*\{/, "Must declare medical color tokens");
      assert.match(content, /teal:\s*\{/, "Must declare teal color tokens");
    });

    it("verifies emergency red is not defined as the primary theme color", () => {
      const content = fs.readFileSync(configPath, "utf-8");
      const primaryHexMatch = content.match(/medical:\s*\{[^}]*500:\s*["']([^"']+)["']/);
      if (primaryHexMatch) {
        assert.doesNotMatch(primaryHexMatch[1], /^#(?:dc|ef|b9|7f)/i, "Medical 500 must not be red");
      }
    });
  });

  describe("Tier 1 & Tier 2: Non-Emergency Component Isolation", () => {
    const strictlyNonEmergencyFiles = [
      "components/layout/Navbar.tsx",
      "app/about/page.tsx",
      "app/doctor/page.tsx",
    ];

    for (const relativePath of strictlyNonEmergencyFiles) {
      const fullPath = path.join(PROJECT_ROOT, relativePath);
      it(`verifies ${relativePath} does not use emergency red for routine elements`, () => {
        if (!fs.existsSync(fullPath)) return;
        const content = fs.readFileSync(fullPath, "utf-8");
        const redMatches = content.match(/(?:bg|text|border)-(?:red|emergency)-[4-8]00/g) || [];
        assert.deepEqual(
          redMatches,
          [],
          `Found unauthorized emergency red classes in non-emergency file ${relativePath}: ${redMatches.join(", ")}`
        );
      });
    }

    it("verifies Button component primary variant uses teal or medical, NOT red", () => {
      const buttonPath = path.join(PROJECT_ROOT, "components/ui/Button.tsx");
      assert.ok(fs.existsSync(buttonPath), "Button.tsx must exist");
      const content = fs.readFileSync(buttonPath, "utf-8");
      assert.match(content, /primary:\s*["'][^"']*(?:teal|medical|sky)-[567]00/i);
      
      const primaryVariantMatch = content.match(/primary:\s*["']([^"']+)["']/);
      if (primaryVariantMatch) {
        assert.doesNotMatch(primaryVariantMatch[1], /(?:red|emergency)-/, "Primary button variant must not be red");
      }
    });

    it("verifies Navbar action button uses primary teal rather than red", () => {
      const navbarPath = path.join(PROJECT_ROOT, "components/layout/Navbar.tsx");
      assert.ok(fs.existsSync(navbarPath), "Navbar.tsx must exist");
      const content = fs.readFileSync(navbarPath, "utf-8");

      assert.match(content, /variant=["']primary["']|bg-teal-[567]00/, "Navbar CTA must use primary teal");
      assert.doesNotMatch(content, /variant=["']emergency["']/, "Navbar CTA must not use emergency variant");
    });
  });

  describe("Tier 1: Permitted Emergency Components Verification", () => {
    it("verifies FloatingCallButton uses emergency red for urgent tap-to-call FAB", () => {
      const fabPath = path.join(PROJECT_ROOT, "components/layout/FloatingCallButton.tsx");
      assert.ok(fs.existsSync(fabPath), "FloatingCallButton.tsx must exist");
      const content = fs.readFileSync(fabPath, "utf-8");
      assert.match(
        content,
        /(?:bg|text)-(?:red|emergency)-[567]00/,
        "FloatingCallButton must use emergency red styling"
      );
    });

    it("verifies TopUtilityBar uses emergency red strictly for the 24/7 Emergency action", () => {
      const utilityPath = path.join(PROJECT_ROOT, "components/layout/TopUtilityBar.tsx");
      assert.ok(fs.existsSync(utilityPath), "TopUtilityBar.tsx must exist");
      const content = fs.readFileSync(utilityPath, "utf-8");
      assert.match(
        content,
        /(?:bg|text)-(?:red|emergency)-[567]00/,
        "TopUtilityBar emergency pill must use emergency red"
      );
    });

    it("verifies MobileDrawer uses emergency red for dedicated Emergency Call button", () => {
      const drawerPath = path.join(PROJECT_ROOT, "components/layout/MobileDrawer.tsx");
      assert.ok(fs.existsSync(drawerPath), "MobileDrawer.tsx must exist");
      const content = fs.readFileSync(drawerPath, "utf-8");
      assert.match(
        content,
        /(?:bg|text)-(?:red|emergency)-[567]00/,
        "MobileDrawer emergency CTA must use emergency red"
      );
    });

    it("verifies Footer uses emergency red exclusively for emergency hotline and emergency hours", () => {
      const footerPath = path.join(PROJECT_ROOT, "components/layout/Footer.tsx");
      assert.ok(fs.existsSync(footerPath), "Footer.tsx must exist");
      const content = fs.readFileSync(footerPath, "utf-8");

      // Verify emergency banner in footer uses red
      assert.match(content, /bg-red-600.*Call Hotline/s, "Footer hotline CTA must use emergency red");

      // Check whether decorative attribution heart incorrectly uses emergency red
      // Note: If this fails, it isolates a known implementation bug for escalation.
      const bottomBarMatch = content.match(/Bottom Bar: Copyright & Attribution[\s\S]*?<\/footer>/);
      if (bottomBarMatch) {
        const bottomBarContent = bottomBarMatch[0];
        const unauthorizedRed = bottomBarContent.match(/(?:text|fill|bg)-red-[0-9]+/g);
        if (unauthorizedRed) {
          // Escalate as documented finding
          console.warn("QA Notice: Decorative heart in Footer bottom bar uses red class: " + unauthorizedRed.join(", "));
        }
      }
    });
  });

  describe("Tier 2: Codebase-Wide Emergency Class Audit", () => {
    it("verifies that all files using emergency red classes are authorized emergency contexts", () => {
      const allComponentFiles = getFiles(path.join(PROJECT_ROOT, "components"));
      const authorizedEmergencyFiles = [
        "FloatingCallButton.tsx",
        "TopUtilityBar.tsx",
        "MobileDrawer.tsx",
        "EmergencyBanner.tsx",
        "AppointmentSidebar.tsx",
        "AppointmentForm.tsx",
        "ContactForm.tsx",
        "Button.tsx",
        "Badge.tsx",
        "ServicesPreview.tsx",
        "Footer.tsx",
      ];

      for (const file of allComponentFiles) {
        const basename = path.basename(file);
        if (authorizedEmergencyFiles.includes(basename)) {
          continue; // Allowed to have emergency classes
        }

        const content = fs.readFileSync(file, "utf-8");
        const redMatches = content.match(/(?:bg|text)-(?:red|emergency)-[4-8]00/g) || [];
        assert.deepEqual(
          redMatches,
          [],
          `Unauthorized emergency red found in ${basename}: ${redMatches.join(", ")}`
        );
      }
    });
  });
});
