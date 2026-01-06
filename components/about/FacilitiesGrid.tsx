
import React from 'react';
import { ShieldCheck, Wrench, Battery, MapPin } from 'lucide-react';

export const FacilitiesGrid: React.FC = () => {
   const items = [
      {
         icon: <ShieldCheck className="w-8 h-8 text-teal-500" />,
         title: "Authorized Dealer",
         desc: "Dealer resmi terdaftar menjamin keaslian unit dan dokumen kendaraan."
      },
      {
         icon: <Wrench className="w-8 h-8 text-teal-500" />,
         title: "Service Center",
         desc: "Teknisi tersertifikasi dengan peralatan diagnostik canggih standar BYD."
      },
      {
         icon: <Battery className="w-8 h-8 text-teal-500" />,
         title: "Battery Warranty",
         desc: "Klaim garansi baterai 8 tahun (Blade Battery) lebih mudah dan terjamin."
      },
      {
         icon: <MapPin className="w-8 h-8 text-teal-500" />,
         title: "Lokasi Strategis",
         desc: "Lokasi strategis di Jakarta Pusat, mudah diakses dari berbagai wilayah."
      }
   ];

   return (
      <section className="py-20 bg-white dark:bg-[#0B1215] border-t border-gray-100 dark:border-slate-800">
         <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <span className="text-teal-600 dark:text-teal-500 font-bold uppercase tracking-widest text-xs mb-2 block">
                  Why Choose Us
               </span>
               <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">Dealer Fasilitas Lengkap</h2>
               <p className="text-gray-500 dark:text-gray-400">Kami menjamin ketenangan pikiran Anda dengan standar layanan global BYD.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {items.map((item, i) => (
                  <div key={i} className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800 text-center hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                     <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-700 flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        {item.icon}
                     </div>
                     <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};
