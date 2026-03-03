'use client'

import React from 'react';
import { MapPin } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

export const LocationMap: React.FC = () => {
   const { dealerInfo } = useData();

   return (
      <section className="h-96 w-full relative">
         <iframe
            title={`Lokasi ${dealerInfo.dealerName}`}
            src={dealerInfo.mapsUrl}
            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700 border-0"
            allowFullScreen={true}
            loading="lazy"
         ></iframe>
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-gray-100 dark:border-slate-700 w-[90%] md:w-auto max-w-xl">
            <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
               <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="text-left overflow-hidden">
               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Kunjungi Showroom</p>
               <p className="font-bold text-slate-900 dark:text-white text-sm md:text-base leading-tight">
                  {dealerInfo.dealerName}
               </p>
            </div>
         </div>
      </section>
   );
};
