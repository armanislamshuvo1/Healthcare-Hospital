import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const PROJECT_ROOT = path.resolve(".");

describe("Routes & Global App Shell Architecture Suite", () => {
  const routes = [
    { name: "Home (/)", path: "app/page.tsx", hasPageMetadata: false },
    { name: "About Us (/about)", path: "app/about/page.tsx", hasPageMetadata: true },
    { name: "Our Doctor (/doctor)", path: "app/doctor/page.tsx", hasPageMetadata: true },
    { name: "Services (/services)", path: "app/services/page.tsx", hasPageMetadata: true },
    { name: "Appointment (/appointment)", path: "app/appointment/page.tsx", hasPageMetadata: true },
    { name: "Contact (/contact)", path: "app/contact/page.tsx", hasPageMetadata: true },
  ];

  describe("Tier 1: Next.js App Router 6 Routes Integrity", () => {
    for (const route of routes) {
      it(`verifies ${route.name} route exists at ${route.path}`, () => {
        const fullPath = path.join(PROJECT_ROOT, route.path);
        assert.ok(fs.existsSync(fullPath), `Route file ${route.path} must exist`);
      });

      it(`verifies ${route.name} exports a default page function`, () => {
        const fullPath = path.join(PROJECT_ROOT, route.path);
        const content = fs.readFileSync(fullPath, "utf-8");
        assert.match(
          content,
          /export\s+default\s+function\s+\w+|export\s+default\s+class\s+\w+|export\s+default\s+\w+/,
          `Route file ${route.path} must export default page component`
        );
      });

      if (route.hasPageMetadata) {
        it(`verifies ${route.name} defines metadata for SEO & accessibility`, () => {
          const fullPath = path.join(PROJECT_ROOT, route.path);
          const content = fs.readFileSync(fullPath, "utf-8");
          assert.match(
            content,
            /metadata:\s*Metadata|title:/i,
            `Route file ${route.path} must provide title metadata`
          );
        });
      }
    }

    it("verifies app/layout.tsx defines root default metadata with template", () => {
      const layoutContent = fs.readFileSync(path.join(PROJECT_ROOT, "app/layout.tsx"), "utf-8");
      assert.match(layoutContent, /metadata:\s*Metadata/, "Root layout must export metadata");
      assert.match(
        layoutContent,
        /title:\s*(?:\{[\s\S]*?HOSPITAL_INFO\.name|["'][^"']*Healthcare Hospital)/,
        "Root metadata title must configure title template with hospital name"
      );
    });
  });

  describe("Tier 1: Global App Shell Component Structure", () => {
    const layoutComponents = [
      { name: "Root Layout", path: "app/layout.tsx" },
      { name: "Top Utility Bar", path: "components/layout/TopUtilityBar.tsx" },
      { name: "Sticky Navbar", path: "components/layout/Navbar.tsx" },
      { name: "Mobile Drawer", path: "components/layout/MobileDrawer.tsx" },
      { name: "Global Footer", path: "components/layout/Footer.tsx" },
      { name: "Floating Call Button", path: "components/layout/FloatingCallButton.tsx" },
    ];

    for (const comp of layoutComponents) {
      it(`verifies ${comp.name} exists at ${comp.path}`, () => {
        const fullPath = path.join(PROJECT_ROOT, comp.path);
        assert.ok(fs.existsSync(fullPath), `Layout file ${comp.path} must exist`);
      });
    }

    it("verifies app/layout.tsx integrates TopUtilityBar, Navbar, Footer, and FloatingCallButton", () => {
      const layoutContent = fs.readFileSync(path.join(PROJECT_ROOT, "app/layout.tsx"), "utf-8");
      assert.match(layoutContent, /<TopUtilityBar\s*\/>/, "Layout must include TopUtilityBar");
      assert.match(layoutContent, /<Navbar\s*\/>/, "Layout must include Navbar");
      assert.match(layoutContent, /<Footer\s*\/>/, "Layout must include Footer");
      assert.match(layoutContent, /<FloatingCallButton\s*\/>/, "Layout must include FloatingCallButton");
    });
  });

  describe("Tier 2: Client Component Boundary Verification", () => {
    const clientComponents = [
      "components/layout/Navbar.tsx",
      "components/layout/MobileDrawer.tsx",
      "components/layout/FloatingCallButton.tsx",
      "components/ui/Modal.tsx",
      "components/appointment/AppointmentForm.tsx",
      "components/contact/ContactForm.tsx",
    ];

    for (const compPath of clientComponents) {
      it(`verifies ${compPath} explicitly declares "use client" directive`, () => {
        const fullPath = path.join(PROJECT_ROOT, compPath);
        if (!fs.existsSync(fullPath)) return;
        const content = fs.readFileSync(fullPath, "utf-8");
        const firstLines = content.split("\n").slice(0, 3).join("\n");
        assert.match(
          firstLines,
          /["']use client["']/,
          `${compPath} must declare "use client" directive at top of file`
        );
      });
    }
  });

  describe("Tier 2: Multi-Device Responsive Breakpoint Tokens", () => {
    it("verifies Navbar hides desktop nav and shows hamburger on mobile", () => {
      const navbarContent = fs.readFileSync(path.join(PROJECT_ROOT, "components/layout/Navbar.tsx"), "utf-8");
      assert.match(navbarContent, /hidden lg:flex|hidden md:flex/, "Must hide desktop menu on mobile");
      assert.match(navbarContent, /lg:hidden|md:hidden|sm:hidden/, "Must show hamburger button on mobile");
    });

    it("verifies FloatingCallButton is active on mobile and hidden on desktop", () => {
      const fabContent = fs.readFileSync(path.join(PROJECT_ROOT, "components/layout/FloatingCallButton.tsx"), "utf-8");
      assert.match(fabContent, /fixed bottom-/, "Must be fixed to bottom of viewport");
      assert.match(fabContent, /block sm:hidden|sm:hidden|md:hidden/, "Must be hidden on tablet/desktop viewports");
    });

    it("verifies MobileDrawer renders fixed slide-over sheet with z-index", () => {
      const drawerContent = fs.readFileSync(path.join(PROJECT_ROOT, "components/layout/MobileDrawer.tsx"), "utf-8");
      assert.match(drawerContent, /fixed inset-0/, "Drawer must cover viewport with backdrop");
      assert.match(drawerContent, /z-50/, "Drawer overlay must have high z-index (z-50)");
    });
  });
});
