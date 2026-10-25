import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateBangladeshiPhone(phone: string): {
  isValid: boolean;
  error?: string;
  normalized?: string;
} {
  if (!phone || phone.trim() === "") {
    return {
      isValid: false,
      error: "Phone number is required.",
    };
  }

  // Remove whitespace, dashes, and parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");

  // Check against Bangladeshi mobile pattern
  // BD mobile operators: 013, 014, 015, 016, 017, 018, 019
  // Supports formats: 01XXXXXXXXX, +8801XXXXXXXXX, 8801XXXXXXXXX
  const bdPhoneRegex = /^(?:\+?880|0)?1[3-9]\d{8}$/;

  if (!bdPhoneRegex.test(cleaned)) {
    return {
      isValid: false,
      error: "Enter a valid 11-digit Bangladeshi mobile number (e.g. 016XXXXXXXX).",
    };
  }

  // Extract standard 11-digit representation
  const match = cleaned.match(/1[3-9]\d{8}$/);
  const normalized = match ? `0${match[0]}` : cleaned;

  return {
    isValid: true,
    normalized,
  };
}
