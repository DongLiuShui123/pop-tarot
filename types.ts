export enum ArcanaType {
  MAJOR = 'Major',
  MINOR = 'Minor'
}

export enum Suit {
  WANDS = 'Wands',
  CUPS = 'Cups',
  SWORDS = 'Swords',
  PENTACLES = 'Pentacles',
  NONE = 'None' // For Major Arcana
}

export interface TarotCard {
  id: number;
  name: string;
  name_short: string; // 确保这个属性存在
  suit: Suit;
  type: ArcanaType;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
}

export interface SpreadPosition {
  id: number;
  name: string;
  description: string;
  x: number; // grid position x (1-12)
  y: number; // grid position y (1-12)
}

export interface Spread {
  id: string;
  name: string;
  description: string;
  cards: number;
  layout: SpreadPosition[];
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  positionId: number; // Links to SpreadPosition.id
}

export interface ReadingSession {
  id: string;
  userId?: string; // 添加用户ID字段（可选以保持向后兼容）
  date: string;
  question: string;
  spreadId: string;
  cards: DrawnCard[];
  interpretation: string;
}

export interface UserProfile {
  id: string; // 添加用户ID
  name: string;
  email: string;
  isLoggedIn: boolean;
  cardBackId: string;
}

export const CARD_BACKS = [
  { id: 'classic', name: '光衰仪章', url: '/images/guangsuiyizhang.jpg' },
  { id: 'gold', name: '深邃蓝调', url: '/images/shensuilandiao.jpg' },
  { id: 'nebula', name: '宇宙星云', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=300&h=500&auto=format&fit=crop' },
  { id: 'dark', name: '暗夜行者', url: '/images/liujintaiyang.jpg' },
];