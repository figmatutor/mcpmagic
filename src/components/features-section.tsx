"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Feature {
  title: string;
  description: string;
}

export default function FeaturesSection() {
  const mainFeatures: Feature[] = [
    {
      title: "연결",
      description: "MCP 프로토콜을 통해 클릭 한 번으로 Figma를 AI에 원활하게 연결하세요",
    },
    {
      title: "자동화",
      description: "AI 기반 프롬프트와 워크플로우로 반복적인 디자인 작업을 자동화하세요",
    },
    {
      title: "검색",
      description: "큐레이션된 컬렉션에서 완벽한 프롬프트를 즉시 찾아 적용하세요",
    },
    {
      title: "공유",
      description: "디자인 커뮤니티와 맞춤 프롬프트 및 워크플로우를 공유하세요",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            디자이너를 위한 맞춤형 MCP 도구
          </h2>
          <p className="text-sm text-white/80 max-w-3xl mx-auto">
            MCP Magic는 크리에이티브들이 디자인 워크플로우를 원활하게 자동화하여
            비할 데 없는 효율성과 생산성을 달성할 수 있도록 지원합니다.
          </p>
        </div>

        <HoverEffect items={mainFeatures} />
      </div>
    </section>
  );
}

const HoverEffect = ({
  items,
  className,
}: {
  items: Feature[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-5",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
