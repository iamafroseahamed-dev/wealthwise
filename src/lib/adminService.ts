import { supabase, BlogPost, Booking } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

// ===== BLOG POSTS =====
export const blogService = {
  // Fetch all blog posts
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  // Fetch single blog post
  async getPost(id: string): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  },

  // Create blog post
  async createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{ ...post, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  },

  // Update blog post
  async updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ ...post, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  },

  // Delete blog post
  async deletePost(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  },

  // Subscribe to blog posts changes in real-time
  subscribeToChanges(callback: (payload: any) => void): RealtimeChannel | null {
    try {
      return supabase
        .channel('blog_posts_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'blog_posts',
          },
          (payload) => {
            console.log('Blog posts change:', payload);
            callback(payload);
          }
        )
        .subscribe();
    } catch (error) {
      console.error('Error subscribing to blog posts:', error);
      return null;
    }
  },

  // Unsubscribe from blog posts changes
  unsubscribeFromChanges(channel: RealtimeChannel | null): void {
    if (channel) {
      supabase.removeChannel(channel);
    }
  },
};

// ===== BOOKINGS =====
export const bookingService = {
  // Fetch all bookings
  async getAllBookings(): Promise<Booking[]> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Fetch single booking
  async getBooking(id: string): Promise<Booking | null> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  // Create booking
  async createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<Booking | null> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{ ...booking, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Update booking
  async updateBooking(id: string, booking: Partial<Booking>): Promise<Booking | null> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ ...booking, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  // Delete booking
  async deleteBooking(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  },

  // Subscribe to bookings changes in real-time
  subscribeToChanges(callback: (payload: any) => void): RealtimeChannel | null {
    try {
      return supabase
        .channel('bookings_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bookings',
          },
          (payload) => {
            console.log('Bookings change:', payload);
            callback(payload);
          }
        )
        .subscribe();
    } catch (error) {
      console.error('Error subscribing to bookings:', error);
      return null;
    }
  },

  // Unsubscribe from bookings changes
  unsubscribeFromChanges(channel: RealtimeChannel | null): void {
    if (channel) {
      supabase.removeChannel(channel);
    }
  },
};
