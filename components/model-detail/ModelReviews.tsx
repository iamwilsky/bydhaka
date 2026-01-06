'use client'

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CarModel } from '@/types';
import { useModal } from '@/contexts/ModalContext';

interface ModelReviewsProps {
  model: CarModel;
}

// Extended Mock Data (12 Reviews to cycle through)
const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Hendrawan S.",
    role: "Verified Owner",
    rating: 5,
    date: "2 minggu lalu",
    content: "Akselerasinya luar biasa! Fitur safety lengkap membuat saya tenang membawa keluarga. Charging di rumah sangat mudah.",
    likes: 12
  },
  {
    id: 2,
    name: "Sarah Wijaya",
    role: "Test Drive Participant",
    rating: 5,
    date: "1 bulan lalu",
    content: "Desain interiornya sangat futuristik, terutama layar yang bisa diputar. Pelayanan sales BYD Jakarta sangat informatif.",
    likes: 8
  },
  {
    id: 3,
    name: "Budi Hartono",
    role: "Verified Owner",
    rating: 4,
    date: "1 bulan lalu",
    content: "Range baterainya sangat sesuai klaim. Saya bawa Jakarta-Bandung tanpa perlu charge di jalan. Worth every penny.",
    likes: 15
  },
  {
    id: 4,
    name: "Reza Pratama",
    role: "Verified Owner",
    rating: 5,
    date: "3 minggu lalu",
    content: "Suspensi sangat empuk untuk ukuran mobil listrik. Build quality solid, tidak ada bunyi-bunyi aneh di kabin.",
    likes: 9
  },
  {
    id: 5,
    name: "Anita Kusuma",
    role: "SPK Holder",
    rating: 5,
    date: "1 minggu lalu",
    content: "Jatuh cinta pada pandangan pertama dengan warnanya. Fitur voice command Bahasa Indonesia sangat membantu saat menyetir.",
    likes: 22
  },
  {
    id: 6,
    name: "Denny Setiawan",
    role: "Verified Owner",
    rating: 5,
    date: "2 bulan lalu",
    content: "NFC card key-nya sangat praktis. Tidak perlu ribet cari kunci di tas. Performa AC juga sangat dingin untuk cuaca Jakarta.",
    likes: 18
  },
  {
    id: 7,
    name: "Fajar Nugraha",
    role: "Test Drive Participant",
    rating: 4,
    date: "3 hari lalu",
    content: "Impresi berkendara sangat hening (kedap suara). Sound system Dynaudio-nya juara, bass-nya deep banget.",
    likes: 6
  },
  {
    id: 8,
    name: "Linda M.",
    role: "Verified Owner",
    rating: 5,
    date: "1 bulan lalu",
    content: "Pengisian daya DC Fast Charging benar-benar cepat. 30 menit istirahat di rest area baterai sudah hampir penuh lagi.",
    likes: 11
  },
  {
    id: 9,
    name: "Eko Prasetyo",
    role: "Verified Owner",
    rating: 5,
    date: "2 minggu lalu",
    content: "Value for money terbaik di kelasnya. Dengan harga segini sudah dapat sunroof panoramic dan fitur ADAS lengkap.",
    likes: 25
  },
  {
    id: 10,
    name: "Tio Firmansyah",
    role: "Verified Owner",
    rating: 4,
    date: "1 bulan lalu",
    content: "Handling sangat stabil saat menikung. Blade Battery memberikan rasa aman ekstra dibanding merek lain.",
    likes: 14
  },
  {
    id: 11,
    name: "Maya Putri",
    role: "SPK Holder",
    rating: 5,
    date: "5 hari lalu",
    content: "Sales consultant sangat membantu menjelaskan fitur VTOL. Ternyata bisa buat nyalain alat listrik saat camping!",
    likes: 10
  },
  {
    id: 12,
    name: "Kevin Sanjaya",
    role: "Verified Owner",
    rating: 5,
    date: "3 minggu lalu",
    content: "Layar head unit yang bisa di-rotate vertikal sangat enak buat lihat navigasi maps. Sangat responsif no lag.",
    likes: 19
  }
];

export const ModelReviews: React.FC<ModelReviewsProps> = ({ model }) => {
  const { openReviewModal } = useModal(); // Use the new Review Modal hook
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-cycle reviews every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Start fade out

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          // Move to next set of 4. If at end, loop back to 0.
          // Logic assumes MOCK_REVIEWS.length is divisible by 4 for perfect loops, 
          // or handle logic to loop gracefully.
          const nextIndex = prevIndex + 4;
          return nextIndex >= MOCK_REVIEWS.length ? 0 : nextIndex;
        });
        setIsVisible(true); // Start fade in
      }, 500); // Wait for fade out to finish (0.5s)

    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  // Get currently visible items
  const currentReviews = MOCK_REVIEWS.slice(currentIndex, currentIndex + 4);

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Summary Stats */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-teal-600 dark:text-teal-500 font-bold uppercase tracking-widest text-xs mb-2 block">
                Owner Experiences
              </span>
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
                Apa Kata Mereka?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Ulasan jujur dari pelanggan yang telah merasakan performa {model.name}. Kami menampilkan ulasan terbaru secara berkala.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-5xl font-display font-bold text-slate-900 dark:text-white">4.8</span>
                <span className="text-gray-400 pb-2 font-medium">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide">
                Berdasarkan 100+ Ulasan
              </p>
            </div>

            <Button
              onClick={() => openReviewModal(model.name)}
              variant="secondary"
              fullWidth
              className="justify-center gap-2 transition-all duration-300 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
            >
              <MessageSquare className="w-4 h-4" /> Tulis Ulasan
            </Button>

            {/* Pagination Indicators */}
            <div className="flex gap-2 pt-4">
              {[0, 4, 8].map((idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === idx
                    ? 'w-8 bg-teal-500'
                    : 'w-2 bg-gray-200 dark:bg-slate-700'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Review Grid (Cycling) */}
          <div className="lg:col-span-8">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {currentReviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${review.id % 2 === 0 ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-teal-100 text-teal-700'
                          }`}>
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{review.name}</h4>
                          <p className="text-[10px] uppercase tracking-wide text-teal-600 dark:text-teal-400 font-bold">{review.role}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{review.date}</span>
                    </div>

                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 min-h-[60px]">
                      "{review.content}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center gap-2 text-gray-400 text-xs font-medium cursor-pointer hover:text-teal-600 transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Helpful ({review.likes})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
