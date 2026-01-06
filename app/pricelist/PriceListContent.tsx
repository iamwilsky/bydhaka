'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Download, Tag, Calculator, ExternalLink, ChevronRight, ChevronDown, CheckCircle, FileText } from 'lucide-react'
import { formatPrice } from '@/constants'
import { useData } from '@/contexts/DataContext'
import { Button } from '@/components/ui/Button'
import { useModal } from '@/contexts/ModalContext'
import { CarModel } from '@/types'

interface Props {
    models: CarModel[]
    currentMonth: string
}

export function PriceListContent({ models, currentMonth }: Props) {
    const { trackDownload } = useData()
    const { openModal } = useModal()
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index)
    }

    const handleDownload = (type: string) => {
        trackDownload()
        openModal(type)
    }

    const seoFaqs = [
        {
            q: "Apakah harga OTR BYD di atas sudah termasuk pajak?",
            a: "Ya, harga yang tercantum dalam pricelist BYD Jakarta adalah harga On The Road (OTR) untuk wilayah Jakarta, Depok, Tangerang, dan Bekasi (Plat B). Harga sudah mencakup BBN-KB (Bea Balik Nama Kendaraan Bermotor) untuk mobil listrik, pembuatan STNK, dan BPKB."
        },
        {
            q: "Apakah harga mengikat saat pemesanan (SPK)?",
            a: "Harga tidak mengikat sampai dengan faktur diterbitkan. Namun, dengan melakukan SPK (Surat Pemesanan Kendaraan) di BYD Jakarta, Anda akan mendapatkan prioritas alokasi unit dan penguncian promo yang berlaku pada bulan pemesanan."
        },
        {
            q: "Berapa minimal DP untuk kredit mobil BYD?",
            a: "Kami bekerjasama dengan berbagai leasing (MTF, Maybank, Sunindo, dll). DP minimal mulai dari 15% - 20% tergantung profil keuangan customer. Tersedia juga paket bunga 0% untuk tenor tertentu."
        },
        {
            q: "Apakah harga sudah termasuk Wall Charger?",
            a: "Untuk pembelian unit BYD Seal, Atto 3, dan Dolphin, Anda sudah mendapatkan paket Home Charging (Wallbox Charger) 7kW gratis beserta jasa instalasi standar. Syarat dan ketentuan berlaku."
        }
    ]

    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-[#0B1215] transition-colors duration-300">

            {/* Header */}
            <div className="container mx-auto px-4 md:px-8 mb-12 text-center">
                <span className="inline-block px-3 py-1 mb-4 border border-teal-500/30 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-widest rounded-full">
                    Update: {currentMonth}
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
                    Daftar Harga Mobil BYD & Promo
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                    Berikut adalah <strong>pricelist BYD terbaru</strong> (On The Road) untuk wilayah Jakarta, Depok, Tangerang, dan Bekasi. Temukan mobil listrik impian Anda dengan penawaran terbaik bulan ini.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="container mx-auto px-4 md:px-8 max-w-5xl space-y-8 mb-16">
                {models.map((model) => (
                    <div key={model.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col md:flex-row-reverse">

                            {/* Image Section */}
                            <div className="md:w-2/5 relative bg-gray-100 dark:bg-slate-700 p-8 flex items-center justify-center group cursor-pointer">
                                <Link href={`/model/${model.id}`} className="absolute inset-0 z-20" aria-label={`Lihat detail ${model.name}`} />

                                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                                    <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        {model.name}
                                        <ChevronRight className="w-5 h-5 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                                    </h3>
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">{model.category}</span>
                                </div>

                                <img
                                    src={model.heroImage}
                                    alt={`Harga ${model.name} OTR Jakarta`}
                                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500 relative z-0"
                                />

                                <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                    <span className="inline-block px-4 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold uppercase tracking-widest rounded-full shadow-sm text-slate-900 dark:text-white">
                                        Lihat Spesifikasi
                                    </span>
                                </div>
                            </div>

                            {/* Variants Table Section */}
                            <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                                <div className="space-y-6">
                                    {model.variants.map((variant) => (
                                        <div
                                            key={variant.id}
                                            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 dark:border-slate-700 last:border-0 pb-4 last:pb-0 group/variant ${variant.soldOut ? 'opacity-50 grayscale' : ''}`}
                                        >
                                            <div className="mb-2 sm:mb-0">
                                                <Link
                                                    href={variant.soldOut ? '#' : `/variant/${model.id}/${variant.id}`}
                                                    onClick={(e) => variant.soldOut && e.preventDefault()}
                                                    className={`font-bold text-lg flex items-center gap-2 transition-colors ${variant.soldOut
                                                        ? 'text-gray-500 cursor-not-allowed'
                                                        : 'text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400'
                                                        }`}
                                                >
                                                    {variant.name}
                                                    {!variant.soldOut && <ExternalLink className="w-3 h-3 opacity-0 group-hover/variant:opacity-100 transition-opacity text-teal-500" />}

                                                    {variant.soldOut && (
                                                        <span className="px-1.5 py-0.5 bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400 text-[10px] rounded font-bold pointer-events-none uppercase tracking-wider">Sold Out</span>
                                                    )}

                                                    {variant.powertrain === 'AWD' && !variant.soldOut && (
                                                        <span className="px-1.5 py-0.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] rounded font-bold pointer-events-none">AWD</span>
                                                    )}
                                                </Link>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    Range {variant.battery.range} • 0-100 kpj {variant.performance.acceleration}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                {variant.originalPrice && variant.originalPrice > variant.price && !variant.soldOut && (
                                                    <div className="text-xs text-gray-400 line-through decoration-red-500 mb-0.5">
                                                        {formatPrice(variant.originalPrice)}
                                                    </div>
                                                )}
                                                <div className={`text-xl font-display font-bold ${variant.soldOut ? 'text-gray-400' : 'text-teal-600 dark:text-teal-400'}`}>
                                                    {formatPrice(variant.price)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4">
                                    <Button
                                        onClick={() => handleDownload(`Request Brochure - ${model.name}`)}
                                        className="flex-1 flex items-center justify-center gap-2"
                                    >
                                        <FileText className="w-4 h-4" /> Download Brochure
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => openModal(`Info Promo - ${model.name}`)}
                                        className="flex-1 flex items-center justify-center gap-2 dark:text-gray-300 dark:border-slate-600 dark:hover:bg-slate-700"
                                    >
                                        <Tag className="w-4 h-4" /> Cek Promo
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* SEO Friendly Table Summary */}
            <div className="bg-white dark:bg-slate-900 py-16 border-t border-gray-100 dark:border-slate-800">
                <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                    <div className="mb-8">
                        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
                            Ringkasan Harga OTR BYD 2025
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Tabel perbandingan harga lengkap untuk memudahkan Anda memilih varian yang tepat.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Model</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Varian</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Jarak Tempuh</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">Harga OTR</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                                {models.flatMap(model =>
                                    model.variants.map(variant => (
                                        <tr key={`${model.id}-${variant.id}`} className={`transition-colors ${variant.soldOut ? 'bg-gray-50 dark:bg-slate-800/30 opacity-60 grayscale' : 'hover:bg-gray-50 dark:hover:bg-slate-800/50'}`}>
                                            <td className="p-4 text-sm font-bold text-slate-900 dark:text-white">{model.name}</td>
                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                                {variant.name}
                                                {variant.soldOut && <span className="text-[10px] font-bold uppercase bg-gray-200 dark:bg-gray-700 px-1.5 rounded">Sold Out</span>}
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{variant.battery.range}</td>
                                            <td className={`p-4 text-sm font-bold text-right ${variant.soldOut ? 'text-gray-500' : 'text-teal-600 dark:text-teal-400'}`}>{formatPrice(variant.price)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-4 italic">
                        *Harga OTR (On The Road) berlaku untuk wilayah Jakarta, Bekasi, Depok, dan Tangerang (Plat B). Harga tidak mengikat dan dapat berubah sewaktu-waktu.
                    </p>
                </div>
            </div>

            {/* SEO Content Section */}
            <div className="bg-slate-50 dark:bg-[#0B1215] py-16">
                <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Informasi Penjualan BYD Jakarta</h3>
                            <div className="prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-400 leading-relaxed">
                                <p className="mb-4">
                                    <strong>BYD Jakarta</strong> berkomitmen memberikan transparansi harga dan pelayanan terbaik bagi calon pemilik mobil listrik di Indonesia.
                                </p>
                                <p>
                                    Sebagai dealer resmi, kami melayani pembelian secara tunai (cash) maupun kredit dengan dukungan berbagai lembaga pembiayaan terpercaya. Dapatkan penawaran khusus seperti:
                                </p>
                                <ul className="list-none space-y-2 mt-2 ml-0 pl-0">
                                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-500" /> Bunga 0% untuk tenor tertentu</li>
                                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-500" /> DP Ringan mulai 15%</li>
                                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-500" /> Tenor panjang hingga 6 tahun</li>
                                </ul>
                            </div>
                        </div>

                        {/* FAQ Accordion */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Pertanyaan Umum (FAQ Harga)</h3>
                            <div className="space-y-3">
                                {seoFaqs.map((item, idx) => (
                                    <div key={idx} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                                        <button
                                            onClick={() => toggleFaq(idx)}
                                            className="w-full flex justify-between items-center p-4 text-left font-medium text-slate-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                                        >
                                            <span className="text-sm pr-4">{item.q}</span>
                                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                                        </button>
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="p-4 pt-0 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50">
                                                {item.a}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Box */}
            <div className="container mx-auto px-4 md:px-8 mt-16 max-w-4xl">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-teal-900 dark:to-slate-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Unduh Dokumen Lengkap</h3>
                        <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                            Dapatkan detail spesifikasi, pricelist OTR terbaru, dan simulasi kredit dalam format PDF.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={() => handleDownload('Request Download Price List (PDF)')}
                                className="flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
                            >
                                <Download className="w-5 h-5" /> Download Price List
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => handleDownload('Request Download Paket Kredit (PDF)')}
                                className="flex items-center justify-center gap-2 border-white text-white hover:bg-white hover:text-slate-900"
                            >
                                <Calculator className="w-5 h-5" /> Download Paket Kredit
                            </Button>
                        </div>
                    </div>

                    {/* Abstract Decoration */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-teal-500 rounded-full blur-3xl opacity-20"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                </div>
            </div>

        </div>
    )
}
