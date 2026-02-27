import { useState, useEffect, useCallback } from 'react';
import { BlogPost } from '@/lib/supabase';
import { blogService } from '@/lib/adminService';
import { RealtimeChannel } from '@supabase/supabase-js';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<RealtimeChannel | null>(null);

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getAllPosts();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create post
  const createPost = useCallback(async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newPost = await blogService.createPost(post);
      if (newPost) {
        setPosts((prev) => [newPost, ...prev]);
        return newPost;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create post';
      setError(message);
      throw err;
    }
  }, []);

  // Update post
  const updatePost = useCallback(async (id: string, post: Partial<BlogPost>) => {
    try {
      const updated = await blogService.updatePost(id, post);
      if (updated) {
        setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        return updated;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update post';
      setError(message);
      throw err;
    }
  }, []);

  // Delete post
  const deletePost = useCallback(async (id: string) => {
    try {
      const success = await blogService.deletePost(id);
      if (success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        return true;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete post';
      setError(message);
      throw err;
    }
  }, []);

  // Subscribe to real-time changes
  useEffect(() => {
    fetchPosts();

    const channel = blogService.subscribeToChanges((payload: any) => {
      const { eventType, new: newRecord, old: oldRecord } = payload;

      if (eventType === 'INSERT') {
        setPosts((prev) => [newRecord, ...prev]);
      } else if (eventType === 'UPDATE') {
        setPosts((prev) => prev.map((p) => (p.id === newRecord.id ? newRecord : p)));
      } else if (eventType === 'DELETE') {
        setPosts((prev) => prev.filter((p) => p.id !== oldRecord.id));
      }
    });

    setSubscription(channel);

    return () => {
      if (channel) {
        blogService.unsubscribeFromChanges(channel);
      }
    };
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
};
