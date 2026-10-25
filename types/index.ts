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
  age: string;
  gender: 'male' | 'female' | 'other' | '';
  appointmentDate: string;
  reason: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface CoreValue {
  title: string;
  description: string;
  iconName: string;
}
