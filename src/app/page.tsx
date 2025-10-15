import LandingPage from "./landing-page";
import { Suspense } from "react";

export default async function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Figma MCP Magic",
    description:
      "A curated collection of powerful prompts for Figma MCP (Model Context Protocol). Transform your design workflow with AI-powered automation.",
    url: "https://figma-mcp-prompts.vercel.app",
    sameAs: ["https://github.com/figma", "https://twitter.com/figma"],

    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://figma-mcp-prompts.vercel.app/?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Figma MCP Prompts",
      description: "Collection of AI-powered automation prompts for Figma",
      numberOfItems: "24+",
      itemListElement: [
        {
          "@type": "SoftwareApplication",
          name: "Auto Populate Prompts",
          applicationCategory: "Design Tool",
          description: "Automate content population in Figma designs",
        },
        {
          "@type": "SoftwareApplication",
          name: "Annotation Prompts",
          applicationCategory: "Design Tool",
          description: "Streamline design annotations and documentation",
        },
        {
          "@type": "SoftwareApplication",
          name: "Override Prompts",
          applicationCategory: "Design Tool",
          description: "Manage component overrides efficiently",
        },
        {
          "@type": "SoftwareApplication",
          name: "Connector Prompts",
          applicationCategory: "Design Tool",
          description: "Automate connector and flow diagrams",
        },
        {
          "@type": "SoftwareApplication",
          name: "Vibe Design Prompts",
          applicationCategory: "Design Tool",
          description: "Enhance design aesthetics and visual appeal",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Suspense fallback={<div>로딩 중...</div>}>
        <LandingPage />
      </Suspense>
    </>
  );
}
