'use client'

import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/contexts/ModalContext';
import { useData } from '@/contexts/DataContext';

export const HomeLocation: React.FC = () => {
  const { openModal } = useModal();
  const { dealerInfo } = useData();

  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-teal-600 dark:text-teal-500 font-bold uppercase tracking-widest text-sm mb-2 block">
              Lokasi Kami
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
              Kunjungi Showroom BYD Lenteng Agung
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Lokasi strategis di Jalan Alternatif Lenteng Agung (Transyogi), mudah diakses dari Tol Jatikarya, Kota Wisata, Legenda Wisata, dan Citra Grand. Nikmati fasilitas Charging Station gratis saat Anda berkunjung.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Alamat Dealer</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{dealerInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Jam Operasional</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Senin - Minggu: 08:30 - 20:00 WIB</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Hubungi Kami</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sales: {dealerInfo.displayPhone} ({dealerInfo.salesName})</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Button onClick={() => openModal('Lokasi')} variant="primary" size="lg" className="w-full sm:w-auto">
                Jadwalkan Kunjungan
              </Button>
            </div>
          </div>

          {/* Map Embed */}
          <div className="h-[400px] md:h-[500px] w-full bg-gray-200 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-700 relative group">
            <iframe
              title="Peta Lokasi BYD Lenteng Agung"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.341680696989!2d106.92051667586522!3d-6.350320962121336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d350616b39d%3A0x7d6c6e76865231c5!2sJl.%20Alternatif%20Lenteng Agung%20No.41%2C%20Jatikarya%2C%20Kec.%20Jatisampurna%2C%20Kota%20Bks%2C%20Jawa%20Barat%2017435!5e0!3m2!1sen!2sid!4v1709600000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-500"
            ></iframe>
            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur px-4 py-2 rounded-lg text-xs font-bold shadow-sm pointer-events-none border border-white/20 dark:border-slate-700">
              📍 {dealerInfo.dealerName}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
