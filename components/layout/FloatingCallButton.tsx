"use client";

import React from "react";
import { PhoneCall, MessageCircle } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/constants";

export function FloatingCallButton() {
  const whatsappUrl = `https://wa.me/8801647574776?text=${encodeURIComponent(
    "Hello Healthcare Hospital, I would like to inquire about consultation serial."
  )}`;

  return (
    <aside
      aria-label="Emergency quick contact"
      className="fixed bottom-5 right-4 z-40 sm:hidden flex flex-col items-end gap-2.5"
    >
      {/* Optional WhatsApp CTA per brief Line 85 */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-full shadow-md transition-all"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>

      {/* Floating Emergency Call Button */}
      <a
        href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`}
        className="relative group flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm rounded-full shadow-lg shadow-red-500/30 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-400"
        title={`Immediate Emergency Call: ${HOSPITAL_INFO.displayPhone}`}
        aria-label={`Call Emergency Hotline ${HOSPITAL_INFO.displayPhone}`}
      >
        <span className="absolute -inset-1 rounded-full bg-red-600 opacity-40 animate-ping pointer-events-none" />
        <PhoneCall className="w-5 h-5 flex-shrink-0 animate-bounce" />
        <span className="tracking-wide font-extrabold whitespace-nowrap">
          Call Emergency
        </span>
      </a>
    </aside>
  );
}
