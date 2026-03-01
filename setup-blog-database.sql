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
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes for better query performance
  CONSTRAINT title_not_empty CHECK (LENGTH(title) > 0),
  CONSTRAINT excerpt_not_empty CHECK (LENGTH(excerpt) > 0),
  CONSTRAINT content_not_empty CHECK (LENGTH(content) > 0)
);

-- Create index for published posts (most common query)
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at 
ON public.blog_posts(published_at DESC) 
WHERE published_at IS NOT NULL;

-- Create index for slug lookup
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug 
ON public.blog_posts(slug);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for blog images bucket
CREATE POLICY "Public Access - Read" ON storage.objects
FOR SELECT
USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated - All" ON storage.objects
FOR ALL
USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Enable RLS on blog_posts table
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy for public to read published posts
CREATE POLICY "Public - Read Published" ON public.blog_posts
FOR SELECT
USING (published_at IS NOT NULL);

-- You can add admin policies if needed:
-- CREATE POLICY "Admin - All" ON public.blog_posts
-- FOR ALL
-- USING (auth.jwt() ->> 'sub' = 'your-admin-user-id');

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
