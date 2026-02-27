import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { BlogPost, Booking } from '@/lib/supabase';
import { blogService, bookingService } from '@/lib/adminService';
import { RealtimeChannel } from '@supabase/supabase-js';

interface AdminContextType {
  // Authentication
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;

  // Blog Posts
  blogPosts: BlogPost[];
  blogLoading: boolean;
  blogError: string | null;
  createBlogPost: (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => Promise<BlogPost | null>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<BlogPost | null>;
  deleteBlogPost: (id: string) => Promise<boolean>;
  fetchBlogPosts: () => Promise<void>;

  // Bookings
  bookings: Booking[];
  bookingsLoading: boolean;
  bookingsError: string | null;
  createBooking: (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => Promise<Booking | null>;
  updateBooking: (id: string, booking: Partial<Booking>) => Promise<Booking | null>;
  deleteBooking: (id: string) => Promise<boolean>;
  updateBookingStatus: (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => Promise<boolean>;
  fetchBookings: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
  blogPosts: [],
  blogLoading: false,
  blogError: null,
  createBlogPost: async () => null,
  updateBlogPost: async () => null,
  deleteBlogPost: async () => false,
  fetchBlogPosts: async () => {},
  bookings: [],
  bookingsLoading: false,
  bookingsError: null,
  createBooking: async () => null,
  updateBooking: async () => null,
  deleteBooking: async () => false,
  updateBookingStatus: async () => false,
  fetchBookings: async () => {},
});

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Blog Posts state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogError, setBlogError] = useState<string | null>(null);
  const [blogSubscription, setBlogSubscription] = useState<RealtimeChannel | null>(null);

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState<string | null>(null);
  const [bookingsSubscription, setBookingsSubscription] = useState<RealtimeChannel | null>(null);

  // Check if already authenticated from localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      // Load data when authenticated
      fetchBlogPosts();
      fetchBookings();
    }
  }, []);

  // Authentication methods
  const login = (password: string): boolean => {
    const correctPassword = (import.meta.env as any).VITE_ADMIN_PASSWORD;

    if (!correctPassword) {
      console.error('Admin password not configured');
      return false;
    }

    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      // Load data after login
      fetchBlogPosts();
      fetchBookings();
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    // Clear all data
    setBlogPosts([]);
    setBookings([]);
    // Unsubscribe from real-time updates
    if (blogSubscription) blogService.unsubscribeFromChanges(blogSubscription);
    if (bookingsSubscription) bookingService.unsubscribeFromChanges(bookingsSubscription);
  };

  // ===== BLOG POSTS METHODS =====
  const fetchBlogPosts = useCallback(async () => {
    try {
      setBlogLoading(true);
      setBlogError(null);
      const data = await blogService.getAllPosts();
      setBlogPosts(data);

      // Subscribe to real-time changes if not already subscribed
      if (!blogSubscription) {
        const channel = blogService.subscribeToChanges((payload: any) => {
          const { eventType, new: newRecord, old: oldRecord } = payload;

          if (eventType === 'INSERT') {
            setBlogPosts((prev) => [newRecord, ...prev]);
          } else if (eventType === 'UPDATE') {
            setBlogPosts((prev) => prev.map((p) => (p.id === newRecord.id ? newRecord : p)));
          } else if (eventType === 'DELETE') {
            setBlogPosts((prev) => prev.filter((p) => p.id !== oldRecord.id));
          }
        });
        setBlogSubscription(channel);
      }
    } catch (err) {
      setBlogError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
      console.error('Error fetching blog posts:', err);
    } finally {
      setBlogLoading(false);
    }
  }, [blogSubscription]);

  const createBlogPost = useCallback(async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newPost = await blogService.createPost(post);
      if (newPost) {
        setBlogPosts((prev) => [newPost, ...prev]);
        return newPost;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create post';
      setBlogError(message);
      throw err;
    }
    return null;
  }, []);

  const updateBlogPost = useCallback(async (id: string, post: Partial<BlogPost>) => {
    try {
      const updated = await blogService.updatePost(id, post);
      if (updated) {
        setBlogPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        return updated;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update post';
      setBlogError(message);
      throw err;
    }
    return null;
  }, []);

  const deleteBlogPost = useCallback(async (id: string) => {
    try {
      const success = await blogService.deletePost(id);
      if (success) {
        setBlogPosts((prev) => prev.filter((p) => p.id !== id));
        return true;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete post';
      setBlogError(message);
      throw err;
    }
    return false;
  }, []);

  // ===== BOOKINGS METHODS =====
  const fetchBookings = useCallback(async () => {
    try {
      setBookingsLoading(true);
      setBookingsError(null);
      const data = await bookingService.getAllBookings();
      setBookings(data);

      // Subscribe to real-time changes if not already subscribed
      if (!bookingsSubscription) {
        const channel = bookingService.subscribeToChanges((payload: any) => {
          const { eventType, new: newRecord, old: oldRecord } = payload;

          if (eventType === 'INSERT') {
            setBookings((prev) => [newRecord, ...prev]);
          } else if (eventType === 'UPDATE') {
            setBookings((prev) => prev.map((b) => (b.id === newRecord.id ? newRecord : b)));
          } else if (eventType === 'DELETE') {
            setBookings((prev) => prev.filter((b) => b.id !== oldRecord.id));
          }
        });
        setBookingsSubscription(channel);
      }
    } catch (err) {
      setBookingsError(err instanceof Error ? err.message : 'Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setBookingsLoading(false);
    }
  }, [bookingsSubscription]);

  const createBooking = useCallback(async (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newBooking = await bookingService.createBooking(booking);
      if (newBooking) {
        setBookings((prev) => [newBooking, ...prev]);
        return newBooking;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create booking';
      setBookingsError(message);
      throw err;
    }
    return null;
  }, []);

  const updateBooking = useCallback(async (id: string, booking: Partial<Booking>) => {
    try {
      const updated = await bookingService.updateBooking(id, booking);
      if (updated) {
        setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
        return updated;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update booking';
      setBookingsError(message);
      throw err;
    }
    return null;
  }, []);

  const deleteBooking = useCallback(async (id: string) => {
    try {
      const success = await bookingService.deleteBooking(id);
      if (success) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        return true;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete booking';
      setBookingsError(message);
      throw err;
    }
    return false;
  }, []);

  const updateBookingStatus = useCallback(
    async (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
      try {
        const success = await bookingService.updateStatus(id, status);
        if (success) {
          setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
          return true;
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update status';
        setBookingsError(message);
        throw err;
      }
      return false;
    },
    []
  );

  const value: AdminContextType = {
    isAuthenticated,
    login,
    logout,
    blogPosts,
    blogLoading,
    blogError,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    fetchBlogPosts,
    bookings,
    bookingsLoading,
    bookingsError,
    createBooking,
    updateBooking,
    deleteBooking,
    updateBookingStatus,
    fetchBookings,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
