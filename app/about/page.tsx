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
        title: `Tentang ${dealerInfo.dealerName} - Dealer Resmi 3S & Sales Consultant`,
        description: `Kenali ${dealerInfo.dealerName}, dealer resmi fasilitas 3S (Sales, Service, Sparepart). Hubungi ${dealerInfo.salesName} untuk konsultasi mobil listrik BYD profesional.`,
        keywords: ['BYD Jakarta', 'Dealer BYD', 'Sales BYD', 'Service BYD'],
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
