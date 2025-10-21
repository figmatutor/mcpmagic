"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations('hero');
  return (
    <section className="min-h-[700px] flex items-center justify-center pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-5xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Muzli Style Badge */}
          <div className="inline-block">
            <Badge 
              variant="secondary" 
              className="bg-transparent text-slate-700 dark:text-white/80 border-0 text-sm font-medium px-6 py-2"
            >
              {t('badge')}
            </Badge>
          </div>

          {/* Main Headline - Muzli Style */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.4]">
              {t('title')}
              <br />
              <span className="text-slate-600 dark:text-white/60">{t('subtitle')}</span>
            </h1>

            <p className="text-base text-slate-700 dark:text-white/80 max-w-3xl mx-auto leading-relaxed">
              {t('description_line1')}
              <br />
              {t('description_line2')}
            </p>
          </div>

          {/* CTA Button with Dropdown */}
          <div className="flex justify-center items-center pt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="lg"
                  className="bg-[#FFFFFF] hover:bg-[#F0F0F0] text-[#121212] text-base font-semibold rounded-[32px] px-5 h-[50px] transition-all duration-200"
                >
                  {t('cta')}
                  <ChevronDown className="ml-0 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                  onClick={() => window.open("https://apps.apple.com/kr/app/figma-mcp-magic/id6751596669?mt=12", "_blank", "noopener,noreferrer")}
                  className="cursor-pointer"
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  {t('download_mac')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => window.open("https://www.figma.com/community/file/1513759391089024242", "_blank", "noopener,noreferrer")}
                  className="cursor-pointer"
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 12V6.75l6-1.32v6.48L3 12m17-9v18l-5 2.09V5.07L20 3M3 13l6 .09v6.81l-6-1.15V13z"/>
                  </svg>
                  {t('download_windows')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
