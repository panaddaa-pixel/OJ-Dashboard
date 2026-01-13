
import React from 'react';
import { KOLPerformance } from '../types';

interface KOLLeaderboardProps {
  kols: KOLPerformance[];
}

export const KOLLeaderboard: React.FC<KOLLeaderboardProps> = ({ kols }) => {
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-semibold text-lg">Real-time KOL Performance</h3>
        <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full animate-pulse">LIVE UPDATES</span>
      </div>
      <div className="divide-y divide-white/5">
        {kols.map((kol, idx) => (
          <div key={idx} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={kol.avatar} alt={kol.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-[10px] px-1 rounded font-bold">
                  #{idx + 1}
                </div>
              </div>
              <div>
                <p className="font-medium text-sm">{kol.name}</p>
                <p className="text-xs text-gray-400">{kol.platform}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-blue-400">{kol.engagement}% ER</div>
              <div className="text-xs text-gray-500">{(kol.reach / 1000).toFixed(0)}k Reach</div>
            </div>
            <div className="hidden md:block text-right min-w-[80px]">
              <div className="text-sm font-bold">{kol.leads}</div>
              <div className="text-[10px] text-gray-500 uppercase">Leads</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
