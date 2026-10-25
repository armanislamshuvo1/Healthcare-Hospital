import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Stethoscope,
  ShieldAlert,
  BedDouble,
  Clock,
  PhoneCall,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Activity,
  HeartPulse,
  Syringe,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HOSPITAL_INFO, HOSPITAL_SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Clinical Services | Consultant OPD, 24/7 Emergency & Inpatient Ward",
  description:
    "Explore healthcare services at Healthcare Hospital Chattogram: Specialist OPD by Dr. A.S.M. Rashedul Hasan, 24/7 Emergency Ward, and General Medicine Inpatient Care.",
};

export default function ServicesPage() {
  const facilityHighlights = [
    {
      title: "Point-of-Care Diagnostic Triage",
      desc: "Emergency 12-lead ECG, blood glucose checks, and bedside oxygen saturation monitoring.",
      icon: Activity,
    },
    {
      title: "Respiratory & Oxygen Delivery",
      desc: "Continuous high-flow oxygen supply, advanced nebulization, and aerosol therapy.",
      icon: HeartPulse,
    },
    {
      title: "Sterile Infusion & Medication",
      desc: "Precision infusion pumps, emergency crash carts, and pharmacologically audited medications.",
      icon: Syringe,
    },
    {
      title: "Clean Inpatient Environment",
      desc: "Daily clinical ward disinfection, isolated observation cubicles, and quiet recovery rooms.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="teal" size="sm">
              Clinical Departments
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Hospital Services & Facilities
            </h1>
            <p className="text-base sm:text-lg text-slate-300">
              High-standard clinical departments designed to deliver immediate emergency response and thoughtful specialist outpatient care in Chattogram.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {HOSPITAL_SERVICES.map((service, index) => {
            const isEmergency = service.isEmergency;
            const Icon =
              service.id === "consultant-opd"
                ? Stethoscope
                : service.id === "emergency-ward"
                ? ShieldAlert
                : BedDouble;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`rounded-3xl border p-6 sm:p-10 transition-shadow ${
                  isEmergency
                    ? "border-red-200 bg-red-50/20 shadow-sm hover:shadow-md"
                    : "border-slate-200 bg-white shadow-xs hover:shadow-md"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {/* Left Column: Title & Overview */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          isEmergency
                            ? "bg-red-100 text-red-600"
                            : "bg-teal-100 text-teal-700"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                          {service.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          {isEmergency ? (
                            <Badge variant="emergency" dot pulse size="sm">
                              {service.availability}
                            </Badge>
                          ) : (
                            <Badge variant="teal" dot size="sm">
                              {service.availability}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-slate-700">
                      {service.shortDesc}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.fullDesc}
                    </p>

                    {/* Features list */}
                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Key Capabilities & Protocol Standards:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.features.map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-start gap-2 text-xs text-slate-700"
                          >
                            <CheckCircle2
                              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                isEmergency ? "text-red-500" : "text-teal-600"
                              }`}
                            />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Service Action Box */}
                  <div className="lg:col-span-1 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
                    <div className="text-xs text-slate-600 space-y-2">
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <span>Timings: {service.availability}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {isEmergency
                          ? "Walk-ins accepted immediately without appointment. Triage conducted on spot."
                          : "Advance booking recommended for OPD consultation with Dr. Hasan."}
                      </p>
                    </div>

                    <div className="pt-2 space-y-2.5">
                      {isEmergency ? (
                        <Button
                          href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`}
                          variant="emergency"
                          size="md"
                          className="w-full justify-center shadow-xs"
                        >
                          <PhoneCall className="w-4 h-4 animate-pulse" />
                          <span>Emergency Call: {HOSPITAL_INFO.displayPhone}</span>
                        </Button>
                      ) : (
                        <Button
                          href="/appointment"
                          variant="primary"
                          size="md"
                          className="w-full justify-center shadow-xs"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Book OPD Appointment</span>
                        </Button>
                      )}

                      <Button
                        href="/contact"
                        variant="outline"
                        size="md"
                        className="w-full justify-center text-xs"
                      >
                        <span>Directions & Admission Desk</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Hospital Clinical Support Facilities Strip */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="teal" size="sm" className="mb-2">Care Infrastructure</Badge>
            <h3 className="text-2xl font-bold text-slate-900">
              Departmental Facilities & Monitoring Infrastructure
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              High-readiness clinical tools supporting Dr. Hasan and our medical duty officers around the clock.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilityHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Assurance Banner */}
      <section className="py-14 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <Badge variant="emergency" dot pulse size="sm">
            Continuous 24/7 Coverage
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Need Immediate Medical Assistance?
          </h3>
          <p className="text-sm text-slate-300">
            Our medical officers and emergency triage nursing staff are on duty right now at 106 E K.B. Fazlul Kader Road.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button
              href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`}
              variant="emergency"
              size="lg"
            >
              <PhoneCall className="w-5 h-5 animate-pulse" />
              <span>Call Emergency Hotline ({HOSPITAL_INFO.displayPhone})</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
