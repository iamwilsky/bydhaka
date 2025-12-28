import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://bydlentengagung.com'),
    alternates: {
        canonical: '/',
    },
    title: {
        default: 'BYD Lenteng Agung | Dealer Resmi Mobil Listrik BYD - Sealion 7, Seal, Atto 3, Dolphin',
        template: '%s | BYD Lenteng Agung'
    },
    description: 'Kunjungi BYD Lenteng Agung, showroom dan dealer resmi BYD Indonesia. Dapatkan penawaran harga terbaik untuk mobil listrik BYD Sealion 7, Seal, Atto 3, dan Dolphin. Test drive sekarang.',
    keywords: ['BYD Lenteng Agung', 'Showroom BYD Lenteng Agung', 'Dealer BYD Lenteng Agung', 'BYD Sealion 7', 'BYD Seal', 'BYD Atto 3', 'BYD Dolphin', 'Mobil Listrik Indonesia'],
    openGraph: {
        title: 'BYD Lenteng Agung | Dealer Resmi Mobil Listrik BYD',
        description: 'Dealer Resmi BYD Lenteng Agung. Wujudkan impian mobil listrik Anda dengan teknologi BYD Blade Battery. Hubungi kami untuk promo terbaru.',
        url: 'https://bydlentengagung.com',
        siteName: 'BYD Lenteng Agung',
        images: [
            {
                url: '/images/og-image.webp', // Ensure this exists or use a generic one
                width: 1200,
                height: 630,
            }
        ],
        type: 'website',
        locale: 'id_ID',
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png' },
        ],
    },
    manifest: '/manifest.json',
    verification: {
        google: 'google-site-verification-code', // Add if available
    },
    other: {
        'og:logo': 'https://bydlentengagung.com/web-app-manifest-512x512.png',
    }
}

import { getDealerInfo } from '@/lib/data'

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const dealerInfo = await getDealerInfo()

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AutoDealer',
        '@id': 'https://bydlentengagung.com/#dealer',
        name: dealerInfo.dealerName,
        image: 'https://bydlentengagung.com/images/models/seal/hero/byd-seal-hero.webp',
        description: `Dealer Resmi ${dealerInfo.dealerName} menyediakan penjualan, servis, dan suku cadang mobil listrik BYD.`,
        address: {
            '@type': 'PostalAddress',
            streetAddress: dealerInfo.address,
            addressLocality: 'Jakarta Selatan',
            addressRegion: 'DKI Jakarta',
            postalCode: '12610',
            addressCountry: 'ID'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: -6.3768, // Update these if necessary, leaving as is for now or requesting user input if specific coords are known. Better to leave generic or update if user provided. User didn't provide coords. I will stick to updating the URL.
            longitude: 106.9158
        },
        url: 'https://bydlentengagung.com',
        telephone: `+${dealerInfo.salesPhone}`,
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '08:30',
                closes: '20:00'
            }
        ],
        priceRange: '$$$'
    }

    return (
        <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
            <head>
                <meta name="theme-color" content="#111827" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (mode === 'dark' || (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
                    }}
                />
            </head>
            <body className="font-sans bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-white antialiased">
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-Z20JS2NHVY" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-Z20JS2NHVY');
                    `}
                </Script>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
