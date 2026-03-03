
import React from 'react';

export interface HeroStats {
  range: string;
  acceleration: string;
  powertrain: string;
  charging: string;
}

interface ModelKeyStatsProps {
  stats: HeroStats;
}

export const ModelKeyStats: React.FC<ModelKeyStatsProps> = ({ stats }) => {
  return (
    <div className="bg-white dark:bg-[#0B1215] border-y border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-200 dark:divide-white/10">

          <div className="flex flex-col items-center justify-center py-10 px-4 text-center group">
            <div className="text-3xl lg:text-5xl font-display font-light text-slate-900 dark:text-white mb-2 tracking-tight group-hover:scale-105 transition-transform duration-500">{stats.range}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-medium">Max Range</div>
          </div>

          <div className="flex flex-col items-center justify-center py-10 px-4 text-center group">
            <div className="text-3xl lg:text-5xl font-display font-light text-slate-900 dark:text-white mb-2 tracking-tight group-hover:scale-105 transition-transform duration-500">{stats.acceleration}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-medium">0-100 km/h</div>
          </div>

          <div className="flex flex-col items-center justify-center py-10 px-4 text-center group">
            <div className="text-3xl lg:text-5xl font-display font-light text-slate-900 dark:text-white mb-2 tracking-tight group-hover:scale-105 transition-transform duration-500">{stats.charging}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-medium">DC Charge</div>
          </div>

          <div className="flex flex-col items-center justify-center py-10 px-4 text-center group">
            <div className="text-3xl lg:text-5xl font-display font-light text-slate-900 dark:text-white mb-2 tracking-tight group-hover:scale-105 transition-transform duration-500">{stats.powertrain}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-medium">Powertrain</div>
          </div>

        </div>
      </div>
    </div>
  );
};
