'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/constants';
import { useModal } from '@/contexts/ModalContext';
import { CarModel } from '@/types';
import { BYD_MODELS } from '@/constants';

interface Props {
  initialModels?: CarModel[];
}

export const HomeHero: React.FC<Props> = ({ initialModels }) => {
  const { openModal } = useModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Use initialModels from server if available, strictly fallback to static constant
  const models = initialModels || BYD_MODELS;

  // Auto-play slider
  useEffect(() => {
    if (models.length === 0) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, models]);

  const nextSlide = useCallback(() => {
    if (isAnimating || models.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === models.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, models]);

  // Touch handling for swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const prevSlide = useCallback(() => {
    if (isAnimating || models.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? models.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, models]);

  if (!models || models.length === 0) return null;

  return (
    <section
      className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-white dark:bg-[#0B1215] text-slate-900 dark:text-white transition-colors duration-300"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >

      {/* Background Radial Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-100 via-white to-white dark:from-slate-800/40 dark:via-[#0B1215] dark:to-[#0B1215] pointer-events-none"></div>

      {/* Slides Container */}
      {models.map((model, index) => (
        <div
          key={model.id}
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10 pointer-events-none'
            }`}
        >
          <div className="container mx-auto px-4 md:px-8 h-full">
            <div className="flex flex-col lg:flex-row h-full items-center justify-center">

              {/* Left Column: Text Content */}
              <div className={`w-full lg:w-1/2 pt-16 md:pt-24 lg:pt-0 z-30 flex flex-col justify-center transition-all duration-1000 delay-300 transform ${index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>

                {/* SEO Optimized H1 (Hidden from view but readable by screen readers & crawlers to keep design sleek) */}
                <h1 className="sr-only">Dealer Resmi Mobil Listrik BYD Jakarta Barat</h1>

                {/* Badge (Semantic Parapraph or div instead of H1) */}
                <div className="flex items-center mb-2 md:mb-4">
                  <span className="text-gray-500 dark:text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em]">
                    Pilihan Mobil BYD Terbaik di Jakarta
                  </span>
                </div>

                {/* Model Name (Semantic H2) */}
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-display font-semibold tracking-tight leading-none mb-3 md:mb-4 text-slate-900 dark:text-white">
                  {model.name.replace('BYD ', '')}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-lg text-gray-600 dark:text-gray-400 font-normal mb-6 md:mb-8 max-w-lg leading-relaxed line-clamp-3 md:line-clamp-none">
                  {model.tagline}. {model.description}
                </p>

                {/* MOBILE ONLY: Image */}
                <div className="lg:hidden w-full h-[30vh] min-h-[180px] max-h-[250px] relative mb-4 flex items-center justify-center -mx-4">
                  <img
                    src={model.heroImage}
                    alt={`Promo ${model.name} BYD Jakarta`}
                    className="w-[110%] h-full object-contain drop-shadow-xl translate-x-4"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-teal-500/10 blur-[40px] rounded-full -z-10"></div>
                </div>

                {/* Stats Grid */}
                <div className="flex gap-4 md:gap-8 mb-6 md:mb-12 border-t border-gray-200 dark:border-white/10 pt-4 md:pt-6">
                  <div>
                    <div className="text-xl sm:text-2xl md:text-4xl font-display font-semibold text-slate-900 dark:text-white mb-1">{model.summaryRange}</div>
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-gray-500 font-medium">Max Range</div>
                  </div>

                  {/* Price - Static Data */}
                  <div>
                    <div className="flex flex-col">
                      {model.originalPrice && model.originalPrice > model.startingPrice && (
                        <div className="text-xs text-gray-400 line-through decoration-red-500 mb-1">
                          {formatPrice(model.originalPrice)}
                        </div>
                      )}
                      <div className="text-xl sm:text-2xl md:text-4xl font-display font-semibold text-slate-900 dark:text-white mb-1">
                        {formatPrice(model.startingPrice).replace('Rp', '').replace(',00', '')}
                      </div>
                    </div>
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-gray-500 font-medium">Mulai Dari (OTR)</div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={() => openModal(`Penawaran Spesial - ${model.name}`)}
                    className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 rounded-sm px-10 py-6 text-xs uppercase tracking-wider font-semibold border-none transition-colors"
                  >
                    Dapatkan Penawaran
                  </Button>

                  <Link href={`/model/${model.id}`}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-slate-900 border-slate-900 hover:bg-slate-50 dark:text-white dark:border-white dark:hover:bg-white/5 rounded-sm px-10 py-6 text-xs uppercase tracking-wider font-semibold transition-colors w-full sm:w-auto"
                    >
                      Pelajari Lebih Lanjut
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Image (Desktop Only) */}
              <div className={`hidden lg:flex w-full lg:w-1/2 h-full relative z-20 items-center justify-end transition-all duration-1000 delay-100 transform ${index === currentSlide ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-20 opacity-0 scale-95'}`}>
                <div className="relative w-full h-[80vh] flex items-center justify-center">
                  <img
                    src={model.heroImage}
                    alt={`Promo ${model.name} BYD Jakarta`}
                    className="w-full h-full object-contain object-center drop-shadow-2xl"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-teal-500/5 dark:bg-teal-500/10 blur-[80px] rounded-full -z-10"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Pagination Dots */}
      <div className="absolute bottom-6 md:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-40 space-x-2 md:space-x-3 flex">
        {models.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 md:h-1.5 transition-all duration-300 rounded-full ${index === currentSlide
              ? 'w-6 md:w-8 bg-teal-600 dark:bg-teal-500'
              : 'w-1.5 md:w-2 bg-slate-200 dark:bg-white/30 hover:bg-slate-400 dark:hover:bg-white'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
