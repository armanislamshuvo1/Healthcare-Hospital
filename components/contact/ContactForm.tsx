"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { validateBangladeshiPhone, cn } from "@/lib/utils";

interface ContactErrors {
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface SubmittedInquiry {
  id: string;
  name: string;
  phone: string;
  subject: string;
  time: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    contactSubject: "",
    contactMessage: "",
    hpField: "",
  });

  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<SubmittedInquiry | null>(null);

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "contactName":
        if (!value.trim()) return "Your name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return undefined;

      case "contactPhone": {
        const phoneRes = validateBangladeshiPhone(value);
        if (!phoneRes.isValid) {
          return phoneRes.error || "Enter a valid 11-digit Bangladeshi mobile number.";
        }
        return undefined;
      }

      case "contactEmail":
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address.";
        }
        return undefined;

      case "contactSubject":
        if (!value.trim()) return "Subject is required.";
        if (value.trim().length < 3) return "Subject must be at least 3 characters.";
        return undefined;

      case "contactMessage":
        if (!value.trim()) return "Message cannot be empty.";
        if (value.trim().length < 10) return "Message must be at least 10 characters long.";
        return undefined;

      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field: string, value: string) => {
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
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmittedInquiry({
          id: `INQ-${Date.now().toString().slice(-6)}`,
          name: formData.contactName,
          phone: formData.contactPhone,
          subject: formData.contactSubject,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
      }, 500);
      return;
    }

    const allTouched = {
      contactName: true,
      contactPhone: true,
      contactEmail: true,
      contactSubject: true,
      contactMessage: true,
    };
    setTouched(allTouched);

    const newErrors: ContactErrors = {
      name: validateField("contactName", formData.contactName),
      phone: validateField("contactPhone", formData.contactPhone),
      email: validateField("contactEmail", formData.contactEmail),
      subject: validateField("contactSubject", formData.contactSubject),
      message: validateField("contactMessage", formData.contactMessage),
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.phone || newErrors.email || newErrors.subject || newErrors.message) {
      return;
    }

    setIsSubmitting(true);

    const inquiryId = `INQ-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const inquiry: SubmittedInquiry = {
      id: inquiryId,
      name: formData.contactName.trim(),
      phone: formData.contactPhone.trim(),
      subject: formData.contactSubject.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setSubmittedInquiry(inquiry);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setSubmittedInquiry(null);
    setFormData({
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      contactSubject: "",
      contactMessage: "",
      hpField: "",
    });
    setErrors({});
    setTouched({});
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-xl font-bold text-slate-900">Send an Inquiry</h2>
        <p className="text-xs text-slate-600 mt-1">
          Have a question about our services or need general hospital information? Send us a message.
        </p>
      </div>

      {submittedInquiry ? (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="p-5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-bold text-base text-teal-950">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-teal-800">
                  Reference Tracking ID: <span className="font-mono font-bold">{submittedInquiry.id}</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-teal-800 leading-relaxed pt-1">
              Thank you, <strong className="text-teal-950">{submittedInquiry.name}</strong>. Our hospital reception desk has received your inquiry regarding <em>&quot;{submittedInquiry.subject}&quot;</em> and will contact you back at <strong className="text-teal-950">{submittedInquiry.phone}</strong>.
            </p>
          </div>

          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleReset}
              className="inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Send Another Inquiry</span>
            </Button>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Honeypot Spam Protection */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="hp_contact_url">Leave empty</label>
            <input
              id="hp_contact_url"
              name="hp_contact_url"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.hpField}
              onChange={(e) => handleChange("hpField", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="contactName" className="block text-xs font-bold text-slate-700">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                placeholder="e.g. Tanvir Ahmed"
                required
                value={formData.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
                onBlur={() => handleBlur("contactName")}
                className={cn(
                  "w-full h-11 px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-all",
                  touched.contactName && errors.name
                    ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                    : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                )}
              />
              {touched.contactName && errors.name && (
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <label htmlFor="contactPhone" className="block text-xs font-bold text-slate-700">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                placeholder="016XXXXXXXX"
                required
                value={formData.contactPhone}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
                onBlur={() => handleBlur("contactPhone")}
                className={cn(
                  "w-full h-11 px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-all",
                  touched.contactPhone && errors.phone
                    ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                    : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                )}
              />
              {touched.contactPhone && errors.phone && (
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>

          {/* Email (Optional) */}
          <div className="space-y-1.5">
            <label htmlFor="contactEmail" className="block text-xs font-bold text-slate-700">
              Email Address <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              placeholder="e.g. tanvir@example.com"
              value={formData.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              onBlur={() => handleBlur("contactEmail")}
              className={cn(
                "w-full h-11 px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-all",
                touched.contactEmail && errors.email
                  ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              )}
            />
            {touched.contactEmail && errors.email && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label htmlFor="contactSubject" className="block text-xs font-bold text-slate-700">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="contactSubject"
              name="contactSubject"
              type="text"
              placeholder="e.g. Inpatient admission inquiry"
              required
              value={formData.contactSubject}
              onChange={(e) => handleChange("contactSubject", e.target.value)}
              onBlur={() => handleBlur("contactSubject")}
              className={cn(
                "w-full h-11 px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-all",
                touched.contactSubject && errors.subject
                  ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              )}
            />
            {touched.contactSubject && errors.subject && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.subject}</span>
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label htmlFor="contactMessage" className="block text-xs font-bold text-slate-700">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="contactMessage"
              name="contactMessage"
              rows={4}
              placeholder="Write your message here..."
              required
              value={formData.contactMessage}
              onChange={(e) => handleChange("contactMessage", e.target.value)}
              onBlur={() => handleBlur("contactMessage")}
              className={cn(
                "w-full px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-all resize-none",
                touched.contactMessage && errors.message
                  ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              )}
            />
            {touched.contactMessage && errors.message && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Sending..." : "Send Inquiry Message"}</span>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
