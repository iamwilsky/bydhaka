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

import { dealerData as dealerInfo } from '@/data/dealer'

export const metadata: Metadata = {
    metadataBase: new URL(`https://${dealerInfo.domain}`),
    alternates: {
        canonical: './',
    },
    title: {
        default: 'Dealer BYD Jakarta Barat (Kebon Jeruk) | Promo Mobil Listrik',
        template: `%s | BYD ${dealerInfo.dealerName}`
    },
    description: 'Tonton unit BYD M6, Seal, Atto 3 & Dolphin di Dealer Resmi BYD Jakarta Barat (Kebon Jeruk). Booking Test Drive hari ini & dapatkan promo harga OTR!',
    keywords: ['Dealer BYD Jakarta', 'Dealer BYD Jakarta Barat', 'BYD Kebon Jeruk', 'Showroom BYD Jakarta', 'Showroom BYD Jakarta Barat', 'Dealer Mobil Listrik Jakarta', 'Dealer Resmi BYD Jakarta', 'BYD Kedoya', 'Harga BYD Jakarta', 'Promo BYD Jakarta'],
    openGraph: {
        title: 'Dealer BYD Jakarta Barat (Kebon Jeruk) | Promo Mobil Listrik',
        description: 'Tonton unit BYD M6, Seal, Atto 3 & Dolphin di Dealer Resmi BYD Jakarta Barat (Kebon Jeruk). Booking Test Drive hari ini & dapatkan promo harga OTR!',
        url: `https://${dealerInfo.domain}`,
        siteName: `BYD ${dealerInfo.dealerName}`,
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
        'og:logo': 'https://bydhaka.com/web-app-manifest-512x512.png',
    }
}

import { getDealerInfo } from '@/lib/data'

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const dealerInfo = await getDealerInfo()

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': ['AutoDealer', 'LocalBusiness'],
            '@id': `https://${dealerInfo.domain}/#dealer`,
            name: `Dealer Resmi BYD Jakarta Barat - ${dealerInfo.dealerName}`,
            image: `https://${dealerInfo.domain}/images/models/seal/hero/byd-seal-hero.webp`,
            description: `Dealer Resmi ${dealerInfo.dealerName} melayani penjualan mobil listrik BYD Sealion 7, M6, Seal, Atto 3, dan Dolphin. Tersedia Test Drive & layanan servis di Kebon Jeruk, Jakarta Barat.`,
            address: {
                '@type': 'PostalAddress',
                streetAddress: dealerInfo.address,
                addressLocality: 'Jakarta Barat',
                addressRegion: 'DKI Jakarta',
                postalCode: '11520',
                addressCountry: 'ID'
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: -6.16204479382514,
                longitude: 106.76087127498987
            },
            url: 'https://bydhaka.com',
            telephone: `+${dealerInfo.salesPhone}`,
            openingHoursSpecification: [
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    opens: '08:30',
                    closes: '20:00'
                }
            ],
            priceRange: '$$$',
            areaServed: [
                "Kebon Jeruk",
                "Kedoya",
                "Jakarta Barat",
                "DKI Jakarta",
                "Tangerang",
                "Banten",
                "Jabodetabek"
            ]
        }
    ]

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
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-NWSLLZ8P"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                {/* End Google Tag Manager (noscript) */}

                {/* Google Tag Manager */}
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NWSLLZ8P');`}
                </Script>
                {/* End Google Tag Manager */}

                <Script src="https://www.googletagmanager.com/gtag/js?id=G-Z20JS2NHVY" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-Z20JS2NHVY');
                    gtag('config', 'AW-17886729721');
                    `}
                </Script>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
