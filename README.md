# Girideepam Institute of Advanced Learning (GIAL) — Next-Gen Web Platform

[![Next.js](https://img.shields.io/badge/Next.js-16+-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748.svg)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)

> **College Project & Testing Platform**: An ultra-modern, interactive web platform built for **Girideepam Institute of Advanced Learning (GIAL)**, Kottayam, Kerala (Affiliated with Mahatma Gandhi University, approved by AICTE, ISO 9001:2015 certified).

---

## 🌟 Key Architecture & Features

1. **Minimalist macOS Liquid Glass Floating Dock**:
   - Centered floating glass capsule with Apple visionOS refraction (`backdrop-filter: blur(24px) saturate(220%)`).
   - Wave magnification physics on hover (`scale-130 -translate-y-2`) with smooth spring dynamics.
   - Floating dark glass tooltip pills and active app indicator dots.
   - Animated peekable context flyout menus with directory links.

2. **2-Second Scroll-Driven Panorama Storytelling Hero**:
   - Zero-bezel edge-bleed panoramic campus photography.
   - Smooth LERP translation physics with camera slow push-in.
   - Dynamic slide indicator controller with instant jump markers.

3. **Complete Dynamic Academic Degree Portals**:
   - Individual portals for BBA, BCA, B.Sc Cyber Forensics, B.Sc Psychology, B.Com (Finance, CA, Logistics), M.Com, and MSW.
   - 6-semester CBCS curriculum breakdown, faculty directories with cipher decryption cards, lab equipment galleries, and career avenues.
   - Continuous scroll spy in-page anchoring.

4. **Online Admissions & Instant Fee Payment Gateway**:
   - Step-by-step admission application form with immediate tracking ticket ID generator.
   - Real-time semester fee schedule with integrated payment gateway modal and receipt generator.

5. **Full Compliance & IQAC Transparency Portal**:
   - NAAC Self-Study Reports (SSR), AQAR annual filings, minutes of meetings, and feedback mechanisms.
   - Grievance Redressal, Anti-Ragging Cell, and Internal Complaints Committee (ICC).

6. **Campus Life & Student Experience**:
   - Student clubs: ByteForge IT Club, Excellencia Management Forum, Commercio, Sanctuary Social Work, and Psyche Wellbeing.
   - High-tech computer labs, central digital library, smart auditoriums, and eco-cafeteria.

---

## 🚀 Live Hosting & Deployment

### Option 1: Deploy on Vercel (One-Click)
1. Fork / push this repository to your GitHub account (`https://github.com/cid-moosa/website`).
2. Go to [Vercel](https://vercel.com) and click **"Import Project"**.
3. Set the **Root Directory** to `gial-nextjs`.
4. Add environment variables if prompted (defaults to `DATABASE_URL="file:./dev.db"`).
5. Click **Deploy** — your site will be live on a custom `.vercel.app` domain!

### Option 2: Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/cid-moosa/website.git
cd website/gial-nextjs

# 2. Install dependencies
npm install

# 3. Initialize Prisma database
npx prisma generate

# 4. Start Next.js development server
npm run dev
# -> Platform running live at http://localhost:3000
```

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 + Custom Apple visionOS Liquid Glass Design System
- **Database & ORM**: SQLite + Prisma ORM
- **Icons & Motion**: Lucide React + CSS Spring Easing Mechanics
- **Animation**: HTML5 Canvas Particle Engine (Thematic Domain Palettes)

---

## 🏛️ About GIAL
- **Location**: Bethany Hills, Vadavathoor P.O., Kottayam, Kerala — 686 010
- **Patronage**: Bethany Navajyothi Province (OIC)
- **Affiliation**: Mahatma Gandhi University, Kottayam | AICTE Approved | ISO 9001:2015 Certified
