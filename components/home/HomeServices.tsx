
import React from 'react';
import { Car, Wrench, Battery } from 'lucide-react';

export const HomeServices: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0B1215] transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-600 dark:text-teal-500 font-bold uppercase tracking-widest text-sm mb-2 block">
            Layanan 3S (Sales, Service, Sparepart)
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
            Fasilitas Lengkap Dealer BYD Lenteng Agung
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Kami tidak hanya menjual mobil. Sebagai dealer 3S, BYD Lenteng Agung menjamin ketenangan pikiran Anda dengan layanan purna jual berstandar global di lokasi kami yang nyaman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sales */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-teal-500 transition-colors group">
            <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Car className="w-7 h-7 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Penjualan Unit (Sales)</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Konsultasi produk profesional, simulasi kredit fleksibel, dan ketersediaan unit (Ready Stock) BYD Seal, Atto 3, Dolphin, dan M6 untuk wilayah Lenteng Agung dan sekitarnya.
            </p>
          </div>

          {/* Service */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-teal-500 transition-colors group">
            <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Wrench className="w-7 h-7 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Bengkel Resmi (Service)</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Teknisi tersertifikasi BYD Global di Bengkel Resmi Lenteng Agung, peralatan diagnostik canggih, dan fasilitas Body Repair untuk menjaga performa mobil listrik Anda.
            </p>
          </div>

          {/* Spareparts */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-teal-500 transition-colors group">
            <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Battery className="w-7 h-7 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Suku Cadang Asli (Sparepart)</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Jaminan suku cadang original BYD, aksesoris resmi, dan ketersediaan komponen fast-moving maupun slow-moving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
