import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { NoticeStrip } from "@/components/layout/NoticeStrip";
import { TopUtilityBar } from "@/components/layout/TopUtilityBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCallButton } from "@/components/layout/FloatingCallButton";
import { HOSPITAL_INFO, DOCTOR_PROFILE } from "@/lib/constants";

// Preserved in-place page components from app/
import HomePage from "@/app/page";
import AboutPage from "@/app/about/page";
import DoctorPage from "@/app/doctor/page";
import ServicesPage from "@/app/services/page";
import AppointmentPage from "@/app/appointment/page";
import ContactPage from "@/app/contact/page";
import PrivacyPolicyPage from "@/app/privacy-policy/page";
import AdminPage from "@/app/admin/page";
import NotFoundPage from "@/app/not-found";

/**
 * Route-to-Title registry matching Next.js page metadata.
 */
const ROUTE_TITLES: Record<string, string> = {
  "/": `${HOSPITAL_INFO.name} | Care, Compassion, Excellence in Chattogram`,
  "/about": "About Us | Healthcare Hospital Chattogram",
  "/doctor": `Our Doctor & Team | ${DOCTOR_PROFILE.name} (${DOCTOR_PROFILE.degrees.join(", ")})`,
  "/services": "Clinical Services | Cardiovascular OPD, 24/7 Cardiac Emergency & Inpatient Ward",
  "/appointment": `Book Appointment | ${DOCTOR_PROFILE.name} Chamber`,
  "/contact": "Contact Us & Directions | 106 E K.B. Fazlul Kader Rd",
  "/privacy-policy": `Privacy Policy | ${HOSPITAL_INFO.name} Chattogram`,
  "/admin": `Hospital Operations & Staff Desk | ${HOSPITAL_INFO.name}`,
};

const DEFAULT_404_TITLE = `404 — Clinical Resource Not Found | ${HOSPITAL_INFO.name} Chattogram`;

/**
 * Synchronizes browser document.title on route change.
 */
function DynamicTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    document.title = ROUTE_TITLES[normalized] || DEFAULT_404_TITLE;
  }, [pathname]);

  return null;
}

/**
 * Scrolls to top of the page on route transition,
 * or smooth-scrolls to the target anchor if a hash is present.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace("#", "");
      const targetElement = document.getElementById(elementId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

/**
 * Global Layout Shell matching app/layout.tsx:
 * <NoticeStrip />
 * <TopUtilityBar />
 * <Navbar />
 * <main className="flex-1 w-full">{children}</main>
 * <Footer />
 * <FloatingCallButton />
 */
function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen text-slate-800 bg-slate-50 antialiased selection:bg-teal-100 selection:text-teal-900">
      <NoticeStrip />
      <TopUtilityBar />
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
}

/**
 * Client Route Tree for Healthcare Hospital Vite SPA
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/doctor" element={<DoctorPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

/**
 * Root Application Component
 */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <DynamicTitle />
      <LayoutShell>
        <AppRoutes />
      </LayoutShell>
    </BrowserRouter>
  );
}
