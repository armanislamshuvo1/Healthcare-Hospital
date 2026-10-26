import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const PROJECT_ROOT = path.resolve(".");

describe("Developer Brief Specifications Suite", () => {
  const constantsPath = path.join(PROJECT_ROOT, "lib/constants.ts");
  const constantsContent = fs.readFileSync(constantsPath, "utf-8");

  describe("Brief Requirement 1: 3 Team Members with Exact Qualifications", () => {
    it("verifies Dr. A.S.M. Rashedul Hasan as Consultant (Medicine) with MBBS, FCPS (Medicine)", () => {
      assert.match(constantsContent, /Dr\. A\.S\.M\. Rashedul Hasan/);
      assert.match(constantsContent, /Consultant \(Medicine\)/);
      assert.match(constantsContent, /MBBS/);
      assert.match(constantsContent, /FCPS \(Medicine\)/);
    });

    it("verifies Dr. Abdul Karim as Managing Director with MBBS, CCD (BIRDEM)", () => {
      assert.match(constantsContent, /Dr\. Abdul Karim/);
      assert.match(constantsContent, /Managing Director/);
      assert.match(constantsContent, /MBBS, CCD \(BIRDEM\)/);
    });

    it("verifies Mr. Anwar Kamal as Hospital Manager", () => {
      assert.match(constantsContent, /Mr\. Anwar Kamal/);
      assert.match(constantsContent, /Hospital Manager/);
    });
  });

  describe("Brief Requirement 2: How to Visit 3-Step Process (Call -> Book -> Visit)", () => {
    it("verifies the exact 3 steps in constants", () => {
      assert.match(constantsContent, /HOW_TO_VISIT_STEPS/);
      assert.match(constantsContent, /title:\s*["']Call["']/);
      assert.match(constantsContent, /title:\s*["']Book["']/);
      assert.match(constantsContent, /title:\s*["']Visit["']/);
    });

    it("verifies HowToVisit component renders Call -> Book -> Visit", () => {
      const howToVisitPath = path.join(PROJECT_ROOT, "components/home/HowToVisit.tsx");
      const content = fs.readFileSync(howToVisitPath, "utf-8");
      assert.match(content, /HOW_TO_VISIT_STEPS\.map/);
      assert.match(content, /0\{step\.step\}/);
    });
  });

  describe("Brief Requirement 3: Hero 3-Slide Slider", () => {
    it("verifies HERO_SLIDES contains 3 slides in constants", () => {
      assert.match(constantsContent, /HERO_SLIDES/);
      assert.match(constantsContent, /Consultant Physician OPD/);
      assert.match(constantsContent, /24\/7 Rapid Emergency Ward/);
      assert.match(constantsContent, /1 General Medicine Ward/);
    });

    it("verifies HeroBanner is an interactive slider", () => {
      const heroPath = path.join(PROJECT_ROOT, "components/home/HeroBanner.tsx");
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.match(content, /currentSlide/);
      assert.match(content, /nextSlide/);
      assert.match(content, /prevSlide/);
      assert.match(content, /HERO_SLIDES/);
    });
  });

  describe("Brief Requirement 4: Mr. Anwar Kamal Admin Panel & Notice Strip", () => {
    it("verifies /admin route exists with authentication and status actions", () => {
      const adminPath = path.join(PROJECT_ROOT, "app/admin/page.tsx");
      assert.ok(fs.existsSync(adminPath), "app/admin/page.tsx must exist");
      const content = fs.readFileSync(adminPath, "utf-8");
      assert.match(content, /Mr\. Anwar Kamal \(Hospital Manager\)/);
      assert.match(content, /Called/);
      assert.match(content, /Confirmed/);
      assert.match(content, /Cancelled/);
    });

    it("verifies NoticeStrip exists and is included in layout", () => {
      const noticePath = path.join(PROJECT_ROOT, "components/layout/NoticeStrip.tsx");
      assert.ok(fs.existsSync(noticePath), "NoticeStrip component must exist");
      const layoutPath = path.join(PROJECT_ROOT, "app/layout.tsx");
      const layoutContent = fs.readFileSync(layoutPath, "utf-8");
      assert.match(layoutContent, /<NoticeStrip\s*\/>/);
    });
  });

  describe("Brief Requirement 5: Form Anti-Spam Honeypots, Privacy Policy & SEO", () => {
    it("verifies honeypot field in AppointmentForm and ContactForm", () => {
      const aptForm = fs.readFileSync(path.join(PROJECT_ROOT, "components/appointment/AppointmentForm.tsx"), "utf-8");
      assert.match(aptForm, /website_source_url/);
      assert.match(aptForm, /email/);

      const contactForm = fs.readFileSync(path.join(PROJECT_ROOT, "components/contact/ContactForm.tsx"), "utf-8");
      assert.match(contactForm, /hp_contact_url/);
    });

    it("verifies /privacy-policy page exists and covers medical data compliance", () => {
      const privacyPath = path.join(PROJECT_ROOT, "app/privacy-policy/page.tsx");
      assert.ok(fs.existsSync(privacyPath), "app/privacy-policy/page.tsx must exist");
      const content = fs.readFileSync(privacyPath, "utf-8");
      assert.match(content, /no patient medical records/i);
    });

    it("verifies robots.ts and sitemap.ts exist", () => {
      assert.ok(fs.existsSync(path.join(PROJECT_ROOT, "app/robots.ts")));
      assert.ok(fs.existsSync(path.join(PROJECT_ROOT, "app/sitemap.ts")));
    });

    it("verifies postal code 4203 and Bangladesh are in full address", () => {
      assert.match(constantsContent, /Chattogram 4203, Bangladesh/);
    });
  });
});
