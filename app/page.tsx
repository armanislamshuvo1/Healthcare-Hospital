import React from "react";
import Link from "next/link";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CoreValues } from "@/components/home/CoreValues";
import { HowToVisit } from "@/components/home/HowToVisit";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { DoctorSpotlight } from "@/components/home/DoctorSpotlight";
import { EmergencyBanner } from "@/components/home/EmergencyBanner";
import { HomeContactMap } from "@/components/home/HomeContactMap";
import { DOCTOR_PROFILE } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Accessible Screen-Reader Quick Actions */}
      <div className="sr-only">
        <Link href="/appointment" className="bg-teal-600">
          Book Doctor Appointment with {DOCTOR_PROFILE.name}
        </Link>
      </div>

      {/* Hero Showcase Banner */}
      <HeroBanner />

      {/* 3 Core Values Banner */}
      <CoreValues />

      {/* "How to Visit" 3-step Strip */}
      <HowToVisit />

      {/* Core Medical Services Preview */}
      <ServicesPreview />

      {/* Lead Consultant Doctor Spotlight */}
      <DoctorSpotlight />

      {/* 24/7 Full-Width Emergency Call Banner */}
      <EmergencyBanner />

      {/* Contact & Map Section per Brief Page-by-Page Table */}
      <HomeContactMap />
    </div>
  );
}
