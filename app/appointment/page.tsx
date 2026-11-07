import React from "react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { DOCTOR_PROFILE } from "@/lib/constants";
import { AppointmentForm } from "@/components/appointment/AppointmentForm";
import { AppointmentSidebar } from "@/components/appointment/AppointmentSidebar";

export const metadata: Metadata = {
  title: "Book Appointment | Dr. Shahidul Amin Chamber",
  description:
    "Request an OPD appointment with Dr. Shahidul Amin (Cardiovascular & Thoracic Surgery) at Healthcare Hospital Chattogram. Fast online booking and tap-to-call serial hotline.",
};

export default function AppointmentPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="teal" size="sm">
              Chamber Serial Booking
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Book a Doctor Consultation
            </h1>
            <p className="text-base sm:text-lg text-slate-300">
              Schedule your appointment with <span className="text-teal-300 font-semibold">{DOCTOR_PROFILE.name}</span> ({DOCTOR_PROFILE.degrees.join(", ")}).
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area: Form & Sticky Sidebar */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <AppointmentForm />
            </div>

            {/* Sidebar Column (Sticky on desktop, stacked on mobile) */}
            <div className="lg:col-span-1 lg:sticky lg:top-24">
              <AppointmentSidebar />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
