import type { Metadata } from 'next'
import { getModelsWithPricing } from '@/lib/data'
import { Layout } from '@/components/layout/Layout'
import { PriceListContent } from './PriceListContent'

// ISR: Revalidate every 5 minutes
export const revalidate = 300

export const metadata: Metadata = {
    title: 'Daftar Harga Mobil BYD Terbaru - Pricelist OTR Jakarta',
    description: 'Cek Pricelist BYD terbaru. Daftar harga OTR BYD Sealion 7, Seal, Atto 3, dan Dolphin. Dapatkan info promo, diskon, dan simulasi kredit DP ringan di BYD Jakarta.',
    keywords: ['Harga BYD', 'Pricelist BYD', 'Harga BYD Seal', 'Harga BYD Atto 3', 'Harga BYD Dolphin', 'BYD Jakarta'],
    openGraph: {
        images: ['/images/og-image-pricelist.webp'],
        type: 'website',
    },
}

export default async function PriceListPage() {
    const models = await getModelsWithPricing()
    const currentMonth = new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' })

    return (
        <Layout>
            <PriceListContent models={models} currentMonth={currentMonth} />
        </Layout>
    )
}
