"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  initials: string;
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      name: "김서연",
      role: "프로덕트 디자이너",
      company: "테크 스타트업",
      content: "MCP Magic이 Figma 작업 방식을 완전히 바꿔놓았습니다. 자동화 덕분에 매주 몇 시간씩 절약되고, AI 통합이 완벽합니다.",
      initials: "김서연",
    },
    {
      name: "이준호",
      role: "디자인 리드",
      company: "이커머스 플랫폼",
      content: "프롬프트 라이브러리가 정말 놀랍습니다. 이제 실제 데이터로 디자인을 자동으로 채우고 몇 초 만에 주석을 생성할 수 있습니다. 게임 체인저!",
      initials: "이준호",
    },
    {
      name: "박지은",
      role: "UI/UX 디자이너",
      company: "SaaS 회사",
      content: "마침내 디자이너 워크플로우를 실제로 이해하는 도구를 찾았습니다. MCP 통합이 훌륭하고 설정도 쉽습니다.",
      initials: "박지은",
    },
    {
      name: "최민수",
      role: "크리에이티브 디렉터",
      company: "디지털 에이전시",
      content: "우리 팀의 생산성이 극적으로 향상되었습니다. 콘텐츠 생성부터 디자인 시스템 관리까지 모든 것에 사용하고 있습니다.",
      initials: "최민수",
    },
    {
      name: "정하영",
      role: "시니어 디자이너",
      company: "핀테크 회사",
      content: "지루한 작업을 자동화하여 창의적인 작업에 집중할 수 있게 해주는 것이 마음에 듭니다. 시간 절약 효과가 정말 대단합니다.",
      initials: "정하영",
    },
    {
      name: "강태윤",
      role: "프로덕트 매니저",
      company: "모바일 앱 스타트업",
      content: "디자인과 개발 간의 협업이 이렇게 좋았던 적이 없습니다. 자동 주석과 스펙이 왕복 작업을 크게 줄여줍니다.",
      initials: "강태윤",
    },
  ];

  return (
    <section className="min-h-[900px] flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-[1.3]">
            크리에이티브의 목소리
          </h2>
          <p className="text-base text-white/80">
            모든 곳의 디자이너들이 신뢰합니다
          </p>
          <p className="text-base text-white/60 mt-2">
            만족한 사용자들의 실제 피드백
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12 bg-blue-600 text-white">
                    <AvatarFallback className="bg-blue-600 text-white font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {testimonial.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

