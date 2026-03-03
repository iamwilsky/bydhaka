'use client'

import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

export const HomeFAQ: React.FC = () => {
  const { dealerInfo } = useData();

  const faqList = [
    {
      q: `Di mana lokasi dealer ${dealerInfo.dealerName}?`,
      a: `Dealer ${dealerInfo.dealerName} berlokasi di ${dealerInfo.address}. Lokasi kami sangat strategis dan mudah diakses dari berbagai wilayah.`
    },
    {
      q: `Apakah tersedia unit Test Drive di ${dealerInfo.dealerName}?`,
      a: "Ya, kami menyediakan unit Test Drive lengkap untuk BYD Seal, Atto 3, dan Dolphin. Anda bisa melakukan booking jadwal melalui website ini atau menghubungi WhatsApp sales kami."
    },
    {
      q: "Bagaimana layanan purna jual (After Sales) BYD?",
      a: `${dealerInfo.dealerName} adalah dealer 3S (Sales, Service, Sparepart). Kami memberikan garansi baterai hingga 8 tahun atau 160.000 km, serta layanan servis gratis dan suku cadang sesuai syarat dan ketentuan yang berlaku.`
    },
    {
      q: "Apakah harga OTR mengikuti wilayah Jakarta atau Jawa Barat?",
      a: "Untuk wilayah DKI Jakarta, harga OTR menyesuaikan regulasi pajak daerah setempat. Silakan hubungi Sales Consultant kami (Gerry) untuk rincian harga OTR terbaru dan promo yang berlaku."
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0B1215] transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Pertanyaan Umum (FAQ)
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Informasi seputar pembelian mobil listrik BYD di Jakarta.
          </p>
        </div>

        <div className="space-y-4">
          {faqList.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
              <h3 className="flex items-start gap-3 font-bold text-slate-900 dark:text-white text-lg mb-2">
                <HelpCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" />
                {item.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 pl-8 leading-relaxed text-sm md:text-base">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
