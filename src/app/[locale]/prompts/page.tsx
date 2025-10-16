import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../../keystatic.config";
import PromptClient from "./prompt-client";
import { Suspense } from "react";
import { setRequestLocale } from 'next-intl/server';

const reader = createReader(process.cwd(), keystaticConfig);

interface Prompt {
  slug: string;
  title: string;
  category: string;
  language: string;
  tags: string[];
  content?: string;
}

async function getPrompts(): Promise<Prompt[]> {
  try {
    const prompts = await reader.collections.prompts.all();
    return await Promise.all(
      prompts.map(async (prompt) => ({
        slug: prompt.slug,
        title: prompt.entry.title,
        category: prompt.entry.category,
        language: prompt.entry.language || "English",
        tags: [...(prompt.entry.tags || [])],
        content: prompt.entry.content
          ? await prompt.entry.content()
          : undefined,
      })),
    );
  } catch (error) {
    console.error("Error loading prompts:", error);
    return [];
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  const titles = {
    en: "Prompt Library - Figma MCP Magic",
    ko: "프롬프트 라이브러리 - Figma MCP Magic"
  };
  
  const descriptions = {
    en: "Explore our curated collection of AI-powered prompts designed to automate your design workflow",
    ko: "디자인 워크플로우를 자동화하도록 설계된 AI 기반 프롬프트의 큐레이션된 컬렉션을 탐색하세요"
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  };
}

export default async function PromptsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const prompts = await getPrompts();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Suspense fallback={<div>{locale === 'ko' ? '로딩 중...' : 'Loading...'}</div>}>
            <PromptClient prompts={prompts} locale={locale} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

