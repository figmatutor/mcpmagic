"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function FinalCTASection() {
  const handleGetStarted = () => {
    window.open(
      "https://www.figma.com/community/file/1513760524697897204",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge variant="secondary" className="bg-transparent text-white/80 border-0">
            <Sparkles className="h-4 w-4 mr-2" />
            지금 시작하세요
          </Badge>

          <div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              무료로 체험하고, 영원히 사용하세요
            </h2>
            <p className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              구독이 필요 없습니다. 지금 디자인 워크플로우 자동화를 시작하세요.
              MCP Magic으로 매주 몇 시간씩 절약하는 수천 명의 디자이너들과 함께하세요.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="bg-[rgb(58,94,251)] hover:bg-[rgb(48,84,241)] text-white text-base font-semibold rounded-[32px] px-14 h-[50px] transition-all duration-200"
              onClick={handleGetStarted}
            >
              무료로 시작하기
            </Button>
            <Button
              size="lg"
              className="bg-transparent hover:bg-white/10 text-white/80 hover:text-white text-sm font-semibold rounded-[32px] px-5 h-[40px] border-0 transition-all duration-200"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              더 알아보기
            </Button>
          </div>

          <div className="pt-8">
            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24+</div>
                <div className="text-sm">준비된 프롬프트</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-sm">카테고리</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-sm">언어</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-sm">가능성</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

