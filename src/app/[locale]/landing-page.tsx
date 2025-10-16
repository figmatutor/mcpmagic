"use client";

import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import FinalCTASection from "@/components/final-cta-section";
import Contributors from "@/components/contributors";
import Footer from "@/components/footer";
import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background";

export default function LandingPage() {
  return (
    <AuroraBackground className="min-h-screen" showRadialGradient={false}>
      <HeroSection />
      <FeaturesSection />
      <FinalCTASection />
      <Contributors />
      <Footer />
    </AuroraBackground>
  );
}

