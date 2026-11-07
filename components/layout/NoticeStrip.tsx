"use client";

import React, { useState, useEffect } from "react";
import { Megaphone, X, PhoneCall } from "lucide-react";
import Link from "next/link";
import { HOSPITAL_INFO, DOCTOR_PROFILE } from "@/lib/constants";

export function NoticeStrip() {
  const [notice, setNotice] = useState<string>(
    `Notice: OPD consultation serials are open for ${DOCTOR_PROFILE.name} (Sat-Thu). 24/7 Cardiac Emergency Ward operational.`
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if custom notice is stored by Mr. Anwar Kamal from /admin
    if (typeof window !== "undefined") {
      const storedNotice = localStorage.getItem("hh_hospital_notice");
      if (storedNotice) {
        setNotice(storedNotice);
      }
    }
  }, []);

  if (!isVisible) return null;

  return (
    <aside aria-label="Hospital Announcements" className="bg-teal-900 text-teal-100 text-xs py-1.5 px-4 border-b border-teal-800 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex-shrink-0 inline-flex items-center gap-1 font-bold text-[11px] bg-teal-800 text-teal-200 px-2 py-0.5 rounded uppercase tracking-wider">
            <Megaphone className="w-3 h-3 text-teal-300" />
            Announcement
          </span>
          <p className="truncate text-[11px] sm:text-xs text-teal-100">
            {notice}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 text-[11px]">
          <Link
            href="/appointment"
            className="hidden sm:inline-flex items-center gap-1 text-teal-200 hover:text-white underline font-semibold"
          >
            Book Serial
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement"
            className="text-teal-300 hover:text-white p-0.5 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
