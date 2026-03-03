import type { MetadataRoute } from 'next'
import { BYD_MODELS } from '@/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://bydhaka.com'
    const lastModified = new Date()

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/pricelist`,
            lastModified,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]

    // Model pages
    const modelPages: MetadataRoute.Sitemap = BYD_MODELS.map((model) => ({
        url: `${baseUrl}/model/${model.id}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Variant pages
    const variantPages: MetadataRoute.Sitemap = BYD_MODELS.flatMap((model) =>
        model.variants.map((variant) => ({
            url: `${baseUrl}/variant/${model.id}/${variant.id}`,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    )

    return [...staticPages, ...modelPages, ...variantPages]
}
