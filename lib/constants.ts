import { DoctorProfile, HospitalService, ManagementMember, NavItem, CoreValue } from "@/types";

export const HOSPITAL_INFO = {
  name: "Healthcare Hospital",
  locationName: "Chattogram, Bangladesh",
  fullAddress: "106 E K.B. Fazlul Kader Rd, Chattogram",
  displayPhone: "016*******",
  dialPhone: "+8801600000000",
  emergencyPhone: "016******* (24/7)",
  emergencyDialPhone: "+8801600000000",
  email: "info@healthcarehospital-ctg.com",
  emergencyEmail: "emergency@healthcarehospital-ctg.com",
  hours: "24 Hours Open (Emergency & Inpatient)",
  opdHours: "Saturday - Thursday: 4:00 PM - 9:00 PM",
  emergencyHours: "24/7 Immediate Attention",
  establishedYear: "2018",
  tagline: "Care, Compassion & Excellence in Chattogram",
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
  designation: "Consultant Physician & Specialist",
  degrees: ["MBBS (Chittagong Medical College)", "FCPS (Medicine)"],
  specialty: "Internal Medicine & General Practice",
  experience: "12+ Years Clinical Experience",
  about:
    "Dr. A.S.M. Rashedul Hasan is a renowned Medicine Consultant dedicated to delivering evidence-based, compassionate diagnosis and therapy for complex adult medical conditions, chronic metabolic disorders, and acute illnesses.",
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
    role: "Medical Director & Chairman",
    qualifications: "MBBS, MPH (Health Administration)",
    bio: "With over 25 years of public and private healthcare leadership in Chattogram, Dr. Karim oversees clinical governance, patient safety protocols, and medical staff excellence at Healthcare Hospital.",
  },
  {
    name: "Mr. Anwar Kamal",
    role: "Managing Director & Operations Head",
    qualifications: "M.Com, MBA (Hospital Management)",
    bio: "Mr. Kamal brings extensive healthcare operations and infrastructure management experience, ensuring uninterrupted 24/7 hospital utility readiness, diagnostic support, and patient-centered service delivery.",
  },
];

export const HOSPITAL_SERVICES: HospitalService[] = [
  {
    id: "consultant-opd",
    title: "Consultant OPD",
    shortDesc: "Specialist consultation chamber by Dr. A.S.M. Rashedul Hasan for comprehensive adult medicine care.",
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
    title: "Request Appointment",
    desc: "Book online through our portal or call our hotline to reserve your consultation slot.",
  },
  {
    step: 2,
    title: "Visit Our Hospital",
    desc: "Arrive at 106 E K.B. Fazlul Kader Rd, Chattogram 15 minutes before your scheduled slot.",
  },
  {
    step: 3,
    title: "Expert Consultation",
    desc: "Meet Dr. Hasan for in-depth clinical diagnosis, investigation planning, and tailored treatment.",
  },
];
