"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import PortfolioSection from "@/components/PortfolioSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import DigitalTwinChat from "@/components/DigitalTwinChat";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#05060b] text-slate-100">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <PortfolioSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <Footer />
      <DigitalTwinChat />
    </div>
  );
}
