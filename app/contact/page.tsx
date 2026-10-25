import React from "react";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  PhoneCall,
  Navigation,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { HOSPITAL_INFO } from "@/lib/constants";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";

export const metadata: Metadata = {
  title: "Contact Us & Directions | 106 E K.B. Fazlul Kader Rd",
  description:
    "Find Healthcare Hospital at 106 E K.B. Fazlul Kader Rd, Chattogram. Reception phone, 24/7 emergency hotline, Google Map directions, and patient inquiry form.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="teal" size="sm">
              Hospital Location & Support
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Contact Healthcare Hospital
            </h1>
            <p className="text-base sm:text-lg text-slate-300">
              Conveniently located on K.B. Fazlul Kader Road in central Chattogram. Get in touch with our reception desk or emergency triage unit.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Cards, Form & Map */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 3 Contact Quick Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Hospital Address */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-white hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-teal-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Hospital Address</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {HOSPITAL_INFO.fullAddress}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-teal-700 font-semibold flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5" />
                <span>Central Chattogram Medical District</span>
              </div>
            </div>

            {/* Card 2: Reception & Serials */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-white hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-teal-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Reception & Serials</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Call our direct desk for inquiries, appointment booking, or ward updates.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/80">
                <a
                  href={`tel:${HOSPITAL_INFO.dialPhone}`}
                  className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {HOSPITAL_INFO.displayPhone}</span>
                </a>
              </div>
            </div>

            {/* Card 3: 24/7 Emergency Line */}
            <div className="p-6 bg-red-50/40 rounded-2xl border border-red-200 hover:bg-red-50/70 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <PhoneCall className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">24/7 Emergency Line</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant doctor response for trauma, severe respiratory distress, and inpatient triage.
              </p>
              <div className="mt-4 pt-3 border-t border-red-200">
                <a
                  href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`}
                  className="text-xs font-bold text-red-600 hover:underline inline-flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Dial Emergency Hotline ({HOSPITAL_INFO.displayPhone})</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form and Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Contact Form Column */}
            <div>
              <ContactForm />
            </div>

            {/* Map & Landmark Info Column */}
            <div>
              <MapEmbed />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
