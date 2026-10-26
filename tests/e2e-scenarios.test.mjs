import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { validateBangladeshiPhone } from "../lib/utils.ts";

const PROJECT_ROOT = path.resolve(".");

describe("E2E Scenarios & Cross-Feature Integration Suite", () => {
  const constantsContent = fs.readFileSync(path.join(PROJECT_ROOT, "lib/constants.ts"), "utf-8");
  const appointmentContent = [
    fs.readFileSync(path.join(PROJECT_ROOT, "app/appointment/page.tsx"), "utf-8"),
    fs.existsSync(path.join(PROJECT_ROOT, "components/appointment/AppointmentForm.tsx"))
      ? fs.readFileSync(path.join(PROJECT_ROOT, "components/appointment/AppointmentForm.tsx"), "utf-8")
      : "",
    fs.existsSync(path.join(PROJECT_ROOT, "components/appointment/AppointmentSidebar.tsx"))
      ? fs.readFileSync(path.join(PROJECT_ROOT, "components/appointment/AppointmentSidebar.tsx"), "utf-8")
      : "",
  ].join("\n");
  const contactContent = [
    fs.readFileSync(path.join(PROJECT_ROOT, "app/contact/page.tsx"), "utf-8"),
    fs.existsSync(path.join(PROJECT_ROOT, "components/contact/ContactForm.tsx"))
      ? fs.readFileSync(path.join(PROJECT_ROOT, "components/contact/ContactForm.tsx"), "utf-8")
      : "",
    fs.existsSync(path.join(PROJECT_ROOT, "components/contact/MapEmbed.tsx"))
      ? fs.readFileSync(path.join(PROJECT_ROOT, "components/contact/MapEmbed.tsx"), "utf-8")
      : "",
  ].join("\n");
  const homeContent = fs.readFileSync(path.join(PROJECT_ROOT, "app/page.tsx"), "utf-8");
  const doctorContent = fs.readFileSync(path.join(PROJECT_ROOT, "app/doctor/page.tsx"), "utf-8");
  const servicesContent = fs.readFileSync(path.join(PROJECT_ROOT, "app/services/page.tsx"), "utf-8");
  const layoutContent = fs.readFileSync(path.join(PROJECT_ROOT, "app/layout.tsx"), "utf-8");
  const navbarContent = fs.readFileSync(path.join(PROJECT_ROOT, "components/layout/Navbar.tsx"), "utf-8");
  const drawerContent = fs.readFileSync(path.join(PROJECT_ROOT, "components/layout/MobileDrawer.tsx"), "utf-8");
  const fabContent = fs.readFileSync(path.join(PROJECT_ROOT, "components/layout/FloatingCallButton.tsx"), "utf-8");

  describe("Tier 3: Cross-Feature Pairwise Interactions", () => {
    it("CF1: Navbar + Mobile Drawer link consistency across 6 routes", () => {
      const requiredRoutes = ["/", "/about", "/doctor", "/services", "/appointment", "/contact"];
      for (const route of requiredRoutes) {
        assert.ok(
          constantsContent.includes(`href: "${route}"`),
          `NAV_ITEMS must contain route ${route}`
        );
      }
      assert.match(drawerContent, /NAV_ITEMS\.map/);
      assert.match(drawerContent, /tel:\$\{HOSPITAL_INFO\.emergencyDialPhone\}/);
    });

    it("CF2: Appointment Form + BD Phone Validator data flow contract", () => {
      const appointmentSubmission = {
        patientName: "Mohammad Rafiq",
        phoneNumber: "01712345678",
        age: "42",
        gender: "male",
        appointmentDate: "2026-10-30",
        reason: "Routine follow-up for diabetes & hypertension checkup",
      };

      assert.ok(appointmentSubmission.patientName.trim().length >= 2);
      assert.ok(parseInt(appointmentSubmission.age, 10) >= 1);
      assert.ok(["male", "female", "other"].includes(appointmentSubmission.gender));

      const phoneValidation = validateBangladeshiPhone(appointmentSubmission.phoneNumber);
      assert.equal(phoneValidation.isValid, true);
      assert.equal(phoneValidation.normalized, "01712345678");

      assert.match(appointmentContent, /name=["']patientName["']/);
      assert.match(appointmentContent, /name=["']phoneNumber["']/);
      assert.match(appointmentContent, /name=["']age["']/);
      assert.match(appointmentContent, /name=["']gender["']/);
      assert.match(appointmentContent, /name=["']appointmentDate["']/);
    });

    it("CF3: Services OPD Card + Doctor Consultation Schedule alignment", () => {
      assert.match(doctorContent, /Dr\. A\.S\.M\. Rashedul Hasan/);
      assert.match(doctorContent, /MBBS/);
      assert.match(doctorContent, /FCPS/);
      assert.match(servicesContent, /HOSPITAL_SERVICES\.map/);
      assert.match(constantsContent, /Consultant OPD/);
      assert.match(constantsContent, /Dr\. A\.S\.M\. Rashedul Hasan/);
    });

    it("CF4: Emergency Red Isolation between Floating FAB and routine buttons", () => {
      assert.match(fabContent, /(?:bg|text)-(?:red|emergency)-[567]00/);
      assert.match(homeContent, /variant=["']primary["']|bg-teal-[567]00/);
    });

    it("CF5: Contact Form + Phone Validation + Sidebar Helpline", () => {
      const contactSubmission = {
        name: "Tanvir Ahmed",
        phone: "+880 18 1234 5678",
        subject: "Inquiry about Medicine OPD slot",
        message: "Can I book a serial for Dr. Hasan on Thursday evening?",
      };

      const phoneValidation = validateBangladeshiPhone(contactSubmission.phone);
      assert.equal(phoneValidation.isValid, true);
      assert.equal(phoneValidation.normalized, "01812345678");

      assert.match(contactContent, /id=["']contactPhone["']/);
      assert.match(contactContent, /id=["']contactMessage["']/);
    });

    it("CF6: Viewport Breakpoint Differentiation for Mobile FAB", () => {
      assert.match(fabContent, /block sm:hidden|sm:hidden|md:hidden/);
      assert.match(navbarContent, /hidden lg:flex|hidden md:flex/);
    });
  });

  describe("Tier 4: Real-World Application Scenarios", () => {
    it("Scenario 1: Chronic Medicine Patient Booking Flow (Rahim Ullah, 52)", () => {
      assert.match(homeContent, /DOCTOR_PROFILE\.name/);
      assert.match(homeContent, /href=["']\/appointment["']/);
      assert.match(homeContent, /Book.*Appointment/i);

      // Verify "How to visit" 3-step strip is defined in authoritative data (Call -> Book -> Visit)
      assert.match(constantsContent, /HOW_TO_VISIT_STEPS/);
      assert.match(constantsContent, /title:\s*["']Call["']/);
      assert.match(constantsContent, /title:\s*["']Book["']/);
      assert.match(constantsContent, /title:\s*["']Visit["']/);
      assert.match(constantsContent, /106 E K\.B\. Fazlul Kader Rd/);

      assert.match(appointmentContent, /Saturday - Thursday/);
      assert.match(appointmentContent, /5:00 PM - 9:00 PM/);

      const patient = {
        name: "Rahim Ullah",
        phone: "01711223344",
        age: 52,
        complaint: "High blood pressure follow-up and prescription renewal",
      };
      const validation = validateBangladeshiPhone(patient.phone);
      assert.equal(validation.isValid, true);
      assert.equal(validation.normalized, "01711223344");
    });

    it("Scenario 2: Late-Night Emergency Patient Triage Flow (2:00 AM)", () => {
      assert.match(layoutContent, /<FloatingCallButton\s*\/>/);
      assert.match(layoutContent, /<TopUtilityBar\s*\/>/);

      assert.match(constantsContent, /emergencyDialPhone:\s*["']\+?8801600000000["']/);

      assert.match(servicesContent, /HOSPITAL_SERVICES\.map/);
      assert.match(constantsContent, /24\/7 Emergency Ward/);
      assert.match(constantsContent, /Immediate doctor-led triage/i);

      assert.match(contactContent, /106 E K\.B\. Fazlul Kader Rd, Chattogram/);
    });

    it("Scenario 3: Community Inquiry & Hospital Governance Verification", () => {
      const aboutContent = fs.readFileSync(path.join(PROJECT_ROOT, "app/about/page.tsx"), "utf-8");
      assert.match(aboutContent, /MANAGEMENT_MEMBERS/);
      assert.match(constantsContent, /Dr\. Abdul Karim/);
      assert.match(constantsContent, /Mr\. Anwar Kamal/);
      assert.match(constantsContent, /Managing Director/);
      assert.match(constantsContent, /Hospital Manager/);

      assert.match(aboutContent, /HOSPITAL_INFO\.establishedYear/);
      assert.match(aboutContent, /Excellence in Care in a Focused 1-Consultant Hospital/);

      assert.match(contactContent, /Healthcare Hospital Location Map/);
    });
  });
});
