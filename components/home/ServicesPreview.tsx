import React from "react";
import Link from "next/link";
import { Stethoscope, ShieldAlert, BedDouble, ArrowRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HOSPITAL_SERVICES, HOSPITAL_INFO } from "@/lib/constants";

export function ServicesPreview() {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Badge variant="teal" size="sm" className="mb-2">
              Clinical Departments
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Core Medical Services
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Specialized outpatient consultation, 24/7 emergency trauma care, and inpatient general medicine wards.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors"
          >
            <span>Explore All Services & Facilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOSPITAL_SERVICES.map((service) => {
            const isEmergency = service.isEmergency;
            const Icon =
              service.id === "consultant-opd"
                ? Stethoscope
                : service.id === "emergency-ward"
                ? ShieldAlert
                : BedDouble;

            return (
              <div
                key={service.id}
                className={`rounded-2xl border p-7 transition-all duration-300 flex flex-col justify-between ${
                  isEmergency
                    ? "border-red-200/90 bg-red-50/20 shadow-xs hover:shadow-md hover:border-red-300"
                    : "border-slate-200/90 bg-white shadow-xs hover:shadow-md hover:border-teal-200"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isEmergency
                          ? "bg-red-100 text-red-600"
                          : "bg-teal-50 text-teal-700"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {isEmergency ? (
                      <Badge variant="emergency" dot pulse size="sm">
                        {service.availability}
                      </Badge>
                    ) : (
                      <Badge variant="teal" dot size="sm">
                        {service.availability}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <Link
                    href={`/services#${service.id}`}
                    className={`text-xs font-bold inline-flex items-center gap-1 hover:underline ${
                      isEmergency ? "text-red-600" : "text-teal-700"
                    }`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {isEmergency ? (
                    <a
                      href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{HOSPITAL_INFO.displayPhone}</span>
                    </a>
                  ) : (
                    <Link
                      href="/appointment"
                      className="text-xs font-semibold text-slate-500 hover:text-teal-700"
                    >
                      Book OPD
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
