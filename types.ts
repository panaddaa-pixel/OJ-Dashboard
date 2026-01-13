
export enum MediaChannel {
  META = 'Meta',
  GOOGLE = 'Google',
  YOUTUBE = 'YouTube',
  TIKTOK = 'TikTok',
  KOL = 'KOL',
  OOH = 'Offline/OOH'
}

export type DateRange = '7D' | '30D' | '90D' | 'YTD';

export interface MetricCardData {
  label: string;
  value: string | number;
  trend: number;
  icon: string;
}

export interface KOLPerformance {
  name: string;
  platform: string;
  engagement: number;
  reach: number;
  leads: number;
  avatar: string;
}

export interface ChannelPerformance {
  channel: MediaChannel;
  impressions: number;
  engagement: number;
  clicks: number;
  leads: number;
  footfall: number;
  conversionRate: number;
  topCampaign?: string;
}
