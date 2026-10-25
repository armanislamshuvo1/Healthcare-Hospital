"use client";

import React, { useState, useId } from "react";
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  User,
  Clock,
  Phone,
  FileText,
  ShieldCheck,
  Check,
  X,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { validateBangladeshiPhone, cn } from "@/lib/utils";
import { DOCTOR_PROFILE, HOSPITAL_INFO } from "@/lib/constants";
import { AppointmentFormData } from "@/types";

interface FormErrors {
  patientName?: string;
  phoneNumber?: string;
  age?: string;
  gender?: string;
  appointmentDate?: string;
  reason?: string;
}

interface ConfirmedBooking {
  token: string;
  patientName: string;
  phoneNumber: string;
  age: string;
  gender: string;
  appointmentDate: string;
  reason: string;
  submittedAt: string;
}

const INITIAL_FORM: AppointmentFormData = {
  patientName: "",
  phoneNumber: "",
  age: "",
  gender: "",
  appointmentDate: "",
  reason: "",
};

export function AppointmentForm() {
  const [formData, setFormData] = useState<AppointmentFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionNotification, setSubmissionNotification] = useState<{
    show: boolean;
    token: string;
    patientName: string;
    phoneNumber: string;
  } | null>(null);

  // Compute today's date in YYYY-MM-DD for min attribute
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
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (
    field: keyof AppointmentFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all touched
    const allTouched: Record<string, boolean> = {
      patientName: true,
      phoneNumber: true,
      age: true,
      gender: true,
      appointmentDate: true,
      reason: true,
    };
    setTouched(allTouched);

    // Validate all
    const newErrors: FormErrors = {
      patientName: validateField("patientName", formData.patientName),
      phoneNumber: validateField("phoneNumber", formData.phoneNumber),
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

    // Genuine state transition & token generation
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStamp = formData.appointmentDate.replace(/-/g, "").slice(2);
    const generatedToken = `HH-APT-${dateStamp}-${randomSuffix}`;

    const booking: ConfirmedBooking = {
      token: generatedToken,
      patientName: formData.patientName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      age: formData.age.trim(),
      gender: formData.gender,
      appointmentDate: formData.appointmentDate,
      reason: formData.reason.trim(),
      submittedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setConfirmedBooking(booking);
    setSubmissionNotification({
      show: true,
      token: booking.token,
      patientName: booking.patientName,
      phoneNumber: booking.phoneNumber,
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
      {/* Floating Notification Toast */}
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
                Serial registered for {submissionNotification.patientName}. Staff will call {submissionNotification.phoneNumber} within 30 min (working hours).
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

      {/* Persistent Inline Notification Banner */}
      {submissionNotification?.show && (
        <div className="mb-6 p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-start justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-teal-950 text-sm">
                Request Registered for {submissionNotification.patientName}
              </p>
              <p className="text-teal-800">
                Your serial token is <strong className="font-mono text-teal-950">{submissionNotification.token}</strong>. Our reception desk will call {submissionNotification.phoneNumber} during working hours.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSubmissionNotification(null)}
            className="text-teal-700 hover:text-teal-900 p-1"
            title="Dismiss notification banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
          <h2 className="text-xl font-bold text-slate-900">
            Patient Consultation Request Form
          </h2>
          <Badge variant="teal" size="sm">
            Direct OPD Chamber
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Please fill out the patient information below. Our reception will contact you to confirm your serial token.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
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
              aria-invalid={Boolean(touched.patientName && errors.patientName)}
              aria-describedby={touched.patientName && errors.patientName ? "patientName-error" : undefined}
            />
            {touched.patientName && errors.patientName && (
              <p id="patientName-error" className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.patientName}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label htmlFor="phoneNumber" className="block text-xs font-bold text-slate-700">
              Bangladeshi Mobile Number <span className="text-red-500">*</span>
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
              aria-invalid={Boolean(touched.phoneNumber && errors.phoneNumber)}
              aria-describedby={touched.phoneNumber && errors.phoneNumber ? "phoneNumber-error" : undefined}
            />
            {touched.phoneNumber && errors.phoneNumber ? (
              <p id="phoneNumber-error" className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.phoneNumber}</span>
              </p>
            ) : (
              <span className="block text-[11px] text-slate-500">
                Valid 11-digit mobile number (e.g. 01600000000)
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
              aria-invalid={Boolean(touched.age && errors.age)}
              aria-describedby={touched.age && errors.age ? "age-error" : undefined}
            />
            {touched.age && errors.age && (
              <p id="age-error" className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
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
              aria-invalid={Boolean(touched.gender && errors.gender)}
              aria-describedby={touched.gender && errors.gender ? "gender-error" : undefined}
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {touched.gender && errors.gender && (
              <p id="gender-error" className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.gender}</span>
              </p>
            )}
          </div>
        </div>

        {/* Preferred Date */}
        <div className="space-y-1.5">
          <label htmlFor="appointmentDate" className="block text-xs font-bold text-slate-700">
            Preferred Consultation Date <span className="text-red-500">*</span>
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
            aria-invalid={Boolean(touched.appointmentDate && errors.appointmentDate)}
            aria-describedby={touched.appointmentDate && errors.appointmentDate ? "appointmentDate-error" : undefined}
          />
          {touched.appointmentDate && errors.appointmentDate ? (
            <p id="appointmentDate-error" className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.appointmentDate}</span>
            </p>
          ) : (
            <span className="block text-[11px] text-slate-500">
              Doctor chamber operates Saturday - Thursday (5:00 PM - 9:00 PM)
            </span>
          )}
        </div>

        {/* Reason for Visit */}
        <div className="space-y-1.5">
          <label htmlFor="reason" className="block text-xs font-bold text-slate-700">
            Chief Complaint / Medical Concerns <span className="text-red-500">*</span>
          </label>
          <textarea
            id="reason"
            name="reason"
            rows={3}
            required
            placeholder="Briefly describe the symptoms (e.g. fever for 4 days, chest tightness, high blood sugar checkup)..."
            value={formData.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
            onBlur={() => handleBlur("reason")}
            className={cn(
              "w-full px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-all resize-none",
              touched.reason && errors.reason
                ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
            )}
            aria-invalid={Boolean(touched.reason && errors.reason)}
            aria-describedby={touched.reason && errors.reason ? "reason-error" : undefined}
          />
          {touched.reason && errors.reason && (
            <p id="reason-error" className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.reason}</span>
            </p>
          )}
        </div>

        {/* Submit CTA */}
        <div className="pt-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto px-8"
            disabled={isSubmitting}
          >
            <Calendar className="w-5 h-5" />
            <span>{isSubmitting ? "Processing Request..." : "Submit Appointment Request"}</span>
          </Button>
        </div>
      </form>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Appointment Request Confirmed"
        description="Your chamber serial request has been submitted to Healthcare Hospital reception."
      >
        {confirmedBooking && (
          <div className="space-y-4 pt-1">
            {/* Success Banner */}
            <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-teal-950 text-sm">
                  Serial Request Registered
                </p>
                <p className="text-teal-800 leading-relaxed text-[11px] sm:text-xs">
                  Our reception will call you within 30 minutes (during working hours) to confirm your serial token.
                </p>
              </div>
            </div>

            {/* Token Highlight Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Reference / Token ID
              </span>
              <div className="text-xl sm:text-2xl font-black text-teal-700 tracking-tight font-mono">
                {confirmedBooking.token}
              </div>
              <p className="text-[10.5px] text-slate-500">
                Please quote this token number when you arrive at Chamber 201 reception desk.
              </p>
            </div>

            {/* Booking Details Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs border-y border-slate-100 py-2.5">
              <div>
                <span className="text-slate-500 block text-[10.5px]">Patient Name</span>
                <span className="font-bold text-slate-900">{confirmedBooking.patientName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Contact Number</span>
                <span className="font-bold text-slate-900">{confirmedBooking.phoneNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Age / Gender</span>
                <span className="font-bold text-slate-900 capitalize">
                  {confirmedBooking.age} yrs • {confirmedBooking.gender}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Consultant Doctor</span>
                <span className="font-bold text-teal-800">{DOCTOR_PROFILE.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Requested Date</span>
                <span className="font-bold text-slate-900">{confirmedBooking.appointmentDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Chamber Time</span>
                <span className="font-bold text-slate-900">5:00 PM - 9:00 PM</span>
              </div>
            </div>

            {/* Notice Section */}
            <div className="text-xs text-slate-600 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 space-y-1">
              <p className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Next Steps:</span>
              </p>
              <p className="text-amber-800 leading-relaxed text-[11px]">
                Our reception desk will call you at <strong className="text-amber-950">{confirmedBooking.phoneNumber}</strong> to verify chamber serial sequence and provide your estimated consultation time.
              </p>
            </div>

            {/* Close / Done Action */}
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
