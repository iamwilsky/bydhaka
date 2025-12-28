'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useModal } from '@/contexts/ModalContext'
import { useData } from '@/contexts/DataContext'
import { CarModel, Variant } from '@/types'

import { VariantVisuals } from '@/components/variant-detail/VariantVisuals'
import { VariantHeader } from '@/components/variant-detail/VariantHeader'
import { VariantColorSelector } from '@/components/variant-detail/VariantColorSelector'
import { VariantSpecs } from '@/components/variant-detail/VariantSpecs'
import { VariantFeatures } from '@/components/variant-detail/VariantFeatures'
import { VariantActions } from '@/components/variant-detail/VariantActions'

interface Props {
    model: CarModel
    variant: Variant
}

export function VariantDetailContent({ model, variant }: Props) {
    const { openModal } = useModal()
    const { trackDownload } = useData()

    const [selectedColor, setSelectedColor] = useState(model.colors[0])

    const handleDownloadBrochure = () => {
        trackDownload()
        openModal(`Download Brochure - ${model.name}`)
    }

    // Share Functionality
    const handleShare = async () => {
        const shareData = {
            title: `BYD ${model.name} ${variant.name}`,
            text: `Lihat spesifikasi dan harga BYD ${model.name} ${variant.name} di BYD Lenteng Agung.`,
            url: window.location.href,
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                // User cancelled or share failed
                console.log('Share cancelled or failed', err)
            }
        } else {
            // Fallback to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href)
                // You might want to use a toast notification here if available
                alert('Link halaman telah disalin ke clipboard!')
            } catch (err) {
                console.error('Failed to copy', err)
            }
        }
    }

    return (
        <div className="pt-20 pb-32 md:pb-20 min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-8">

                {/* Breadcrumb / Back Button */}
                <div className="mb-8">
                    <Link href={`/model/${model.id}`} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors group">
                        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Kembali ke {model.name}
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left Column: Fixed Visuals (Desktop) */}
                    <div className="lg:col-span-7 lg:sticky lg:top-28">
                        <VariantVisuals model={model} variant={variant} selectedColor={selectedColor as any} />

                        {/* Mobile Only: Color Selector */}
                        <div className="md:hidden mt-6">
                            <VariantColorSelector model={model} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                        </div>
                    </div>

                    {/* Right Column: Scrollable Content & Configuration */}
                    <div className="lg:col-span-5 space-y-12">

                        {/* Title Section */}
                        <VariantHeader model={model} variant={variant} handleShare={handleShare} />

                        {/* Color Selector (Desktop) */}
                        <div className="hidden md:block">
                            <VariantColorSelector model={model} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                        </div>

                        {/* Performance Specs Grid */}
                        <VariantSpecs variant={variant} />

                        {/* Features Highlight */}
                        <VariantFeatures model={model} variant={variant} />

                        {/* Actions */}
                        <VariantActions
                            model={model}
                            variant={variant}
                            selectedColor={selectedColor}
                            handleDownloadBrochure={handleDownloadBrochure}
                            handleShare={handleShare}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}
