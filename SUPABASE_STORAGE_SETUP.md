# Supabase Storage Configuration for Blog Images

## Setup Instructions

### 1. Create the Storage Bucket

In your Supabase Dashboard:

1. Go to **Storage** in the left menu
2. Click **Create a new bucket**
3. Name it: `blog-images`
4. Make sure **Public bucket** is toggled ON
5. Click **Create bucket**

### 2. Configure Storage Policies

For public read and authenticated write access:

1. Click on the **blog-images** bucket
2. Go to the **Policies** tab
3. Create the following policies:

#### Policy 1: Public Read Access
- Click **Create policy** → **For queries (SELECT)**
- Set USING expression: `true` (allows everyone to read)
- Click **Review** → **Save policy**

#### Policy 2: Authenticated Write Access
- Click **Create policy** → **For inserts (INSERT)**  
- Set USING expression: `auth.role() = 'authenticated'`
- Click **Review** → **Save policy**

OR if you want public uploads (less secure):
- Click **Create policy** → **For inserts (INSERT)**
- Set USING expression: `true`
- Click **Review** → **Save policy**

#### Policy 3: Delete Own Files (Optional)
- Click **Create policy** → **For deletes (DELETE)**
- Set USING expression: `auth.uid() = owner` (if you add owner tracking)
- Click **Review** → **Save policy**

### 3. Configure CORS (if needed)

In Supabase Dashboard → Storage Settings:

1. Go to **Settings** → **Storage**
2. Under **CORS Configuration**, make sure these are set:
```json
{
  "allowedOrigins": ["https://yourdomain.com", "http://localhost:5173"],
  "allowedMethods": ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
  "allowedHeaders": ["*"],
  "exposedHeaders": ["*"]
}
```

Replace `https://yourdomain.com` with your actual domain and add `http://localhost:5173` for development.

### 4. Environment Variables

Ensure your `.env.local` has:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Bucket Structure

Images are organized by year/month:
```
blog-images/
├── 2026/
│   ├── 01/
│   │   └── 1705001234-abc123-image.jpg
│   ├── 02/
│   │   └── 1708001234-def456-image.png
│   └── ...
```

This makes it easy to:
- Find images by date
- Set up cleanup policies
- Manage storage quotas

## Public Image URLs

After upload, images are accessible at:
```
https://your-project.supabase.co/storage/v1/object/public/blog-images/2026/02/1708001234-abc123-image.jpg
```

## Testing Image Upload

1. Go to Admin Dashboard: `/admin/blog`
2. Click "New Post"
3. In the editor, click the **Image** icon (camera icon)
4. Select an image file
5. You should see:
   - "Uploading..." spinner
   - "Success" toast notification
   - Image appears in the editor

## Troubleshooting

### If upload fails with "bucket not found":

1. ✅ Verify bucket is created and named exactly `blog-images`
2. ✅ Check bucket is set to **Public**
3. ✅ Verify Supabase credentials in `.env.local`
4. ✅ Check console logs for full error message (now with detailed logging!)

### If image doesn't appear in editor:

1. ✅ Check network tab in DevTools
2. ✅ Verify upload succeeded (look for 200 status)
3. ✅ Check if public URL is correct
4. ✅ Verify bucket policies allow reading

### If upload succeeds but image is broken on page:

1. ✅ Check storage RLS policies - make sure **Public** policy exists
2. ✅ Verify public URL is accessible in browser
3. ✅ Check CORS configuration
4. ✅ Wait a moment - images may take time to be available

### If you get "CORS error":

1. Update CORS settings in **Storage → Settings**
2. Add your domain to allowed origins
3. Refresh the page
4. Try upload again

## Image Upload Function Details

The updated upload function now:

- ✅ Validates Supabase configuration
- ✅ Generates unique filenames with timestamps
- ✅ Organizes images by year/month
- ✅ Adds cache control headers
- ✅ Provides detailed console logging
- ✅ Shows helpful error messages

Console logs include:
```
Uploading image to: 2026/02/1708001234-abc123-image.jpg
Upload successful: {data}
Image public URL: https://...
```

This helps you debug any issues!

## Best Practices

1. **File Naming**: Don't use special characters or spaces
   - ✅ Good: `my-blog-image.jpg`
   - ❌ Bad: `my blog image!.jpg`

2. **File Size**: Keep images under 5MB
   - Recommended: Compress before upload
   - Use tools like TinyPNG, ImageOptim

3. **Image Format**: Support for JPG, PNG, WebP, GIF
   - ✅ Best: WebP (smallest, good quality)
   - ✅ Good: JPEG (universally supported)
   - ⚠️ Avoid: BMP, TIFF (large files)

4. **Cleanup**: Older images can be deleted manually
   - Go to Storage → blog-images
   - Delete folders by date as needed

5. **Database Backup**: Your image URLs are stored in blog posts
   - If you delete the image from storage, links will break
   - Consider setting retention policies

## Storage Quotas

Free Supabase plan includes:
- 1GB storage (all files combined)
- 3GB bandwidth per month

Monitor usage in:
Supabase Dashboard → Storage → Usage

Upgrade if needed for production.

## Success Checklist

- [x] Bucket created and named `blog-images`
- [x] Bucket is **Public**
- [x] Storage policies configured
- [x] CORS configured for your domain
- [x] `.env.local` has Supabase credentials
- [x] Image upload works
- [x] Images appear in editor
- [x] Images display on frontend pages
- [x] Console shows no errors

You're all set! 🎉 Images should now upload successfully!
