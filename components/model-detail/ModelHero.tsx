'use client'

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/contexts/ModalContext';
import { useData } from '@/contexts/DataContext';
import { formatPrice } from '@/constants';
import { CarModel } from '@/types';

interface ModelHeroProps {
  model: CarModel;
}

export const ModelHero: React.FC<ModelHeroProps> = ({ model }) => {
  const { openModal } = useModal();
  const { isPricingLoading } = useData(); // Get loading state

  return (
    <section className="relative min-h-[60vh] md:min-h-[85vh] bg-white dark:bg-slate-900 flex items-center pt-32 pb-12 md:pt-40 md:pb-20 overflow-visible transition-colors duration-300">

      {/* Background Radial Gradient (Same as Home) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-50 via-white to-white dark:from-slate-800/40 dark:via-slate-900 dark:to-slate-900 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1 lg:max-w-xl z-20">
            <div className="flex items-center mb-4">
              <span className="text-gray-500 dark:text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em]">
                {model.category}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-display font-semibold text-slate-900 dark:text-white mb-6 tracking-tight leading-none">
              {model.name}
            </h1>

            <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-normal">
              {model.description}
            </p>

            {/* Price Section with Skeleton Loading */}
            <div className="mb-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Mulai Dari (OTR Jakarta)</p>

              {isPricingLoading ? (
                <div className="space-y-2">
                  <div className="h-10 w-48 bg-gray-100 dark:bg-slate-800 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-100 dark:bg-slate-800 rounded animate-pulse"></div>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-5xl font-display font-semibold text-slate-900 dark:text-white tracking-tight">
                      {formatPrice(model.startingPrice).replace(',00', '').replace('Rp', '')}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">*</span>
                  </div>
                  {model.originalPrice && model.originalPrice > model.startingPrice && (
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-400 line-through decoration-teal-500/50">
                        {formatPrice(model.originalPrice).replace(',00', '').replace('Rp', '')}
                      </span>
                      <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
                        Promo Spesial
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => openModal(`Penawaran ${model.name}`)}
                size="lg"
                className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 px-10 py-6 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
              >
                Dapatkan Penawaran
              </Button>
              <Button
                onClick={() => document.getElementById('variants')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                size="lg"
                className="border-slate-900 text-slate-900 hover:bg-slate-50 dark:border-white/30 dark:text-white dark:hover:bg-white/5 px-10 py-6 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
              >
                Lihat Varian
              </Button>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="order-1 lg:order-2 relative">
            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-teal-500/10 blur-[100px] rounded-full -z-10"></div>

            <img
              src={model.heroImage}
              alt={`BYD ${model.name} - ${model.category} Listrik Jakarta`}
              className="w-full h-auto object-contain drop-shadow-2xl animate-fade-in-up"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
