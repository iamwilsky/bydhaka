import type { Metadata } from 'next'
import { getDealerInfo } from '@/lib/data'
import { Layout } from '@/components/layout/Layout'
import { AboutHero } from '@/components/about/AboutHero'
import { SalesProfile } from '@/components/about/SalesProfile'
import { FacilitiesGrid } from '@/components/about/FacilitiesGrid'
import { LocationMap } from '@/components/about/LocationMap'

export async function generateMetadata(): Promise<Metadata> {
    const dealerInfo = await getDealerInfo()

    return {
        title: `Tentang ${dealerInfo.dealerName} - Sales Consultant Salemba, Kramat Raya, Raden Saleh`,
        description: `Profil Dealer Resmi ${dealerInfo.dealerName} di Jl. Kramat Raya. Melayani penjualan mobil listrik BYD untuk wilayah Salemba, Raden Saleh, Senen, dan sekitarnya. Hubungi ${dealerInfo.salesName} sekarang.`,
        keywords: ['BYD Jakarta Pusat', 'BYD Salemba', 'BYD Kramat Raya', 'BYD Raden Saleh', 'Dealer BYD Jakarta', 'Sales BYD Jakarta Pusat'],
    }
}

export default async function AboutPage() {
    return (
        <Layout>
            <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300 min-h-screen">
                <AboutHero />
                <SalesProfile />
                <FacilitiesGrid />
                <LocationMap />
            </div>
        </Layout>
    )
}
