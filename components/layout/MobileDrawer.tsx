"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, PhoneCall, Calendar, MapPin, Clock } from "lucide-react";
import { HOSPITAL_INFO, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export function MobileDrawer({ isOpen, onClose, currentPath }: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              H
            </div>
            <div>
              <span className="block font-bold text-slate-900 leading-tight">Healthcare</span>
              <span className="block text-[11px] text-teal-700 font-semibold tracking-wide">Hospital Chattogram</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-teal-50 text-teal-800 font-bold border-l-4 border-teal-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-teal-700"
                )}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Quick CTA inside drawer */}
          <div className="pt-4 mt-2 border-t border-slate-100 space-y-3">
            <Link
              href="/appointment"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-sm transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>

            <a
              href={`tel:${HOSPITAL_INFO.emergencyDialPhone}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm transition-colors"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>24/7 Emergency Line</span>
            </a>
          </div>
        </div>

        {/* Drawer Footer Info */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <span>{HOSPITAL_INFO.fullAddress}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>OPD: {HOSPITAL_INFO.opdHours}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
