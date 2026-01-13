
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { StatCard } from './components/StatCard';
import { KOLLeaderboard } from './components/KOLLeaderboard';
import { MOCK_KOLS, MOCK_CHANNELS, ICONS } from './constants';
import { MediaChannel, DateRange } from './types';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MediaChannel | 'Overview'>('Overview');
  const [dateRange, setDateRange] = useState<DateRange>('30D');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  // Simulated date-based data multiplier
  const dateMultiplier = useMemo(() => {
    switch(dateRange) {
      case '7D': return 0.25;
      case '90D': return 2.5;
      case 'YTD': return 6.0;
      default: return 1;
    }
  }, [dateRange]);

  const totals = useMemo(() => {
    return MOCK_CHANNELS.reduce((acc, curr) => ({
      impressions: Math.floor((acc.impressions + curr.impressions) * dateMultiplier),
      engagement: Math.floor((acc.engagement + curr.engagement) * dateMultiplier),
      clicks: Math.floor((acc.clicks + curr.clicks) * dateMultiplier),
      leads: Math.floor((acc.leads + curr.leads) * dateMultiplier),
      footfall: Math.floor((acc.footfall + curr.footfall) * dateMultiplier),
    }), { impressions: 0, engagement: 0, clicks: 0, leads: 0, footfall: 0 });
  }, [dateMultiplier]);

  const currentChannelData = useMemo(() => {
    if (activeTab === 'Overview') return null;
    const base = MOCK_CHANNELS.find(c => c.channel === activeTab);
    if (!base) return null;
    return {
      ...base,
      impressions: Math.floor(base.impressions * dateMultiplier),
      leads: Math.floor(base.leads * dateMultiplier),
      footfall: Math.floor(base.footfall * dateMultiplier),
      clicks: Math.floor(base.clicks * dateMultiplier)
    };
  }, [activeTab, dateMultiplier]);

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Impressions" value={formatNumber(totals.impressions)} trend={12.5} icon={<ICONS.Impression className="w-6 h-6" />} />
        <StatCard label="Total Engagement" value={formatNumber(totals.engagement)} trend={8.2} icon={<ICONS.Engagement className="w-6 h-6" />} />
        <StatCard label="Total Leads" value={formatNumber(totals.leads)} trend={15.3} icon={<ICONS.Lead className="w-6 h-6" />} />
        <StatCard label="Dealership Footfall" value={formatNumber(totals.footfall)} trend={4.1} icon={<ICONS.Footfall className="w-6 h-6" />} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-8">Media Contribution by Channel ({dateRange})</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {/* Cast data to any[] to avoid strict index signature requirements in Recharts components */}
              <BarChart data={MOCK_CHANNELS.map(c => ({...c, leads: c.leads * dateMultiplier, footfall: c.footfall * dateMultiplier})) as any[]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="channel" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                <Tooltip contentStyle={{backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px'}} />
                <Bar dataKey="leads" name="Leads" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="footfall" name="Footfall" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-8">Lead Mix</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {/* Cast data to any[] to satisfy Recharts internal data structure requirements */}
                <Pie data={MOCK_CHANNELS as any[]} cx="50%" cy="50%" innerRadius={80} outerRadius={100} paddingAngle={5} dataKey="leads">
                  {MOCK_CHANNELS.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {MOCK_CHANNELS.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
                  <span className="text-gray-400">{item.channel}</span>
                </div>
                <span className="font-medium text-white">{((item.leads / totals.leads) * 100 * dateMultiplier).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderChannelDetail = () => {
    if (!currentChannelData) return null;
    return (
      <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label={`${activeTab} Clicks`} value={formatNumber(currentChannelData.clicks)} trend={5.2} icon={<ICONS.Impression className="w-5 h-5" />} />
              <StatCard label={`${activeTab} Leads`} value={formatNumber(currentChannelData.leads)} trend={18.4} icon={<ICONS.Lead className="w-5 h-5" />} />
              <StatCard label="Conv. Rate" value="3.2%" trend={1.2} icon={<ICONS.Engagement className="w-5 h-5" />} />
            </div>
            
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-6">{activeTab} Performance Trend ({dateRange})</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    {name: 'W1', val: 400}, {name: 'W2', val: 700}, {name: 'W3', val: 600}, {name: 'W4', val: 900}
                  ]}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip contentStyle={{backgroundColor: '#1a1a1a', border: '1px solid #333'}} />
                    <Area type="monotone" dataKey="val" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold text-md mb-4">Top Campaign</h3>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-blue-400 font-bold mb-1">OMODA C5 EV Launch</p>
                <p className="text-xs text-gray-400 mb-3">Targeting: Tech Enthusiasts, Bangkok</p>
                <div className="flex justify-between text-xs">
                  <span>Leads: 452</span>
                  <span className="text-green-400">ROI: 4.2x</span>
                </div>
              </div>
            </div>
            {activeTab === MediaChannel.KOL && <KOLLeaderboard kols={MOCK_KOLS} />}
            {activeTab === MediaChannel.OOH && (
              <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-md mb-4">QR Scan Locations</h3>
                <div className="space-y-3">
                  {['Siam Paragon', 'EmQuartier', 'Rama 9 Billboard'].map(loc => (
                    <div key={loc} className="flex justify-between text-sm py-2 border-b border-white/5">
                      <span className="text-gray-400">{loc}</span>
                      <span className="font-medium">{(Math.random() * 500).toFixed(0)} scans</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-6">
      {/* Header & Main Nav */}
      <header className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-1.5 bg-blue-500 rounded-full"></div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">
                {activeTab === 'Overview' ? 'Performance Hub' : `${activeTab} Analytics`}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-xs md:text-sm font-medium">OMODA & JAECOO</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="text-xs md:text-sm">Agency: i-dac Bangkok</span>
            </div>
          </div>

          {/* Date Picker Tab */}
          <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-lg border border-white/10 self-start md:self-center">
            {(['7D', '30D', '90D', 'YTD'] as DateRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${dateRange === range ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Channel Navigation */}
        <nav className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button 
            onClick={() => setActiveTab('Overview')}
            className={`px-4 py-2 text-sm font-medium rounded-full border whitespace-nowrap transition-all ${activeTab === 'Overview' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-white/10 text-gray-400 hover:border-white/20'}`}
          >
            Overview
          </button>
          {Object.values(MediaChannel).map((channel) => (
            <button
              key={channel}
              onClick={() => setActiveTab(channel)}
              className={`px-4 py-2 text-sm font-medium rounded-full border whitespace-nowrap transition-all ${activeTab === channel ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-white/10 text-gray-400 hover:border-white/20'}`}
            >
              {channel}
            </button>
          ))}
        </nav>
      </header>

      {/* Dynamic Content */}
      <main>
        {activeTab === 'Overview' ? renderOverview() : renderChannelDetail()}
      </main>

      {/* Insights Section (Dynamic based on tab) */}
      <section className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6 mt-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-blue-400">✨</span>
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">i-dac Bangkok Strategic Insight</h4>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          {activeTab === 'Overview' && `During the ${dateRange} period, TikTok has emerged as the most cost-effective lead generation source. We suggest reallocating 15% of Google Search budget to TikTok Spark Ads.`}
          {activeTab === MediaChannel.META && "High engagement on Video Reels indicates OMODA's design language is resonating well with the younger demographic."}
          {activeTab === MediaChannel.KOL && "Micro-KOLs specializing in 'Tech Gadgets' are delivering 2.4x more high-intent leads than generic lifestyle influencers."}
          {activeTab === MediaChannel.OOH && "High density of footfall conversion detected from Sukhumvit Line billboards. QR attribution is working effectively."}
          {activeTab !== 'Overview' && activeTab !== MediaChannel.META && activeTab !== MediaChannel.KOL && activeTab !== MediaChannel.OOH && `Optimizing ${activeTab} creative assets for the next ${dateRange} could improve click-through-rates by an estimated 12% based on current trends.`}
        </p>
      </section>

      {/* Footer Branding */}
      <footer className="pt-12 pb-8 flex flex-col items-center justify-center border-t border-white/5 text-gray-500 text-[10px] md:text-xs gap-4">
        <div className="flex items-center gap-6 grayscale opacity-30">
          <span className="font-bold text-lg tracking-[0.2em]">OMODA</span>
          <span className="h-4 w-px bg-gray-700"></span>
          <span className="font-bold text-lg tracking-[0.2em]">JAECOO</span>
        </div>
        <p>© 2024 i-dac Bangkok | Media Performance Tracker v2.5.0</p>
      </footer>
    </div>
  );
};

export default App;