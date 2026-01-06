'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CarModel, Variant, Lead, DealerInfo, SiteStats } from '@/types';
import { BYD_MODELS } from '@/constants';
import { dealerData as defaultDealerData } from '@/data/dealer';
import { supabase } from '@/lib/supabaseClient';

interface DataContextType {
  models: CarModel[];
  leads: Lead[];
  dealerInfo: DealerInfo;
  stats: SiteStats;
  isPricingLoading: boolean;
  unseenLeadsCount: number; // New State for Notification
  updateVariant: (modelId: string, variantId: string, updates: Partial<Variant>) => void;
  addLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  updateLeadDetails: (id: string, updates: Partial<Lead>) => Promise<void>; // Added this
  deleteLead: (id: string) => Promise<boolean>;
  updateDealerInfo: (info: DealerInfo) => void;
  trackVisitor: () => void;
  trackDownload: () => void;
  resetData: (modelId?: string) => Promise<boolean>;
  refreshLeads: () => Promise<void>;
  markLeadsAsSeen: () => void; // New Action
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with Static Constants first
  const [models, setModels] = useState<CarModel[]>(BYD_MODELS);
  const [dealerInfo, setDealerInfo] = useState<DealerInfo>(defaultDealerData);

  // Placeholder for addLead - currently just logging, will be Google Sheets later
  const addLead = async (leadData: Omit<Lead, 'id' | 'date' | 'status'>) => {
    // TODO: Implement Google Sheets integration here
    console.log("New Lead Submitted (Local only, DB removed):", leadData);
    // Previously we saved to Supabase here. Now we just proceed to WhatsApp redirection in the UI.
  };

  const updateDealerInfo = async (info: DealerInfo) => {
    setDealerInfo(info);
    // Removed Supabase Update - if this feature is needed for admin, it should be removed too since we deleted admin.
    // Keeping local state update for now in case of dynamic usage, but likely this function is now dead code if Admin is gone.
  };

  return (
    <DataContext.Provider value={{
      models,
      dealerInfo,
      // Deprecated/Stubbed values to prevent strict TS errors until full cleanup
      leads: [],
      stats: { visitors: 0, downloads: 0 },
      isPricingLoading: false,
      unseenLeadsCount: 0,

      addLead,
      updateDealerInfo,

      // Stubbed functions
      updateVariant: () => { },
      updateLeadStatus: () => { },
      updateLeadDetails: async () => { },
      deleteLead: async () => true,
      trackVisitor: () => { },
      trackDownload: () => { },
      resetData: async () => true,
      refreshLeads: async () => { },
      markLeadsAsSeen: () => { }
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
