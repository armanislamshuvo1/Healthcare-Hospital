import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { validateBangladeshiPhone } from "../lib/utils.ts";

const PROJECT_ROOT = path.resolve(".");

describe("Appointment & Contact Forms Specification Suite", () => {
  const appointmentPagePath = path.join(PROJECT_ROOT, "app/appointment/page.tsx");
  const appointmentFormPath = path.join(PROJECT_ROOT, "components/appointment/AppointmentForm.tsx");
  const appointmentSidebarPath = path.join(PROJECT_ROOT, "components/appointment/AppointmentSidebar.tsx");

  const contactPagePath = path.join(PROJECT_ROOT, "app/contact/page.tsx");
  const contactFormPath = path.join(PROJECT_ROOT, "components/contact/ContactForm.tsx");
  const mapEmbedPath = path.join(PROJECT_ROOT, "components/contact/MapEmbed.tsx");

  const appointmentPageContent = fs.readFileSync(appointmentPagePath, "utf-8");
  const appointmentFormContent = fs.existsSync(appointmentFormPath)
    ? fs.readFileSync(appointmentFormPath, "utf-8")
    : "";
  const appointmentSidebarContent = fs.existsSync(appointmentSidebarPath)
    ? fs.readFileSync(appointmentSidebarPath, "utf-8")
    : "";

  const contactPageContent = fs.readFileSync(contactPagePath, "utf-8");
  const contactFormContent = fs.existsSync(contactFormPath)
    ? fs.readFileSync(contactFormPath, "utf-8")
    : "";
  const mapEmbedContent = fs.existsSync(mapEmbedPath)
    ? fs.readFileSync(mapEmbedPath, "utf-8")
    : "";

  // Unified content strings for backwards and cross-component compatibility
  const appointmentContent = [
    appointmentPageContent,
    appointmentFormContent,
    appointmentSidebarContent,
  ].join("\n");

  const contactContent = [
    contactPageContent,
    contactFormContent,
    mapEmbedContent,
  ].join("\n");

  describe("Tier 1: Appointment Form Structure & Required Fields", () => {
    it("contains patient full name input with required validation", () => {
      assert.match(appointmentContent, /id=["']patientName["']/);
      assert.match(appointmentContent, /name=["']patientName["']/);
      assert.match(appointmentContent, /id=["']patientName["'][\s\S]*?required/);
    });

    it("contains Bangladeshi phone input with required validation", () => {
      assert.match(appointmentContent, /id=["']phoneNumber["']/);
      assert.match(appointmentContent, /type=["']tel["']/);
      assert.match(appointmentContent, /id=["']phoneNumber["'][\s\S]*?required/);
    });

    it("contains patient age input with min/max bounds (1-120)", () => {
      assert.match(appointmentContent, /id=["']age["']/);
      assert.match(appointmentContent, /type=["']number["']/);
      assert.match(appointmentContent, /min=["']1["']/);
      assert.match(appointmentContent, /max=["']120["']/);
    });

    it("contains gender selector with male, female, other options", () => {
      assert.match(appointmentContent, /id=["']gender["']/);
      assert.match(appointmentContent, /<option\s+value=["']male["']>/);
      assert.match(appointmentContent, /<option\s+value=["']female["']>/);
      assert.match(appointmentContent, /<option\s+value=["']other["']>/);
    });

    it("contains preferred consultation date picker and complaint textarea", () => {
      assert.match(appointmentContent, /id=["']appointmentDate["']/);
      assert.match(appointmentContent, /type=["']date["']/);
      assert.match(appointmentContent, /id=["']reason["']/);
    });

    it("contains form submit button leading to booking dispatch", () => {
      assert.match(appointmentContent, /type=["']submit["']/);
      assert.match(appointmentContent, /Submit Appointment Request/);
    });
  });

  describe("Tier 1: Tap-to-Call Sidebar on Appointment Page", () => {
    it("renders Dr. A.S.M. Rashedul Hasan chamber card", () => {
      assert.match(appointmentContent, /DOCTOR_PROFILE\.name/);
      assert.match(appointmentContent, /Chamber 201/);
    });

    it("renders direct telephone helpline for immediate booking", () => {
      assert.match(appointmentContent, /Need Immediate Booking by Phone\?/);
      assert.match(appointmentContent, /href=\{`tel:\$\{HOSPITAL_INFO\.dialPhone\}`\}/);
    });
  });

  describe("Tier 1 & Tier 2: Contact Form & Google Map Embed", () => {
    it("contains contact inquiry form with name, phone, subject, and message", () => {
      assert.match(contactContent, /id=["']contactName["']/);
      assert.match(contactContent, /id=["']contactPhone["']/);
      assert.match(contactContent, /id=["']contactSubject["']/);
      assert.match(contactContent, /id=["']contactMessage["']/);
    });

    it("contains Google Maps embed iframe pointing to K.B. Fazlul Kader Rd", () => {
      assert.match(contactContent, /<iframe[\s\S]*?title=["']Healthcare Hospital Location Map["']/);
      assert.match(contactContent, /src=["'][^"']*Fazlul\+Kader/i);
      assert.match(contactContent, /loading=["']lazy["']/);
    });

    it("renders 3 quick contact cards: Address, Reception, Emergency", () => {
      assert.match(contactContent, /Hospital Address/);
      assert.match(contactContent, /Reception & Serials/);
      assert.match(contactContent, /24\/7 Emergency Line/);
    });
  });

  describe("Tier 2: Boundary Validation Logic Integration", () => {
    it("validates that realistic form submissions satisfy phone validation", () => {
      const validSubmissions = [
        { name: "Rafiqul Islam", phone: "01712345678", age: 45, gender: "male" },
        { name: "Farhana Begum", phone: "+8801812345678", age: 32, gender: "female" },
        { name: "Kamal Hossain", phone: "01600000000", age: 60, gender: "male" },
      ];

      for (const sub of validSubmissions) {
        const phoneResult = validateBangladeshiPhone(sub.phone);
        assert.equal(phoneResult.isValid, true, `Phone ${sub.phone} must pass`);
        assert.ok(sub.age >= 1 && sub.age <= 120, "Age must be within 1-120");
        assert.ok(["male", "female", "other"].includes(sub.gender), "Gender must be valid");
      }
    });

    it("rejects invalid phone numbers entered into appointment form", () => {
      const invalidPhones = ["01012345678", "01712345", "12345678901", ""];
      for (const phone of invalidPhones) {
        const result = validateBangladeshiPhone(phone);
        assert.equal(result.isValid, false, `Phone ${phone} must fail`);
      }
    });
  });

  describe("Tier 2: Component Architecture & Confirmation Modal", () => {
    it("verifies AppointmentForm.tsx has 'use client' and Confirmation Modal with token ID", () => {
      assert.ok(fs.existsSync(appointmentFormPath), "AppointmentForm.tsx must exist");
      assert.match(appointmentFormContent, /["']use client["']/);
      assert.match(appointmentFormContent, /<Modal/);
      assert.match(appointmentFormContent, /HH-APT-/);
      assert.match(appointmentFormContent, /Our reception will call you within 30 minutes \(during working hours\) to confirm your serial token/);
    });

    it("verifies AppointmentSidebar.tsx renders chamber hours and 24/7 emergency button", () => {
      assert.ok(fs.existsSync(appointmentSidebarPath), "AppointmentSidebar.tsx must exist");
      assert.match(appointmentSidebarContent, /Saturday - Thursday: 5:00 PM - 9:00 PM/);
      assert.match(appointmentSidebarContent, /tel:\$\{HOSPITAL_INFO\.emergencyDialPhone\}/);
    });

    it("verifies ContactForm.tsx has 'use client' and inquiry confirmation feedback", () => {
      assert.ok(fs.existsSync(contactFormPath), "ContactForm.tsx must exist");
      assert.match(contactFormContent, /["']use client["']/);
      assert.match(contactFormContent, /Message Sent Successfully!/);
      assert.match(contactFormContent, /INQ-/);
    });

    it("verifies MapEmbed.tsx renders Google Maps iframe and external navigation link", () => {
      assert.ok(fs.existsSync(mapEmbedPath), "MapEmbed.tsx must exist");
      assert.match(mapEmbedContent, /Healthcare Hospital Location Map/);
      assert.match(mapEmbedContent, /maps\.google\.com/);
      assert.match(mapEmbedContent, /Open in Google Maps/);
    });
  });
});
