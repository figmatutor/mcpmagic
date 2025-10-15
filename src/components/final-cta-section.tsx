"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTASection() {
  const handleGetStarted = () => {
    window.open(
      "https://www.figma.com/community/file/1513760524697897204",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="min-h-[700px] flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="bg-transparent text-white/80 border-0">
            <Sparkles className="h-4 w-4 mr-2" />
            지금 시작하세요
          </Badge>

          <div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-[1.3]">
              MCP Magic으로
              <br />
              귀한 시간을 아껴보세요
            </h2>
            <p className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
              지금 디자인 워크플로우 자동화를 시작하세요.
            </p>
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-[rgb(58,94,251)] hover:bg-[rgb(48,84,241)] text-white text-base font-semibold rounded-[32px] px-14 h-[50px] transition-all duration-200"
              onClick={handleGetStarted}
            >
              무료로 시작하기
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

