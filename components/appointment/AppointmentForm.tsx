"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  User,
  Clock,
  Phone,
  FileText,
  Mail,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { validateBangladeshiPhone, cn } from "@/lib/utils";
import { DOCTOR_PROFILE, HOSPITAL_INFO } from "@/lib/constants";
import { AppointmentFormData, AppointmentRequestRecord } from "@/types";

interface FormErrors {
  patientName?: string;
  phoneNumber?: string;
  email?: string;
  age?: string;
  gender?: string;
  appointmentDate?: string;
  reason?: string;
}

const INITIAL_FORM: AppointmentFormData = {
  patientName: "",
  phoneNumber: "",
  email: "",
  age: "",
  gender: "",
  appointmentDate: "",
  reason: "",
  hpField: "",
};

export function AppointmentForm() {
  const [formData, setFormData] = useState<AppointmentFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentRequestRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionNotification, setSubmissionNotification] = useState<{
    show: boolean;
    token: string;
    patientName: string;
    phoneNumber: string;
  } | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];

  const validateField = (name: keyof AppointmentFormData, value: string): string | undefined => {
    switch (name) {
      case "patientName":
        if (!value.trim()) return "Patient name is required.";
        if (value.trim().length < 2) return "Patient name must be at least 2 characters.";
        if (!/^[a-zA-Z\s\.\-']+$/.test(value)) return "Please enter a valid patient name.";
        return undefined;

      case "phoneNumber": {
        const phoneResult = validateBangladeshiPhone(value);
        if (!phoneResult.isValid) {
          return phoneResult.error || "Enter a valid 11-digit Bangladeshi mobile number.";
        }
        return undefined;
      }

      case "email":
        if (value && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address.";
        }
        return undefined;

      case "age": {
        if (!value || value.trim() === "") return "Age is required.";
        const ageNum = parseInt(value, 10);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
          return "Please enter a valid age between 1 and 120 years.";
        }
        return undefined;
      }

      case "gender":
        if (!value || !["male", "female", "other"].includes(value)) {
          return "Please select a patient gender.";
        }
        return undefined;

      case "appointmentDate": {
        if (!value) return "Appointment date is required.";
        const selected = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          return "Please choose today or a future consultation date.";
        }
        return undefined;
      }

      case "reason":
        if (!value.trim()) return "Please describe the reason for consultation or symptoms.";
        if (value.trim().length < 5) return "Please provide at least 5 characters describing the symptoms.";
        return undefined;

      default:
        return undefined;
    }
  };

  const handleBlur = (field: keyof AppointmentFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field] || "");
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam defense check
    if (formData.hpField && formData.hpField.trim().length > 0) {
      // Bot detected, silently absorb
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsModalOpen(true);
      }, 500);
      return;
    }

    const allTouched: Record<string, boolean> = {
      patientName: true,
      phoneNumber: true,
      age: true,
      gender: true,
      appointmentDate: true,
      reason: true,
    };
    setTouched(allTouched);

    const newErrors: FormErrors = {
      patientName: validateField("patientName", formData.patientName),
      phoneNumber: validateField("phoneNumber", formData.phoneNumber),
      email: validateField("email", formData.email || ""),
      age: validateField("age", formData.age),
      gender: validateField("gender", formData.gender),
      appointmentDate: validateField("appointmentDate", formData.appointmentDate),
      reason: validateField("reason", formData.reason),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => !!err);
    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStamp = formData.appointmentDate.replace(/-/g, "").slice(2);
    const generatedToken = `HH-APT-${dateStamp}-${randomSuffix}`;

    const record: AppointmentRequestRecord = {
      id: `req-${Date.now()}-${randomSuffix}`,
      token: generatedToken,
      patientName: formData.patientName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      email: formData.email ? formData.email.trim() : undefined,
      age: formData.age.trim(),
      gender: formData.gender,
      appointmentDate: formData.appointmentDate,
      reason: formData.reason.trim(),
      doctorName: DOCTOR_PROFILE.name,
      status: "Called",
      submittedAt: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Save to localStorage for Mr. Anwar Kamal's Admin panel
    if (typeof window !== "undefined") {
      try {
        const existing = JSON.parse(localStorage.getItem("hh_appointment_records") || "[]");
        existing.unshift(record);
        localStorage.setItem("hh_appointment_records", JSON.stringify(existing));
      } catch (err) {
        console.error("Storage error:", err);
      }
    }

    setConfirmedBooking(record);
    setSubmissionNotification({
      show: true,
      token: record.token,
      patientName: record.patientName,
      phoneNumber: record.phoneNumber,
    });
    setIsSubmitting(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setConfirmedBooking(null);
    setFormData(INITIAL_FORM);
    setErrors({});
    setTouched({});
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs relative">
      {/* Toast Notification */}
      {submissionNotification?.show && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full bg-white rounded-xl shadow-2xl border border-teal-200 p-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex-1 text-xs">
              <p className="font-bold text-slate-900 text-sm">Appointment Requested!</p>
              <p className="text-teal-700 font-mono font-bold mt-0.5">Token: {submissionNotification.token}</p>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Hospital staff will call {submissionNotification.phoneNumber} to confirm your serial time.
              </p>
            </div>
            <button
              onClick={() => setSubmissionNotification(null)}
              className="text-slate-400 hover:text-slate-600 p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
          <h2 className="text-xl font-bold text-slate-900">
            Consultation Request Form
          </h2>
          <Badge variant="teal" size="sm">
            Dr. A.S.M. Rashedul Hasan (Medicine)
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Please provide the patient details. Our reception desk will call you to confirm your chamber serial token.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {/* Invisible Honeypot Field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_source_url">Leave empty</label>
          <input
            id="website_source_url"
            name="website_source_url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.hpField}
            onChange={(e) => handleChange("hpField", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Patient Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="patientName" className="block text-xs font-bold text-slate-700">
              Patient Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="patientName"
              name="patientName"
              type="text"
              placeholder="e.g. Mohammad Rafiq"
              required
              value={formData.patientName}
              onChange={(e) => handleChange("patientName", e.target.value)}
              onBlur={() => handleBlur("patientName")}
              className={cn(
                "w-full h-11 px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-all",
                touched.patientName && errors.patientName
                  ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              )}
            />
            {touched.patientName && errors.patientName && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.patientName}</span>
              </p>
            )}
          </div>

          {/* Bangladeshi Mobile Number */}
          <div className="space-y-1.5">
            <label htmlFor="phoneNumber" className="block text-xs font-bold text-slate-700">
              Mobile Number (01XXXXXXXXX) <span className="text-red-500">*</span>
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="016XXXXXXXX"
              required
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              onBlur={() => handleBlur("phoneNumber")}
              className={cn(
                "w-full h-11 px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-all",
                touched.phoneNumber && errors.phoneNumber
                  ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              )}
            />
            {touched.phoneNumber && errors.phoneNumber ? (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.phoneNumber}</span>
              </p>
            ) : (
              <span className="block text-[11px] text-slate-500">
                Staff will call this number to confirm the booking
              </span>
            )}
          </div>

          {/* Age */}
          <div className="space-y-1.5">
            <label htmlFor="age" className="block text-xs font-bold text-slate-700">
              Patient Age (Years) <span className="text-red-500">*</span>
            </label>
            <input
              id="age"
              name="age"
              type="number"
              placeholder="e.g. 42"
              min="1"
              max="120"
              required
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
              onBlur={() => handleBlur("age")}
              className={cn(
                "w-full h-11 px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-all",
                touched.age && errors.age
                  ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              )}
            />
            {touched.age && errors.age && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.age}</span>
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label htmlFor="gender" className="block text-xs font-bold text-slate-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              onBlur={() => handleBlur("gender")}
              className={cn(
                "w-full h-11 px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm focus:outline-none transition-all",
                touched.gender && errors.gender
                  ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              )}
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {touched.gender && errors.gender && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.gender}</span>
              </p>
            )}
          </div>
        </div>

        {/* Date and Optional Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="appointmentDate" className="block text-xs font-bold text-slate-700">
              Preferred Date <span className="text-red-500">*</span>
            </label>
            <input
              id="appointmentDate"
              name="appointmentDate"
              type="date"
              min={todayStr}
              required
              value={formData.appointmentDate}
              onChange={(e) => handleChange("appointmentDate", e.target.value)}
              onBlur={() => handleBlur("appointmentDate")}
              className={cn(
                "w-full h-11 px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm focus:outline-none transition-all",
                touched.appointmentDate && errors.appointmentDate
                  ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              )}
            />
            {touched.appointmentDate && errors.appointmentDate ? (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.appointmentDate}</span>
              </p>
            ) : (
              <span className="block text-[11px] text-slate-500">
                Chamber hours: Sat - Thu (5:00 PM - 9:00 PM)
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-bold text-slate-700">
              Email Address <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. rafiq@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={cn(
                "w-full h-11 px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-all",
                touched.email && errors.email
                  ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              )}
            />
            {touched.email && errors.email && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>
        </div>

        {/* Reason for Visit */}
        <div className="space-y-1.5">
          <label htmlFor="reason" className="block text-xs font-bold text-slate-700">
            Chief Medical Concern / Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            id="reason"
            name="reason"
            rows={3}
            required
            placeholder="Briefly state symptoms (e.g. fever for 3 days, chest tightness, routine blood sugar checkup)..."
            value={formData.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
            onBlur={() => handleBlur("reason")}
            className={cn(
              "w-full px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-all resize-none",
              touched.reason && errors.reason
                ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
            )}
          />
          {touched.reason && errors.reason && (
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.reason}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto px-8"
            disabled={isSubmitting}
          >
            <Calendar className="w-5 h-5" />
            <span>{isSubmitting ? "Submitting Request..." : "Submit Appointment Request"}</span>
          </Button>
          <span className="text-xs text-slate-500">
            Protected by anti-spam honeypot
          </span>
        </div>
      </form>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Appointment Request Received"
        description="Your consultation serial request has been logged in the hospital system."
      >
        {confirmedBooking && (
          <div className="space-y-4 pt-1">
            <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-teal-950 text-sm">
                  Thank You, {confirmedBooking.patientName}
                </p>
                <p className="text-teal-800 leading-relaxed text-[11px] sm:text-xs">
                  Our reception will call you within 30 minutes (during working hours) to confirm your serial token. Quote this token ID at the chamber desk.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Reference / Token ID
              </span>
              <div className="text-xl sm:text-2xl font-black text-teal-700 tracking-tight font-mono">
                {confirmedBooking.token}
              </div>
              <p className="text-[10.5px] text-slate-500">
                Saved to hospital admin queue. Quote this serial upon arrival.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs border-y border-slate-100 py-2.5">
              <div>
                <span className="text-slate-500 block text-[10.5px]">Patient Name</span>
                <span className="font-bold text-slate-900">{confirmedBooking.patientName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Contact Phone</span>
                <span className="font-bold text-slate-900">{confirmedBooking.phoneNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Doctor</span>
                <span className="font-bold text-teal-800">{DOCTOR_PROFILE.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Preferred Date</span>
                <span className="font-bold text-slate-900">{confirmedBooking.appointmentDate}</span>
              </div>
            </div>

            <div className="pt-1 flex justify-end">
              <Button
                type="button"
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                onClick={handleCloseModal}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
