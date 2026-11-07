import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  PhoneCall,
  Clock,
  Mail,
  ShieldCheck,
  Activity,
  Heart,
} from "lucide-react";
import { HOSPITAL_INFO, NAV_ITEMS, HOSPITAL_SERVICES, DOCTOR_PROFILE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Banner: Emergency & Fast Assistance */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500">
                <PhoneCall className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  24/7 Medical Emergency Ward & Ambulance Liaison
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Immediate doctor-led triage and resuscitation support at Fazlul Kader Road.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Hotline: {HOSPITAL_INFO.displayPhone}</span>
              </a>
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md transition-colors"
              >
                <span>Book OPD Serial</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Hospital Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                <Activity className="w-6 h-6 text-teal-100" />
              </div>
              <div>
                <span className="block font-bold text-white text-lg leading-tight">
                  {HOSPITAL_INFO.name}
                </span>
                <span className="block text-xs text-teal-400 font-medium">
                  Chattogram, Bangladesh
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Providing dedicated cardiovascular & thoracic consultation by {DOCTOR_PROFILE.name} and round-the-clock emergency support for the Chattogram community.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2 text-teal-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Govt. Registered Hospital Clinic</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Cardiovascular Care, Compassion, Excellence • Specialized Cardiac Focus
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-teal-400 transition-colors" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Clinical Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Clinical Services
            </h4>
            <ul className="space-y-3 text-xs">
              {HOSPITAL_SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="group block"
                  >
                    <span className="text-slate-300 group-hover:text-teal-400 font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                      {service.title}
                    </span>
                    <span className="text-[11px] text-slate-500 block pl-3.5 mt-0.5">
                      {service.availability}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Hospital Address & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Contact & Location
            </h4>

            <div className="flex items-start gap-3 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>{HOSPITAL_INFO.fullAddress}</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <a
                href={`tel:${HOSPITAL_INFO.dialPhone}`}
                className="hover:text-teal-300 transition-colors"
              >
                {HOSPITAL_INFO.displayPhone} (Reception)
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <a
                href={`mailto:${HOSPITAL_INFO.email}`}
                className="hover:text-teal-300 transition-colors"
              >
                {HOSPITAL_INFO.email}
              </a>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              <Clock className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Visiting & OPD Hours:</p>
                <p className="text-slate-400 text-[11px] mt-0.5">{HOSPITAL_INFO.opdHours}</p>
                <p className="text-red-400 text-[11px] font-semibold mt-0.5">Emergency: 24 Hours Open</p>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Google Map per Brief Lines 45 & Diagram */}
        <div className="mt-10 pt-8 border-t border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-2">
              <h5 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>Hospital Map & Location</span>
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                106 E K.B. Fazlul Kader Rd, Chattogram 4203. Accessible from GEC Circle and Medical College Gate.
              </p>
              <div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(HOSPITAL_INFO.fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold underline"
                >
                  <span>Open in Google Maps (Get Directions)</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-7 h-40 sm:h-48 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 shadow-sm">
              <iframe
                title="Healthcare Hospital Chattogram Map Footer"
                src="https://maps.google.com/maps?q=106+E+K.B.+Fazlul+Kader+Rd,+Chattogram&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="border-0 w-full h-full"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} {HOSPITAL_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy-policy" className="text-slate-400 hover:text-teal-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/admin" className="text-slate-500 hover:text-teal-400 transition-colors text-[11px]">
              Staff Admin Portal
            </Link>
            <span className="text-slate-700">•</span>
            <div className="flex items-center gap-1 text-slate-400">
              <span>Chattogram Healthcare</span>
              <Heart className="w-3.5 h-3.5 text-teal-500 fill-teal-500 inline mx-0.5" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
