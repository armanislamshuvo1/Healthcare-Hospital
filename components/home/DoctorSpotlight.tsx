"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Calendar, Award, MapPin, ArrowRight, ShieldCheck, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DOCTOR_PROFILE, MANAGEMENT_MEMBERS } from "@/lib/constants";
import { ScheduleSlot } from "@/types";

export function DoctorSpotlight() {
  const [schedule, setSchedule] = useState<ScheduleSlot[]>(DOCTOR_PROFILE.schedule);
  const [fee, setFee] = useState<string>(DOCTOR_PROFILE.consultationFee);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedSchedule = localStorage.getItem("hh_doctor_schedule");
        if (storedSchedule) {
          const parsed = JSON.parse(storedSchedule);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSchedule(parsed);
          }
        }
        const storedSettings = localStorage.getItem("hh_hospital_settings");
        if (storedSettings) {
          const s = JSON.parse(storedSettings);
          if (s.consultationFee) setFee(s.consultationFee);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="teal" size="sm" className="mb-2">
            Clinical Faculty
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Consultant Physician & Hospital Leadership
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Spearheaded by our lead consultant in adult medicine, supported by dedicated hospital administration.
          </p>
        </div>

        {/* Lead Consultant Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Doctor Avatar Column */}
            <div className="md:col-span-5 bg-gradient-to-br from-teal-900 to-slate-900 p-8 sm:p-10 flex flex-col justify-between text-white relative">
              <div className="space-y-4">
                <Badge variant="teal" dot size="sm" className="bg-teal-950/80 text-teal-300 border-teal-800">
                  Lead Consultant Physician
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
                    Chamber Schedule (OPD):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {schedule.map((item, idx) => (
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
                  <span className="text-teal-900 font-medium">Consultation Fee:</span>
                  <span className="font-bold text-teal-800">{fee}</span>
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

        {/* Leadership Cards Strip: Dr. Abdul Karim and Mr. Anwar Kamal */}
        <div className="max-w-4xl mx-auto pt-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Hospital Leadership & Administration
            </h3>
            <Link
              href="/about"
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1"
            >
              <span>View Leadership</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MANAGEMENT_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold text-base flex-shrink-0">
                  {member.name.includes("Dr.") ? <Stethoscope className="w-5 h-5 text-teal-700" /> : <ShieldCheck className="w-5 h-5 text-teal-700" />}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                  <p className="text-xs font-semibold text-teal-700">{member.role}</p>
                  <p className="text-[11px] text-slate-500">{member.qualifications}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
