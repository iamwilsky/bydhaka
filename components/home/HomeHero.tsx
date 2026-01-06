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

                {/* Badge (Now Semantic H1) */}
                <div className="flex items-center gap-3 mb-3 md:mb-6">
                  <h1 className="px-3 py-1 border border-teal-500/50 text-teal-600 dark:text-teal-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-teal-50 dark:bg-teal-950/30 backdrop-blur-sm">
                    Dealer Resmi BYD Jakarta
                  </h1>
                </div>

                {/* Model Name (Now Semantic H2) */}
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-3 md:mb-6 text-slate-900 dark:text-white">
                  {model.name.replace('BYD ', '')}
                  <span className="text-teal-500">.</span>
                </h2>

                {/* Description */}
                <p className="text-sm md:text-xl text-gray-600 dark:text-gray-300 font-light mb-4 md:mb-8 max-w-lg leading-relaxed line-clamp-2 md:line-clamp-none">
                  {model.tagline}. {model.description}
                </p>

                {/* MOBILE ONLY: Image */}
                <div className="lg:hidden w-full h-[25vh] min-h-[200px] max-h-[280px] relative mb-4 flex items-center justify-center">
                  <img
                    src={model.heroImage}
                    alt={`Promo ${model.name} BYD Jakarta`}
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-teal-500/10 blur-[40px] rounded-full -z-10"></div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-8 mb-6 md:mb-10 border-t border-gray-200 dark:border-white/10 pt-4 md:pt-6 max-w-sm">
                  <div>
                    <div className="text-xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">{model.summaryRange}</div>
                    <div className="text-[10px] uppercase tracking-widest text-teal-600 dark:text-teal-500 font-bold">Max Range</div>
                  </div>

                  {/* Price - Static Data */}
                  <div>
                    <div className="flex flex-col">
                      {model.originalPrice && model.originalPrice > model.startingPrice && (
                        <div className="text-xs text-gray-400 line-through decoration-red-500">
                          {formatPrice(model.originalPrice)}
                        </div>
                      )}
                      <div className="text-xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">
                        {formatPrice(model.startingPrice).replace('Rp', '').replace(',00', '')}
                      </div>
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-teal-600 dark:text-teal-500 font-bold">Mulai Dari (OTR)</div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={() => openModal(`Penawaran Spesial - ${model.name}`)}
                    variant="primary"
                    className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-gray-200 border-none px-8"
                  >
                    Dapatkan Penawaran
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Link href={`/model/${model.id}`}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-slate-900 border-slate-300 hover:bg-slate-50 dark:text-white dark:border-white/30 dark:hover:bg-white/10 dark:hover:border-white w-full sm:w-auto"
                    >
                      Lihat Detail Unit
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

      {/* Pagination Dots (Hidden on mobile) */}
      <div className="hidden md:flex absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-40 space-x-3">
        {models.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all duration-300 rounded-full ${index === currentSlide
              ? 'w-8 bg-teal-600 dark:bg-teal-500'
              : 'w-2 bg-slate-300 dark:bg-white/30 hover:bg-slate-400 dark:hover:bg-white'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
