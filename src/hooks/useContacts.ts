import { useState, useEffect, useCallback } from 'react';
import { Contact } from '@/lib/supabase';
import { contactService } from '@/lib/adminService';
import { RealtimeChannel } from '@supabase/supabase-js';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<RealtimeChannel | null>(null);

  // Fetch all contacts
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactService.getAllContacts();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create contact
  const createContact = useCallback(async (contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newContact = await contactService.createContact(contact);
      if (newContact) {
        setContacts((prev) => [newContact, ...prev]);
        return newContact;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create contact';
      setError(message);
      throw err;
    }
  }, []);

  // Update contact
  const updateContact = useCallback(async (id: string, contact: Partial<Contact>) => {
    try {
      const updated = await contactService.updateContact(id, contact);
      if (updated) {
        setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)));
        return updated;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update contact';
      setError(message);
      throw err;
    }
  }, []);

  // Delete contact
  const deleteContact = useCallback(async (id: string) => {
    try {
      const success = await contactService.deleteContact(id);
      if (success) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
        return true;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete contact';
      setError(message);
      throw err;
    }
  }, []);

  // Update contact status
  const updateStatus = useCallback(async (id: string, status: 'new' | 'reviewed' | 'replied' | 'closed') => {
    try {
      const success = await contactService.updateStatus(id, status);
      if (success) {
        setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
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
    fetchContacts();

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

    setSubscription(channel);

    return () => {
      if (channel) {
        contactService.unsubscribeFromChanges(channel);
      }
    };
  }, [fetchContacts]);

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
    updateStatus,
  };
};
