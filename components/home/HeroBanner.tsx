"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Calendar,
  PhoneCall,
  UserCheck,
  ShieldCheck,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HOSPITAL_INFO, HERO_SLIDES, DOCTOR_PROFILE } from "@/lib/constants";
import { HeroSlide } from "@/types";

export function HeroBanner() {
  const [slides, setSlides] = useState<HeroSlide[]>(HERO_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("hh_hero_slides");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSlides(parsed);
          }
        }
      } catch (err) {
        console.error("Error loading custom hero slides:", err);
      }
    }
  }, []);

  const nextSlide = useCallback(() => {
    setSlides((currentSlides) => {
      setCurrentSlide((prev) => (prev + 1) % currentSlides.length);
      return currentSlides;
    });
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500); // Auto rotates every 4.5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, currentSlide, slides.length]);

  const slide = slides[currentSlide] || slides[0] || HERO_SLIDES[0];

  return (
    <section
      className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white py-16 sm:py-24 overflow-hidden border-b border-slate-800"
      aria-roledescription="carousel"
      aria-label="Healthcare Hospital Services Overview"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-medical-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Slider Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="teal" dot pulse size="md">
                Chattogram Medical District
              </Badge>
              <Badge
                variant={slide.isEmergencySlide ? "emergency" : "teal"}
                dot
                size="md"
              >
                {slide.badge}
              </Badge>
              <span className="text-[11px] font-mono text-teal-300/80 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/60 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping inline-block" />
                Auto-Rotating (4.5s)
              </span>
            </div>

            {/* Slide Headline & 1-line text with key transition */}
            <div key={currentSlide} className="min-h-[140px] sm:min-h-[160px] flex flex-col justify-center animate-in fade-in duration-500 slide-in-from-right-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {slide.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mt-4">
                {slide.subtext}
              </p>
            </div>

            {/* Action CTA Group */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Button
                href={slide.primaryCtaHref}
                variant={slide.isEmergencySlide ? "emergency" : "primary"}
                size="lg"
                className="shadow-lg"
              >
                {slide.isEmergencySlide ? (
                  <PhoneCall className="w-5 h-5 animate-pulse" />
                ) : (
                  <Calendar className="w-5 h-5" />
                )}
                <span>{slide.primaryCtaText}</span>
              </Button>

              <Button
                href={slide.secondaryCtaHref}
                variant="outline"
                size="lg"
                className="bg-slate-900/60 text-white border-slate-700 hover:bg-slate-800"
              >
                <span>{slide.secondaryCtaText}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Slider Navigation Dots & Controls */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? "w-10 bg-teal-400" : "w-3 bg-slate-600 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5 ml-2 text-slate-400">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsAutoPlaying((prev) => !prev)}
                  aria-label={isAutoPlaying ? "Pause auto-rotation" : "Resume auto-rotation"}
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white transition-colors ml-1"
                  title={isAutoPlaying ? "Pause Auto-Rotation" : "Start Auto-Rotation"}
                >
                  {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-teal-400" /> : <Play className="w-3.5 h-3.5 text-slate-300" />}
                </button>
                <span className="text-xs text-slate-400 font-mono ml-2">
                  0{currentSlide + 1} / 0{slides.length}
                </span>
              </div>
            </div>

            {/* Quick hospital micro-highlights */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>1-on-1 Senior Consultant OPD</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <span>Chamber: Sat–Thu 5:00 PM – 9:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>106 E K.B. Fazlul Kader Rd (4203)</span>
              </div>
            </div>
          </div>

          {/* Right Hero Card: Quick Triage & Physician Badge */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/85 backdrop-blur-sm p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Lead Consultant
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal-950/80 text-teal-300 border border-teal-800 font-medium">
                  Chamber 201
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">{DOCTOR_PROFILE.name}</h2>
                <p className="text-xs text-teal-300 font-semibold">{DOCTOR_PROFILE.designation}</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {DOCTOR_PROFILE.degrees.join(" • ")}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Experience:</span>
                  <span className="font-semibold text-white">{DOCTOR_PROFILE.experience}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Consultation Fee:</span>
                  <span className="font-semibold text-teal-300">৳ 800</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Schedule:</span>
                  <span className="font-medium text-white">Sat - Thu: 5 PM - 9 PM</span>
                </div>
              </div>

              <Button
                href="/appointment"
                variant="primary"
                size="md"
                className="w-full justify-center text-xs shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Consultation Serial</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
