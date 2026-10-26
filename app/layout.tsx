import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TopUtilityBar } from "@/components/layout/TopUtilityBar";
import { NoticeStrip } from "@/components/layout/NoticeStrip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCallButton } from "@/components/layout/FloatingCallButton";
import { HOSPITAL_INFO, DOCTOR_PROFILE } from "@/lib/constants";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: `%s | ${HOSPITAL_INFO.name} Chattogram`,
    default: `${HOSPITAL_INFO.name} | Care, Compassion, Excellence in Chattogram`,
  },
  description:
    "Healthcare Hospital at 106 E K.B. Fazlul Kader Rd, Chattogram 4203. Specialized adult consultation by Dr. A.S.M. Rashedul Hasan, 24/7 Emergency Ward, and Medicine Inpatient Care.",
  keywords: [
    "Healthcare Hospital",
    "Chattogram Hospital",
    "Dr. A.S.M. Rashedul Hasan",
    "Dr. Abdul Karim",
    "Mr. Anwar Kamal",
    "K.B. Fazlul Kader Road",
    "Medicine Consultant Chattogram",
    "Emergency Hospital Chattogram",
  ],
  authors: [{ name: HOSPITAL_INFO.name }],
  metadataBase: new URL("https://healthcarehospital-ctg.com"),
  openGraph: {
    title: `${HOSPITAL_INFO.name} | Chattogram`,
    description: "Specialist adult medicine consultation & 24/7 emergency care in Chattogram.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: HOSPITAL_INFO.name,
    url: "https://healthcarehospital-ctg.com",
    logo: "https://healthcarehospital-ctg.com/logo.svg",
    telephone: HOSPITAL_INFO.dialPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "106 E K.B. Fazlul Kader Rd",
      addressLocality: "Chattogram",
      postalCode: "4203",
      addressCountry: "BD",
    },
    medicalSpecialty: "Internal Medicine",
    department: [
      {
        "@type": "EmergencyService",
        name: "24/7 Emergency Ward",
        availableChannel: {
          "@type": "ServiceChannel",
          servicePhone: HOSPITAL_INFO.emergencyDialPhone,
        },
      },
      {
        "@type": "MedicalClinic",
        name: "Consultant OPD",
        physician: {
          "@type": "Physician",
          name: DOCTOR_PROFILE.name,
          medicalSpecialty: DOCTOR_PROFILE.specialty,
        },
      },
    ],
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen text-slate-800 bg-slate-50 antialiased selection:bg-teal-100 selection:text-teal-900">
        <NoticeStrip />
        <TopUtilityBar />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  );
}
