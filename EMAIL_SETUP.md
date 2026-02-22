# Email Setup Guide - Using Gmail with Nodemailer

## Overview
Instead of using EmailJS, we now use a Vercel serverless function with nodemailer to send emails directly from your Gmail account. This gives you complete control without third-party dependencies.

## How It Works
1. User books a session on `/book-session`
2. Frontend calls your backend API: `/api/send-booking-email`
3. Backend sends email via Gmail using nodemailer
4. User receives confirmation + Admin gets notification

## Setup Steps

### Step 1: Enable Gmail App Password

1. Go to Google Account: https://myaccount.google.com
2. Click **Security** in left sidebar
3. Enable **2-Step Verification** (if not already enabled)
4. Then go back to Security page
5. Look for **App passwords** option (appears after 2FA is enabled)
6. Select "Mail" and "Windows Computer" (or your device)
7. Google will generate a 16-character password (e.g., `abcd efgh ijkl mnop`)
8. Copy this password - you''ll need it next

### Step 2: Update .env.local (Local Development)

Edit `.env.local` and set:

```env
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
ADMIN_EMAIL=Itskarthikgangadharan@gmail.com
```

Example:
```env
EMAIL_USER=john.doe@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
ADMIN_EMAIL=Itskarthikgangadharan@gmail.com
```

### Step 3: Deploy to Vercel (Production)

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add three environment variables:
   - Name: `EMAIL_USER` → Value: `your_gmail_address@gmail.com`
   - Name: `EMAIL_PASSWORD` → Value: `abcd efgh ijkl mnop`
   - Name: `ADMIN_EMAIL` → Value: `Itskarthikgangadharan@gmail.com`

5. Click **Deploy** or push new code to trigger redeploy

### Step 4: Test Locally

1. Make sure `.env.local` is updated with Email credentials
2. Run: `npm run dev`
3. Go to http://localhost:8080/book-session
4. Fill in the form and submit
5. Check email - you should receive the confirmation!

### Step 5: Test on Production

Once deployed to Vercel:
1. Go to your live site (e.g., clarity-wealth-hub.vercel.app)
2. Visit `/book-session`
3. Fill and submit booking form
4. Emails should be sent (check spam folder if not found)

## Troubleshooting

### Email not sending locally?
- Check `.env.local` has correct EMAIL_USER and EMAIL_PASSWORD
- Verify Gmail app password is correct (should have spaces)
- Check browser console for error messages
- Verify Vercel node SDK is installed: `npm install @vercel/node`

### Email not sending on production?
- Go to Vercel dashboard
- Check environment variables are set correctly
- Check Deployment logs for error messages
- Verify Gmail 2FA is enabled and app password is correct

### "App passwords" option not showing?
- You must enable 2-Step Verification first
- Go to https://myaccount.google.com/security
- Look for "2-Step Verification" and enable it
- Then "App passwords" will appear

### Getting "Invalid credentials" error?
- Make sure you''re using Gmail app password, not your main password
- App password should be spaces separated (e.g., `abcd efgh ijkl mnop`)
- Don''t use regular Gmail password

## Alternative Email Providers

You can also use:
- **Outlook/Hotmail**: Change `service: "gmail"` to `service: "outlook"`
- **Custom SMTP**: Use `host`, `port`, `secure` options instead of `service`

Example for Outlook:
```typescript
const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## API Response Examples

### Success Response
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Error Response
```json
{
  "error": "Failed to send email",
  "message": "Invalid credentials"
}
```

## Files Modified
- `/api/send-booking-email.ts` - Backend API endpoint
- `src/lib/emailjs.ts` - Frontend email service (now calls API)
- `.env.local` - Email configuration (local only)
- `BookSession.tsx` - No changes needed (already uses emailjs.ts)

## File Size
The new API function is ~2KB, very lightweight for serverless deployment.

---

**Next Steps:**
1. Generate Gmail app password (see Step 1)
2. Update `.env.local` with credentials
3. Test locally with `npm run dev`
4. Deploy to Vercel
5. Add environment variables in Vercel dashboard
6. Test on production site

Happy emailing! 🚀
