'use client'

import React from 'react';
import { Battery, Trophy, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/contexts/ModalContext';
import { useData } from '@/contexts/DataContext';

export const HomeWhyUs: React.FC = () => {
  const { openModal } = useModal();
  const { dealerInfo } = useData();

  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 border-t border-gray-100 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <span className="text-teal-600 dark:text-teal-500 font-bold uppercase tracking-widest text-sm mb-2 block">
              Keunggulan Kami
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-8">
              Kenapa Membeli di <br />BYD Jakarta?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Dealer BYD Jakarta berlokasi strategis di Jl. Kramat Raya, siap melayani pembelian mobil listrik untuk wilayah Jakarta Pusat, Jakarta Selatan, Jakarta Timur, Depok, hingga Bekasi. Kami memiliki tim Sales Consultant berpengalaman yang siap membantu proses pembelian pertama Anda.
            </p>

            <Button onClick={() => openModal()} variant="primary" className="dark:bg-teal-600 dark:hover:bg-teal-700 dark:text-white dark:border-none">
              Hubungi Sales (Gerry)
            </Button>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 dark:bg-slate-800 p-8 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all rounded-xl">
                <Battery className="w-10 h-10 text-teal-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Blade Battery</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Teknologi baterai teraman di dunia yang telah lulus uji tusuk jarum (Nail Penetration Test).</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-8 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all rounded-xl">
                <Trophy className="w-10 h-10 text-teal-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Global Leader</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">BYD adalah produsen kendaraan energi baru (NEV) terbesar di dunia secara volume penjualan.</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-8 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all rounded-xl">
                <ShieldCheck className="w-10 h-10 text-teal-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Garansi 8 Tahun</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Perlindungan menyeluruh untuk Baterai, Motor Traksi, dan Unit Kontrol Motor Anda.</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-8 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all rounded-xl">
                <Zap className="w-10 h-10 text-teal-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Fast Charging</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Dukungan DC Charging cepat. Isi daya dari 30% ke 80% dalam waktu kurang dari 30 menit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
