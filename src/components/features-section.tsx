"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from 'next-intl';

interface Feature {
  title: string;
  description: string;
}

export default function FeaturesSection() {
  const t = useTranslations('features');
  
  const mainFeatures: Feature[] = [
    {
      title: t('items.connect.title'),
      description: t('items.connect.description'),
    },
    {
      title: t('items.automate.title'),
      description: t('items.automate.description'),
    },
    {
      title: t('items.discover.title'),
      description: t('items.discover.description'),
    },
    {
      title: t('items.share.title'),
      description: t('items.share.description'),
    },
  ];

  return (
    <section className="min-h-[700px] flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-[1.3]">
            {t('title_line1')}
            <br />
            {t('title_line2')}
          </h2>
          <p className="text-base text-white/80 max-w-3xl mx-auto leading-[1.5]">
            {t('description_line1')}
            <br />
            {t('description_line2')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HoverEffect items={mainFeatures} />
        </motion.div>
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
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-card border group-hover:border-slate-700 relative z-20 shadow-sm",
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
    <h4 className={cn("text-card-foreground font-bold tracking-wide mt-4", className)}>
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
        "mt-8 text-muted-foreground tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
