'use client'

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

export const Footer: React.FC = () => {
  const { dealerInfo } = useData();

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-24 md:pb-12 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand Column */}
          <div className="md:col-span-4">
            <h2 className="text-2xl font-display font-bold tracking-tighter mb-6">
              BYD <span className="text-teal-500">Lenteng Agung</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              Official authorized dealer providing the future of electric mobility. Experience the innovation, safety, and luxury of BYD vehicles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 md:col-start-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Models</h3>
            <ul className="space-y-4">
              <li><Link href="/model/sealion-7" className="text-lg hover:text-teal-500 transition-colors">BYD Sealion 7</Link></li>
              <li><Link href="/model/seal" className="text-lg hover:text-teal-500 transition-colors">BYD Seal</Link></li>
              <li><Link href="/model/atto-3" className="text-lg hover:text-teal-500 transition-colors">BYD Atto 3</Link></li>
              <li><Link href="/model/dolphin" className="text-lg hover:text-teal-500 transition-colors">BYD Dolphin</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Visit Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
                <span>Lenteng Agung, Jakarta Selatan</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span>{dealerInfo.displayPhone} ({dealerInfo.salesName})</span>
              </li>

            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p>&copy; {new Date().getFullYear()} {dealerInfo.dealerName}. All rights reserved.</p>
            <p className="text-xs text-gray-600">
              Developed by <a href="https://webchain.id/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 transition-colors">Webchain Indonesia</a>
            </p>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
