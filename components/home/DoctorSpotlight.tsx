import React from "react";
import Link from "next/link";
import { User, Calendar, Clock, MapPin, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DOCTOR_PROFILE } from "@/lib/constants";

export function DoctorSpotlight() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="teal" size="sm" className="mb-2">
            Senior Medical Faculty
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Consultant Physician Spotlight
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Meet our lead consultant specializing in internal medicine, chronic disease management, and adult primary care.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Doctor Avatar / Visual Column */}
            <div className="md:col-span-5 bg-gradient-to-br from-teal-900 to-slate-900 p-8 sm:p-10 flex flex-col justify-between text-white relative">
              <div className="space-y-4">
                <Badge variant="teal" dot size="sm" className="bg-teal-950/80 text-teal-300 border-teal-800">
                  Lead Physician
                </Badge>

                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-teal-800/40 border-2 border-teal-400/30 flex items-center justify-center text-teal-200 shadow-inner">
                  <User className="w-16 h-16" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">{DOCTOR_PROFILE.name}</h3>
                  <p className="text-xs text-teal-300 font-semibold mt-0.5">{DOCTOR_PROFILE.designation}</p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {DOCTOR_PROFILE.degrees.join(" • ")}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 mt-6 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>{DOCTOR_PROFILE.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Chamber 201, OPD Block (2nd Floor)</span>
                </div>
              </div>
            </div>

            {/* Doctor Details & Consultation Schedule Column */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Clinical Expertise & Practice Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {DOCTOR_PROFILE.about}
                </p>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Weekly Consultation Schedule:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {DOCTOR_PROFILE.schedule.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                      >
                        <span className="text-xs font-bold text-slate-800">{item.days}</span>
                        <span className="text-[11px] font-semibold text-teal-700 mt-0.5">{item.time}</span>
                        <span className="text-[10px] text-slate-400 mt-1">{item.room}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-xl bg-teal-50/70 border border-teal-100 flex items-center justify-between text-xs">
                  <span className="text-teal-900 font-medium">Standard Consultation:</span>
                  <span className="font-bold text-teal-800">{DOCTOR_PROFILE.consultationFee}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <Button href="/appointment" variant="primary" size="md" className="flex-1 justify-center shadow-xs">
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </Button>
                <Button href="/doctor" variant="outline" size="md" className="text-xs">
                  <span>Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
