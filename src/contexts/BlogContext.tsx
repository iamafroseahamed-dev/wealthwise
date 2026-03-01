import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { BlogPost } from '@/lib/supabase';
import { blogService } from '@/lib/blogService';
import { RealtimeChannel } from '@supabase/supabase-js';

interface BlogContextType {
  posts: BlogPost[];
  postsLoading: boolean;
  postsError: string | null;
  createPost: (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => Promise<BlogPost | null>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<BlogPost | null>;
  deletePost: (id: string) => Promise<boolean>;
  fetchPosts: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType>({
  posts: [],
  postsLoading: false,
  postsError: null,
  createPost: async () => null,
  updatePost: async () => null,
  deletePost: async () => false,
  fetchPosts: async () => {},
});

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider');
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider = ({ children }: BlogProviderProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<RealtimeChannel | null>(null);

  const fetchPosts = useCallback(async () => {
    setPostsLoading(true);
    setPostsError(null);
    try {
      const data = await blogService.getAllPosts();
      setPosts(data);
    } catch (error) {
      setPostsError(error instanceof Error ? error.message : 'Failed to fetch posts');
      console.error('Fetch posts error:', error);
    } finally {
      setPostsLoading(false);
    }
  }, []);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Subscribe to real-time updates
  useEffect(() => {
    const sub = blogService.onBlogUpdates((payload) => {
      if (payload.eventType === 'INSERT') {
        setPosts((prev) => [payload.new, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setPosts((prev) =>
          prev.map((post) => (post.id === payload.new.id ? payload.new : post))
        );
      } else if (payload.eventType === 'DELETE') {
        setPosts((prev) => prev.filter((post) => post.id !== payload.old.id));
      }
    });

    setSubscription(sub);

    return () => {
      sub?.unsubscribe();
    };
  }, []);

  const createPost = async (
    post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
  ): Promise<BlogPost | null> => {
    try {
      const newPost = await blogService.createPost(post);
      // No need to update state manually - subscription will handle it
      return newPost;
    } catch (error) {
      console.error('Create post error:', error);
      setPostsError(error instanceof Error ? error.message : 'Failed to create post');
      return null;
    }
  };

  const updatePost = async (
    id: string,
    updates: Partial<BlogPost>
  ): Promise<BlogPost | null> => {
    try {
      const updated = await blogService.updatePost(id, updates);
      // No need to update state manually - subscription will handle it
      return updated;
    } catch (error) {
      console.error('Update post error:', error);
      setPostsError(error instanceof Error ? error.message : 'Failed to update post');
      return null;
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      await blogService.deletePost(id);
      // No need to update state manually - subscription will handle it
      return true;
    } catch (error) {
      console.error('Delete post error:', error);
      setPostsError(error instanceof Error ? error.message : 'Failed to delete post');
      return false;
    }
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        postsLoading,
        postsError,
        createPost,
        updatePost,
        deletePost,
        fetchPosts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
