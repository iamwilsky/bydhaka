'use client'

import React from 'react';
import { Phone, MessageCircle, CheckCircle, Star, Clock } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useModal } from '@/contexts/ModalContext';
import { Button } from '@/components/ui/Button';

export const SalesProfile: React.FC = () => {
  const { dealerInfo } = useData();
  const { openModal } = useModal();

  return (
    <section className="relative -mt-20 pb-20 z-20">
      <div className="container mx-auto px-4 md:px-8">

        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row">

          {/* Left: Photo Area (Full Bleed) */}
          <div className="md:w-5/12 relative min-h-[400px] md:min-h-auto bg-gray-200 dark:bg-slate-700">
            {/* Full Height Gradient/Image Container */}
            <div className="absolute inset-0 w-full h-full">
              {/* Background Gradient / Placeholder Image */}
              <div className="w-full h-full bg-gradient-to-br from-slate-300 to-gray-100 dark:from-slate-700 dark:to-slate-900 flex items-center justify-center">
                <span className="text-9xl font-display font-bold tracking-tighter text-slate-400/50 dark:text-slate-600/50 select-none">
                  WA
                </span>
              </div>
            </div>

            {/* Verified Badge - Floating at bottom right */}
            <div className="absolute bottom-6 right-6 bg-teal-500 text-white p-3 rounded-full shadow-lg border-4 border-white dark:border-slate-800 z-10">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          {/* Right: Content Area */}
          <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-slate-800">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-bold uppercase tracking-widest rounded mb-3">
                Official Sales Consultant
              </span>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white mb-2">
                {dealerInfo.salesName}
              </h2>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>Professional Service</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg">
                <Clock className="w-4 h-4 text-teal-500" />
                <span>Fast Response</span>
              </div>
            </div>

            <div className="mb-8 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-teal-500 rounded-full"></div>
              <p className="pl-6 text-gray-600 dark:text-gray-300 italic text-lg leading-relaxed">
                "Komitmen saya adalah memberikan pengalaman pembelian mobil listrik yang transparan, mudah, dan menyenangkan. Dari konsultasi teknis hingga after-sales, saya siap membantu Anda."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => window.location.href = `tel:+${dealerInfo.salesPhone}`}
                className="flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
              >
                <Phone className="w-4 h-4" /> Hubungi Saya
              </Button>
              <a
                href={`https://wa.me/${dealerInfo.salesPhone}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white font-medium uppercase tracking-wide text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors rounded hover:border-slate-900 dark:hover:border-white"
              >
                <MessageCircle className="w-4 h-4" /> Chat WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
