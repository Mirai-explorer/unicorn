import { MetadataRoute } from 'next'

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
        }
    ]
}