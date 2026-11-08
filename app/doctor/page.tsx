import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Award,
  BookOpen,
  CheckCircle2,
  Stethoscope,
  PhoneCall,
  Languages,
  DollarSign,
  User,
  FileText,
  HelpCircle,
  ShieldCheck,
  Building2,
  HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DoctorScheduleDisplay } from "@/components/doctor/DoctorScheduleDisplay";
import { DOCTOR_PROFILE, HOSPITAL_INFO, MANAGEMENT_MEMBERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Doctor & Team | Dr. Shahidul Amin (MBBS, MS Cardiovascular & Thoracic Surgery)",
  description:
    "Meet Dr. Shahidul Amin, Consultant in Cardiovascular and Thoracic Surgery at Healthcare Hospital Chattogram. View consultation schedule, fees, and hospital leadership.",
};

export default function DoctorPage() {
  const preparationTips = [
    {
      title: "Previous Prescriptions & Discharge Summaries",
      desc: "Bring all recent cardiologist or physician prescriptions, surgery summaries, or angiogram records.",
    },
    {
      title: "Cardiac Investigations & Reports",
      desc: "Carry your latest 12-lead ECG, Echocardiogram, Troponin/cardiac enzymes, blood lipid profile, or Holter reports.",
    },
    {
      title: "Current Medication List",
      desc: "Have an accurate list of daily cardiovascular medications, blood thinners, antihypertensives, or statins.",
    },
    {
      title: "Arrive 15 Minutes Early",
      desc: "Report to the OPD registration counter 15 minutes before your scheduled slot for vital sign pre-checks and blood pressure baseline.",
    },
  ];

  const faqs = [
    {
      q: "How do I book a consultation with Dr. Shahidul Amin?",
      a: "You can book directly via our online Appointment form or call our chamber reception desk at 01647574776. Serials are assigned chronologically to minimize chamber waiting times.",
    },
    {
      q: "What is the follow-up consultation policy?",
      a: "Follow-up visits within 14 days of an initial consultation are offered at a discounted fee of ৳ 500 for investigation evaluations and treatment plan adjustments.",
    },
    {
      q: "What should I do in case of acute chest pain or cardiac emergency?",
      a: "If experiencing severe chest pain, radiating pain, breathlessness, or dizziness, proceed immediately to our 24/7 Emergency Ward. Acute coronary triage and stabilization are delivered immediately without waiting.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="teal" size="sm">
              Clinical Faculty & Governance
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Our Consultant & Medical Leadership
            </h1>
            <p className="text-base sm:text-lg text-slate-300">
              Healthcare Hospital is spearheaded by senior Consultant in Cardiovascular and Thoracic Surgery{" "}
              <span className="text-teal-300 font-semibold">{DOCTOR_PROFILE.name}</span> alongside distinguished clinical administrators.
            </p>
          </div>
        </div>
      </section>

      {/* Main Profile & Credentials */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Doctor Card / Avatar & Quick Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="text-center space-y-3">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-teal-100 border-4 border-teal-200 mx-auto flex items-center justify-center text-teal-800 shadow-sm">
                    <User className="w-16 h-16 text-teal-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {DOCTOR_PROFILE.name}
                    </h2>
                    <p className="text-xs font-semibold text-teal-700 mt-0.5">
                      {DOCTOR_PROFILE.designation}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center">
                  {DOCTOR_PROFILE.degrees.map((deg) => (
                    <Badge key={deg} variant="teal" size="sm">
                      {deg}
                    </Badge>
                  ))}
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span className="font-medium">{DOCTOR_PROFILE.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Languages: {DOCTOR_PROFILE.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Fee: {DOCTOR_PROFILE.consultationFee}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <Button
                    href="/appointment"
                    variant="primary"
                    size="md"
                    className="w-full justify-center shadow-xs"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </Button>
                  <Button
                    href={`tel:${HOSPITAL_INFO.dialPhone}`}
                    variant="outline"
                    size="md"
                    className="w-full justify-center text-xs"
                  >
                    <PhoneCall className="w-4 h-4 text-teal-600" />
                    <span>Call Chamber Desk</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: In-depth Biography, Clinical Focus, Chamber Schedule */}
            <div className="lg:col-span-2 space-y-8">
              {/* Biography */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-teal-600" />
                  Clinical Background & Overview
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {DOCTOR_PROFILE.about}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  As the primary consultant in cardiovascular and thoracic surgery at Healthcare Hospital, Dr. Shahidul Amin specializes in cardiovascular clinical evaluations, coronary syndrome management, thoracic surgical guidance, and coordinated inpatient admission.
                </p>
              </div>

              {/* Consultation Chamber Schedule */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-teal-600" />
                    Chamber Schedule & Availability
                  </h3>
                  <Badge variant="teal" dot size="sm">
                    Accepting Patients
                  </Badge>
                </div>

                <DoctorScheduleDisplay />

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800">Chamber Location: </span>
                    K.B. Fazlul Kader Rd, Chattogram 4203. Patients are advised to arrive 15 minutes prior to appointment time.
                  </div>
                </div>
              </div>

              {/* Scope of Practice */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  Cardiovascular & Thoracic Conditions Evaluated
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Coronary Artery Disease & Angina</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Hypertension & Heart Failure Management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Observation & Workup for Acute Chest Pain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Thoracic & Vascular Surgical Consultations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Cardiac Arrhythmias & Holter Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Post-Cardiac Procedure Care & Prevention</span>
                  </div>
                </div>
              </div>

              {/* Consultation Preparation Checklist */}
              <div className="bg-slate-50/70 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  What to Bring to Your Consultation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  To ensure the most thorough and accurate diagnosis, please have the following items ready when visiting Chamber 201:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {preparationTips.map((tip) => (
                    <div key={tip.title} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                      <span className="font-bold text-xs text-slate-900 block mb-1">{tip.title}</span>
                      <span className="text-xs text-slate-600 leading-relaxed">{tip.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation FAQs */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-teal-600" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4 pt-2">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{faq.q}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Leadership & Clinical Administration Section */}
      <section className="py-14 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl">
            <Badge variant="teal" size="sm" className="mb-2">
              Leadership & Governance
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hospital Management & Clinical Leadership
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Experienced medical administrators ensuring the highest ethical and operational standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MANAGEMENT_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold text-lg">
                      {member.name.includes("Dr.") ? <Stethoscope className="w-6 h-6 text-teal-700" /> : <Building2 className="w-6 h-6 text-teal-700" />}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
                      <p className="text-xs font-semibold text-teal-700">{member.role}</p>
                      <p className="text-xs text-slate-500 font-medium">{member.qualifications}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Governance Role</span>
                  <Link href="/about" className="text-teal-700 font-semibold hover:underline">
                    Read Leadership Profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
