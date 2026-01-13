
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend: number;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon }) => {
  const isPositive = trend >= 0;
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 hover:border-blue-500/50 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className={`text-xs font-semibold px-2 py-1 rounded ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {isPositive ? '+' : ''}{trend}%
        </div>
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{label}</h3>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
};
