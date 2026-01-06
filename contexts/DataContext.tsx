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
  const [leads, setLeads] = useState<Lead[]>([]);
  const [dealerInfo, setDealerInfo] = useState<DealerInfo>(defaultDealerData);
  const [stats, setStats] = useState<SiteStats>({ visitors: 0, downloads: 0 });
  const [unseenLeadsCount, setUnseenLeadsCount] = useState(0);

  // Loading state starts as true
  const [isPricingLoading, setIsPricingLoading] = useState(true);

  // --- HELPER: Recalculate Model Pricing based on Variants ---
  const recalculateModelPricing = (model: CarModel, variants: Variant[]): CarModel => {
    const activeVariants = variants.filter(v => !v.soldOut && v.price > 0);
    const eligibleVariants = activeVariants.length > 0 ? activeVariants : variants;

    if (eligibleVariants.length > 0) {
      const cheapestVariant = [...eligibleVariants].sort((a, b) => a.price - b.price)[0];
      return {
        ...model,
        variants: variants,
        startingPrice: cheapestVariant.price,
        originalPrice: cheapestVariant.originalPrice
      };
    }
    return { ...model, variants };
  };

  // --- SUPABASE FETCHING ---
  const fetchPricing = async () => {
    try {
      const { data, error } = await supabase.from('variants').select('*');

      if (error) {
        console.error('Error fetching variants pricing:', error);
        return;
      }

      if (data && data.length > 0) {
        setModels(prevModels => {
          return prevModels.map(model => {
            const updatedVariants = model.variants.map(variant => {
              const dbRecord = data.find((r: any) => r.model_id === model.id && r.variant_id === variant.id);
              if (dbRecord) {
                return {
                  ...variant,
                  price: Number(dbRecord.price),
                  originalPrice: dbRecord.original_price ? Number(dbRecord.original_price) : undefined,
                  soldOut: dbRecord.is_sold_out ?? false
                };
              }
              return variant;
            });
            return recalculateModelPricing(model, updatedVariants);
          });
        });
      }
    } catch (err) {
      console.error("Unexpected error in pricing fetch", err);
    } finally {
      setIsPricingLoading(false);
    }
  };

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const mappedLeads: Lead[] = data.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        phone: item.phone,
        model: item.model,
        date: new Date(item.created_at).toISOString().split('T')[0],
        status: item.status,
        source: item.source
      }));
      setLeads(mappedLeads);

      // --- Calculate Unseen Leads ---
      // We check localStorage for the last time the admin viewed the leads page
      const lastViewed = localStorage.getItem('admin_leads_last_viewed');

      if (!lastViewed) {
        // If never viewed, all leads are technically "new" to the notification system, 
        // or we can set it to 0 if we prefer a clean slate. Let's show total for now or 0.
        // Let's logic: If first time, show count of leads with status 'New'
        const newLeads = mappedLeads.filter(l => l.status === 'New').length;
        setUnseenLeadsCount(newLeads);
      } else {
        const lastViewedDate = new Date(lastViewed);
        // Count leads created AFTER the last view
        // Note: We need raw created_at for precision, mappedLeads has date only (YYYY-MM-DD).
        // So we use the 'data' from supabase which has full timestamp.
        const newCount = data.filter((item: any) => new Date(item.created_at) > lastViewedDate).length;
        setUnseenLeadsCount(newCount);
      }
    }
  };

  const markLeadsAsSeen = () => {
    const now = new Date().toISOString();
    localStorage.setItem('admin_leads_last_viewed', now);
    setUnseenLeadsCount(0);
  };



  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('site_stats')
      .select('*')
      .eq('id', 1)
      .single();

    if (!error && data) {
      setStats({
        visitors: data.visitors,
        downloads: data.downloads
      });
    }
  };

  useEffect(() => {
    // Initial fetch on mount (might fail for leads if not logged in due to RLS, which is expected)
    fetchLeads();

    fetchStats();
    fetchPricing();
  }, []);

  const updateVariant = async (modelId: string, variantId: string, updates: Partial<Variant>) => {
    setModels(prevModels => {
      return prevModels.map(model => {
        if (model.id !== modelId) return model;
        const updatedVariants = model.variants.map(variant => {
          if (variant.id !== variantId) return variant;
          return { ...variant, ...updates };
        });
        return recalculateModelPricing(model, updatedVariants);
      });
    });

    const payload: any = { model_id: modelId, variant_id: variantId };
    if (updates.price !== undefined) payload.price = updates.price;
    if (updates.originalPrice !== undefined) payload.original_price = updates.originalPrice;
    if (updates.soldOut !== undefined) payload.is_sold_out = updates.soldOut;

    const { error } = await supabase
      .from('variants')
      .upsert(payload, { onConflict: 'model_id,variant_id' });

    if (error) console.error("Failed to update pricing in Supabase:", error);
  };

  const addLead = async (leadData: Omit<Lead, 'id' | 'date' | 'status'>) => {
    const tempLead: Lead = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      status: 'New',
      ...leadData
    };
    setLeads(prev => [tempLead, ...prev]);

    // Optimistically update notification count if user is not on leads page (handled by UI logic generally)
    // For now, fetchLeads below will handle the sync if realtime was fully on, 
    // but since we rely on fetchLeads, we call it.

    await supabase.from('leads').insert([{
      name: leadData.name,
      phone: leadData.phone,
      model: leadData.model,
      source: leadData.source,
      status: 'New'
    }]);
    fetchLeads();
  };

  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    await supabase.from('leads').update({ status: status }).eq('id', id);
  };

  // NEW: Generalized Update Function
  const updateLeadDetails = async (id: string, updates: Partial<Lead>) => {
    // Optimistic UI Update
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));

    // DB Update
    const payload: any = {};
    if (updates.name) payload.name = updates.name;
    if (updates.model) payload.model = updates.model;
    if (updates.status) payload.status = updates.status;
    // Phone/Source generally don't change often but can be added if needed

    await supabase.from('leads').update(payload).eq('id', id);
  };

  const deleteLead = async (id: string): Promise<boolean> => {
    // 1. Optimistic UI update
    const previousLeads = [...leads];
    setLeads(prev => prev.filter(l => l.id !== id));

    // 2. Perform DB Delete
    const { error } = await supabase.from('leads').delete().eq('id', id);

    if (error) {
      console.error("Delete Lead Error:", error);
      // 3. Rollback UI if failed
      setLeads(previousLeads);
      alert(`Gagal menghapus lead!\n\nError Supabase: ${error.message} (Code: ${error.code})\n\nSolusi: Pastikan Anda sudah menjalankan SQL Policy 'DELETE' di Supabase Dashboard untuk tabel 'leads'.`);
      return false;
    }
    return true;
  };

  const updateDealerInfo = async (info: DealerInfo) => {
    setDealerInfo(info);
    await supabase.from('dealer_info').update({
      sales_name: info.salesName,
      sales_phone: info.salesPhone,
      display_phone: info.displayPhone,
      dealer_name: info.dealerName,
      address: info.address,
      domain: info.domain,
      email: info.email,
      maps_url: info.mapsUrl
    }).eq('id', 1);
  };

  const trackVisitor = async () => {
    const hasVisitedSession = sessionStorage.getItem('byd_session_visit');
    if (!hasVisitedSession) {
      setStats(prev => ({ ...prev, visitors: prev.visitors + 1 }));
      sessionStorage.setItem('byd_session_visit', 'true');
      await supabase.rpc('increment_visitors');
    }
  };

  const trackDownload = async () => {
    setStats(prev => ({ ...prev, downloads: prev.downloads + 1 }));
    await supabase.rpc('increment_downloads');
  };

  const resetData = async (modelId?: string): Promise<boolean> => {
    if (modelId) {
      // --- RESET SPECIFIC MODEL (Granular) ---
      const previousModels = JSON.parse(JSON.stringify(models));
      const staticModel = BYD_MODELS.find(m => m.id === modelId);
      if (staticModel) {
        setModels(prev => prev.map(m => {
          if (m.id === modelId) {
            return JSON.parse(JSON.stringify(staticModel));
          }
          return m;
        }));
      }

      const { error } = await supabase.from('variants').delete().eq('model_id', modelId);

      if (error) {
        console.error(`Failed to reset model ${modelId}:`, error);
        setModels(previousModels);
        alert(`Gagal mereset model ${modelId}!\n\nError Supabase: ${error.message} (Code: ${error.code})\n\nSolusi: Cek 'Policies' di Supabase. Pastikan DELETE diizinkan untuk authenticated users.`);
        return false;
      }
      return true;

    } else {
      // --- GLOBAL RESET (Legacy/Fallback) ---
      setModels(JSON.parse(JSON.stringify(BYD_MODELS)));
      const { error } = await supabase.from('variants').delete().gte('price', 0);

      if (error) {
        console.error("Global Reset Error:", error);
        alert(`Gagal mereset database. Error: ${error.message}`);
        fetchPricing(); // Re-sync
        return false;
      }
      return true;
    }
  };

  return (
    <DataContext.Provider value={{
      models, leads, dealerInfo, stats, isPricingLoading, unseenLeadsCount,
      updateVariant, addLead, updateLeadStatus, updateLeadDetails, deleteLead, updateDealerInfo,
      trackVisitor, trackDownload, resetData, refreshLeads: fetchLeads, markLeadsAsSeen
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
