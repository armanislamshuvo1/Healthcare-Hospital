"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Calendar, Activity } from "lucide-react";
import { HOSPITAL_INFO, NAV_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MobileDrawer } from "./MobileDrawer";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Hospital Logo / Branding */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6 text-teal-100" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-teal-700 transition-colors">
                  {HOSPITAL_INFO.name}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-teal-700 uppercase tracking-wider mt-1">
                  Chattogram • 1-Consultant Clinic
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150",
                      isActive
                        ? "text-teal-700 bg-teal-50/90 font-bold shadow-xs"
                        : "text-slate-700 hover:text-teal-700 hover:bg-slate-50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Book Appointment CTA + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                href="/appointment"
                variant="primary"
                size="md"
                className="hidden sm:inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="p-2 sm:p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-teal-700 lg:hidden focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Open mobile menu"
                aria-expanded={isDrawerOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-over Drawer for Viewports <1024px */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentPath={pathname}
      />
    </>
  );
}
