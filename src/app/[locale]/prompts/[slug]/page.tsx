import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../../../keystatic.config";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server';
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Globe,
  Wand2,
  MessageSquare,
  RefreshCw,
  GitBranch,
  Palette,
} from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import React from "react";

const reader = createReader(process.cwd(), keystaticConfig);

interface Prompt {
  slug: string;
  title: string;
  category: string;
  language: string;
  tags: string[];
  content: string;
}

const categories = [
  { id: "auto-populate", title: "Auto Populate", icon: Wand2 },
  { id: "annotation", title: "Annotation", icon: MessageSquare },
  { id: "overrides", title: "Overrides", icon: RefreshCw },
  { id: "connectors", title: "Connectors", icon: GitBranch },
  { id: "vibe-design", title: "Vibe Design", icon: Palette },
];

// 마크다운 콘텐츠에서 섹션 파싱
function parseContent(content: string) {
  const sections = content.split(/^# /gm).filter(Boolean);
  const parsed: { [key: string]: string } = {};

  sections.forEach((section) => {
    const lines = section.trim().split("\n");
    const title = lines[0].toLowerCase().replace(/\s+/g, "");
    const content = lines.slice(1).join("\n").trim();
    parsed[title] = content;
  });

  return {
    prompt: parsed.prompt || "",
    howto: parsed.howtouse || parsed.howto || "",
  };
}

// Generate static params for all prompts with locales
export async function generateStaticParams() {
  try {
    const allPrompts = await reader.collections.prompts.all();
    const locales = ['ko', 'en'];
    
    return allPrompts.flatMap((prompt) =>
      locales.map((locale) => ({
        locale,
        slug: prompt.slug,
      }))
    );
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

async function getPrompt(slug: string): Promise<Prompt | null> {
  try {
    console.log("Loading prompt:", slug);
    const prompt = await reader.collections.prompts.read(slug);
    console.log("Prompt data:", prompt);

    if (!prompt) {
      console.log("No prompt found for slug:", slug);
      return null;
    }

    const content = await prompt.content();
    console.log("Content loaded successfully");

    return {
      slug,
      title: prompt.title,
      category: prompt.category,
      language: prompt.language || "English",
      tags: [...(prompt.tags || [])],
      content,
    };
  } catch (error) {
    console.error("Error loading prompt:", slug, error);
    return null;
  }
}

// Generate dynamic metadata for each prompt
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const prompt = await getPrompt(slug);

  if (!prompt) {
    return {
      title: "Prompt Not Found",
      description: "The requested prompt could not be found.",
    };
  }

  const category = categories.find((c) => c.id === prompt.category);
  const { prompt: promptContent } = parseContent(prompt.content);
  const preview =
    promptContent.substring(0, 150) + (promptContent.length > 150 ? "..." : "");

  return {
    title: `${prompt.title} - Figma MCP Prompt`,
    description: `${prompt.title} prompt for Figma MCP automation. Category: ${category?.title || prompt.category}. ${preview}`,
    keywords: [
      "Figma MCP",
      "Model Context Protocol",
      prompt.title,
      prompt.category,
      ...prompt.tags,
      "design automation",
      "Figma prompts",
    ],

    // Open Graph
    openGraph: {
      type: "article",
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      url: `https://figma-mcp-prompts.vercel.app/${locale}/prompts/${slug}`,
      title: `${prompt.title} - Figma MCP Prompt`,
      description: `${prompt.title} prompt for Figma MCP automation in ${category?.title || prompt.category} category. Transform your design workflow with AI-powered automation.`,
      siteName: "Figma MCP Magic",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${prompt.title} - Figma MCP Prompt`,
          type: "image/png",
        },
      ],

      tags: prompt.tags,
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      site: "@figma",
      creator: "@figma",
      title: `${prompt.title} - Figma MCP`,
      description: `${prompt.title} prompt for Figma MCP automation. Category: ${category?.title || prompt.category}`,
      images: ["/og-image.png"],
    },

    // Additional meta
    category: "Design Tools",
    classification: `${category?.title || prompt.category} Automation`,
  };
}

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  const prompt = await getPrompt(slug);

  if (!prompt) {
    notFound();
  }

  const category = categories.find((c) => c.id === prompt.category);
  const { prompt: promptContent, howto: howToContent } = parseContent(
    prompt.content,
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link
                href={`/${locale}/prompts`}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <Separator
              orientation="vertical"
              className="h-6"
            />

            <div className="space-y-1">
              <h1
                className="text-2xl font-bold tracking-tight"
              >
                {prompt.title}
              </h1>
              <div
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                {category?.icon && (
                  <category.icon className="h-4 w-4" />
                )}
                <span>{category?.title}</span>
                <Separator
                  orientation="vertical"
                  className="h-4"
                />

                <Globe className="h-4 w-4" />
                <span>{prompt.language}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Prompt Section */}
            <Card>
              <CardHeader>
                <div
                  className="flex items-center justify-between"
                >
                  <CardTitle className="text-lg">
                    Prompt
                  </CardTitle>
                  <CopyButton text={promptContent} />
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                >
                  <pre
                    className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm"
                  >
                    {promptContent}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* How to Use Section */}
            {howToContent && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How to Use
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none prose-ol:list-decimal prose-ul:list-disc prose-ol:pl-6 prose-ul:pl-6 prose-li:my-1"
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        ol: ({ children }) => (
                          <ol
                            className="list-decimal list-inside space-y-2 my-4"
                          >
                            {children}
                          </ol>
                        ),

                        ul: ({ children }) => (
                          <ul
                            className="list-disc list-inside space-y-2 my-4"
                          >
                            {children}
                          </ul>
                        ),

                        li: ({ children }) => (
                          <li className="leading-relaxed">
                            {children}
                          </li>
                        ),

                        a: ({ href, children, className }) => {
                          // figma-button 클래스가 있으면 shadcn 버튼으로 렌더링
                          if (className?.includes("figma-button")) {
                            return (
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="my-2"
                              >
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2"
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path
                                      d="M15.332 8.668a3.333 3.333 0 0 0 0-6.663H8.668a3.333 3.333 0 0 0 0 6.663 3.333 3.333 0 0 0 0 6.665 3.333 3.333 0 0 0 0 6.664A3.334 3.334 0 0 0 12.001 18v-4.665h3.331a3.333 3.333 0 0 0 0-6.667Z"
                                    />

                                    <circle
                                      cx="15.332"
                                      cy="12"
                                      r="3.332"
                                    />
                                  </svg>
                                  {children}
                                </a>
                              </Button>
                            );
                          }

                          // 일반 링크는 기존 스타일
                          return (
                            <a
                              href={href}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2 hover:underline-offset-4 transition-all"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          );
                        },
                        p: ({ children }) => {
                          // 이미지만 포함된 p 태그인지 확인
                          const hasOnlyImage = React.Children.toArray(
                            children,
                          ).every((child) => {
                            return (
                              React.isValidElement(child) &&
                              (child.type === "img" ||
                                (child.props && child.props.src))
                            );
                          });

                          if (hasOnlyImage) {
                            return (
                              <div className="my-4">
                                {children}
                              </div>
                            );
                          }

                          return (
                            <p
                              className="my-3 leading-relaxed"
                            >
                              {children}
                            </p>
                          );
                        },
                        strong: ({ children }) => (
                          <strong
                            className="font-semibold text-foreground"
                          >
                            {children}
                          </strong>
                        ),

                        em: ({ children }) => (
                          <em className="italic">
                            {children}
                          </em>
                        ),

                        h1: ({ children }) => (
                          <h1
                            className="text-lg font-semibold text-foreground mt-6 mb-3"
                          >
                            {children}
                          </h1>
                        ),

                        h2: ({ children }) => (
                          <h2
                            className="text-base font-semibold text-foreground mt-5 mb-2"
                          >
                            {children}
                          </h2>
                        ),

                        h3: ({ children }) => (
                          <h3
                            className="text-sm font-semibold text-foreground mt-4 mb-2"
                          >
                            {children}
                          </h3>
                        ),

                        table: ({ children }) => (
                          <div
                            className="my-4 overflow-x-auto"
                          >
                            <table
                              className="min-w-full border-collapse border border-border rounded-lg"
                            >
                              {children}
                            </table>
                          </div>
                        ),

                        thead: ({ children }) => (
                          <thead className="bg-muted">
                            {children}
                          </thead>
                        ),

                        tbody: ({ children }) => (
                          <tbody>{children}</tbody>
                        ),

                        tr: ({ children }) => (
                          <tr
                            className="border-b border-border"
                          >
                            {children}
                          </tr>
                        ),

                        th: ({ children }) => (
                          <th
                            className="border border-border px-4 py-2 text-left font-semibold text-foreground"
                          >
                            {children}
                          </th>
                        ),

                        td: ({ children }) => (
                          <td
                            className="border border-border px-4 py-2 text-muted-foreground"
                          >
                            {children}
                          </td>
                        ),

                        img: ({ src, alt }) => {
                          if (!src) return null;

                          // 이미지 경로 정규화
                          let imageSrc = src;
                          if (!src.startsWith("http") && !src.startsWith("/")) {
                            // 상대 경로인 경우 /assets/ 추가
                            imageSrc = `/assets/${src}`;
                          }

                          // 모든 이미지에 Next.js Image 사용
                          return (
                            <Image
                              src={imageSrc}
                              alt={alt || ""}
                              width={600}
                              height={400}
                              className="w-full h-auto object-cover rounded-lg border my-4"
                              priority={false}
                            />
                          );
                        },
                      }}
                    >
                      {howToContent}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Edit on GitHub 버튼 */}
            <div
              className="mt-8 pt-6 border-t border-border"
            >
              <Button
                variant="outline"
                size="sm"
                asChild
                className="inline-flex items-center gap-2"
              >
                <a
                  href={`https://github.com/figmatutor/mcpmagic/edit/main/content/prompts/${slug}.mdx`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-1"
                  >
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                  Edit on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

