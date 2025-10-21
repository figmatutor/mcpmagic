import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    en: "Figma MCP Magic - One-click Figma MCP Connection Tool",
    ko: "Figma MCP Magic - 원클릭 Figma MCP 연결 도구"
  };
  
  const descriptions = {
    en: "Connect Figma MCP (Model Context Protocol) with a single click and innovate your workflow with AI-powered automation.",
    ko: "Figma MCP(모델 컨텍스트 프로토콜)를 원클릭으로 연결하고, AI 기반 자동화로 업무 프로세스를 혁신하세요."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: [
      "Figma",
      "MCP",
      "Model Context Protocol",
      "AI design automation",
      "design workflow",
      "Figma prompts",
      "design handoff",
      "UI automation",
      "design system",
      "Figma plugins",
    ],

    authors: [{ name: "Figma MCP Community" }],
    creator: "Figma MCP Community",
    publisher: "Figma MCP Magic",
    metadataBase: new URL("https://figma-mcp-prompts.vercel.app"),

    // Open Graph
    openGraph: {
      type: "website",
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      alternateLocale: locale === 'ko' ? ['en_US'] : ['ko_KR'],
      url: `https://figma-mcp-prompts.vercel.app/${locale}`,
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      siteName: "Figma MCP Magic",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Figma MCP Magic - AI-Powered Design Automation",
          type: "image/png",
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      site: "@figma",
      creator: "@figma",
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      images: ["/og-image.png"],
    },

    // Additional meta tags
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Apple meta tags
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Figma MCP Magic",
    },

    // Additional meta
    category: "Design Tools",
    classification: "Design Automation",
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

