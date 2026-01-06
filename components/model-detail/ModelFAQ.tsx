
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { CarModel } from '@/types';
import { formatPrice } from '@/constants';

interface ModelFAQProps {
  model: CarModel;
}

export const ModelFAQ: React.FC<ModelFAQProps> = ({ model }) => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-[#0B1215]">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-8 text-center">
          FAQ - {model.name} Jakarta
        </h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <HelpCircle className="w-4 h-4 text-teal-500" />
              Berapa harga OTR {model.name} di Jakarta?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Harga {model.name} dimulai dari {formatPrice(model.startingPrice)}. Harga ini berlaku untuk wilayah Jakarta (Plat B) dan sekitarnya. Hubungi kami untuk rincian diskon dan simulasi kredit.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <HelpCircle className="w-4 h-4 text-teal-500" />
              Berapa jarak tempuh maksimal {model.name}?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {model.name} memiliki jarak tempuh hingga {model.summaryRange} dalam sekali pengisian daya penuh, sangat cukup untuk penggunaan harian di Jabodetabek maupun perjalanan luar kota.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <HelpCircle className="w-4 h-4 text-teal-500" />
              Berapa lama garansi baterai BYD?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              BYD memberikan garansi traksi baterai (Blade Battery) selama 8 Tahun atau 160.000 KM, serta garansi unit kendaraan selama 6 Tahun atau 150.000 KM.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
