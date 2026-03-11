"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

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

          {/* Store Badges */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
            <a
              href="https://apps.apple.com/kr/app/figma-mcp-magic/id6751596669?mt=12"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('download_mac')}
              className="transition-opacity hover:opacity-90"
            >
              <img
                src="https://tools.applemediaservices.com/api/badges/download-on-the-mac-app-store/black/en-us?size=250x83&releaseDate=1723603200"
                alt={t('download_mac')}
                className="h-14 w-auto"
              />
            </a>
            <a
              href="https://apps.microsoft.com/detail/9PKKSSRNJ3ZM"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('download_windows')}
              className="transition-opacity hover:opacity-90"
            >
              <img
                src="https://get.microsoft.com/images/en-us%20dark.svg"
                alt={t('download_windows')}
                className="h-14 w-auto"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
