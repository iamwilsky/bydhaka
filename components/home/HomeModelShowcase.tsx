'use client'

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Zap, Gauge } from 'lucide-react';
import { formatPrice, BYD_MODELS } from '@/constants';
import { useModal } from '@/contexts/ModalContext';
import { CarModel } from '@/types';

interface Props {
  initialModels?: CarModel[];
}

export const HomeModelShowcase: React.FC<Props> = ({ initialModels }) => {
  const { openModal } = useModal();

  // Use initialModels from server if available, otherwise fall back to static constant
  const models = initialModels || BYD_MODELS;

  return (
    <section id="model-showcase" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Lineup Mobil BYD
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Koleksi kendaraan listrik premium yang tersedia untuk Test Drive di showroom BYD Jakarta.
            </p>
          </div>
          <div className="hidden md:block h-px bg-gray-200 dark:bg-slate-800 flex-grow mx-8 mb-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((model) => (
            <Link href={`/model/${model.id}`} key={model.id} className="group block h-full">
              <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform-gpu border border-gray-100 dark:border-slate-700 overflow-hidden">

                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-200 dark:bg-slate-700 aspect-[4/3] transform-gpu isolate p-4">
                  <img
                    src={model.heroImage}
                    alt={`Harga ${model.name} OTR Jakarta`}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white rounded shadow-sm z-10">
                    {model.category}
                  </div>

                  {/* Discount Badge */}
                  {model.originalPrice && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded shadow-sm z-10 animate-pulse">
                      Promo
                    </div>
                  )}
                </div>

                <div className="flex-grow px-6 pb-2 pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors">
                      {model.name}
                    </h3>
                    <div className="text-right">
                      <span className="block text-[10px] text-gray-400 uppercase">Mulai Dari</span>

                      <>
                        {model.originalPrice && (
                          <span className="block text-xs text-gray-400 line-through decoration-red-500">
                            {formatPrice(model.originalPrice).replace(',00', '').replace('Rp', '')}
                          </span>
                        )}
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {formatPrice(model.startingPrice).replace(',00', '').replace('Rp', '')}*
                        </span>
                      </>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
                    {model.tagline}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 border-t border-b border-gray-100 dark:border-slate-700 py-4 mb-4">
                    <div className="flex flex-col items-center justify-center text-center px-1 border-r border-gray-100 dark:border-slate-700 last:border-0">
                      <Users className="w-4 h-4 text-teal-500 mb-2" />
                      <span className="text-[10px] font-bold text-slate-900 dark:text-gray-200 uppercase tracking-wide">{model.seats} Seats</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center px-1 border-r border-gray-100 dark:border-slate-700 last:border-0">
                      <Zap className="w-4 h-4 text-teal-500 mb-2" />
                      <span className="text-[10px] font-bold text-slate-900 dark:text-gray-200 uppercase tracking-wide">{model.summaryPowertrain}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center px-1">
                      <Gauge className="w-4 h-4 text-teal-500 mb-2" />
                      <span className="text-[10px] font-bold text-slate-900 dark:text-gray-200 uppercase tracking-wide">{model.summaryRange}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-6 pb-6 mt-2">
                  <div className="flex items-center text-teal-600 dark:text-teal-400 font-medium group-hover:text-teal-500 transition-colors">
                    <span className="text-sm">Lihat Detail</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openModal(`Get Offer - ${model.name}`);
                    }}
                    className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full hover:scale-105 transition-transform shadow-md hover:shadow-lg"
                  >
                    Get Offer
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-8 text-right">*Harga OTR Jakarta (Dapat berubah sewaktu-waktu)</p>
      </div>
    </section>
  );
};
