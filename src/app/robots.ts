import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/keystatic/',
        '/_next/',
        '/admin',
      ],
    },
    sitemap: 'https://figma-mcp-prompts.vercel.app/sitemap.xml',
  };
} 