"use client";

import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import FinalCTASection from "@/components/final-cta-section";
import Contributors from "@/components/contributors";
import Footer from "@/components/footer";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FinalCTASection />
      <Contributors />
      <Footer />
    </>
  );
}

