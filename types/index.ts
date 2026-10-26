export interface NavItem {
  label: string;
  href: string;
}

export interface DoctorProfile {
  name: string;
  designation: string;
  degrees: string[];
  specialty: string;
  experience: string;
  about: string;
  schedule: {
    days: string;
    time: string;
    room: string;
  }[];
  consultationFee: string;
  languages: string[];
}

export interface ManagementMember {
  name: string;
  role: string;
  qualifications: string;
  bio: string;
}

export interface HospitalService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  isEmergency?: boolean;
  availability: string;
  iconName: string;
}

export interface AppointmentFormData {
  patientName: string;
  phoneNumber: string;
  email?: string;
  age: string;
  gender: 'male' | 'female' | 'other' | '';
  appointmentDate: string;
  reason: string;
  hpField?: string;
}

export interface AppointmentRequestRecord {
  id: string;
  token: string;
  patientName: string;
  phoneNumber: string;
  email?: string;
  age: string;
  gender: string;
  appointmentDate: string;
  reason: string;
  doctorName: string;
  status: 'Called' | 'Confirmed' | 'Cancelled';
  submittedAt: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  hpField?: string;
}

export interface CoreValue {
  title: string;
  description: string;
  iconName: string;
}

export interface HeroSlide {
  id: number;
  badge: string;
  headline: string;
  subtext: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  isEmergencySlide?: boolean;
}

