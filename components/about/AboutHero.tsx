'use client'

import React from 'react';
import { useData } from '@/contexts/DataContext';

export const AboutHero: React.FC = () => {
  const { dealerInfo } = useData();

  return (
    <section className="relative pt-32 pb-32 bg-slate-900 overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L100 0 L100 100 Z" fill="#2dd4bf" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
          Dealer Resmi BYD <br />
          <span className="text-teal-500">Melayani Seluruh Jabodetabek</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
          {dealerInfo.dealerName} berlokasi strategis di {dealerInfo.address}, siap melayani kebutuhan mobil listrik Anda di seluruh Jakarta dan sekitarnya dengan fasilitas 3S lengkap.
        </p>
      </div>
    </section>
  );
};
