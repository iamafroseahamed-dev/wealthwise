# Supabase Storage Policies for blog-images Bucket

## Quick Setup Steps

### 1. Go to Supabase Dashboard
- Open your Supabase project
- Click **Storage** in the left menu
- Click **blog-images** bucket

### 2. Click on **Policies** tab

### 3. Create These Policies

---

## Policy 1: Public Read Access ✅

**When to apply**: Everyone can view/read images

1. Click **Create policy** → **For queries (SELECT)**
2. Set these values:
   - **Policy name**: `Allow public read`
   - **USING expression**: `true`
3. Click **Review** → **Save policy**

This allows anyone to see the images on the frontend.

---

## Policy 2: Public Upload Access ⬆️

**When to apply**: Anyone can upload images (less secure)

1. Click **Create policy** → **For inserts (INSERT)**
2. Set these values:
   - **Policy name**: `Allow public insert`
   - **USING expression**: `true`
3. Click **Review** → **Save policy**

---

## Policy 3: Authenticated Upload Access ⬆️ (Recommended)

**When to apply**: Only logged-in admins can upload

1. Click **Create policy** → **For inserts (INSERT)**
2. Set these values:
   - **Policy name**: `Allow authenticated upload`
   - **USING expression**: `auth.role() = 'authenticated'`
3. Click **Review** → **Save policy**

This requires users to be authenticated. Good for security but requires auth setup.

---

## Policy 4: Delete Own Files (Optional) 🗑️

**When to apply**: Allow users to delete their own uploads

1. Click **Create policy** → **For deletes (DELETE)**
2. Set these values:
   - **Policy name**: `Allow user delete own files`
   - **USING expression**: `auth.uid() = owner`
3. Click **Review** → **Save policy**

Note: This requires an `owner` column in a metadata table (advanced).

---

## Recommended Setup for Your Use Case

For a public blog with admin image uploads:

### ✅ Minimal Setup (Recommended)
1. **Policy 1**: Public Read (`true`)
2. **Policy 2**: Public Insert (`true`)

This allows anyone to upload and view images.

OR

### 🔒 Secure Setup (Better)
1. **Policy 1**: Public Read (`true`)
2. **Policy 3**: Authenticated Insert (`auth.role() = 'authenticated'`)

This allows public viewing but only authenticated users can upload.

---

## How to Create a Policy (Step-by-Step)

1. **Open Supabase Dashboard**
   - Go to your project
   - Click **Storage**

2. **Click blog-images Bucket**
   - You'll see the bucket contents

3. **Click Policies Tab**
   - Right side of the screen

4. **Click Create Policy**
   - Choose operation type (SELECT, INSERT, UPDATE, DELETE)

5. **Fill in the form**
   - Policy name: descriptive name
   - USING expression: the condition

6. **Click Review**
   - See the SQL that will be created

7. **Click Save Policy**
   - Policy is now active

---

## Common USING Expressions

| Expression | Meaning | Use Case |
|-----------|---------|----------|
| `true` | Allow all | Public access |
| `auth.role() = 'authenticated'` | Only logged in users | Restrict to members |
| `auth.uid() = owner` | Only the uploader | Users manage own files |
| `false` | Deny all | Read-only bucket |

---

## Verify Policies Work

### Test Public Read
1. Get image public URL from Supabase
2. Paste in browser (don't log in)
3. Image should load ✅

### Test Public Upload
1. Go to `/admin/blog`
2. Create new blog post
3. Click "Upload Image"
4. Select image and upload
5. Should succeed ✅

### Test Content Image Upload
1. In blog editor, click image icon in toolbar
2. Upload an image
3. Should appear in the editor ✅

---

## If Upload Fails

### Check 1: Bucket is Public
- Go to Storage → blog-images
- Make sure bucket toggle is **ON** (public)

### Check 2: Policies Exist
- Click Policies tab
- Should see at least 2 policies:
  - One for READ
  - One for INSERT

### Check 3: Upload From Admin Works
- Make sure the upload is going to correct bucket
- Check browser console for errors
- Console logs show the upload path

### Check 4: Image URL Works
- After upload, copy the public URL
- Paste in new tab (not logged in)
- Image should display

---

## Current Implementation

Your app uploads to:
```
blog-images/
├── 2026/02/1708001234-abc123-image.jpg (content images)
└── covers/2026/02/1708001234-def456-cover.jpg (cover images)
```

Both use the same bucket, so one set of policies covers both!

---

## Final Checklist

- [ ] Bucket `blog-images` exists
- [ ] Bucket is set to **Public**
- [ ] Policy for Public Read exists
- [ ] Policy for Insert exists (public or authenticated)
- [ ] Can upload from `/admin/blog`
- [ ] Image appears in content
- [ ] Image URL works in browser
- [ ] No console errors

---

## Example Policies SQL

If you prefer SQL over the UI:

```sql
-- Public Read
create policy "Allow public read"
on storage.objects for select
using (bucket_id = 'blog-images');

-- Public Upload
create policy "Allow public insert"
on storage.objects for insert
with check (bucket_id = 'blog-images');

-- Authenticated Upload (More Secure)
create policy "Allow authenticated upload"
on storage.objects for insert
with check (
  bucket_id = 'blog-images' 
  and auth.role() = 'authenticated'
);
```

---

## Need Help?

If uploads still fail after setting policies:

1. Check browser console for exact error
2. Look at Supabase logs (Dashboard → Logs)
3. Verify bucket name is exactly `blog-images`
4. Verify credentials in `.env.local`
5. Hard refresh the page (Ctrl+Shift+R)

Your storage is now configured! 🎉
