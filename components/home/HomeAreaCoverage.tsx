'use client'

import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';

export const HomeAreaCoverage: React.FC = () => {
    const { openModal } = useModal();

    const areas = [
        "Kebon Jeruk", "Kedoya", "Puri Indah", "Kembangan", "Meruya", "Tomang", "Grogol", "Tangerang"
    ];

    return (
        <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-t border-b border-gray-100 dark:border-slate-800">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="w-full md:w-2/3">
                        <div className="flex items-center gap-2 mb-3">
                            <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-500" />
                            <span className="text-teal-600 dark:text-teal-500 font-bold uppercase tracking-widest text-xs">
                                Jangkauan Wilayah
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
                            Dealer BYD Terdekat di Jakarta Barat & Sekitarnya
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            Kami melayani pembelian dan test drive untuk seluruh wilayah DKI Jakarta dan Jabodetabek, khususnya area <strong className="text-slate-900 dark:text-white">Jakarta Barat, Kebon Jeruk, Kedoya, dan Puri Indah</strong>. Lokasi showroom kami yang strategis memudahkan Anda yang berdomisili atau berkantor di area ini untuk melihat langsung unit BYD Sealion 7, Seal, Atto 3, dan Dolphin.
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {areas.map((area, index) => (
                                <span key={index} className="px-3 py-1 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-medium border border-gray-200 dark:border-slate-700 shadow-sm">
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 shadow-md max-w-sm w-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                                    <Navigation className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">Lokasi Strategis</div>
                                    <div className="font-bold text-slate-900 dark:text-white">Mudah Diakses</div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                Sangat mudah diakses, hanya beberapa menit dari Pintu Tol Kebon Jeruk / Tol Dalam Kota.
                            </p>
                            <button
                                onClick={() => openModal('Tanya Lokasi')}
                                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white rounded-lg text-sm font-bold transition-colors"
                            >
                                Lihat Lokasi di Peta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
