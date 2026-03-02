# Blog Setup and Seeding

This folder contains scripts and utilities for setting up and seeding blog content.

## Available Scripts

### 1. `seed-blog-posts.ts` (Recommended)

TypeScript script that seeds blog posts directly to Supabase from the Node.js environment.

**Usage:**
```bash
# Using tsx (recommended for .ts files)
npx tsx scripts/seed-blog-posts.ts

# Or with ts-node
npx ts-node scripts/seed-blog-posts.ts
```

**Features:**
- ✅ Creates blog posts in Supabase
- ✅ Avoids duplicates (checks if post already exists)
- ✅ Provides clear console feedback
- ✅ Requires Supabase credentials in `.env`

**Requirements:**
- Supabase credentials in `.env.local`:
  ```
  VITE_SUPABASE_URL=your_url
  VITE_SUPABASE_ANON_KEY=your_key
  ```

## Blog Post Contents

### First Post: "Why Mutual Funds Work — Rain or Shine"

**Details:**
- Title: Why Mutual Funds Work — Rain or Shine
- Author: WealthWise Team
- Reading Time: 6 min read
- Category: Personal Finance / Blog 01
- Status: Published
- Content: Complete with sections on:
  - Market uncertainty and opportunity
  - Systematic Investment Plans (SIP)
  - Rupee cost averaging
  - 6 key reasons to invest
  - Risk disclaimers and legal disclosures

**Accessing in Admin:**

Once seeded, the blog post automatically appears in the Admin Blog section:

1. Go to `/admin/blog` (Admin Login required)
2. The post lists in the Blog Management table
3. You can:
   - ✏️ Edit the post
   - 🗑️ Delete the post
   - 📊 View post details

## Adding More Blog Posts

### Method 1: Using the Admin UI

1. Navigate to `/admin/blog`
2. Click "New Post" button
3. Fill in:
   - Title
   - Excerpt
   - Author (optional)
   - Content (using Rich Text Editor)
   - Cover Image (upload)
   - Publish status (Draft or Published)
4. Click "Save Post"

### Method 2: Programmatically

Add post data to `src/data/blog-posts.ts` and then:

```typescript
import { blogService } from '@/lib/blogService';
import { blogPostsData } from '@/data/blog-posts';

// Seed all posts
for (const post of blogPostsData) {
  await blogService.createPost(post);
}
```

## Blog Post Structure

Each blog post requires:

```typescript
{
  slug: string;           // URL-friendly version of title
  title: string;          // Main heading
  excerpt: string;        // Brief summary (1-2 sentences)
  author?: string;        // Author name (optional)
  reading_time: string;   // e.g., "6 min read"
  cover_image: string;    // URL to image
  published_at: string;   // ISO date string
  content: string;        // HTML content
}
```

## Blog Post Publishing

- **Draft**: `published_at = null` - Only visible to admin
- **Published**: `published_at = ISO timestamp` - Visible to all users on `/blog`

## Image Recommendations

- **Dimensions**: 1200x600px (2:1 aspect ratio)
- **Format**: JPG or PNG
- **Size**: Under 500KB for optimal loading
- **Source**: Unsplash, Pexels, or your own images

### Cover Image URLs Used

The first post uses:
```
https://images.unsplash.com/photo-1579532537598-3c90a1fda663?w=1200&h=600&fit=crop
```

(Financial/investment themed image from Unsplash)

## Troubleshooting

**"Post already exists" - Nothing happens**
- The script detected an existing post with the same slug
- To re-seed, delete the post from Admin UI first, then run the script again

**"Supabase credentials not configured"**
- Check `.env.local` has:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Restart the dev server after updating `.env.local`

**Posts not appearing in admin**
- Ensure you're logged in as admin
- Check database tables exist:
  - Run `setup-database.js` SQL in Supabase console if needed
- Check browser console for errors

## Next Steps

1. ✅ Run the seed script: `npx tsx scripts/seed-blog-posts.ts`
2. ✅ Login to admin dashboard: `/admin/blog`
3. ✅ Verify the post appears in the blog management table
4. ✅ Visit `/blog` to view the published post
5. ➕ Add more posts as needed using the Admin UI

---

**Note**: The seed script is safe to run multiple times - it checks for duplicates automatically.
