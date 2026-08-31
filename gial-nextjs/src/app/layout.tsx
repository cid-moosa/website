import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { GlowOrbs } from "@/components/animations/GlowOrbs";
import { ParticleCanvas } from "@/components/canvas/ParticleCanvas";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GIAL — Girideepam Institute of Advanced Learning",
    template: "%s | GIAL",
  },
  description:
    "Girideepam Institute of Advanced Learning (GIAL) offers BBA, BCA, B.Com, B.Sc, M.Com, MSW programs. Affiliated to Mahatma Gandhi University, Kottayam. AICTE approved. ISO 9001:2015 certified.",
  keywords: [
    "GIAL",
    "Girideepam",
    "college",
    "Kerala",
    "BBA",
    "BCA",
    "B.Com",
    "Cyber Forensics",
    "Psychology",
    "MBA",
    "MSW",
    "Mahatma Gandhi University",
  ],
  authors: [{ name: "GIAL" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Girideepam Institute of Advanced Learning",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="page-entrance">
        <Providers>
          <ParticleCanvas />
          <GlowOrbs />
          <Header />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
          <MobileActionBar />
        </Providers>
      </body>
    </html>
  );
}
