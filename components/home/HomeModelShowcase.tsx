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
              <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 transform-gpu border border-gray-100 dark:border-slate-800/50 overflow-hidden">

                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-50 dark:bg-slate-800/50 aspect-[4/3] transform-gpu isolate p-8 flex items-center justify-center">
                  <img
                    src={model.heroImage}
                    alt={`Harga ${model.name} OTR Jakarta`}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />

                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-900 dark:text-white rounded-sm shadow-sm z-10">
                    {model.category}
                  </div>

                  {/* Discount Badge */}
                  {model.originalPrice && (
                    <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] rounded-sm shadow-sm z-10 animate-pulse">
                      Promo
                    </div>
                  )}
                </div>

                <div className="flex-grow px-6 pb-2 pt-8">
                  <div className="flex flex-col mb-4">
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors mb-1">
                      {model.name}
                    </h3>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                      {model.tagline}
                    </p>
                  </div>

                  <div className="flex items-end mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Mulai Dari (OTR)</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-semibold text-slate-900 dark:text-white">
                          {formatPrice(model.startingPrice).replace(',00', '').replace('Rp', '')}*
                        </span>
                        {model.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(model.originalPrice).replace(',00', '').replace('Rp', '')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Clean Specs Grids without borders */}
                  <div className="grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-slate-800/50 py-4 mb-2">
                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-semibold text-slate-900 dark:text-gray-200">{model.summaryRange}</span>
                      <span className="text-[9px] text-gray-400 uppercase tracking-wider mt-1">Range</span>
                    </div>
                    <div className="flex flex-col justify-center border-l border-r border-gray-100 dark:border-slate-800/50 px-4">
                      <span className="text-sm font-semibold text-slate-900 dark:text-gray-200">{model.summaryPowertrain.includes('AWD') ? 'AWD' : 'RWD'}</span>
                      <span className="text-[9px] text-gray-400 uppercase tracking-wider mt-1">Drive</span>
                    </div>
                    <div className="flex flex-col justify-center pl-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-gray-200">{model.seats}</span>
                      <span className="text-[9px] text-gray-400 uppercase tracking-wider mt-1">Seats</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-6 pb-8 mt-auto">
                  <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-gray-300 group-hover:text-teal-600 transition-colors">
                    Lihat Detail
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openModal(`Get Offer - ${model.name}`);
                    }}
                    className="text-[10px] font-bold uppercase tracking-widest px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-sm hover:bg-slate-800 dark:hover:bg-gray-100 transition-colors shadow-sm"
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
