import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, FileText, ArrowLeft, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { HOSPITAL_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Healthcare Hospital Chattogram",
  description:
    "Patient data handling policy for Healthcare Hospital Chattogram. We do not store confidential medical records on our public site and retain appointment request data only as long as needed.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-14 sm:py-18">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <Badge variant="teal" size="sm">
            Regulatory Compliance & Patient Privacy
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Healthcare Hospital Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Last Updated: October 2026 • K.B. Fazlul Kader Rd, Chattogram 4203
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate max-w-none space-y-8 text-sm leading-relaxed text-slate-700">
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Core Privacy Guarantee (Developer Brief Compliance):</strong> Healthcare Hospital maintains <strong>no patient medical records</strong> on the site. All patient consultation requests are treated with strict confidentiality, and we do not store electronic health records or diagnosis histories on this public web application.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. Information We Collect</h2>
            <p>
              When requesting an Outpatient Department (OPD) consultation serial or submitting a general inquiry through our website, we collect minimal operational information:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-xs sm:text-sm">
              <li>Patient Full Name</li>
              <li>Bangladeshi Mobile Phone Number (for verbal booking verification)</li>
              <li>Patient Age and Gender (to facilitate OPD triage)</li>
              <li>Preferred Consultation Date</li>
              <li>Brief Chief Medical Concern / Reason for Visit</li>
              <li>Optional Email Address (if provided)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. How We Use Patient Contact Data</h2>
            <p>
              Your contact data is strictly used by Mr. Anwar Kamal (Hospital Manager) and reception desk staff to:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-xs sm:text-sm">
              <li>Call you to verify your doctor appointment serial token.</li>
              <li>Inform you of doctor schedule adjustments or emergency ward delays.</li>
              <li>Answer general inquiries regarding hospital admission and wards.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Data Retention Period</h2>
            <p>
              In accordance with Section 110 of the Hospital Developer Brief, appointment request data is retained in our temporary administrative queue only as long as necessary to confirm your visit, after which records are archived and deleted from website storage.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. Spam Protection & Security</h2>
            <p>
              Our forms are secured against automated spam through non-invasive honeypot verification. We do not sell, rent, or distribute patient contact details to any third-party marketing services.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Hospital Governance & Contact</h2>
            <p>
              If you have any questions regarding your contact information or wish to cancel an appointment request, please contact our administrative desk:
            </p>
            <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <p><strong>Healthcare Hospital Reception</strong></p>
              <p>K.B. Fazlul Kader Rd, Chattogram 4203, Bangladesh</p>
              <p>Phone: {HOSPITAL_INFO.displayPhone} | Email: {HOSPITAL_INFO.email}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home Page</span>
            </Link>
            <a
              href={`tel:${HOSPITAL_INFO.dialPhone}`}
              className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-teal-700 font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
              <span>Reception: {HOSPITAL_INFO.displayPhone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
