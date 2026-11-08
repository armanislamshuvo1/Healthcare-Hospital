# Healthcare Hospital — Official Website

> A fast, mobile-first website for **Healthcare Hospital** in Chattogram, Bangladesh. Built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

---

## Overview

- **Hospital**: Healthcare Hospital
- **Location**: K.B. Fazlul Kader Rd, Chattogram 4203, Bangladesh
- **Core Values**: Care, Compassion, Excellence
- **Lead Consultant**: Dr. A.S.M. Rashedul Hasan (MBBS, FCPS Medicine)
- **Hospital Leadership**: Dr. Abdul Karim (Managing Director), Mr. Anwar Kamal (Hospital Manager)
- **Key Wards**: 1 Emergency Ward (24/7), 1 General Medicine Inpatient Ward

---

## Pages & Structure

| Route | Page | Key Content |
|---|---|---|
| `/` | Home | Hero banner, Core Values, 3-Step "How to Visit" process, Services preview, Doctor spotlight, Emergency tap-to-call banner |
| `/about` | About Us | Hospital story, clinical pillars, and Leadership cards for Dr. Abdul Karim and Mr. Anwar Kamal |
| `/doctor` | Our Doctor | Comprehensive profile of Dr. A.S.M. Rashedul Hasan (qualifications, OPD schedule, chamber details, booking trigger) |
| `/services` | Services | Consultant OPD, 24/7 Emergency Ward, and General Medicine Inpatient Ward |
| `/appointment` | Appointment | Interactive request form with real-time Bangladeshi phone validation, instant token generation, confirmation popup, and persistent success banner |
| `/contact` | Contact | Hospital address, direct tap-to-call links, interactive inquiry form, and Google Maps embed |

---

## Features

- **Tap-to-Call Everywhere**: Top utility bar, sticky header, emergency banner, and mobile floating action button (FAB).
- **Interactive Booking Form**: Validates Bangladeshi phone numbers (`01XXXXXXXXX` / `+8801...`), displays field errors, generates token receipts (e.g. `HH-APT-...`), and notifies patients with call expectations.
- **Design System**: Medical teal/navy palette inspired by modern tertiary hospital layouts, with red strictly isolated for emergency actions.
- **Mobile-First Responsive**: Verified across 360px (mobile), 768px (tablet), and 1280px+ (desktop).

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/) (Singapore `sin1` edge region configured)

---

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9+

### 1. Installation

```bash
npm install
```

### 2. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Automated Tests

The test suite runs 118 verification checks across 6 suites (phone regex, red color isolation, route smoke tests, component architecture, and integration flows):

```bash
npm test
```

### 4. Production Build

```bash
npm run build
npm start
```

---

## Deploy to Vercel

### Option 1: Vercel CLI (Fastest)

```bash
npx vercel
```

Follow the prompts to link the project and deploy immediately.

### Option 2: Git Integration

1. Create a repository on GitHub / GitLab.
2. Link and push your local commits:
   ```bash
   git remote add origin https://github.com/<your-username>/healthcare-hospital.git
   git push -u origin master
   ```
3. Import the repository on [vercel.com](https://vercel.com/new). Vercel will automatically detect the Next.js setup and `vercel.json` configuration.

---

## License

Private repository for Healthcare Hospital, Chattogram. All rights reserved.
