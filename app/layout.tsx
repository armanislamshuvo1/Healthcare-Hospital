import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TopUtilityBar } from "@/components/layout/TopUtilityBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCallButton } from "@/components/layout/FloatingCallButton";
import { HOSPITAL_INFO } from "@/lib/constants";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: `%s | ${HOSPITAL_INFO.name} Chattogram`,
    default: `${HOSPITAL_INFO.name} | Care, Compassion & Excellence in Chattogram`,
  },
  description:
    "Healthcare Hospital at 106 E K.B. Fazlul Kader Rd, Chattogram. Specialized adult consultation by Dr. A.S.M. Rashedul Hasan, 24/7 Emergency Ward, and Medicine Inpatient Care.",
  keywords: [
    "Healthcare Hospital",
    "Chattogram Hospital",
    "Dr. A.S.M. Rashedul Hasan",
    "K.B. Fazlul Kader Road",
    "Medicine Consultant Chattogram",
    "Emergency Hospital Chattogram",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen text-slate-800 bg-slate-50 antialiased selection:bg-teal-100 selection:text-teal-900">
        <TopUtilityBar />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  );
}
