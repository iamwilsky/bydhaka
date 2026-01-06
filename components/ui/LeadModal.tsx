'use client'

import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, CheckCircle, MessageCircle } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';
import { useData } from '@/contexts/DataContext';
import { Button } from './Button';
import { BYD_MODELS } from '@/constants';

export const LeadModal: React.FC = () => {
  const { isOpen, closeModal, selectedModel } = useModal();
  // Get dealerInfo from context (dynamic), not from static file
  const { addLead, dealerInfo } = useData();
  const [submitted, setSubmitted] = useState(false);

  // Initialize form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    model: BYD_MODELS[0].name,
    variant: BYD_MODELS[0].variants[0]?.name || '',
    message: ''
  });

  // Handle auto-filling based on context when modal opens or selectedModel string updates
  useEffect(() => {
    if (isOpen) {
      if (selectedModel && selectedModel !== 'General Inquiry') {
        // Try to match specific model from string (e.g., "BYD SEAL - Premium...")
        const matchedModel = BYD_MODELS.find(m => selectedModel.includes(m.name));

        if (matchedModel) {
          const matchedVariant = matchedModel.variants.find(v => selectedModel.includes(v.name));

          setFormData(prev => ({
            ...prev,
            model: matchedModel.name,
            variant: matchedVariant ? matchedVariant.name : matchedModel.variants[0]?.name || '',
            // If specific configuration (has color info in parens), add to message if empty
            message: (selectedModel.includes('(') && !prev.message)
              ? `Saya tertarik dengan konfigurasi: ${selectedModel}`
              : prev.message
          }));
        }
      }
      // If General Inquiry or no model passed, we keep defaults or current state
    }
  }, [isOpen, selectedModel]);

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModelName = e.target.value;
    const modelData = BYD_MODELS.find(m => m.name === newModelName);
    setFormData(prev => ({
      ...prev,
      model: newModelName,
      variant: modelData?.variants[0]?.name || '' // Reset variant to first available
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Save Lead to Admin Dashboard
    addLead({
      name: formData.name,
      phone: formData.phone,
      model: `${formData.model} - ${formData.variant}`,
      source: 'Website Form'
    });

    // 2. Construct WhatsApp Message using DYNAMIC dealerInfo
    const text = `Halo ${dealerInfo.salesName},
    
Perkenalkan nama saya *${formData.name}*.
Saya melihat website ${dealerInfo.domain} dan tertarik mendapatkan penawaran & informasi detail untuk:

Model: *${formData.model}*
Varian: *${formData.variant}*

${formData.message ? `Pesan Tambahan:\n${formData.message}` : ''}

Mohon informasinya. Terima kasih.`;

    const encodedText = encodeURIComponent(text);
    // Use the dynamic phone number from Settings
    const waUrl = `https://wa.me/${dealerInfo.salesPhone}?text=${encodedText}`;

    // Simulate loading briefly then redirect
    setSubmitted(true);

    setTimeout(() => {
      window.open(waUrl, '_blank');

      // Close modal after redirection
      setTimeout(() => {
        closeModal();
        setSubmitted(false);
      }, 1000);
    }, 800);
  };

  // Get current variants based on selected model
  const currentModelData = BYD_MODELS.find(m => m.name === formData.model);
  const currentVariants = currentModelData ? currentModelData.variants : [];

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white dark:bg-slate-900 text-left align-middle shadow-xl transition-all border-t-4 border-teal-500">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-800">
                  <Dialog.Title as="h3" className="text-xl font-display font-bold text-gray-900 dark:text-white">
                    {submitted ? 'Mengalihkan ke WhatsApp...' : 'Dapatkan Penawaran'}
                  </Dialog.Title>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                        <MessageCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-center text-gray-600 dark:text-gray-300">
                        Membuka WhatsApp untuk menghubungi <strong>{dealerInfo.salesName}</strong>...
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-black dark:focus:border-white focus:ring-0 transition-colors outline-none dark:text-white"
                          placeholder="Budi Santoso"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                          No. WhatsApp
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-black dark:focus:border-white focus:ring-0 transition-colors outline-none dark:text-white"
                          placeholder="0812..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="model" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                            Model
                          </label>
                          <select
                            id="model"
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-black dark:focus:border-white focus:ring-0 transition-colors outline-none appearance-none dark:text-white"
                            value={formData.model}
                            onChange={handleModelChange}
                          >
                            {BYD_MODELS.map(m => (
                              <option key={m.id} value={m.name}>{m.name}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="variant" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                            Varian
                          </label>
                          <select
                            id="variant"
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-black dark:focus:border-white focus:ring-0 transition-colors outline-none appearance-none dark:text-white"
                            value={formData.variant}
                            onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
                          >
                            {currentVariants.map(v => (
                              <option key={v.id} value={v.name}>{v.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                          Pesan (Opsional)
                        </label>
                        <textarea
                          id="message"
                          rows={3}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-black dark:focus:border-white focus:ring-0 transition-colors outline-none resize-none dark:text-white"
                          placeholder="Saya ingin simulasi kredit / test drive..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      <div className="pt-2">
                        <Button type="submit" fullWidth variant="secondary" size="lg" className="flex items-center justify-center gap-2">
                          <MessageCircle className="w-5 h-5" />
                          Hubungi via WhatsApp
                        </Button>
                        <p className="text-[10px] text-gray-400 text-center mt-3">
                          Anda akan terhubung langsung dengan {dealerInfo.salesName} (Sales Consultant).
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
