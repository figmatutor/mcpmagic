"use client";

import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import FinalCTASection from "@/components/final-cta-section";
import Contributors from "@/components/contributors";
import Footer from "@/components/footer";

export default function LandingPage() {
  const stats = [
    { value: "24+", label: "프롬프트" },
    { value: "5", label: "카테고리" },
    { value: "3", label: "언어" },
  ];

  return (
    <>
      <HeroSection stats={stats} />
      <FeaturesSection />
      <FinalCTASection />
      <Contributors />
      <Footer />
    </>
  );
}

