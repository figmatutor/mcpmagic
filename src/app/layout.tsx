import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Figma MCP Magic - AI-Powered Design Automation Prompts",
  description:
    "A curated collection of powerful prompts for Figma MCP (Model Context Protocol). Transform your design workflow with AI-powered automation, streamline annotations, automate handoff, and enhance documentation with our comprehensive prompt library.",
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
    locale: "en_US",
    alternateLocale: ["ko_KR"],
    url: "https://figma-mcp-prompts.vercel.app",
    title: "Figma MCP Magic - AI-Powered Design Automation",
    description:
      "Transform your Figma workflow with our curated collection of MCP prompts. Automate design tasks, streamline annotations, and enhance productivity with AI-powered Model Context Protocol.",
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
    title: "Figma MCP Magic - AI-Powered Design Automation",
    description:
      "Transform your Figma workflow with our curated collection of MCP prompts. Automate design tasks and enhance productivity.",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-oid=".1hym7y">
      <body className="antialiased" suppressHydrationWarning data-oid="8u8n5o_">
        <ThemeProvider data-oid="oz36ful">
          <Header data-oid="ymv43hz" />
          {children}
          <Toaster data-oid="7enf8yg" />
        </ThemeProvider>
      </body>
    </html>
  );
}
