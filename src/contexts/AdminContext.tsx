import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Booking } from '@/lib/supabase';
import { bookingService } from '@/lib/adminService';
import { RealtimeChannel } from '@supabase/supabase-js';

interface AdminContextType {
  // Authentication
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;

  // Bookings
  bookings: Booking[];
  bookingsLoading: boolean;
  bookingsError: string | null;
  createBooking: (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => Promise<Booking | null>;
  updateBooking: (id: string, booking: Partial<Booking>) => Promise<Booking | null>;
  deleteBooking: (id: string) => Promise<boolean>;
  fetchBookings: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
  bookings: [],
  bookingsLoading: false,
  bookingsError: null,
  createBooking: async () => null,
  updateBooking: async () => null,
  deleteBooking: async () => false,
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
      fetchBookings();
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    // Clear all data
    setBookings([]);
    // Unsubscribe from real-time updates
    if (bookingsSubscription) bookingService.unsubscribeFromChanges(bookingsSubscription);
  };

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

  const value: AdminContextType = {
    isAuthenticated,
    login,
    logout,
    bookings,
    bookingsLoading,
    bookingsError,
    createBooking,
    updateBooking,
    deleteBooking,
    fetchBookings,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
