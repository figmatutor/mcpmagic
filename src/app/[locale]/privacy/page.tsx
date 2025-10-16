import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  const titles = {
    en: "Privacy Policy - Figma MCP Magic",
    ko: "개인정보 처리방침 - Figma MCP Magic"
  };
  
  const descriptions = {
    en: "Privacy policy and data practices for MCP Magic",
    ko: "MCP Magic의 개인정보 보호 정책 및 데이터 처리 관행"
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  };
}

// Privacy component - since we can't use hooks in server components
async function PrivacyContent({ locale }: { locale: string }) {
  const isKorean = locale === 'ko';
  
  const sections = isKorean ? {
    title: "개인정보 처리방침",
    lastUpdated: "최종 업데이트: 2025년 1월 16일",
    overview: {
      title: "개요",
      content: "본 애플리케이션(\"MCP Magic\")은 Figma와 AI 어시스턴트를 MCP(모델 컨텍스트 프로토콜)를 통해 연결하는 개발자 도구입니다. 우리는 귀하의 개인정보를 수집, 저장 또는 처리하지 않습니다."
    },
    noDataCollection: {
      title: "데이터 수집 안 함",
      content: "MCP Magic는 다음을 수행하지 않습니다",
      items: [
        "개인 식별 정보 수집",
        "사용자 데이터 저장",
        "분석 또는 추적 서비스 사용",
        "쿠키 또는 로컬 스토리지 활용 (테마 설정 제외)",
        "제3자와 정보 공유"
      ]
    },
    howItWorks: {
      title: "작동 방식",
      content: "이 도구는 다음과 같이 작동합니다",
      items: [
        "로컬 Figma 데스크톱 앱에 연결",
        "AI 어시스턴트 (Claude, ChatGPT 등)와의 브릿지 역할 수행",
        "모든 처리는 귀하의 로컬 환경에서 발생",
        "Figma 데이터는 귀하의 기기를 떠나지 않음 (MCP 프로토콜의 일부로 선택한 AI 서비스 제외)"
      ]
    },
    thirdPartyServices: {
      title: "제3자 서비스",
      content: "귀하가 MCP Magic를 사용할 때",
      items: [
        "Figma의 개인정보 보호정책이 Figma 데이터에 적용됩니다",
        "선택한 AI 서비스의 개인정보 보호정책이 AI 상호작용에 적용됩니다",
        "우리는 이러한 제3자 서비스와 별개이며 그들의 데이터 관행에 대해 책임지지 않습니다"
      ]
    },
    changes: {
      title: "본 정책의 변경",
      content: "본 개인정보 보호정책을 업데이트할 경우, 본 페이지에 새 버전을 게시하고 \"최종 업데이트\" 날짜를 수정합니다."
    },
    contact: {
      title: "문의",
      content: "질문이나 우려 사항이 있으시면 GitHub 저장소에서 이슈를 개설해 주세요."
    }
  } : {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: January 16, 2025",
    overview: {
      title: "Overview",
      content: "This application (\"MCP Magic\") is a developer tool that integrates Figma with AI assistants through the Model Context Protocol (MCP). We do not collect, store, or process any of your personal information."
    },
    noDataCollection: {
      title: "No Data Collection",
      content: "MCP Magic does not",
      items: [
        "Collect personal identifying information",
        "Store user data",
        "Use analytics or tracking services",
        "Utilize cookies or local storage (except for theme preferences)",
        "Share information with third parties"
      ]
    },
    howItWorks: {
      title: "How It Works",
      content: "This tool works by",
      items: [
        "Connecting to your local Figma desktop application",
        "Acting as a bridge between Figma and AI assistants (like Claude, ChatGPT, etc.)",
        "All processing happens in your local environment",
        "Your Figma data never leaves your device (except to the AI service of your choice as part of the MCP protocol)"
      ]
    },
    thirdPartyServices: {
      title: "Third-Party Services",
      content: "When you use MCP Magic",
      items: [
        "Figma's privacy policy applies to your Figma data",
        "Your chosen AI service's privacy policy applies to AI interactions",
        "We are separate from these third-party services and not responsible for their data practices"
      ]
    },
    changes: {
      title: "Changes to This Policy",
      content: "If we update this privacy policy, we will post the new version on this page and update the \"Last Updated\" date."
    },
    contact: {
      title: "Contact",
      content: "If you have questions or concerns, please open an issue on our GitHub repository."
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/${locale}`} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {isKorean ? "뒤로" : "Back"}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              {sections.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {sections.lastUpdated}
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {sections.overview.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {sections.overview.content}
              </p>
            </section>

            {/* No Data Collection */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {sections.noDataCollection.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {sections.noDataCollection.content}:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                {sections.noDataCollection.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {sections.howItWorks.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {sections.howItWorks.content}:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                {sections.howItWorks.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {sections.thirdPartyServices.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {sections.thirdPartyServices.content}:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                {sections.thirdPartyServices.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {sections.changes.title}
              </h2>
              <p className="text-muted-foreground">
                {sections.changes.content}
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {sections.contact.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {sections.contact.content}
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://github.com/figmatutor/mcpmagic/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  {isKorean ? "이슈 열기" : "Open an Issue"}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <PrivacyContent locale={locale} />;
}

