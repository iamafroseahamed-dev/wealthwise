import { useState, useEffect, useCallback } from 'react';
import { Booking } from '@/lib/supabase';
import { bookingService } from '@/lib/adminService';
import { RealtimeChannel } from '@supabase/supabase-js';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<RealtimeChannel | null>(null);

  // Fetch all bookings
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookingService.getAllBookings();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create booking
  const createBooking = useCallback(async (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newBooking = await bookingService.createBooking(booking);
      if (newBooking) {
        setBookings((prev) => [newBooking, ...prev]);
        return newBooking;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create booking';
      setError(message);
      throw err;
    }
  }, []);

  // Update booking
  const updateBooking = useCallback(async (id: string, booking: Partial<Booking>) => {
    try {
      const updated = await bookingService.updateBooking(id, booking);
      if (updated) {
        setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
        return updated;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update booking';
      setError(message);
      throw err;
    }
  }, []);

  // Delete booking
  const deleteBooking = useCallback(async (id: string) => {
    try {
      const success = await bookingService.deleteBooking(id);
      if (success) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        return true;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete booking';
      setError(message);
      throw err;
    }
  }, []);

  // Update booking status
  const updateStatus = useCallback(async (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    try {
      const success = await bookingService.updateStatus(id, status);
      if (success) {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
        return true;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      setError(message);
      throw err;
    }
  }, []);

  // Subscribe to real-time changes
  useEffect(() => {
    fetchBookings();

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

    setSubscription(channel);

    return () => {
      if (channel) {
        bookingService.unsubscribeFromChanges(channel);
      }
    };
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    updateStatus,
  };
};
