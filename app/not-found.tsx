import React from "react";
import Link from "next/link";
import {
  Home,
  PhoneCall,
  FileQuestion,
  ArrowRight,
  ShieldAlert,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HOSPITAL_INFO } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-medical-50/30">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Clinical Badge & Icon */}
        <div className="flex flex-col items-center space-y-4">
          <Badge variant="teal" dot size="md">
            404 — Clinical Resource Not Found
          </Badge>

          <div className="w-20 h-20 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 shadow-sm">
            <FileQuestion className="w-10 h-10" />
          </div>
        </div>

        {/* Clear 404 Message */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
            The medical page, departmental directory, or patient service you are looking for does not exist or may have been relocated.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          <Button href="/" variant="primary" size="lg" className="shadow-md">
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Button>

          <Button
            href={`tel:${HOSPITAL_INFO.dialPhone}`}
            variant="outline"
            size="lg"
            className="shadow-xs hover:border-teal-300 hover:text-teal-700"
          >
            <PhoneCall className="w-4 h-4 text-teal-600" />
            <span>Call Helpline ({HOSPITAL_INFO.displayPhone})</span>
          </Button>
        </div>

        {/* Direct Access Quick Links */}
        <div className="pt-6 border-t border-slate-200/80">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Direct Access to Hospital Services
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/appointment"
              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-teal-300 hover:shadow-xs transition-all text-left group"
            >
              <div className="flex items-center justify-between text-teal-700 font-bold text-sm mb-1">
                <span>Book Doctor</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-xs text-slate-500">OPD Chamber serials</p>
            </Link>

            <Link
              href="/services"
              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-teal-300 hover:shadow-xs transition-all text-left group"
            >
              <div className="flex items-center justify-between text-teal-700 font-bold text-sm mb-1">
                <span>Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-xs text-slate-500">OPD, Ward & Triage</p>
            </Link>

            <Link
              href="/contact"
              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-teal-300 hover:shadow-xs transition-all text-left group"
            >
              <div className="flex items-center justify-between text-teal-700 font-bold text-sm mb-1">
                <span>Contact Hospital</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-xs text-slate-500">K.B. Fazlul Kader Rd</p>
            </Link>
          </div>
        </div>

        {/* 24/7 Emergency Assistance Banner (Strictly reserved for Emergency actions) */}
        <div className="p-4 rounded-xl bg-red-50/80 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-red-900">Immediate Medical Emergency?</p>
              <p className="text-xs text-red-700">Our 24/7 Emergency Ward is always available for urgent triage.</p>
            </div>
          </div>
          <Button
            href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`}
            variant="emergency"
            size="sm"
            className="flex-shrink-0 w-full sm:w-auto"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency Hotline</span>
          </Button>
        </div>

        {/* Hospital Location & Hours Snippet */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            {HOSPITAL_INFO.fullAddress}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            {HOSPITAL_INFO.hours}
          </span>
        </div>
      </div>
    </div>
  );
}
