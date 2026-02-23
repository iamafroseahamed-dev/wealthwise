# Clarity Wealth Hub

A modern financial advisory website for wealth management services including mutual funds, insurance, and financial planning.

## Technologies

This project is built with:
- **Vite** - Fast build tool
- **React** 18.3 - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Client-side routing
- **Supabase** - Backend database (PostgreSQL)
- **Nodemailer** - Email sending

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd clarity-wealth-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/        # Reusable React components
├── pages/            # Page components
├── lib/              # Utilities and services
│   ├── supabase.ts   # Supabase client
│   └── email.ts      # Email API client
├── contexts/         # React contexts
├── hooks/            # Custom hooks
└── App.tsx           # Main app component

api/
└── send-booking-email.ts  # Vercel serverless function (Nodemailer)

public/              # Static assets
```

## Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Admin
VITE_ADMIN_PASSWORD=your_password
```

## Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
```

## Features

### Public Features
- 📱 Responsive landing page
- 📚 Blog section with Supabase integration
- 💰 Product showcase (mutual funds, insurance)
- 📅 Session booking form with email notifications
- 🎯 About and company pages

### Admin Features
- 🔐 Password-protected admin panel
- 📝 Blog post management (create, read, update, delete)
- 🖼️ Cover image preview
- 📊 Auto slug generation

## Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Custom Domain

Go to Vercel project settings → Domains and add your custom domain.

## Documentation

- [Email Setup Guide](./EMAIL_SETUP.md)
- [Setup Instructions](./SETUP.md)
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)

## License

MIT

## Support

For issues or questions, check the documentation files or review the codebase comments.
