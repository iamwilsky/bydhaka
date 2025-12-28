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
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div className="inline-block px-3 py-1 mb-6 border border-teal-500/30 bg-teal-50 dark:bg-teal-900/20 w-fit backdrop-blur text-teal-600 dark:text-teal-400 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full">
              {model.category}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-slate-900 dark:text-white mb-6 tracking-tighter leading-[0.9]">
              {model.name}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed font-light">
              {model.description}
            </p>

            {/* Price Section with Skeleton Loading */}
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Harga Mulai Dari (OTR)</p>

              {isPricingLoading ? (
                <div className="space-y-2">
                  {/* Price Skeleton */}
                  <div className="h-10 w-48 bg-gray-200 dark:bg-slate-800 rounded animate-pulse"></div>
                  {/* Discount Skeleton */}
                  <div className="h-4 w-32 bg-gray-200 dark:bg-slate-800 rounded animate-pulse"></div>
                </div>
              ) : (
                <>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">
                      {formatPrice(model.startingPrice).replace(',00', '')}
                    </span>
                    <span className="text-sm text-gray-500">*</span>
                  </div>
                  {model.originalPrice && model.originalPrice > model.startingPrice && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-400 line-through decoration-red-500">
                        {formatPrice(model.originalPrice)}
                      </span>
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded uppercase">
                        Promo Spesial
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => openModal(`Penawaran ${model.name}`)}
                size="lg"
                className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-8"
              >
                Minta Penawaran
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => document.getElementById('variants')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                size="lg"
                className="dark:text-white dark:border-white/30 dark:hover:bg-white/10"
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
              alt={`BYD ${model.name} - ${model.category} Listrik Lenteng Agung`}
              className="w-full h-auto object-contain drop-shadow-2xl animate-fade-in-up"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
