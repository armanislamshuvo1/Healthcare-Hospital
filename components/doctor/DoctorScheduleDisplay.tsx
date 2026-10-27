"use client";

import React, { useState, useEffect } from "react";
import { Clock, DollarSign, CalendarCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { DOCTOR_PROFILE } from "@/lib/constants";
import { ScheduleSlot } from "@/types";

export function DoctorScheduleDisplay() {
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
      } catch (err) {
        console.error("Error loading doctor schedule:", err);
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Schedule slots */}
      <div className="divide-y divide-slate-100">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div>
              <span className="font-bold text-slate-800 text-sm">{item.days}</span>
              <span className="text-xs text-slate-500 block">{item.room}</span>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-teal-50 text-teal-800 font-semibold text-xs border border-teal-200 self-start sm:self-auto">
              {item.time}
            </span>
          </div>
        ))}
      </div>

      {/* Consultation Fee Card */}
      <div className="pt-2">
        <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
            ৳
          </div>
          <div>
            <span className="text-xs font-bold text-teal-900 block">
              OPD Consultation Fee Structure
            </span>
            <p className="text-xs text-teal-800 mt-0.5 font-medium">{fee}</p>
            <span className="text-[11px] text-teal-700 block mt-1">
              Payment received at chamber registration desk on arrival.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
