import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Target,
  Eye,
  Calendar,
  Building2,
  Stethoscope,
  CheckCircle2,
  Sparkles,
  HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HOSPITAL_INFO, MANAGEMENT_MEMBERS, DOCTOR_PROFILE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Healthcare Hospital Chattogram",
  description:
    "Learn about Healthcare Hospital Chattogram, our mission, values of Care, Compassion, Excellence, and leadership by Dr. Abdul Karim (MD) and Mr. Anwar Kamal.",
};

export default function AboutPage() {
  const pillars = [
    {
      title: "Diagnostic Precision",
      desc: "Every clinical presentation is evaluated with modern diagnostic discipline and unhurried consultation time.",
      icon: Stethoscope,
    },
    {
      title: "Patient Safety & Sterility",
      desc: "Continuous hospital-grade air purification, sterile ward maintenance, and strict infection control standards.",
      icon: ShieldCheck,
    },
    {
      title: "Ethical Transparency",
      desc: "Clear clinical explanations, honest prognosis communication, and rational, evidence-based medication protocols.",
      icon: Sparkles,
    },
    {
      title: "24/7 Clinical Continuity",
      desc: "Seamless coordination between our senior consultant OPD chambers, inpatient ward, and emergency unit.",
      icon: HeartPulse,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="teal" size="sm">
              Established {HOSPITAL_INFO.establishedYear} • Chattogram
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              About Healthcare Hospital
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Dedicated to compassionate medicine, patient safety, and clinical excellence at {HOSPITAL_INFO.fullAddress}.
            </p>
          </div>
        </div>
      </section>

      {/* Hospital Story & Vision */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="teal" size="sm">Our Story</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Excellence in Care in a Focused 1-Consultant Hospital
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Healthcare Hospital was founded in Chattogram to bring the disciplined standards, clean protocols, and patient-first ethos of leading tertiary hospitals into a personalized, accessible community facility.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Rather than spreading focus across hundreds of rotating chambers, Healthcare Hospital concentrates on delivering deep, unhurried adult medicine care spearheaded by senior consultant <span className="font-semibold text-slate-900">{DOCTOR_PROFILE.name}</span>, complemented by a 24/7 emergency unit and a dedicated general medicine ward.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <Target className="w-6 h-6 text-teal-600 mb-2" />
                  <h4 className="font-bold text-slate-900 text-sm">Our Mission</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    To deliver accurate diagnosis, transparent clinical communication, and respectful medical treatment to every family in Chattogram.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <Eye className="w-6 h-6 text-teal-600 mb-2" />
                  <h4 className="font-bold text-slate-900 text-sm">Our Vision</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    To become the regional benchmark for specialized adult medicine OPD and rapid emergency stabilization.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick stats / Highlights */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-600" />
                Hospital At A Glance
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-teal-700">12+</span>
                  <span className="text-xs text-slate-600 font-medium mt-1 block">Years Clinical Experience</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-teal-700">24/7</span>
                  <span className="text-xs text-slate-600 font-medium mt-1 block">Emergency Ward</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-teal-700">1</span>
                  <span className="text-xs text-slate-600 font-medium mt-1 block">General Medicine Ward</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-teal-700">1-on-1</span>
                  <span className="text-xs text-slate-600 font-medium mt-1 block">Dedicated Consultation</span>
                </div>
              </div>

              <div className="p-5 bg-teal-50/80 rounded-2xl border border-teal-100 text-xs text-teal-900 space-y-2">
                <p className="font-bold flex items-center gap-1.5 text-sm text-teal-950">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  Clinical Governance Guarantee
                </p>
                <p className="text-teal-800 leading-relaxed">
                  Every prescription is verified against clinical pharmacology guidelines. We maintain continuous sterilization across our wards and consultation chambers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Clinical Standards Strip */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="teal" size="sm" className="mb-2">Operational Rigor</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Clinical Pillars
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              The foundational commitments that guide every patient consultation and clinical procedure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership & Management Profiles */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="teal" size="sm" className="mb-2">Hospital Management</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hospital Leadership & Management
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Meet our hospital management team overseeing governance, operations, and patient services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {MANAGEMENT_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-slate-50/70 rounded-2xl border border-slate-200 p-7 sm:p-8 shadow-xs hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xl mb-5 border-2 border-teal-200">
                  {member.name.includes("Dr.") ? <Stethoscope className="w-6 h-6 text-teal-700" /> : <Building2 className="w-6 h-6 text-teal-700" />}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-xs font-semibold text-teal-700 mt-0.5">{member.role}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">{member.qualifications}</p>
                <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed border-t border-slate-200/60 pt-4">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/doctor" variant="primary" size="md">
              <Stethoscope className="w-4 h-4" />
              <span>Meet Our Consultant Doctor (Dr. A.S.M. Rashedul Hasan)</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
