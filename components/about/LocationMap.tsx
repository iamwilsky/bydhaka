'use client'

import React from 'react';
import { MapPin } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

export const LocationMap: React.FC = () => {
   const { dealerInfo } = useData();

   return (
      <section className="h-96 w-full relative">
         <iframe
            title="Lokasi Dealer"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.2809724680192!2d106.8465762134959!3d-6.189324695399919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f58d90bfb883%3A0xd9c709f95dcc218f!2sMazda%20Raden%20Saleh!5e0!3m2!1sen!2sid!4v1767667917821!5m2!1sen!2sid"
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
                  Jl. Kramat Raya (Dekat Salemba & Raden Saleh)
               </p>
            </div>
         </div>
      </section>
   );
};
