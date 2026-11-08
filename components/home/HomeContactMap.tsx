import React from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, Navigation, ExternalLink, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HOSPITAL_INFO } from "@/lib/constants";

export function HomeContactMap() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    HOSPITAL_INFO.fullAddress
  )}`;

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="teal" size="sm" className="mb-2">
            Location & Access
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Contact & Directions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Conveniently located on K.B. Fazlul Kader Road in the central Chattogram Medical District.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Quick Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Hospital Address</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                    {HOSPITAL_INFO.fullAddress}
                  </p>
                  <p className="text-[11px] text-teal-700 font-semibold mt-1">
                    Directions: Near Medical College Gate, central Chattogram.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Chamber & Reception Desk</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Call: <a href={`tel:${HOSPITAL_INFO.dialPhone}`} className="text-teal-700 font-bold hover:underline">{HOSPITAL_INFO.displayPhone}</a>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Hours: {HOSPITAL_INFO.opdHours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">24/7 Emergency Ward</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Hotline: <a href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`} className="text-teal-700 font-bold hover:underline">{HOSPITAL_INFO.displayPhone}</a>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Doctor on duty 24 hours daily.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="/contact" variant="primary" size="md" className="flex-1 justify-center">
                <span>Inquiry & Full Contact</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
              >
                <Navigation className="w-4 h-4 text-teal-600" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7 h-80 sm:h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-100">
            <iframe
              title="Healthcare Hospital Location Map"
              src="https://maps.google.com/maps?q=K.B.+Fazlul+Kader+Rd,+Chattogram&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
    </section>
  );
}
