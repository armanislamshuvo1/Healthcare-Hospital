import React from "react";
import { Calendar, PhoneCall, UserCheck, ShieldCheck, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HOSPITAL_INFO, DOCTOR_PROFILE } from "@/lib/constants";

export function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-medical-950 to-slate-900 text-white py-16 sm:py-24 overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-medical-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="teal" dot pulse size="md">
                Chattogram Medical District
              </Badge>
              <Badge variant="emergency" dot size="md">
                24/7 Emergency Ward Active
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Excellence in Clinical Care & Expert Medical Consultation
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Welcome to <span className="text-white font-semibold">{HOSPITAL_INFO.name}</span> located at{" "}
              <span className="text-teal-300 font-semibold">{HOSPITAL_INFO.fullAddress}</span>. Delivering focused,
              evidence-based adult medicine consultation under senior physician{" "}
              <span className="text-teal-300 font-semibold">{DOCTOR_PROFILE.name}</span> alongside round-the-clock emergency triage.
            </p>

            {/* Action CTA Group */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Button href="/appointment" variant="primary" size="lg" className="shadow-lg">
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </Button>

              <Button
                href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`}
                variant="emergency"
                size="lg"
                className="shadow-lg"
              >
                <PhoneCall className="w-5 h-5 animate-pulse" />
                <span>Emergency: {HOSPITAL_INFO.displayPhone}</span>
              </Button>

              <Button
                href="/doctor"
                variant="outline"
                size="lg"
                className="bg-slate-900/60 text-white border-slate-700 hover:bg-slate-800"
              >
                <UserCheck className="w-5 h-5 text-teal-400" />
                <span>Doctor Schedule</span>
              </Button>
            </div>

            {/* Quick hospital micro-highlights */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>1-on-1 Dedicated Consultant Time</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <span>OPD: Sat–Thu 5:00 PM – 9:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>106 E K.B. Fazlul Kader Rd</span>
              </div>
            </div>
          </div>

          {/* Right Hero Card: Quick Triage & Physician Badge */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Featured Consultation
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal-950/80 text-teal-300 border border-teal-800 font-medium">
                  Chamber 201
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{DOCTOR_PROFILE.name}</h3>
                <p className="text-xs text-teal-300 font-semibold">{DOCTOR_PROFILE.specialty}</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {DOCTOR_PROFILE.degrees.join(" • ")}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Experience:</span>
                  <span className="font-semibold text-white">{DOCTOR_PROFILE.experience}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Consultation Fee:</span>
                  <span className="font-semibold text-teal-300">৳ 800</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-medium text-white">OPD Block, 2nd Floor</span>
                </div>
              </div>

              <Button
                href="/appointment"
                variant="primary"
                size="md"
                className="w-full justify-center text-xs shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Consultation Serial</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
