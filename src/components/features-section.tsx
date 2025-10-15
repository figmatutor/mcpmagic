"use client";

import { Zap, Workflow, Search, Share2, FileText, Palette, Link2, Bot } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeaturesSection() {
  const mainFeatures: Feature[] = [
    {
      icon: <Link2 className="h-12 w-12 text-white" />,
      title: "연결",
      description: "MCP 프로토콜을 통해 클릭 한 번으로 Figma를 AI에 원활하게 연결하세요",
    },
    {
      icon: <Zap className="h-12 w-12 text-white" />,
      title: "자동화",
      description: "AI 기반 프롬프트와 워크플로우로 반복적인 디자인 작업을 자동화하세요",
    },
    {
      icon: <Search className="h-12 w-12 text-white" />,
      title: "검색",
      description: "큐레이션된 컬렉션에서 완벽한 프롬프트를 즉시 찾아 적용하세요",
    },
    {
      icon: <Share2 className="h-12 w-12 text-white" />,
      title: "공유",
      description: "디자인 커뮤니티와 맞춤 프롬프트 및 워크플로우를 공유하세요",
    },
  ];

  const capabilities: Feature[] = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "콘텐츠 자동 채우기",
      description: "CSV, JSON 또는 웹 소스의 실제 데이터로 디자인을 채우세요",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "주석 생성",
      description: "포괄적인 디자인 스펙과 문서를 자동으로 생성하세요",
    },
    {
      icon: <Workflow className="h-8 w-8" />,
      title: "프로토타입 변환",
      description: "프로토타입 연결을 FigJam 플로우 다이어그램으로 즉시 변환하세요",
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "스마트 오버라이드",
      description: "컴포넌트 인스턴스와 디자인 시스템 업데이트를 효율적으로 관리하세요",
    },
  ];

  return (
    <>
      {/* Main Features Section - Muzli Style */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              디자이너를 위한 맞춤형 MCP 도구
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              MCP Magic는 크리에이티브들이 디자인 워크플로우를 원활하게 자동화하여
              비할 데 없는 효율성과 생산성을 달성할 수 있도록 지원합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Connect Feature */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
              <div>
                <div className="inline-block bg-[rgb(58,94,251)]/20 rounded-full p-3 mb-4">
                  <Link2 className="h-8 w-8 text-[rgb(58,94,251)]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  손쉽게 AI에 연결하세요
                </h3>
                <p className="text-lg text-white/80 mb-6">
                  몇 초 만에 MCP 연결을 설정하세요. 복잡한 구성이 필요 없습니다—설치하고 AI로 Figma 워크플로우 자동화를 시작하세요.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[rgb(58,94,251)] rounded-full"></div>
                    <span className="text-white/70">원클릭 설정</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[rgb(58,94,251)] rounded-full"></div>
                    <span className="text-white/70">안전한 연결</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[rgb(58,94,251)] rounded-full"></div>
                    <span className="text-white/70">실시간 동기화</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 h-80 flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <Link2 className="h-16 w-16 text-[rgb(58,94,251)] mx-auto mb-3" />
                    <p className="font-semibold text-white">몇 초 만에 연결</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Automate Feature */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
              <div className="order-2 lg:order-1 bg-white/5 backdrop-blur-sm rounded-2xl p-8 h-80 flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <Zap className="h-16 w-16 text-[rgb(58,94,251)] mx-auto mb-3" />
                    <p className="font-semibold text-white">모든 것을 자동화</p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block bg-[rgb(58,94,251)]/20 rounded-full p-3 mb-4">
                  <Zap className="h-8 w-8 text-[rgb(58,94,251)]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  워크플로우를 간소화하세요
                </h3>
                <p className="text-lg text-white/80 mb-6">
                  광범위한 AI 기반 프롬프트 라이브러리로 반복적인 디자인 작업을 자동화하세요. 콘텐츠 채우기부터 주석 생성까지.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="text-[rgb(58,94,251)] mt-1">
                        {cap.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm mb-1">
                          {cap.title}
                        </h4>
                        <p className="text-xs text-white/70">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

