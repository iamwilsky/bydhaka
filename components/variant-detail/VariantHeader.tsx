'use client'
import React from 'react'
import { Share2 } from 'lucide-react'
import { formatPrice } from '@/constants'
import { CarModel, Variant } from '@/types'

interface VariantHeaderProps {
    model: CarModel
    variant: Variant
    handleShare: () => void
}

export const VariantHeader: React.FC<VariantHeaderProps> = ({ model, variant, handleShare }) => {
    return (
        <div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white tracking-tighter mb-2">
                {model.name}
            </h1>
            <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl text-gray-400 font-light uppercase tracking-widest">{variant.name}</span>
                <button
                    onClick={handleShare}
                    className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:bg-teal-50 hover:text-teal-600 transition-all active:scale-95"
                    aria-label="Share"
                >
                    <Share2 className="w-4 h-4" />
                </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
                {variant.originalPrice && variant.originalPrice > variant.price && (
                    <div className="text-lg text-gray-400 line-through decoration-red-500 mb-1 font-medium">
                        {formatPrice(variant.originalPrice)}
                    </div>
                )}
                <div className="text-3xl md:text-4xl font-display font-bold text-teal-600 dark:text-teal-400">
                    {formatPrice(variant.price)}
                </div>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-medium">
                    {variant.originalPrice && variant.originalPrice > variant.price
                        ? 'Harga Nett (OTR Lenteng Agung)'
                        : 'Harga OTR Lenteng Agung (Estimasi)'}
                </p>
            </div>
        </div>
    )
}
