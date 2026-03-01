import { supabase } from './supabase';
import { BlogPost } from './supabase';

export const blogService = {
  // Fetch all published blog posts
  async getPublishedPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
    return data || [];
  },

  // Fetch a single post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching post:', error);
      throw error;
    }
    return data || null;
  },

  // Fetch all posts (including drafts) for admin
  async getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
    return data || [];
  },

  // Create a new blog post
  async createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      throw error;
    }
    return data;
  },

  // Update a blog post
  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating post:', error);
      throw error;
    }
    return data;
  },

  // Delete a blog post
  async deletePost(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  // Upload image to storage
  async uploadImage(file: File, folder: string = 'blog'): Promise<string> {
    const filename = `${Date.now()}_${file.name}`;
    const filepath = `${folder}/${filename}`;

    const { error } = await supabase.storage
      .from('blog-images')
      .upload(filepath, file);

    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }

    // Get public URL
    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filepath);

    return data.publicUrl;
  },

  // Generate slug from title
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  },

  // Calculate reading time
  calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  },

  // Subscribe to real-time blog updates
  onBlogUpdates(callback: (payload: any) => void) {
    const subscription = supabase
      .channel('blog_posts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_posts',
        },
        callback
      )
      .subscribe();

    return subscription;
  },
};
