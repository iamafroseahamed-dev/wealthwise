-- Create blog_posts table for the blog feature
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT DEFAULT '',
  author TEXT DEFAULT 'Karthik G',
  reading_time TEXT DEFAULT '1 min read',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT title_not_empty CHECK (LENGTH(title) > 0),
  CONSTRAINT excerpt_not_empty CHECK (LENGTH(excerpt) > 0),
  CONSTRAINT content_not_empty CHECK (LENGTH(content) > 0)
);

-- Create index for published posts (most common query)
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at 
ON public.blog_posts(published_at DESC NULLS LAST);

-- Create index for slug lookup
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug 
ON public.blog_posts(slug);

-- Enable RLS on blog_posts table
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON public.blog_posts;

-- Policy: Public can read published posts
CREATE POLICY "Public can read published posts" 
ON public.blog_posts
FOR SELECT
USING (published_at IS NOT NULL);

-- If you want to allow authenticated users (admin) to do all operations on blog posts:
-- Uncomment below and replace 'admin-user-id' with actual user ID
-- CREATE POLICY "Admin full access" 
-- ON public.blog_posts
-- FOR ALL
-- USING (auth.uid()::text = 'admin-user-id');

-- For development: Allow all operations for authenticated users (REMOVE IN PRODUCTION)
CREATE POLICY "Authenticated users can manage posts" 
ON public.blog_posts
FOR ALL
USING (auth.role() = 'authenticated');

-- Create or check storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- NOTE: Storage policies need to be set up via Supabase Dashboard
-- See setup instructions below

-- ============================================================
-- SUPABASE STORAGE SETUP INSTRUCTIONS (via Dashboard):
-- ============================================================
-- 
-- 1. Go to Supabase Dashboard → Storage → blog-images bucket
-- 2. Click "Policies" tab
-- 3. Click "New Policy" and add:
--
--    Policy 1: Public Read
--    - Target roles: Public
--    - Allowed operations: SELECT
--    - Using expression: true
--
--    Policy 2: Authenticated Upload
--    - Target roles: Authenticated
--    - Allowed operations: INSERT
--    - With check expression: true
--
--    Policy 3: Authenticated Delete
--    - Target roles: Authenticated
--    - Allowed operations: DELETE
--    - Using expression: true
--
-- Alternatively, make the bucket public:
-- Bucket Settings → Permissions → Set to "Public"
--
-- ============================================================

-- Sample insert statement to verify the table works
-- INSERT INTO public.blog_posts 
-- (slug, title, excerpt, content, cover_image, author, reading_time, published_at)
-- VALUES (
--   'first-blog-post',
--   'My First Blog Post',
--   'This is my first blog post about mutual funds',
--   '<h2>Introduction</h2><p>This is a sample blog post...</p>',
--   'https://example.com/image.jpg',
--   'Karthik G',
--   '3 min read',
--   NOW()
-- );
