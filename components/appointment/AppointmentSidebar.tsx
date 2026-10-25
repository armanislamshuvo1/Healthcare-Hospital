import React from "react";
import {
  User,
  Clock,
  MapPin,
  ShieldCheck,
  PhoneCall,
  AlertTriangle,
  Building,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { HOSPITAL_INFO, DOCTOR_PROFILE } from "@/lib/constants";

export function AppointmentSidebar() {
  return (
    <div className="space-y-6">
      {/* Doctor Chamber Card */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold flex-shrink-0">
            <User className="w-6 h-6 text-teal-700" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              {DOCTOR_PROFILE.name}
            </h3>
            <p className="text-xs text-teal-700 font-medium">
              {DOCTOR_PROFILE.specialty}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-3 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>Saturday - Thursday: 5:00 PM - 9:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>Chamber 201, OPD Block • {HOSPITAL_INFO.fullAddress}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>Consultation: {DOCTOR_PROFILE.consultationFee}</span>
          </div>
        </div>
      </div>

      {/* Direct Booking Helpline */}
      <div className="bg-white rounded-2xl border border-teal-200 p-6 space-y-4 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-teal-600" />
          Need Immediate Booking by Phone?
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Call our hospital reception desk directly to lock in your serial over the phone without waiting:
        </p>
        <a
          href={`tel:${HOSPITAL_INFO.dialPhone}`}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition-colors"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call {HOSPITAL_INFO.displayPhone}</span>
        </a>
      </div>

      {/* 24/7 Emergency Ward Warning */}
      <div className="bg-red-50 rounded-2xl border border-red-200 p-6 space-y-3">
        <Badge variant="emergency" dot size="sm">
          Emergency Warning
        </Badge>
        <h4 className="text-xs font-bold text-red-900 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span>Experiencing Severe Symptoms?</span>
        </h4>
        <p className="text-xs text-red-700 leading-relaxed">
          Do not wait for an OPD chamber appointment. Visit our 24/7 Emergency Ward immediately or call the hotline:
        </p>
        <a
          href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-colors"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Dial 24/7 Emergency ({HOSPITAL_INFO.displayPhone})</span>
        </a>
      </div>
    </div>
  );
}
