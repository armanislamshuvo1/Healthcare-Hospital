"use client";

import React from "react";
import { PhoneCall } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/constants";

export function FloatingCallButton() {
  return (
    <aside
      aria-label="Emergency quick contact"
      className="fixed bottom-5 right-5 z-40 md:hidden flex flex-col items-end"
    >
      <a
        href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`}
        className="relative group flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm rounded-full shadow-lg shadow-red-500/30 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-400"
        title={`Immediate Emergency Call: ${HOSPITAL_INFO.displayPhone}`}
        aria-label={`Call Emergency Hotline ${HOSPITAL_INFO.displayPhone}`}
      >
        {/* Pulse beacon ring */}
        <span className="absolute -inset-1 rounded-full bg-red-600 opacity-40 animate-ping pointer-events-none" />
        
        <PhoneCall className="w-5 h-5 flex-shrink-0 animate-bounce" />
        <span className="tracking-wide font-extrabold whitespace-nowrap">
          Call Emergency
        </span>
      </a>
    </aside>
  );
}
