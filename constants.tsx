
import React from 'react';
import { MediaChannel, KOLPerformance, ChannelPerformance } from './types';

export const MOCK_KOLS: KOLPerformance[] = [
  { name: 'AutoXpert TH', platform: 'YouTube', engagement: 8.5, reach: 450000, leads: 120, avatar: 'https://picsum.photos/seed/kol1/100/100' },
  { name: 'DriveWithMe', platform: 'TikTok', engagement: 12.2, reach: 890000, leads: 340, avatar: 'https://picsum.photos/seed/kol2/100/100' },
  { name: 'EV Enthusiast', platform: 'Meta', engagement: 5.8, reach: 210000, leads: 85, avatar: 'https://picsum.photos/seed/kol3/100/100' },
  { name: 'TechCar Review', platform: 'YouTube', engagement: 9.1, reach: 320000, leads: 156, avatar: 'https://picsum.photos/seed/kol4/100/100' },
  { name: 'Modern Lifestyle', platform: 'Instagram', engagement: 7.4, reach: 180000, leads: 42, avatar: 'https://picsum.photos/seed/kol5/100/100' },
];

export const MOCK_CHANNELS: ChannelPerformance[] = [
  // Added conversionRate to match the interface definition in types.ts
  { channel: MediaChannel.META, impressions: 2400000, engagement: 125000, clicks: 45000, leads: 850, footfall: 120, conversionRate: 1.89 },
  { channel: MediaChannel.GOOGLE, impressions: 1800000, engagement: 0, clicks: 95000, leads: 1200, footfall: 180, conversionRate: 1.26 },
  { channel: MediaChannel.YOUTUBE, impressions: 3500000, engagement: 210000, clicks: 32000, leads: 450, footfall: 60, conversionRate: 1.41 },
  { channel: MediaChannel.TIKTOK, impressions: 5200000, engagement: 840000, clicks: 120000, leads: 1500, footfall: 210, conversionRate: 1.25 },
  { channel: MediaChannel.KOL, impressions: 2100000, engagement: 310000, clicks: 18000, leads: 950, footfall: 340, conversionRate: 5.27 },
  { channel: MediaChannel.OOH, impressions: 850000, engagement: 12000, clicks: 5000, leads: 210, footfall: 450, conversionRate: 4.2 },
];

export const ICONS = {
  Impression: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Engagement: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ),
  Lead: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  ),
  Footfall: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};