import { DoctorProfile, HospitalService, ManagementMember, NavItem, CoreValue, HeroSlide } from "@/types";

export const HOSPITAL_INFO = {
  name: "Healthcare Hospital",
  locationName: "Chattogram, Bangladesh",
  fullAddress: "106 E K.B. Fazlul Kader Rd, Chattogram 4203, Bangladesh",
  displayPhone: "016*******",
  dialPhone: "+8801600000000",
  emergencyPhone: "016******* (24/7)",
  emergencyDialPhone: "+8801600000000",
  email: "info@healthcarehospital-ctg.com",
  emergencyEmail: "emergency@healthcarehospital-ctg.com",
  hours: "24 Hours Open (Emergency & Inpatient)",
  opdHours: "Saturday - Thursday: 5:00 PM - 9:00 PM",
  emergencyHours: "24/7 Immediate Attention",
  establishedYear: "2018",
  tagline: "Care, Compassion, Excellence",
  wards: "1 Emergency Ward, 1 General Medicine Ward",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Doctor", href: "/doctor" },
  { label: "Services", href: "/services" },
  { label: "Appointment", href: "/appointment" },
  { label: "Contact", href: "/contact" },
];

export const DOCTOR_PROFILE: DoctorProfile = {
  name: "Dr. A.S.M. Rashedul Hasan",
  designation: "Consultant (Medicine)",
  degrees: ["MBBS", "FCPS (Medicine)"],
  specialty: "Internal Medicine & General Practice",
  experience: "12+ Years Clinical Experience",
  about:
    "Dr. A.S.M. Rashedul Hasan is the senior Consultant Physician at Healthcare Hospital, delivering evidence-based medicine, accurate diagnostic evaluation, and comprehensive management for chronic and acute adult conditions.",
  schedule: [
    { days: "Saturday - Wednesday", time: "5:00 PM - 9:00 PM", room: "Chamber 201, OPD Block" },
    { days: "Thursday", time: "6:00 PM - 9:00 PM", room: "Chamber 201, OPD Block" },
    { days: "Friday", time: "On-Call / Emergency Inpatient Rounds", room: "Emergency & Ward" },
  ],
  consultationFee: "৳ 800 (New) / ৳ 500 (Follow-up within 14 days)",
  languages: ["Bengali", "English", "Chittagonian"],
};

export const MANAGEMENT_MEMBERS: ManagementMember[] = [
  {
    name: "Dr. Abdul Karim",
    role: "Managing Director",
    qualifications: "MBBS, CCD (BIRDEM)",
    bio: "Dr. Abdul Karim leads Healthcare Hospital's clinical standards, institutional governance, and quality assurance with a distinguished background in medicine and diabetes care from BIRDEM.",
  },
  {
    name: "Mr. Anwar Kamal",
    role: "Hospital Manager",
    qualifications: "Hospital Administration",
    bio: "Mr. Anwar Kamal oversees daily hospital operations, facility maintenance, emergency desk logistics, and patient support services to ensure smooth hospital functioning.",
  },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: "Consultant Physician OPD",
    headline: "Expert Medicine Consultation by Dr. A.S.M. Rashedul Hasan",
    subtext: "Personalized, evidence-based adult medical diagnosis and chronic disease management in Chamber 201.",
    primaryCtaText: "Book Appointment",
    primaryCtaHref: "/appointment",
    secondaryCtaText: "View Schedule",
    secondaryCtaHref: "/doctor",
    isEmergencySlide: false,
  },
  {
    id: 2,
    badge: "24/7 Rapid Emergency Ward",
    headline: "Immediate Doctor-Led Emergency Triage & Stabilization",
    subtext: "Equipped observation beds, oxygen delivery, and immediate trauma resuscitation available 24 hours daily.",
    primaryCtaText: "Emergency: 016*******",
    primaryCtaHref: "tel:+8801600000000",
    secondaryCtaText: "Ward Services",
    secondaryCtaHref: "/services",
    isEmergencySlide: true,
  },
  {
    id: 3,
    badge: "1 General Medicine Ward",
    headline: "Dedicated Inpatient Care with Continuous Nursing Supervision",
    subtext: "Hygienic beds, daily consultant rounds, and caring medical attention at 106 E K.B. Fazlul Kader Road.",
    primaryCtaText: "Explore Services",
    primaryCtaHref: "/services",
    secondaryCtaText: "How to Visit",
    secondaryCtaHref: "/#how-to-visit",
    isEmergencySlide: false,
  },
];

export const HOSPITAL_SERVICES: HospitalService[] = [
  {
    id: "consultant-opd",
    title: "Consultant OPD",
    shortDesc: "Specialist consultation chamber by Dr. A.S.M. Rashedul Hasan (MBBS, FCPS Medicine).",
    fullDesc:
      "Our Outpatient Department (OPD) provides personalized consultation, diagnosis, chronic disease management (diabetes, hypertension, asthma, infectious diseases), and systematic preventive health screenings.",
    features: [
      "Dedicated chamber consultation with Dr. Hasan",
      "Comprehensive diagnostic review & second opinion",
      "Pre-booked digital serials to minimize waiting time",
      "Digital prescription & follow-up tracking",
    ],
    isEmergency: false,
    availability: "Sat - Thu: 5:00 PM - 9:00 PM",
    iconName: "Stethoscope",
  },
  {
    id: "emergency-ward",
    title: "24/7 Emergency Ward",
    shortDesc: "Rapid-response triage and trauma stabilization unit staffed around the clock by experienced medical officers.",
    fullDesc:
      "Equipped with oxygen delivery systems, cardiac monitoring, resuscitation crash carts, and dedicated emergency observation beds for urgent stabilization and admission.",
    features: [
      "Immediate doctor-led triage without waiting",
      "Point-of-care vital signs and ECG monitoring",
      "Emergency medication infusion & nebulization unit",
      "Immediate transfer to inpatient medicine ward",
    ],
    isEmergency: true,
    availability: "24 Hours / 7 Days a Week",
    iconName: "AlertTriangle",
  },
  {
    id: "general-medicine-ward",
    title: "General Medicine Ward",
    shortDesc: "Comfortable inpatient ward facilities with round-the-clock nursing supervision and daily consultant rounds.",
    fullDesc:
      "A clean, hygienic, and well-monitored inpatient medicine ward catering to patients recovering from acute medical conditions, fever syndromes, uncontrolled hypertension, and post-emergency observation.",
    features: [
      "24/7 on-duty registered nursing care",
      "Daily morning and evening consultant rounds",
      "Hygienic patient beds with modern bedside call bells",
      "Nutritious in-house clinical dietary supervision",
    ],
    isEmergency: false,
    availability: "24 Hours Inpatient Care",
    iconName: "BedDouble",
  },
];

export const CORE_VALUES: CoreValue[] = [
  {
    title: "Care",
    description: "Personalized attention tailored to every patient's unique physical, psychological, and clinical needs.",
    iconName: "HeartPulse",
  },
  {
    title: "Compassion",
    description: "Treating every visitor with dignity, empathy, and patient-first ethical transparency at every step.",
    iconName: "HandHeart",
  },
  {
    title: "Excellence",
    description: "Strict adherence to evidence-based clinical standards, modern diagnostic accuracy, and sterile hospital protocols.",
    iconName: "Award",
  },
];

export const HOW_TO_VISIT_STEPS = [
  {
    step: 1,
    title: "Call",
    desc: "Call our hospital reception (016*******) or emergency hotline to enquire about doctor availability.",
  },
  {
    step: 2,
    title: "Book",
    desc: "Reserve your serial token online through our appointment form or receive it directly over the phone.",
  },
  {
    step: 3,
    title: "Visit",
    desc: "Arrive at 106 E K.B. Fazlul Kader Rd, Chattogram 15 minutes before your slot for consultation.",
  },
];

