export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  guest_count: number;
  venue?: string;
  menu_preference?: string;
  special_requests?: string;
  budget_range?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  event_type?: string;
  rating: number;
  content: string;
  is_approved: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  cover_image?: string;
  published: boolean;
  created_at: string;
}

export interface MenuItem {
  id: string;
  name: string;
  tamilName?: string;
  image: string;
  category: string;
  description?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'wedding' | 'corporate' | 'birthday' | 'food' | 'decorations';
}

export type EventType = 'Wedding' | 'Corporate' | 'Birthday' | 'House Warming' |
  'Seemantham' | 'Engagement' | 'Retirement' | 'Annaprasana' | 'Mehndi' | 'Other';

export type MenuPreference = 'Vegetarian' | 'Non-Vegetarian' | 'Both';

export type BudgetRange = 'Below 50k' | '50k-1L' | '1L-2L' | 'Above 2L';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
