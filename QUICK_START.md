# 🚀 Quick Start: Supabase & Clarity Wealth Hub

## ✅ Status
- ✅ Dev server running on `http://localhost:8080/`
- ✅ Supabase credentials configured in `.env.local`
- ⏳ Need to create database tables

---

## 📋 One-Time Setup (5 minutes)

### Step 1: Create Database Tables

**Go to**: https://app.supabase.com/project/qoytxtxfmbhmrcyhtyfk/sql/new

Copy the SQL from `SUPABASE_SETUP.md` and paste it in the SQL editor, then click **Run**.

The tables created:
- `blog_posts` - Stores blog articles
- `session_bookings` - Stores booking requests (optional)

### Step 2: Add Sample Blog Posts

After tables are created, run the sample data SQL (also in `SUPABASE_SETUP.md`).

This adds 3 sample blog posts to test with.

### Step 3: Test the Connection

1. Visit: `http://localhost:8080/admin`
2. Enter your admin password
3. Click **Manage Blog**
4. You should see the sample posts! ✅

---

## 🎯 What You Can Do Now

### As End User:
- ✅ Book a consultation session at `/book-session`
- ✅ View blog posts at `/blog`
- ✅ Read individual posts at `/blog/:slug`

### As Admin:
- ✅ Login at `/admin`
- ✅ Create new blog posts at `/admin/blog/new`
- ✅ Edit posts at `/admin/blog/:id/edit`
- ✅ Delete posts at `/admin/blog`
- ✅ View all posts in one table

---

## 📱 Application Routes

### Public Routes
```
/                          Home page
/about                     About company
/products                  Product listing
/mutual-funds              Mutual funds info
/insurance                 Insurance plans
/blog                      Blog listing (from Supabase)
/blog/:slug                Individual blog post
/book-session              Session booking form
```

### Admin Routes (Password Protected)
```
/admin                     Login page
/admin/dashboard           Admin overview
/admin/blog                Blog management
/admin/blog/new            Create blog post
/admin/blog/:id/edit       Edit blog post
```

---

## 🔐 Current Setup

### Environment Variables (`.env.local`)
```
✅ VITE_SUPABASE_URL=https://qoytxtxfmbhmrcyhtyfk.supabase.co
✅ VITE_SUPABASE_ANON_KEY=sb_publishable_wTMEWGmgvE4_SFBJOhUzVg_CMGXroJ_
⏳ VITE_EMAILJS_SERVICE_ID=not_yet_configured
⏳ VITE_EMAILJS_TEMPLATE_ID=not_yet_configured
⏳ VITE_EMAILJS_PUBLIC_KEY=not_yet_configured
⏳ VITE_ADMIN_PASSWORD=not_yet_configured
```

---

## 🔄 Next Steps

### 1. Configure Admin Password (2 minutes)
Edit `.env.local`:
```env
VITE_ADMIN_PASSWORD=your_secure_password_here
```
Then restart the dev server (Ctrl+C and `npm run dev`)

### 2. Setup EmailJS for Email Notifications (5 minutes)
See: [SETUP.md](./SETUP.md) - EmailJS Setup section

Steps:
1. Go to https://emailjs.com
2. Create an account
3. Set up Gmail service connection
4. Create an email template
5. Get your Service ID, Template ID, and Public Key
6. Add them to `.env.local`

### 3. Test Everything
- Create a blog post in admin panel
- Try booking a session
- Check that email is sent (once EmailJS configured)

---

## 💻 Development Commands

```bash
# Start dev server (already running)
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

---

## 📚 File Structure

```
src/
├── pages/
│   ├── Index.tsx                  Home page
│   ├── About.tsx                  About page
│   ├── Products.tsx               Products
│   ├── MutualFunds.tsx            Mutual funds
│   ├── Insurance.tsx              Insurance
│   ├── Blog.tsx                   Blog listing
│   ├── BlogPost.tsx               Individual post
│   ├── BookSession.tsx            Booking form ← Sends email
│   ├── AdminLogin.tsx             Admin login
│   ├── AdminDashboard.tsx         Admin dashboard
│   ├── AdminBlog.tsx              Blog management
│   └── AdminBlogEditor.tsx        Create/edit post
│
├── components/
│   ├── Layout.tsx                 Main layout wrapper
│   ├── Navbar.tsx                 Navigation
│   ├── Footer.tsx                 Footer
│   ├── AdminLayout.tsx            Admin sidebar ← New
│   ├── ProtectedRoute.tsx         Route protection ← New
│   ├── AnimatedSection.tsx        Scroll animations
│   ├── FloatingButtons.tsx        Floating buttons
│   └── ui/                        shadcn/ui components
│
├── lib/
│   ├── utils.ts                   Utilities
│   ├── supabase.ts                Supabase client ← New
│   └── emailjs.ts                 Email service ← New
│
├── contexts/
│   └── AdminContext.tsx           Admin auth ← New
│
├── hooks/
│   └── use-toast.ts               Toast notifications
│
└── App.tsx                        Main app with routes ← Updated

Config Files:
├── .env.local                     Environment variables ← Updated
├── vite.config.ts                 Vite config
├── tailwind.config.ts             Tailwind config
├── tsconfig.json                  TypeScript config
└── eslint.config.js               ESLint config
```

---

## 🧪 Testing Checklist

After setting up Supabase:

- [ ] Visit `/admin` and login (password required first)
- [ ] Go to `/admin/blog` and see sample posts
- [ ] Create a new blog post
- [ ] Check it appears on `/blog` page
- [ ] Edit the post from admin panel
- [ ] Delete a post
- [ ] Visit individual post at `/blog/power-of-sip`
- [ ] Test responsive design (mobile view)

After setting up EmailJS:

- [ ] Visit `/book-session`
- [ ] Fill out booking form
- [ ] Submit
- [ ] Check email received at itskarthikgangadharan@gmail.com

---

## 🔧 Troubleshooting

### Admin panel shows "Authenticate" after logout?
This is normal. Click admin link and login again.

### Blog posts not loading?
1. Check browser console (F12) for errors
2. Verify Supabase tables are created
3. Check `.env.local` has correct credentials
4. Restart dev server if you changed `.env.local`

### Can't create blog posts?
1. Verify you're logged in to admin
2. Check all required fields are filled
3. Check browser console for error messages

### Want to delete all blog posts and start fresh?
Run this in Supabase SQL Editor:
```sql
DELETE FROM public.blog_posts;
```

Then create new posts from admin panel.

---

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com

---

## 🎉 You're All Set!

Your Clarity Wealth Hub is now ready to:
1. Manage blog posts from admin panel
2. Send booking emails (once EmailJS is set up)
3. Display dynamic content from Supabase
4. Scale to handle more features

**Happy coding! 🚀**
