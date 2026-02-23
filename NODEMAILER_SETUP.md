# Nodemailer Setup Guide

## Overview

We use Nodemailer with a Vercel serverless function to send booking confirmation emails. This requires:
- A Gmail account (or other email service)
- Gmail App Password (for 2FA-enabled accounts)
- Environment variables configured in Vercel dashboard

## Architecture

1. Frontend form submission triggers `/api/send-booking-email` API call
2. Vercel serverless function processes the request
3. Nodemailer sends emails via Gmail SMTP
4. Confirmation sent to user + admin notification

## Setup Instructions

### Step 1: Enable 2-Step Verification (Gmail)

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Click "2-Step Verification" and follow the setup
3. This is required to generate App Passwords

### Step 2: Generate Gmail App Password

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer" (or your device)
3. Google will generate a 16-character password
4. Copy this password - you'll need it in the next step

### Step 3: Configure Vercel Environment Variables

In your Vercel project dashboard:

1. Go to **Settings → Environment Variables**
2. Add the following variables:

```
EMAIL_USER = your_email@gmail.com
EMAIL_PASSWORD = your_16_character_app_password
ADMIN_EMAIL = Itskarthikgangadharan@gmail.com
```

### Step 4: Verify Local Development

For local development, the API will use Vercel's environment variables. If testing locally without Vercel:

1. Create a `.env.local` file with:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=Itskarthikgangadharan@gmail.com
```

## How It Works

### API Endpoint: `/api/send-booking-email`

Accepts POST requests with:
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "phone": "+1234567890",
  "date": "March 15, 2024",
  "timeSlot": "2:00 PM",
  "message": "Optional message"
}
```

Returns:
```json
{
  "success": true,
  "message": "Emails sent successfully"
}
```

## Troubleshooting

### "App password not available"
- Ensure 2-Step Verification is enabled on your Google account
- App Passwords only work with accounts protected by 2FA

### "Gmail rejected the credentials"
- Verify the 16-character password is correctly copied
- Check there are no extra spaces in the environment variables

### "API returns 500 error"
- Check Vercel dashboard to see if `EMAIL_USER` and `EMAIL_PASSWORD` are set
- Ensure environment variables are deployed (redeploy if just added)

### "Emails not receiving"
- Check spam/junk folder
- Verify email addresses are correct in the booking form
- Check Vercel function logs for errors

## Security Notes

- Never commit `.env.local` or email passwords to version control
- Use Vercel's secure environment variables for production
- Consider using SendGrid or Mailgun for higher email volumes
- Gmail limits ~500 emails/day for free accounts

## Alternative Email Services

If you prefer not to use Gmail:

### SendGrid
- Free tier: 100 emails/day
- No 2FA required, simpler setup
- Better for production

### Mailgun
- Free tier: 5,000 emails/month
- Professional email service
- Good for high volumes

## References

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
