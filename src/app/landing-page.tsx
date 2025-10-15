"use client";

import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import FinalCTASection from "@/components/final-cta-section";
import Contributors from "@/components/contributors";
import Footer from "@/components/footer";
import { BeamsBackground } from "@/components/ui/beams-background";

export default function LandingPage() {
  return (
    <BeamsBackground intensity="medium">
      <HeroSection />
      <FeaturesSection />
      <FinalCTASection />
      <Contributors />
      <Footer />
    </BeamsBackground>
  );
}

