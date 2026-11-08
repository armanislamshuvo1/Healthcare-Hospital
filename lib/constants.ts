import { DoctorProfile, HospitalService, ManagementMember, NavItem, CoreValue, HeroSlide } from "@/types";

export const HOSPITAL_INFO = {
  name: "Healthcare Hospital",
  locationName: "Chattogram, Bangladesh",
  fullAddress: "K.B. Fazlul Kader Rd, Chattogram 4203, Bangladesh",
  displayPhone: "01647574776",
  dialPhone: "+8801647574776",
  emergencyPhone: "01647574776 (24/7)",
  emergencyDialPhone: "+8801647574776",
  email: "info@healthcarehospital-ctg.com",
  emergencyEmail: "emergency@healthcarehospital-ctg.com",
  hours: "24 Hours Open (Emergency & Inpatient)",
  opdHours: "Saturday - Thursday: 5:00 PM - 9:00 PM",
  emergencyHours: "24/7 Immediate Attention",
  establishedYear: "2018",
  tagline: "Cardiovascular Care, Compassion, Excellence",
  wards: "1 Emergency Ward, 1 Inpatient Cardiac Ward",
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
  name: "Dr. Shahidul Amin",
  designation: "Consultant (Cardiovascular and Thoracic Surgery)",
  degrees: ["MBBS", "MS (Cardiovascular and Thoracic Surgery)"],
  specialty: "Cardiovascular and Thoracic Surgery",
  experience: "Senior Consultant Specialist",
  about:
    "Dr. Shahidul Amin is the senior Consultant in Cardiovascular and Thoracic Surgery at Healthcare Hospital, delivering specialist evaluation for cardiac disorders, coronary conditions, chest pain evaluation, and thoracic surgical consultations.",
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
    headline: "Specialized Cardiovascular & Thoracic Care in Chattogram",
    subtext: "Expert consultation, cardiovascular evaluation, and thoracic surgical guidance by Dr. Shahidul Amin in Chamber 201.",
    primaryCtaText: "Book Appointment",
    primaryCtaHref: "/appointment",
    secondaryCtaText: "View Schedule",
    secondaryCtaHref: "/doctor",
    isEmergencySlide: false,
  },
  {
    id: 2,
    badge: "24/7 Rapid Emergency Ward",
    headline: "Rapid Assessment of Acute Chest Pain & Coronary Syndromes",
    subtext: "Initial assessment of acute chest pain, recognition of acute coronary syndrome, and immediate resuscitation.",
    primaryCtaText: "Emergency: 01647574776",
    primaryCtaHref: "tel:+8801647574776",
    secondaryCtaText: "Ward Services",
    secondaryCtaHref: "/services",
    isEmergencySlide: true,
  },
  {
    id: 3,
    badge: "1 General Medicine Ward",
    headline: "Dedicated Inpatient Care with Continuous Cardiac Monitoring",
    subtext: "Admission and monitoring of cardiac patients, management of stable heart failure, and supervised oxygen therapy.",
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
    shortDesc: "Cardiovascular & Thoracic Surgery consultation by Dr. Shahidul Amin (MBBS, MS Cardiovascular and Thoracic Surgery).",
    fullDesc:
      "Our Outpatient Department (OPD) provides personalized cardiovascular consultation, diagnosis, chest pain workup, pre/post-operative thoracic surgical review, and cardiac diagnostic evaluation.",
    features: [
      "Dedicated chamber consultation with Dr. Shahidul Amin",
      "Cardiac enzymes and troponin testing (if available)",
      "Holter monitoring and 12-lead ECG analysis",
      "Pre-booked digital serials to minimize waiting time",
    ],
    isEmergency: false,
    availability: "Sat - Thu: 5:00 PM - 9:00 PM",
    iconName: "Stethoscope",
  },
  {
    id: "emergency-ward",
    title: "24/7 Emergency Ward",
    shortDesc: "Immediate doctor-led triage and rapid-response cardiac stabilization unit for acute chest pain, acute coronary syndromes, and emergencies.",
    fullDesc:
      "Equipped with oxygen delivery systems, continuous cardiac monitoring, resuscitation crash carts, and dedicated observation beds for acute chest pain evaluation, immediate doctor-led triage, and stabilization.",
    features: [
      "Initial assessment of acute chest pain",
      "Recognition of acute coronary syndrome",
      "Initial management of suspected myocardial infarction",
      "Basic life support and resuscitation",
      "Emergency referral to a tertiary cardiac centre",
    ],
    isEmergency: true,
    availability: "24 Hours / 7 Days a Week",
    iconName: "AlertTriangle",
  },
  {
    id: "general-medicine-ward",
    title: "General Medicine Ward",
    shortDesc: "Specialized cardiac inpatient facility equipped for continuous cardiac monitoring, heart failure management, and oxygen therapy.",
    fullDesc:
      "A clean, hygienic, and continuously monitored inpatient ward catering to cardiac patients recovering from acute conditions, chest pain observation, and hypertension management.",
    features: [
      "Admission and monitoring of cardiac patients",
      "Management of stable heart failure",
      "Monitoring of hypertension & chest pain observation",
      "Oxygen therapy & continuous cardiac monitoring",
      "Initial stabilisation and referral of emergencies",
    ],
    isEmergency: false,
    availability: "24 Hours Inpatient Care",
    iconName: "BedDouble",
  },
];

export const CORE_VALUES: CoreValue[] = [
  {
    title: "Care",
    description: "Personalized attention tailored to every cardiac patient's unique physical, psychological, and clinical needs.",
    iconName: "HeartPulse",
  },
  {
    title: "Compassion",
    description: "Treating every visitor with dignity, empathy, and patient-first ethical transparency at every step.",
    iconName: "HandHeart",
  },
  {
    title: "Excellence",
    description: "Strict adherence to evidence-based cardiovascular standards, modern diagnostic accuracy, and sterile protocols.",
    iconName: "Award",
  },
];

export const HOW_TO_VISIT_STEPS = [
  {
    step: 1,
    title: "Call",
    desc: "Call our hospital reception (01647574776) or emergency hotline to enquire about doctor availability.",
  },
  {
    step: 2,
    title: "Book",
    desc: "Reserve your serial token online through our appointment form or receive it directly over the phone.",
  },
  {
    step: 3,
    title: "Visit",
    desc: "Arrive at K.B. Fazlul Kader Rd, Chattogram 15 minutes before your slot for consultation.",
  },
];
