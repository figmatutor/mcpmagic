"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, ChevronDown, ExternalLink, Youtube } from "lucide-react";
import TypeIt from "typeit";

interface StatItem {
  value: string;
  label: string;
}

interface HeroSectionProps {
  stats?: StatItem[];
}

// Figma 아이콘 SVG 컴포넌트
const FigmaIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.02-3.019-3.02h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.019 3.019 3.019h3.117v-6.039H8.148z" />

    <path d="M8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49c2.489 0 4.515 2.014 4.515 4.49S10.661 24 8.172 24zm.013-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02 3.019-1.355 3.019-3.02-1.354-3.019-3.019-3.019z" />

    <path d="M15.83 15.48c-2.489 0-4.515-2.014-4.515-4.49s2.026-4.49 4.515-4.49 4.49 2.014 4.49 4.49-2.001 4.49-4.49 4.49zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02 3.019-1.355 3.019-3.02-1.354-3.019-3.019-3.019z" />
  </svg>
);

export default function HeroSection({ stats = [] }: HeroSectionProps) {
  const typeItRef = useRef<HTMLSpanElement>(null);

  // 기본 통계 데이터
  const defaultStats: StatItem[] = [
    { value: "50+", label: "Prompts" },
    { value: "5", label: "Categories" },
    { value: "3", label: "Languages" },
  ];

  // props로 받은 stats가 있으면 사용하고, 없으면 기본값 사용
  const displayStats = stats.length > 0 ? stats : defaultStats;

  useEffect(() => {
    if (typeItRef.current) {
      new TypeIt(typeItRef.current, {
        speed: 80,
        waitUntilVisible: true,
        loop: false,
      })
        .type("Design Workflow", { delay: 2500 })
        .delete(8) // "Workflow" 삭제 (8글자)
        .type("Tasks", { delay: 2000 })
        .delete(5) // "Tasks" 삭제 (5글자)
        .type("Annotations", { delay: 2000 })
        .delete(11) // "Annotations" 삭제 (11글자)
        .type("Handoff", { delay: 2000 })
        .delete(7) // "Handoff" 삭제 (7글자)
        .type("Documentation", { delay: 2000 })
        .delete(13) // "Documentation" 삭제 (13글자)
        .type("with MCP", { delay: 2000 })
        .go();
    }
  }, []);

  const handlePlaygroundLink = (url: string) => {
    console.log("Playground link clicked:", url);
    // 새 창에서 Figma 파일 열기
    try {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (!newWindow) {
        console.log("Popup blocked, redirecting in current window");
        // 팝업이 차단된 경우 현재 창에서 열기
        window.location.href = url;
      } else {
        console.log("Opened in new window successfully");
      }
    } catch (error) {
      console.error("Failed to open playground link:", error);
      // 오류 발생 시 현재 창에서 열기
      window.location.href = url;
    }
  };

  const handleTutorialVideo = () => {
    window.open(
      "https://youtube.com/playlist?list=PLLQlZaiiGlHOdfqGoErLQaMaDPZdHARVV&si=uCGpp7BwXerIhtbV",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="relative overflow-hidden bg-black pt-20 pb-16">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Muzli Style Badge */}
          <div className="inline-block">
            <Badge 
              variant="secondary" 
              className="bg-transparent text-white/80 border-0 text-sm font-medium px-6 py-2"
            >
              MCP Magic 하이라이트
            </Badge>
          </div>

          {/* Main Headline - Muzli Style */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white leading-[1.4]">
              Figma mcp
              <br />
              <span className="text-white/60">연결하다가 포기하셨나요?</span>
            </h1>

            <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              MCP magic으로 클릭 한 번에 연결하고
              <br />
              워크플로우를 간소화 해보세요.
            </p>
          </div>

          {/* CTA Buttons - Muzli Style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="bg-[rgb(58,94,251)] hover:bg-[rgb(48,84,241)] text-white text-base font-semibold rounded-[32px] px-14 h-[50px] transition-all duration-200"
              onClick={() => window.open("https://www.figma.com/community/file/1513759391089024242", "_blank", "noopener,noreferrer")}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Mac용 다운로드
            </Button>

            <Button
              size="lg"
              className="bg-transparent hover:bg-white/10 text-white/80 hover:text-white text-sm font-semibold rounded-[32px] px-5 h-[40px] border-0 transition-all duration-200"
              onClick={() => window.open("https://www.figma.com/community/file/1513759391089024242", "_blank", "noopener,noreferrer")}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12V6.75l6-1.32v6.48L3 12m17-9v18l-5 2.09V5.07L20 3M3 13l6 .09v6.81l-6-1.15V13z"/>
              </svg>
              Windows용 다운로드
            </Button>
          </div>

          {/* Stats - Muzli Style */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-center">
            {displayStats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl lg:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
