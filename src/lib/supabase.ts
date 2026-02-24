import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env as any).VITE_SUPABASE_URL || '';
const supabaseKey = (import.meta.env as any).VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not configured. Blog features will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// TypeScript types for blog posts
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published_at: string;
  reading_time: string;
  author?: string;
  created_at?: string;
  updated_at?: string;
}

// TypeScript types for bookings
export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time_slot: string;
  message?: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

// TypeScript types for contacts
export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  status: 'new' | 'reviewed' | 'replied' | 'closed';
  created_at?: string;
  updated_at?: string;
}
