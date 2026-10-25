import React from "react";
import { Phone, PhoneCall, Clock, MapPin } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/constants";

export function TopUtilityBar() {
  return (
    <div className="bg-slate-900 text-slate-100 text-xs border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 gap-4">
          {/* Left: Location & Hours (Hidden on small mobile) */}
          <div className="hidden md:flex items-center gap-6 text-slate-300">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
              <span>{HOSPITAL_INFO.fullAddress}</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
              <span>{HOSPITAL_INFO.opdHours}</span>
            </div>
          </div>

          {/* Mobile address snippet */}
          <div className="flex md:hidden items-center gap-1.5 text-slate-300 truncate">
            <MapPin className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
            <span className="truncate">K.B. Fazlul Kader Rd, Chattogram</span>
          </div>

          {/* Right: Phone & Emergency Tap-to-Call */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <a
              href={`tel:${HOSPITAL_INFO.dialPhone}`}
              className="hidden sm:flex items-center gap-1.5 text-slate-200 hover:text-teal-300 font-medium transition-colors"
              title="Call Reception"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>{HOSPITAL_INFO.displayPhone}</span>
            </a>

            {/* Emergency Hotline - Strictly using emergency red */}
            <a
              href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] sm:text-xs transition-colors shadow-sm"
              title="24/7 Emergency Direct Line"
            >
              <PhoneCall className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
              <span>Emergency: {HOSPITAL_INFO.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
