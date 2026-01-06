'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isOpen: boolean;
  openModal: (modelName?: string) => void;
  closeModal: () => void;
  selectedModel: string;



  // Review Modal State
  isReviewOpen: boolean;
  openReviewModal: (modelName?: string) => void;
  closeReviewModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Lead/Offer Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');



  // Review Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const openModal = (modelName?: string) => {
    if (modelName) setSelectedModel(modelName);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedModel(''), 300); // Clear after animation
  };

  const openReviewModal = (modelName?: string) => {
    if (modelName) setSelectedModel(modelName);
    setIsReviewOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewOpen(false);
    setTimeout(() => setSelectedModel(''), 300);
  };

  return (
    <ModalContext.Provider value={{
      isOpen, openModal, closeModal, selectedModel,
      isReviewOpen, openReviewModal, closeReviewModal
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
