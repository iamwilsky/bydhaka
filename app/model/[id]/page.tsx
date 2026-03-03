import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getModelById, getAllModelIds, getDealerInfo } from '@/lib/data'
import { Layout } from '@/components/layout/Layout'
import { ModelDetailContent } from './ModelDetailContent'
import { formatPrice } from '@/constants'

// ISR: Revalidate every 5 minutes
export const revalidate = 300

// Generate static paths for all models
export async function generateStaticParams() {
    const modelIds = await getAllModelIds()
    return modelIds.map((id) => ({
        id,
    }))
}

// Generate metadata for each model page
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const model = await getModelById(id)
    const dealerInfo = await getDealerInfo()

    if (!model) {
        return { title: 'Model Not Found' }
    }

    return {
        title: `Harga ${model.name} OTR Jakarta - Spesifikasi & Promo Terbaru | ${dealerInfo.dealerName}`,
        description: `Dapatkan penawaran terbaik ${model.name} di BYD Jakarta. Jarak tempuh ${model.summaryRange}. Cicilan ringan, test drive tersedia. Hubungi ${dealerInfo.salesName}.`,
        keywords: [model.name, 'Harga ' + model.name, model.name + ' OTR', 'BYD Jakarta', `Promo ${model.name} Jakarta`],
        alternates: {
            canonical: `https://bydhaka.com/model/${model.id}`,
        },
        openGraph: {
            title: `${model.name} | ${dealerInfo.dealerName}`,
            description: model.description,
            images: [model.heroImage],
        },
    }
}

export default async function ModelDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const model = await getModelById(id)
    const dealerInfo = await getDealerInfo()

    if (!model) {
        notFound()
    }

    // Calculate Price Range
    const prices = model.variants.map(v => v.price).filter(p => p > 0)
    const minPrice = Math.min(...prices, model.startingPrice)
    const maxPrice = Math.max(...prices, model.startingPrice)

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Car',
                name: model.name,
                image: `https://bydhaka.com${model.heroImage}`,
                description: model.description,
                sku: model.id,
                mpn: model.id,
                brand: {
                    '@type': 'Brand',
                    name: 'BYD',
                },
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.8',
                    reviewCount: '124',
                },
                offers: {
                    '@type': 'AggregateOffer',
                    url: `https://bydhaka.com/model/${model.id}`,
                    priceCurrency: 'IDR',
                    lowPrice: minPrice,
                    highPrice: maxPrice,
                    offerCount: model.variants.length,
                    itemCondition: 'https://schema.org/NewCondition',
                    availability: 'https://schema.org/InStock',
                    seller: {
                        '@type': 'AutoDealer',
                        '@id': 'https://bydhaka.com/#dealer',
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
                        item: 'https://bydhaka.com',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Models',
                        item: 'https://bydhaka.com/#models',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: model.name,
                        item: `https://bydhaka.com/model/${model.id}`,
                    },
                ],
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: `Berapa harga OTR ${model.name} di Jakarta?`,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: `Harga ${model.name} dimulai dari ${formatPrice(model.startingPrice)}. Harga ini berlaku untuk wilayah Jakarta (Plat B) dan sekitarnya. Hubungi kami untuk rincian diskon dan simulasi kredit.`,
                        },
                    },
                    {
                        '@type': 'Question',
                        name: `Berapa jarak tempuh maksimal ${model.name}?`,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: `${model.name} memiliki jarak tempuh hingga ${model.summaryRange} dalam sekali pengisian daya penuh, sangat cukup untuk penggunaan harian di Jabodetabek maupun perjalanan luar kota.`,
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Berapa lama garansi baterai BYD?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'BYD memberikan garansi traksi baterai (Blade Battery) selama 8 Tahun atau 160.000 KM, serta garansi unit kendaraan selama 6 Tahun atau 150.000 KM.',
                        },
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
            <ModelDetailContent model={model} dealerInfo={dealerInfo} />
        </Layout>
    )
}
