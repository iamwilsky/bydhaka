'use client'

import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileBottomBar } from './MobileBottomBar';
import { LeadModal } from '@/components/ui/LeadModal';

import { ReviewModal } from '@/components/ui/ReviewModal';

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <MobileBottomBar />
      <LeadModal />
      <ReviewModal />
    </div>
  );
};
