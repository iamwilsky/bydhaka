import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'BYD Lenteng Agung',
        short_name: 'BYD Lenteng Agung',
        description: 'Dealer Resmi BYD Lenteng Agung. Wujudkan impian mobil listrik Anda dengan teknologi BYD Blade Battery.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#fefefe',
        icons: [
            {
                src: '/web-app-manifest-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/web-app-manifest-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            },
        ],
    }
}
