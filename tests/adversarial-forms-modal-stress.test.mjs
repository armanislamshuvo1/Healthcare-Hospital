import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateBangladeshiPhone } from "../lib/utils.ts";

describe("Adversarial Challenger Suite: Forms, Validation & Modal Behavior", () => {
  // =========================================================================
  // 1. ADVERSARIAL PHONE VALIDATION STRESS
  // =========================================================================
  describe("1. validateBangladeshiPhone Stress Matrix", () => {
    it("accepts all active Bangladeshi mobile operators across formats", () => {
      const operators = [
        { code: "013", name: "Skitto / Grameenphone" },
        { code: "014", name: "Banglalink" },
        { code: "015", name: "Teletalk" },
        { code: "016", name: "Airtel / Robi" },
        { code: "017", name: "Grameenphone" },
        { code: "018", name: "Robi" },
        { code: "019", name: "Banglalink" },
      ];

      for (const op of operators) {
        const raw = `${op.code}98765432`;
        const intl = `+880${raw.slice(1)}`;
        const localFormatted = `${op.code}-9876-5432`;
        const mixed = `+880 (${op.code.slice(1)}) 9876-5432`;

        const resRaw = validateBangladeshiPhone(raw);
        assert.equal(resRaw.isValid, true, `${op.name} raw must pass`);
        assert.equal(resRaw.normalized, raw);

        const resIntl = validateBangladeshiPhone(intl);
        assert.equal(resIntl.isValid, true, `${op.name} intl must pass`);
        assert.equal(resIntl.normalized, raw);

        const resLocal = validateBangladeshiPhone(localFormatted);
        assert.equal(resLocal.isValid, true, `${op.name} formatted must pass`);
        assert.equal(resLocal.normalized, raw);

        const resMixed = validateBangladeshiPhone(mixed);
        assert.equal(resMixed.isValid, true, `${op.name} mixed parens must pass`);
        assert.equal(resMixed.normalized, raw);
      }
    });

    it("rejects non-existent or defunct operator prefixes", () => {
      const invalidPrefixes = ["010", "011", "012", "020", "021", "031"];
      for (const prefix of invalidPrefixes) {
        const num = `${prefix}12345678`;
        const res = validateBangladeshiPhone(num);
        assert.equal(res.isValid, false, `Prefix ${prefix} must fail`);
        assert.ok(res.error);
      }
    });

    it("rejects boundary length mutations", () => {
      const lengths = [
        { val: "", name: "empty" },
        { val: " ", name: "single space" },
        { val: "017", name: "3 digits" },
        { val: "01712345", name: "8 digits" },
        { val: "017123456", name: "9 digits" },
        { val: "0171234567", name: "10 digits with leading 0" },
        { val: "017123456789", name: "12 digits with leading 0" },
        { val: "01712345678901234567890", name: "23 digits" },
        { val: "0".repeat(5000), name: "5000 zeros" },
      ];

      for (const item of lengths) {
        const res = validateBangladeshiPhone(item.val);
        assert.equal(res.isValid, false, `${item.name} must fail`);
        assert.ok(res.error);
      }
    });

    it("safely rejects SQL injection, XSS, and command injection strings", () => {
      const hostilePayloads = [
        "' OR '1'='1",
        "admin' --",
        "1; DROP TABLE appointments;--",
        "<script>alert(document.cookie)</script>",
        "<img src=x onerror=alert(1)>",
        "javascript:alert(1)",
        "01712345678; rm -rf /",
        "01712345678`cat /etc/passwd`",
        "$(whoami)",
        "01712345678\0injection",
        "01712345678%00",
        "01712345678<svg/onload=alert(1)>",
      ];

      for (const payload of hostilePayloads) {
        const res = validateBangladeshiPhone(payload);
        assert.equal(res.isValid, false, `Payload [${payload}] must fail validation`);
        assert.ok(res.error);
      }
    });

    it("rejects forbidden punctuation and symbols", () => {
      const symbolInputs = [
        "017.1234.5678", // dots
        "017/1234/5678", // slashes
        "017#1234#5678", // hash
        "017*1234*5678", // asterisk
        "017$1234$5678", // dollar
        "017@1234@5678", // at
        "017+1234+5678", // misplaced plus
        "++8801712345678", // double plus
        "+88001712345678", // plus 880 followed by extra 0
      ];

      for (const input of symbolInputs) {
        const res = validateBangladeshiPhone(input);
        assert.equal(res.isValid, false, `Symbol input [${input}] must fail validation`);
      }
    });
  });

  // =========================================================================
  // 2. APPOINTMENT FORM VALIDATION LOGIC REPLICATION & STRESS
  // =========================================================================
  describe("2. Appointment Form Field Validators Stress", () => {
    // Replicate exact validation functions from AppointmentForm.tsx
    const validatePatientName = (value) => {
      if (!value.trim()) return "Patient name is required.";
      if (value.trim().length < 2) return "Patient name must be at least 2 characters.";
      if (!/^[a-zA-Z\s\.\-']+$/.test(value)) return "Please enter a valid patient name.";
      return undefined;
    };

    const validateAge = (value) => {
      if (!value || value.trim() === "") return "Age is required.";
      const ageNum = parseInt(value, 10);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        return "Please enter a valid age between 1 and 120 years.";
      }
      return undefined;
    };

    const validateGender = (value) => {
      if (!value || !["male", "female", "other"].includes(value)) {
        return "Please select a patient gender.";
      }
      return undefined;
    };

    const validateDateInTz = (value, fakeNow) => {
      if (!value) return "Appointment date is required.";
      const selected = new Date(value);
      const today = new Date(fakeNow || Date.now());
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        return "Please choose today or a future consultation date.";
      }
      return undefined;
    };

    const validateReason = (value) => {
      if (!value.trim()) return "Please describe the reason for consultation or symptoms.";
      if (value.trim().length < 5) return "Please provide at least 5 characters describing the symptoms.";
      return undefined;
    };

    describe("2.1 Patient Name Validation", () => {
      it("accepts valid Bangladeshi and international name formats", () => {
        const validNames = [
          "Mohammad Rafiq",
          "Dr. Abdul Karim",
          "Mrs. Fatema Begum",
          "Md. Ali",
          "Anne-Marie O'Connor",
          "Abu Bakar Siddique",
        ];
        for (const name of validNames) {
          assert.equal(validatePatientName(name), undefined, `Valid name [${name}] should pass`);
        }
      });

      it("rejects empty, short, and whitespace names", () => {
        assert.equal(validatePatientName(""), "Patient name is required.");
        assert.equal(validatePatientName("   "), "Patient name is required.");
        assert.equal(validatePatientName("A"), "Patient name must be at least 2 characters.");
        assert.equal(validatePatientName(" M "), "Patient name must be at least 2 characters.");
      });

      it("adversarially rejects numbers, symbols, SQLi, and XSS in name", () => {
        const invalidNames = [
          "Rafiq123",
          "User @ Hospital",
          "<script>alert(1)</script>",
          "Robert'); DROP TABLE Patients;--",
          "John Doe #1",
          "Jane/Doe",
          "Patient 🏥",
        ];
        for (const name of invalidNames) {
          assert.equal(
            validatePatientName(name),
            "Please enter a valid patient name.",
            `Hostile name [${name}] must be rejected`
          );
        }
      });
    });

    describe("2.2 Patient Age Boundary Tests", () => {
      it("accepts valid ages from 1 to 120", () => {
        const validAges = ["1", "2", "18", "45", "65", "100", "120"];
        for (const age of validAges) {
          assert.equal(validateAge(age), undefined, `Age ${age} must be valid`);
        }
      });

      it("rejects lower boundary violations (<= 0)", () => {
        const lowAges = ["0", "-1", "-50"];
        for (const age of lowAges) {
          assert.equal(
            validateAge(age),
            "Please enter a valid age between 1 and 120 years.",
            `Age ${age} must be rejected`
          );
        }
      });

      it("rejects upper boundary violations (> 120)", () => {
        const highAges = ["121", "150", "999", "99999"];
        for (const age of highAges) {
          assert.equal(
            validateAge(age),
            "Please enter a valid age between 1 and 120 years.",
            `Age ${age} must be rejected`
          );
        }
      });

      it("rejects non-numeric, empty, or malicious age values", () => {
        assert.equal(validateAge(""), "Age is required.");
        assert.equal(validateAge("   "), "Age is required.");
        assert.equal(validateAge("forty"), "Please enter a valid age between 1 and 120 years.");
        assert.equal(validateAge("<script>"), "Please enter a valid age between 1 and 120 years.");
        assert.equal(validateAge("' OR 1=1"), "Please enter a valid age between 1 and 120 years.");
      });
    });

    describe("2.3 Gender Selector Validation", () => {
      it("accepts valid genders", () => {
        assert.equal(validateGender("male"), undefined);
        assert.equal(validateGender("female"), undefined);
        assert.equal(validateGender("other"), undefined);
      });

      it("rejects empty, unselected, or tampered gender inputs", () => {
        assert.equal(validateGender(""), "Please select a patient gender.");
        assert.equal(validateGender("unknown"), "Please select a patient gender.");
        assert.equal(validateGender("MALE"), "Please select a patient gender.");
        assert.equal(validateGender("<script>"), "Please select a patient gender.");
      });
    });

    describe("2.4 Appointment Date Validation", () => {
      it("rejects empty date", () => {
        assert.equal(validateDateInTz(""), "Appointment date is required.");
      });

      it("accepts future dates", () => {
        const futureDate = "2026-11-15";
        const fakeNow = new Date("2026-10-25T12:00:00Z");
        assert.equal(validateDateInTz(futureDate, fakeNow), undefined);
      });

      it("rejects past dates", () => {
        const pastDate = "2026-10-20";
        const fakeNow = new Date("2026-10-25T12:00:00Z");
        assert.equal(
          validateDateInTz(pastDate, fakeNow),
          "Please choose today or a future consultation date."
        );
      });

      it("identifies timezone skew vulnerability on same-day bookings across offsets", () => {
        // Document empirical behavior in negative UTC offsets (e.g., UTC-5 New York)
        // new Date("2026-10-25") creates UTC midnight: 2026-10-25T00:00:00.000Z
        // If client timezone is EDT (UTC-4), local midnight is 2026-10-25T04:00:00.000Z
        // Result: selected < today evaluates to true!
        const selectedDate = new Date("2026-10-25"); // 00:00 UTC
        const edtMidnight = new Date("2026-10-25T04:00:00.000Z"); // EDT local midnight
        const isSkewed = selectedDate < edtMidnight;
        assert.equal(isSkewed, true, "Empirically demonstrates timezone comparison skew");
      });
    });

    describe("2.5 Chief Complaint / Reason Validation", () => {
      it("accepts valid symptom descriptions", () => {
        const validReasons = [
          "Fever and cough for 3 days",
          "Routine hypertension checkup",
          "Chronic back pain and fatigue",
        ];
        for (const reason of validReasons) {
          assert.equal(validateReason(reason), undefined);
        }
      });

      it("rejects empty and short descriptions (< 5 chars)", () => {
        assert.equal(
          validateReason(""),
          "Please describe the reason for consultation or symptoms."
        );
        assert.equal(
          validateReason("   "),
          "Please describe the reason for consultation or symptoms."
        );
        assert.equal(
          validateReason("flu"),
          "Please provide at least 5 characters describing the symptoms."
        );
        assert.equal(
          validateReason("pain"),
          "Please provide at least 5 characters describing the symptoms."
        );
      });

      it("accepts longer descriptions with punctuation and numbers", () => {
        assert.equal(
          validateReason("Blood pressure 140/90 mmHg, feeling dizzy in morning hours"),
          undefined
        );
      });
    });
  });

  // =========================================================================
  // 3. CONTACT FORM VALIDATOR STRESS
  // =========================================================================
  describe("3. Contact Form Field Validators Stress", () => {
    const validateEmail = (value) => {
      if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        return "Please enter a valid email address.";
      }
      return undefined;
    };

    const validateSubject = (value) => {
      if (!value.trim()) return "Subject is required.";
      if (value.trim().length < 3) return "Subject must be at least 3 characters.";
      return undefined;
    };

    const validateMessage = (value) => {
      if (!value.trim()) return "Message cannot be empty.";
      if (value.trim().length < 10) return "Message must be at least 10 characters long.";
      return undefined;
    };

    it("accepts valid email and allows optional blank email", () => {
      assert.equal(validateEmail(""), undefined, "Optional empty email should pass");
      assert.equal(validateEmail("   "), undefined, "Whitespace-only email should pass as empty");
      assert.equal(validateEmail("tanvir@example.com"), undefined);
      assert.equal(validateEmail("patient.hospital@domain.org.bd"), undefined);
    });

    it("rejects malformed email formats", () => {
      const invalidEmails = [
        "notanemail",
        "missingatsign.com",
        "@nodomain.com",
        "user@",
        "user@domain",
        "user @domain.com",
      ];
      for (const email of invalidEmails) {
        assert.equal(
          validateEmail(email),
          "Please enter a valid email address.",
          `Email [${email}] must fail`
        );
      }
    });

    it("enforces subject length constraint (>= 3 chars)", () => {
      assert.equal(validateSubject(""), "Subject is required.");
      assert.equal(validateSubject("Hi"), "Subject must be at least 3 characters.");
      assert.equal(validateSubject("OPD Inquiry"), undefined);
    });

    it("enforces message length constraint (>= 10 chars)", () => {
      assert.equal(validateMessage(""), "Message cannot be empty.");
      assert.equal(validateMessage("Short msg"), "Message must be at least 10 characters long.");
      assert.equal(
        validateMessage("I would like to inquire about medicine OPD timings."),
        undefined
      );
    });
  });

  // =========================================================================
  // 4. CONFIRMATION MODAL STATE TRANSITION & DISMISS RESET HARNESS
  // =========================================================================
  describe("4. Modal Confirmation & State Reset State Machine", () => {
    const INITIAL_FORM = {
      patientName: "",
      phoneNumber: "",
      age: "",
      gender: "",
      appointmentDate: "",
      reason: "",
    };

    // State machine simulator
    class AppointmentFormStateMachine {
      constructor() {
        this.formData = { ...INITIAL_FORM };
        this.errors = {};
        this.touched = {};
        this.isSubmitting = false;
        this.confirmedBooking = null;
        this.isModalOpen = false;
      }

      setField(field, value) {
        this.formData[field] = value;
        this.touched[field] = true;
      }

      submit(now = new Date()) {
        // Mark all touched
        this.touched = {
          patientName: true,
          phoneNumber: true,
          age: true,
          gender: true,
          appointmentDate: true,
          reason: true,
        };

        const phoneRes = validateBangladeshiPhone(this.formData.phoneNumber);
        const nameValid =
          this.formData.patientName.trim().length >= 2 &&
          /^[a-zA-Z\s\.\-']+$/.test(this.formData.patientName);
        const ageNum = parseInt(this.formData.age, 10);
        const ageValid = !isNaN(ageNum) && ageNum >= 1 && ageNum <= 120;
        const genderValid = ["male", "female", "other"].includes(this.formData.gender);
        const dateValid = Boolean(this.formData.appointmentDate);
        const reasonValid = this.formData.reason.trim().length >= 5;

        if (!phoneRes.isValid || !nameValid || !ageValid || !genderValid || !dateValid || !reasonValid) {
          this.errors = {
            name: !nameValid ? "Invalid name" : undefined,
            phone: !phoneRes.isValid ? "Invalid phone" : undefined,
            age: !ageValid ? "Invalid age" : undefined,
            gender: !genderValid ? "Invalid gender" : undefined,
            date: !dateValid ? "Invalid date" : undefined,
            reason: !reasonValid ? "Invalid reason" : undefined,
          };
          return false;
        }

        this.isSubmitting = true;

        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const dateStamp = this.formData.appointmentDate.replace(/-/g, "").slice(2);
        const generatedToken = `HH-APT-${dateStamp}-${randomSuffix}`;

        this.confirmedBooking = {
          token: generatedToken,
          patientName: this.formData.patientName.trim(),
          phoneNumber: this.formData.phoneNumber.trim(),
          age: this.formData.age.trim(),
          gender: this.formData.gender,
          appointmentDate: this.formData.appointmentDate,
          reason: this.formData.reason.trim(),
          submittedAt: "05:00 PM",
        };

        this.isSubmitting = false;
        this.isModalOpen = true;
        return true;
      }

      closeModal() {
        this.isModalOpen = false;
        this.confirmedBooking = null;
        this.formData = { ...INITIAL_FORM };
        this.errors = {};
        this.touched = {};
      }
    }

    it("generates deterministic format token and transitions to open modal on valid submit", () => {
      const machine = new AppointmentFormStateMachine();
      machine.setField("patientName", "Mohammad Rafiq");
      machine.setField("phoneNumber", "01600000000");
      machine.setField("age", "45");
      machine.setField("gender", "male");
      machine.setField("appointmentDate", "2026-10-30");
      machine.setField("reason", "Follow-up for hypertension consultation");

      const success = machine.submit();
      assert.equal(success, true, "Submission must succeed");
      assert.equal(machine.isModalOpen, true, "Modal must be open");
      assert.ok(machine.confirmedBooking, "Booking must be populated");
      assert.match(
        machine.confirmedBooking.token,
        /^HH-APT-261030-\d{4}$/,
        "Token format must be HH-APT-YYMMDD-XXXX"
      );
      assert.equal(machine.confirmedBooking.patientName, "Mohammad Rafiq");
      assert.equal(machine.confirmedBooking.phoneNumber, "01600000000");
    });

    it("resets form data, errors, and touched states completely on closeModal() dismiss", () => {
      const machine = new AppointmentFormStateMachine();
      machine.setField("patientName", "Mohammad Rafiq");
      machine.setField("phoneNumber", "01600000000");
      machine.setField("age", "45");
      machine.setField("gender", "male");
      machine.setField("appointmentDate", "2026-10-30");
      machine.setField("reason", "Follow-up for hypertension consultation");

      machine.submit();
      assert.equal(machine.isModalOpen, true);

      // Trigger dismiss
      machine.closeModal();

      assert.equal(machine.isModalOpen, false, "Modal must be closed");
      assert.equal(machine.confirmedBooking, null, "Confirmed booking must be cleared");
      assert.deepEqual(machine.formData, INITIAL_FORM, "Form data must reset to INITIAL_FORM");
      assert.deepEqual(machine.errors, {}, "Errors must be emptied");
      assert.deepEqual(machine.touched, {}, "Touched map must be emptied");
    });

    it("does not open modal when validation fails on invalid submission", () => {
      const machine = new AppointmentFormStateMachine();
      machine.setField("patientName", "R"); // Too short
      machine.setField("phoneNumber", "12345"); // Invalid phone
      machine.setField("age", "0"); // Invalid age

      const success = machine.submit();
      assert.equal(success, false, "Submission must be blocked");
      assert.equal(machine.isModalOpen, false, "Modal must remain closed");
      assert.equal(machine.confirmedBooking, null);
      assert.ok(machine.errors.name);
      assert.ok(machine.errors.phone);
      assert.ok(machine.errors.age);
    });

    it("generates unique random tokens across 100 consecutive bookings", () => {
      const tokens = new Set();
      for (let i = 0; i < 100; i++) {
        const machine = new AppointmentFormStateMachine();
        machine.setField("patientName", "Patient Test Name");
        machine.setField("phoneNumber", "01712345678");
        machine.setField("age", "30");
        machine.setField("gender", "female");
        machine.setField("appointmentDate", "2026-10-30");
        machine.setField("reason", "General medicine consult");
        machine.submit();
        tokens.add(machine.confirmedBooking.token);
      }
      // With 9000 possible suffixes, 100 draws should have almost zero collisions (>= 98 unique)
      assert.ok(tokens.size >= 98, `Tokens generated must be highly unique (found ${tokens.size})`);
    });
  });
});
