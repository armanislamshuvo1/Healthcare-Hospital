import React from "react";
import { Building, Clock, Navigation, ExternalLink, MapPin } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/constants";

export function MapEmbed() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    HOSPITAL_INFO.fullAddress
  )}`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Map Frame Embed */}
        <div className="relative w-full h-72 sm:h-80 bg-slate-200">
          <iframe
            title="Healthcare Hospital Location Map"
            src="https://maps.google.com/maps?q=106+E+K.B.+Fazlul+Kader+Rd,+Chattogram&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            className="border-0 w-full h-full"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Directions & Landmark Details */}
        <div className="p-6 space-y-4 bg-white">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Building className="w-4 h-4 text-teal-600" />
                How to Reach Us
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Central Chattogram Medical District
              </p>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold border border-teal-200 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-teal-700" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3 text-teal-600" />
            </a>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Healthcare Hospital is situated on <span className="font-semibold text-slate-900">{HOSPITAL_INFO.fullAddress}</span>, readily accessible from GEC Circle, Chawkbazar, and Medical College Gate. Dedicated patient drop-off and wheelchair access available at the front entrance.
          </p>

          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <span>OPD Hours: {HOSPITAL_INFO.opdHours}</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-teal-800">
              <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <span>Emergency Unit: 24/7 Gate Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
