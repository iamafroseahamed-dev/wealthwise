# Admin Module Integration Guide

## Overview
The admin module is now fully integrated with Supabase with real-time synchronization. Any changes made in the admin panel are immediately reflected in Supabase and vice versa.

## Components

### 1. Admin Service (`src/lib/adminService.ts`)
Handles all CRUD operations for blog posts, bookings, and contacts with real-time subscriptions.

**Features:**
- Create, read, update, delete operations for all data types
- Real-time Postgres Change Subscriptions
- Automatic notifications when data changes in Supabase

**Usage:**
```typescript
import { blogService, bookingService, contactService } from '@/lib/adminService';

// Create a blog post
const newPost = await blogService.createPost({
  title: 'My Blog Post',
  slug: 'my-blog-post',
  // ... other fields
});

// Subscribe to changes
const channel = blogService.subscribeToChanges((payload) => {
  // Handle real-time updates
});
```

### 2. Admin Context (`src/contexts/AdminContext.tsx`)
Centralized state management for:
- Authentication
- Blog posts with real-time sync
- Bookings with real-time sync
- Contacts with real-time sync

**Usage:**
```typescript
import { useAdmin } from '@/contexts/AdminContext';

const { 
  blogPosts, 
  bookings, 
  contacts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  // ... and more
} = useAdmin();
```

### 3. Custom Hooks

#### `useBlogPosts()` - `src/hooks/useBlogPosts.ts`
Manage blog posts with automatic real-time sync.

```typescript
const {
  posts,
  loading,
  error,
  fetchPosts,
  createPost,
  updatePost,
  deletePost
} = useBlogPosts();
```

#### `useBookings()` - `src/hooks/useBookings.ts`
Manage bookings with status updates and real-time sync.

```typescript
const {
  bookings,
  loading,
  error,
  fetchBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  updateStatus
} = useBookings();
```

#### `useContacts()` - `src/hooks/useContacts.ts`
Manage contact submissions with real-time sync.

```typescript
const {
  contacts,
  loading,
  error,
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
  updateStatus
} = useContacts();
```

## How Real-Time Sync Works

1. **Changes in Admin**: When you create, update, or delete data in the admin panel:
   - The action is sent to Supabase
   - Local state updates immediately for instant feedback
   - Real-time subscriptions notify other connected clients

2. **Changes from Multiple Admins**: If another admin makes changes:
   - Supabase triggers a real-time event
   - The subscription callback processes the change
   - Local state updates automatically
   - UI re-renders with fresh data

3. **Frontend Reflection**: 
   - Blog posts appear on `/blog` and `/blog/:slug` pages automatically
   - Bookings can be displayed on dashboard or client-facing pages
   - Contacts appear wherever contact lists are displayed

## Pages Using Integration

### AdminBlog (`src/pages/AdminBlog.tsx`)
- Lists all blog posts
- Create, edit, delete blog posts
- Real-time updates when other admins make changes

### AdminBlogEditor (`src/pages/AdminBlogEditor.tsx`)
- Create and edit blog posts
- WYSIWYG text editor for content
- Automatic slug generation from title

### AdminBookings (`src/pages/AdminBookings.tsx`)
- View all bookings
- Update booking status (pending, confirmed, completed, cancelled)
- Filter bookings by status
- Delete bookings
- Real-time updates when new bookings arrive

## Frontend Updates

To display data from Supabase on the frontend:

### Blog Posts
```typescript
// Use from context or import BlogPost type
import { blogService } from '@/lib/adminService';

const posts = await blogService.getAllPosts();
```

### Bookings
```typescript
const bookings = await bookingService.getAllBookings();
```

### Contacts
```typescript
const contacts = await contactService.getAllContacts();
```

## Error Handling

All operations include error handling:

```typescript
try {
  const post = await createBlogPost(data);
} catch (error) {
  console.error('Failed to create post:', error.message);
  // Show toast notification to user
}
```

## Database Schema Requirements

Ensure your Supabase database has these tables:

### blog_posts
- id (UUID, primary key)
- title (text)
- slug (text)
- excerpt (text)
- content (text)
- cover_image (text)
- author (text)
- published_at (timestamp)
- reading_time (text)
- created_at (timestamp)
- updated_at (timestamp)

### bookings
- id (UUID, primary key)
- name (text)
- email (text)
- phone (text)
- date (text)
- time_slot (text)
- message (text, nullable)
- status (text: pending|confirmed|completed|cancelled)
- created_at (timestamp)
- updated_at (timestamp)

### contacts
- id (UUID, primary key)
- name (text)
- email (text)
- phone (text, nullable)
- subject (text)
- message (text)
- status (text: new|reviewed|replied|closed)
- created_at (timestamp)
- updated_at (timestamp)

## Real-Time Subscriptions Configuration

Real-time subscriptions are enabled by default. To disable, remove the subscription setup in `AdminContext.tsx`:

```typescript
// Comment out or remove this section in useEffect
const channel = blogService.subscribeToChanges(callback);
```

## Performance Considerations

1. **Subscriptions are cleaned up** when the admin logs out
2. **Lazy loading** - data is only fetched when admin panel is accessed
3. **Debouncing** - rapid updates are handled efficiently
4. **Unsubscribing** - channels are properly unsubscribed to prevent memory leaks
