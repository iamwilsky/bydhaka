import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getModelById, getAllVariantPaths, getDealerInfo } from '@/lib/data'
import { Layout } from '@/components/layout/Layout'
import { VariantDetailContent } from './VariantDetailContent'

// ISR: Revalidate every 5 minutes
export const revalidate = 300

// Generate static paths for all model/variant combinations
export async function generateStaticParams() {
    const paths = await getAllVariantPaths()
    return paths
}

// Generate metadata for each variant page
export async function generateMetadata({
    params
}: {
    params: Promise<{ modelId: string; variantId: string }>
}): Promise<Metadata> {
    const { modelId, variantId } = await params
    const model = await getModelById(modelId)
    const variant = model?.variants.find(v => v.id === variantId)
    const dealerInfo = await getDealerInfo()

    if (!model || !variant) {
        return { title: 'Variant Not Found' }
    }

    return {
        title: `Jual ${model.name} ${variant.name} Lenteng Agung - Harga & Promo | ${dealerInfo.dealerName}`,
        description: `Spesifikasi lengkap BYD ${model.name} varian ${variant.name}. Jarak tempuh ${variant.battery.range}, 0-100 km/h dalam ${variant.performance.acceleration}. Dapatkan promo OTR Lenteng Agung hari ini.`,
        keywords: [model.name, variant.name, 'Harga ' + model.name, 'BYD Lenteng Agung'],
    }
}

export default async function VariantDetailPage({
    params
}: {
    params: Promise<{ modelId: string; variantId: string }>
}) {
    const { modelId, variantId } = await params
    const model = await getModelById(modelId)
    const variant = model?.variants.find(v => v.id === variantId)
    const dealerInfo = await getDealerInfo()

    if (!model || !variant) {
        notFound()
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Car',
                name: `${model.name} ${variant.name}`,
                image: `https://bydlentengagung.com${variant.imageUrl || model.heroImage}`,
                description: `BYD ${model.name} ${variant.name} (${variant.powertrain}). Baterai ${variant.battery.capacity} kWh, Jarak Tempuh ${variant.battery.range}. Akselerasi ${variant.performance.acceleration}.`,
                sku: variant.id,
                mpn: variant.id,
                brand: {
                    '@type': 'Brand',
                    name: 'BYD',
                },
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.8',
                    reviewCount: '124',
                },
                model: model.name,
                vehicleConfiguration: `${variant.name} Trim`,
                manufacturer: {
                    '@type': 'Organization',
                    name: 'BYD Auto',
                },
                offers: {
                    '@type': 'Offer',
                    url: `https://bydlentengagung.com/variant/${model.id}/${variant.id}`,
                    priceCurrency: 'IDR',
                    price: variant.price,
                    itemCondition: 'https://schema.org/NewCondition',
                    availability: variant.soldOut ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
                    seller: {
                        '@type': 'AutoDealer',
                        '@id': 'https://bydlentengagung.com/#dealer',
                        name: dealerInfo.dealerName,
                    },
                },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: 'https://bydlentengagung.com',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: model.name,
                        item: `https://bydlentengagung.com/model/${model.id}`,
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: `${model.name} ${variant.name}`,
                        item: `https://bydlentengagung.com/variant/${model.id}/${variant.id}`,
                    },
                ],
            },
        ],
    }

    return (
        <Layout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <VariantDetailContent model={model} variant={variant} />
        </Layout>
    )
}
