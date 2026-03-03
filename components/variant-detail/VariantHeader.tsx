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
            <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-display font-semibold text-slate-900 dark:text-white tracking-tight leading-none mb-4">
                {model.name}
            </h1>
            <div className="flex items-center gap-4">
                <span className="text-lg md:text-xl text-gray-500 font-medium uppercase tracking-[0.3em]">{variant.name}</span>
                <button
                    onClick={handleShare}
                    className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:bg-teal-50 hover:text-teal-600 transition-all active:scale-95"
                    aria-label="Share"
                >
                    <Share2 className="w-4 h-4" />
                </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800/50">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
                    {variant.originalPrice && variant.originalPrice > variant.price
                        ? 'Harga Promo (OTR Jakarta)'
                        : 'Harga Mulai Dari (OTR Jakarta)'}
                </p>
                <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl md:text-5xl font-display font-semibold text-slate-900 dark:text-white tracking-tight">
                            {formatPrice(variant.price).replace(',00', '').replace('Rp', '')}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">*</span>
                    </div>
                    {variant.originalPrice && variant.originalPrice > variant.price && (
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-400 line-through decoration-teal-500/50">
                                {formatPrice(variant.originalPrice).replace(',00', '').replace('Rp', '')}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
