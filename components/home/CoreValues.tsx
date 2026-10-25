import React from "react";
import { HeartPulse, HandHeart, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CORE_VALUES } from "@/lib/constants";

export function CoreValues() {
  const clinicalStandards = [
    "Evidence-based therapeutic protocols verified by senior physician",
    "Continuous patient dignity, transparent diagnoses, and ethical prescription",
    "Daily hospital-grade disinfection, sterile air handling, and vital telemetry",
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="teal" size="sm" className="mb-2">
            Our Guiding Philosophy
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Committed to Care, Compassion & Excellence
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Modeled after premier healthcare institutions, scaled into an attentive single-consultant hospital where every patient receives undivided clinical expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_VALUES.map((val, idx) => {
            const Icon = idx === 0 ? HeartPulse : idx === 1 ? HandHeart : Award;
            const standard = clinicalStandards[idx];

            return (
              <div
                key={val.title}
                className="group relative p-7 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-teal-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {val.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {val.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 mt-auto">
                  <div className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-600">{standard}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
