# Admin Module - Supabase Integration Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ADMIN DASHBOARD                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│  │  AdminBlog Page      │  │  AdminBookings Page  │  │  AdminDashboard  │  │
│  │  - List Posts        │  │  - List Bookings     │  │  - Navigation    │  │
│  │  - Create/Edit       │  │  - Update Status     │  │  - Overview      │  │
│  │  - Delete Post       │  │  - Delete Booking    │  │                  │  │
│  │  - View Details      │  │  - Filter            │  │                  │  │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────┘  │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │           AdminBlogEditor - Create & Edit Blog Posts               │    │
│  │  - Form with Title, Slug, Content, Cover Image                     │    │
│  │  - WYSIWYG Editor                                                   │    │
│  │  - Publish/Save Operations                                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                    All pages use useAdmin() hook
                                   │
                                   ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                       AdminContext (useAdmin)                               │
│                    Global State Management                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Blog Posts State          Bookings State           Contacts State          │
│  ├─ blogPosts[]            ├─ bookings[]            ├─ contacts[]           │
│  ├─ blogLoading            ├─ bookingsLoading       ├─ contactsLoading      │
│  ├─ blogError              ├─ bookingsError         ├─ contactsError        │
│  └─ Operations:            └─ Operations:           └─ Operations:          │
│     ├─ fetchBlogPosts()       ├─ fetchBookings()       ├─ fetchContacts()    │
│     ├─ createBlogPost()       ├─ createBooking()       ├─ createContact()    │
│     ├─ updateBlogPost()       ├─ updateBooking()       ├─ updateContact()    │
│     └─ deleteBlogPost()       ├─ deleteBooking()       ├─ deleteContact()    │
│                               └─ updateStatus()        └─ updateStatus()     │
│                                                                              │
│  Real-time Subscriptions:                                                  │
│  - Auto-subscribe on mount                                                 │
│  - Listen for INSERT, UPDATE, DELETE events                                │
│  - Auto-unsubscribe on logout                                              │
│                                                                              │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Admin Service Layer                                    │
│                     (src/lib/adminService.ts)                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ blogService                                                          │   │
│  │ ├─ getAllPosts()           ├─ updatePost()                          │   │
│  │ ├─ getPost(id)             ├─ deletePost()                          │   │
│  │ ├─ createPost()            └─ subscribeToChanges()                  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ bookingService                                                       │   │
│  │ ├─ getAllBookings()        ├─ updateBooking()                       │   │
│  │ ├─ getBooking(id)          ├─ deleteBooking()                       │   │
│  │ ├─ createBooking()         ├─ updateStatus()                        │   │
│  │                            └─ subscribeToChanges()                  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ contactService                                                       │   │
│  │ ├─ getAllContacts()        ├─ updateContact()                       │   │
│  │ ├─ getContact(id)          ├─ deleteContact()                       │   │
│  │ ├─ createContact()         ├─ updateStatus()                        │   │
│  │                            └─ subscribeToChanges()                  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Each service provides:                                                     │
│  - CRUD operations for Supabase tables                                      │
│  - Real-time subscription management                                        │
│  - Error handling and type safety                                           │
│                                                                              │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Supabase Client (@supabase/supabase-js)                  │
│                          (src/lib/supabase.ts)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  REST API Operations          Real-time Subscriptions                       │
│  ├─ INSERT                    ├─ postgres_changes                           │
│  ├─ SELECT                    ├─ TABLE events                               │
│  ├─ UPDATE                    ├─ SCHEMA: public                             │
│  └─ DELETE                    └─ EVENTS: INSERT, UPDATE, DELETE             │
│                                                                              │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SUPABASE DATABASE                                  │
│                        (PostgreSQL Backend)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────┐  ┌────────────────────────┐                    │
│  │   blog_posts table     │  │   bookings table        │                    │
│  │  ├─ id (UUID, PK)      │  │  ├─ id (UUID, PK)       │                    │
│  │  ├─ title              │  │  ├─ name                │                    │
│  │  ├─ slug               │  │  ├─ email               │                    │
│  │  ├─ excerpt            │  │  ├─ phone               │                    │
│  │  ├─ content            │  │  ├─ date                │                    │
│  │  ├─ cover_image        │  │  ├─ time_slot           │                    │
│  │  ├─ author             │  │  ├─ message             │                    │
│  │  ├─ published_at       │  │  ├─ status              │                    │
│  │  ├─ created_at         │  │  ├─ created_at          │                    │
│  │  └─ updated_at         │  │  └─ updated_at          │                    │
│  └────────────────────────┘  └────────────────────────┘                    │
│                                                                              │
│  ┌────────────────────────┐                                                │
│  │   contacts table       │                                                │
│  │  ├─ id (UUID, PK)      │                                                │
│  │  ├─ name               │                                                │
│  │  ├─ email              │                                                │
│  │  ├─ phone              │                                                │
│  │  ├─ subject            │                                                │
│  │  ├─ message            │                                                │
│  │  ├─ status             │                                                │
│  │  ├─ created_at         │                                                │
│  │  └─ updated_at         │                                                │
│  └────────────────────────┘                                                │
│                                                                              │
│  All tables have:                                                           │
│  - Row Level Security (RLS) enabled                                         │
│  - Real-time enabled                                                        │
│  - Timestamps for audit                                                     │
│                                                                              │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                    Real-time events propagate back up
                                   │
                                   ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                      FRONTEND PAGES                                         │
│                   (Auto-update via subscriptions)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│  │  /blog Page          │  │  /blog/:slug Page    │  │  /bookings Page  │  │
│  │  - All Blog Posts    │  │  - Single Blog Post  │  │  - Booking Form  │  │
│  │  - Auto-updates      │  │  - Auto-updates      │  │  - Display Data  │  │
│  │  - Real-time         │  │  - Real-time         │  │  - Real-time UI  │  │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────┘  │
│                                                                              │
│  All frontend content auto-updates when:                                   │
│  - Admin creates new content                                                │
│  - Admin updates content                                                    │
│  - Admin deletes content                                                    │
│  - Status changes (bookings)                                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### Example 1: Creating a Blog Post

```
User (Admin)
    │
    └─ Fills form and clicks "Create"
         │
         ↓
    AdminBlogEditor Component
         │
         └─ Calls createBlogPost(data)
              │
              ↓
         useAdmin Hook (Context)
              │
              └─ Calls blogService.createPost(data)
                   │
                   ↓
              Admin Service Layer
                   │
                   └─ Calls supabase.from('blog_posts').insert([data])
                        │
                        ↓
                   Supabase Client
                        │
                        └─ Sends POST request to Supabase API
                             │
                             ↓
                        Supabase Database
                             │
                             ├─ INSERT into blog_posts table
                             │
                             └─ Trigger postgres_changes event
                                  │
                                  ↓
                             Supabase Real-time
                                  │
                                  └─ Broadcast to all subscribed clients
                                       │
                 ┌─────────────────────┼─────────────────────┐
                 │                     │                     │
                 ↓                     ↓                     ↓
            Admin Tab 1          Admin Tab 2           User Browser
              Updates            Updates               Updates
          AdminContext state  AdminContext state   Displays new post
            Re-render list     Re-render list        on /blog page
```

### Example 2: Real-time Updates Across Tabs

```
Tab 1: Edit blog post in AdminBlogEditor
         │
         └─ Calls updateBlogPost(id, newData)
              │
              ↓
         Supabase UPDATE
              │
              ↓
         Real-time Event Fired
              │
    ┌────────┴────────┐
    │                 │
    ↓                 ↓
  Tab 1             Tab 2
  (Editor)          (List)
  Updates state    Updates state
  Saves response   Receives event
                   Updates list
                   User sees
                   change instantly
```

### Example 3: Updating Booking Status

```
Admin clicks status dropdown
         │
         ↓
Selects new status (e.g., "confirmed")
         │
         ↓
Calls updateBookingStatus(id, "confirmed")
         │
         ↓
Service updates database
         │
         ↓
Real-time subscription fires
         │
    ┌────────────┬────────────┐
    │            │            │
    ↓            ↓            ↓
Admin UI    Other Admins  Frontend
Updates     See change    Can display
immediately  in real-time updated status
```

## Key Integration Points

| Component | Purpose | Files |
|-----------|---------|-------|
| **Admin Service** | CRUD + Real-time | `src/lib/adminService.ts` |
| **Admin Context** | Global State | `src/contexts/AdminContext.tsx` |
| **Custom Hooks** | Data Management | `src/hooks/use*.ts` |
| **Admin Pages** | UI Rendering | `src/pages/Admin*.tsx` |
| **Supabase Client** | Database Access | `src/lib/supabase.ts` |
| **Database** | Persistent Storage | Supabase PostgreSQL |

## Real-time Subscription Lifecycle

```
Component Mount
    │
    ├─ AdminContext.useEffect()
    │
    ├─ Calls fetchBlogPosts()
    │
    └─ Creates subscription: blogService.subscribeToChanges()
         │
         ├─ Returns Realtime Channel
         │
         └─ Sets up postgres_changes listener
              │
              └─ For each event: INSERT, UPDATE, DELETE
                   │
                   └─ Callback updates context state
                        │
                        └─ Component re-renders with new data

Component Unmount / Admin Logout
    │
    └─ AdminContext.useEffect() cleanup
         │
         ├─ Calls blogService.unsubscribeFromChanges(channel)
         │
         └─ Removes channel from Supabase
              │
              └─ Stops listening for events
```

## Summary

This architecture provides:
- **Separation of Concerns**: Each layer has a specific responsibility
- **Real-time Sync**: Changes instantly propagate everywhere
- **Type Safety**: Full TypeScript support
- **Error Handling**: Proper error states and messages
- **Performance**: Optimized subscriptions and cleanup
- **Scalability**: Easy to add new data types/tables
