import { MetadataRoute } from 'next';
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://figma-mcp-prompts.vercel.app';
  
  // Get all prompts for dynamic pages
  const allPrompts = await reader.collections.prompts.all();
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];
  
  // Dynamic prompt pages
  const promptPages = allPrompts.map((prompt) => ({
    url: `${baseUrl}/prompts/${prompt.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  return [...staticPages, ...promptPages];
} 