import React from "react";
import Link from "next/link";
import { PhoneCall, CalendarCheck, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { HOW_TO_VISIT_STEPS, HOSPITAL_INFO } from "@/lib/constants";

export function HowToVisit() {
  const stepIcons = [PhoneCall, CalendarCheck, MapPin];

  return (
    <section id="how-to-visit" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="teal" size="sm" className="mb-2">
            Simple Process
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Visit Healthcare Hospital
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            A simple 3-step process to receive expert consultant care in Chattogram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {HOW_TO_VISIT_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx] || PhoneCall;
            return (
              <div
                key={step.step}
                className="relative bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Step indicator header */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-xl bg-teal-600 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                      0{step.step}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Direct Action Link */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  {step.step === 1 && (
                    <a
                      href={`tel:${HOSPITAL_INFO.dialPhone}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline"
                    >
                      <span>Call Hotline ({HOSPITAL_INFO.displayPhone})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {step.step === 2 && (
                    <Link
                      href="/appointment"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline"
                    >
                      <span>Request Serial Online</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {step.step === 3 && (
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline"
                    >
                      <span>Location & Directions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
