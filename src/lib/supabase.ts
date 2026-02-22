import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

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
