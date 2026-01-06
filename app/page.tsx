import { BYD_MODELS } from '@/constants'
import { Layout } from '@/components/layout/Layout'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeModelShowcase } from '@/components/home/HomeModelShowcase'
import { HomeServices } from '@/components/home/HomeServices'
import { HomeLocation } from '@/components/home/HomeLocation'
import { HomeFAQ } from '@/components/home/HomeFAQ'
import { HomeWhyUs } from '@/components/home/HomeWhyUs'
import { VisitorTracker } from '@/components/utils/VisitorTracker'

export default function HomePage() {
    // Use static data directly for 100% SSG
    const models = BYD_MODELS

    return (
        <Layout>
            <div className="animate-fade-in">
                {/* Hero Slider Section */}
                <HomeHero initialModels={models} />

                {/* Model Showcase Section */}
                <HomeModelShowcase initialModels={models} />

                {/* 3S Services Section */}
                <HomeServices />

                {/* Location & Map Section */}
                <HomeLocation />

                {/* FAQ Section */}
                <HomeFAQ />

                {/* Why Us / Credentials Section */}
                <HomeWhyUs />
            </div>

            {/* Client-side visitor tracking */}
            <VisitorTracker />
        </Layout>
    )
}
