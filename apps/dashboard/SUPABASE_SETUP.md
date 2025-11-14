# Supabase Authentication Setup Guide

## Setup Instructions

### 1. Add Your Supabase Credentials

Open `apps/dashboard/.env.local` and replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-actual-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
```

You can find these values in your Supabase project dashboard:
1. Go to https://app.supabase.com
2. Select your project
3. Go to Settings > API
4. Copy the `Project URL` and `anon/public key`

### 2. Configure Email Authentication in Supabase

1. In your Supabase dashboard, go to **Authentication** > **Providers**
2. Make sure **Email** provider is enabled
3. Configure email templates if desired (Authentication > Email Templates)

### 3. Set Up Email Confirmation (Optional)

By default, Supabase requires email confirmation for new signups. You have two options:

**Option A: Disable email confirmation (for development)**
1. Go to Authentication > Settings
2. Under "Auth Settings", disable "Enable email confirmations"

**Option B: Configure email confirmation (for production)**
1. Keep email confirmation enabled
2. Users will receive a confirmation email upon signup
3. They must click the link before they can log in

### 4. Start the Development Server

```bash
cd apps/dashboard
npm run dev
```

### 5. Test the Authentication

1. **Sign Up**: Go to `/signup` and create a new account
2. **Login**: Go to `/login` and sign in with your credentials
3. **Logout**: Click your profile in the sidebar and select "Logout"

## Features Implemented

- ✅ Email/password signup
- ✅ Email/password login
- ✅ Protected routes (redirects to /login if not authenticated)
- ✅ Logout functionality
- ✅ User data displayed in sidebar and dashboard
- ✅ Session management with automatic refresh
- ✅ Middleware for route protection

## File Structure

```
apps/dashboard/
├── lib/supabase/
│   ├── client.ts         # Client-side Supabase client
│   ├── server.ts         # Server-side Supabase client
│   └── middleware.ts     # Middleware helper
├── contexts/
│   └── AuthContext.tsx   # Auth context provider
├── middleware.ts         # Route protection
├── app/
│   ├── login/
│   ├── signup/
│   └── forgot-password/
└── .env.local           # Your credentials (gitignored)
```

## Protected Routes

All routes are protected except:
- `/login`
- `/signup`
- `/forgot-password`

Unauthenticated users will be redirected to `/login`.
Authenticated users accessing auth pages will be redirected to `/`.

## Notes

- The `.env.local` file is gitignored for security
- Mock data for metrics and content remains in place for now
- User data (name, email) is now pulled from Supabase
- After logout, users are redirected to the home/landing page (currently `/`)

## Troubleshooting

**Issue**: "Invalid API key" error
- **Solution**: Check that your `.env.local` has the correct credentials

**Issue**: Users can't sign up
- **Solution**: Verify email authentication is enabled in Supabase

**Issue**: Middleware errors
- **Solution**: Ensure Next.js 14+ is being used and restart the dev server

**Issue**: Session not persisting
- **Solution**: Clear browser cookies/cache and try again
