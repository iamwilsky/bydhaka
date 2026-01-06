
import React from 'react';
import { HelpCircle } from 'lucide-react';

export const HomeFAQ: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0B1215] transition-colors duration-300">
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
          {[
            {
              q: "Di mana lokasi dealer BYD Jakarta?",
              a: "Dealer BYD Jakarta berlokasi di Jl. Kramat Raya No.158, Kenari, Kec. Senen, Kota Jakarta Pusat. Lokasi kami sangat strategis di pusat kota, mudah diakses dari berbagai wilayah Jakarta."
            },
            {
              q: "Apakah tersedia unit Test Drive di BYD Jakarta?",
              a: "Ya, kami menyediakan unit Test Drive lengkap untuk BYD Seal, Atto 3, dan Dolphin. Anda bisa melakukan booking jadwal melalui website ini atau menghubungi WhatsApp sales kami."
            },
            {
              q: "Bagaimana layanan purna jual (After Sales) BYD?",
              a: "BYD Jakarta adalah dealer 3S (Sales, Service, Sparepart). Kami memberikan garansi baterai hingga 8 tahun atau 160.000 km, serta layanan servis gratis dan suku cadang sesuai syarat dan ketentuan yang berlaku."
            },
            {
              q: "Apakah harga OTR mengikuti wilayah Jakarta atau Jawa Barat?",
              a: "Untuk wilayah DKI Jakarta, harga OTR menyesuaikan regulasi pajak daerah setempat. Silakan hubungi Sales Consultant kami (Gerry) untuk rincian harga OTR terbaru dan promo yang berlaku."
            }
          ].map((item, idx) => (
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
