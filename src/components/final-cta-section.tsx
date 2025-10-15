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
    <section className="py-20">
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
          </div>
        </div>
      </div>
    </section>
  );
}

