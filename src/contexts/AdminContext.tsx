import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { BlogPost, Booking, Contact } from '@/lib/supabase';
import { blogService, bookingService, contactService } from '@/lib/adminService';
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

  // Contacts
  contacts: Contact[];
  contactsLoading: boolean;
  contactsError: string | null;
  createContact: (contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>) => Promise<Contact | null>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<Contact | null>;
  deleteContact: (id: string) => Promise<boolean>;
  updateContactStatus: (id: string, status: 'new' | 'reviewed' | 'replied' | 'closed') => Promise<boolean>;
  fetchContacts: () => Promise<void>;
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
  contacts: [],
  contactsLoading: false,
  contactsError: null,
  createContact: async () => null,
  updateContact: async () => null,
  deleteContact: async () => false,
  updateContactStatus: async () => false,
  fetchContacts: async () => {},
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

  // Contacts state
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [contactsError, setContactsError] = useState<string | null>(null);
  const [contactsSubscription, setContactsSubscription] = useState<RealtimeChannel | null>(null);

  // Check if already authenticated from localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      // Load data when authenticated
      fetchBlogPosts();
      fetchBookings();
      fetchContacts();
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
      fetchContacts();
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
    setContacts([]);
    // Unsubscribe from real-time updates
    if (blogSubscription) blogService.unsubscribeFromChanges(blogSubscription);
    if (bookingsSubscription) bookingService.unsubscribeFromChanges(bookingsSubscription);
    if (contactsSubscription) contactService.unsubscribeFromChanges(contactsSubscription);
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

  // ===== CONTACTS METHODS =====
  const fetchContacts = useCallback(async () => {
    try {
      setContactsLoading(true);
      setContactsError(null);
      const data = await contactService.getAllContacts();
      setContacts(data);

      // Subscribe to real-time changes if not already subscribed
      if (!contactsSubscription) {
        const channel = contactService.subscribeToChanges((payload: any) => {
          const { eventType, new: newRecord, old: oldRecord } = payload;

          if (eventType === 'INSERT') {
            setContacts((prev) => [newRecord, ...prev]);
          } else if (eventType === 'UPDATE') {
            setContacts((prev) => prev.map((c) => (c.id === newRecord.id ? newRecord : c)));
          } else if (eventType === 'DELETE') {
            setContacts((prev) => prev.filter((c) => c.id !== oldRecord.id));
          }
        });
        setContactsSubscription(channel);
      }
    } catch (err) {
      setContactsError(err instanceof Error ? err.message : 'Failed to fetch contacts');
      console.error('Error fetching contacts:', err);
    } finally {
      setContactsLoading(false);
    }
  }, [contactsSubscription]);

  const createContact = useCallback(async (contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newContact = await contactService.createContact(contact);
      if (newContact) {
        setContacts((prev) => [newContact, ...prev]);
        return newContact;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create contact';
      setContactsError(message);
      throw err;
    }
    return null;
  }, []);

  const updateContact = useCallback(async (id: string, contact: Partial<Contact>) => {
    try {
      const updated = await contactService.updateContact(id, contact);
      if (updated) {
        setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)));
        return updated;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update contact';
      setContactsError(message);
      throw err;
    }
    return null;
  }, []);

  const deleteContact = useCallback(async (id: string) => {
    try {
      const success = await contactService.deleteContact(id);
      if (success) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
        return true;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete contact';
      setContactsError(message);
      throw err;
    }
    return false;
  }, []);

  const updateContactStatus = useCallback(async (id: string, status: 'new' | 'reviewed' | 'replied' | 'closed') => {
    try {
      const success = await contactService.updateStatus(id, status);
      if (success) {
        setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
        return true;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      setContactsError(message);
      throw err;
    }
    return false;
  }, []);

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
    contacts,
    contactsLoading,
    contactsError,
    createContact,
    updateContact,
    deleteContact,
    updateContactStatus,
    fetchContacts,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
