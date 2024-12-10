// app/sitemap/route.ts
import { MetadataRoute } from 'next';

export async function generateStaticParams() {
  // 返回静态路径，例如:
  return [
    { params: { slug: 'music' } },
    { params: { slug: 'blog' } },
    { params: { slug: 'kit' } },
    { params: { slug: 'new' } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://unicorn.js.org',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://unicorn.js.org/music',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}