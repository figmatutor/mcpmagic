import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";
import PromptClient from "../prompt-client";
import { Suspense } from "react";

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

export default async function PromptsPage() {
  const prompts = await getPrompts();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              프롬프트 라이브러리 둘러보기
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              디자인 워크플로우를 자동화하도록 설계된 AI 기반 프롬프트의 큐레이션된 컬렉션을 탐색하세요
            </p>
          </div>
          
          <Suspense fallback={<div>로딩 중...</div>}>
            <PromptClient prompts={prompts} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}


