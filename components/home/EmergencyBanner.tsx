import React from "react";
import { ShieldAlert, PhoneCall, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HOSPITAL_INFO } from "@/lib/constants";

export function EmergencyBanner() {
  return (
    <section className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white py-12 sm:py-16 shadow-xl relative overflow-hidden">
      {/* Visual pulse glow in background */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-red-950/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Emergency Title & Description */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>24/7 Immediate Emergency Triage</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Facing an Urgent Medical Emergency?
            </h2>

            <p className="text-sm sm:text-base text-red-100 leading-relaxed">
              Our 24-hour emergency ward at <span className="font-semibold text-white">K.B. Fazlul Kader Road</span> is always open. Immediate resuscitation, oxygen therapy, and emergency physician coverage ready without delays.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-red-100">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5" />
                Zero Triage Waiting
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5" />
                Fazlul Kader Road, Chattogram
              </span>
            </div>
          </div>

          {/* Emergency Action Box & Hotline */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4">
            <div className="text-left sm:text-right">
              <span className="block text-xs uppercase tracking-wider text-red-200 font-semibold">
                Direct Emergency Hotline
              </span>
              <span className="block text-2xl sm:text-3xl font-black text-white tracking-wide">
                {HOSPITAL_INFO.displayPhone}
              </span>
            </div>

            <Button
              href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`}
              variant="outline"
              size="lg"
              className="bg-white text-red-700 hover:bg-red-50 hover:text-red-800 border-white shadow-lg font-extrabold text-base px-8 py-3.5"
            >
              <PhoneCall className="w-5 h-5 animate-pulse text-red-600" />
              <span>Call Emergency Hotline</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
