# WordPress Integration Setup Guide

This guide will walk you through setting up WordPress publishing functionality for the Article Generation platform.

## Prerequisites

Before you begin, make sure you have:

1. A WordPress site (version 5.6 or later) with admin access
2. A Supabase project set up
3. Node.js 18+ and npm installed

## Step 1: Generate Encryption Key

WordPress application passwords will be encrypted before being stored in the database. You need to generate a secure encryption key.

### Generate the key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Add to environment variables:

Add the generated key to your `.env.local` file:

```bash
WORDPRESS_ENCRYPTION_KEY=your-generated-key-here
```

**Important**: Keep this key secure and never commit it to version control!

## Step 2: Run Database Migration

The WordPress integration requires two new tables in Supabase:
- `wordpress_settings` - Stores encrypted WordPress credentials
- `published_posts` - Tracks published posts

### Option A: Using Supabase SQL Editor (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file: `apps/dashboard/supabase/migrations/20250119_wordpress_integration.sql`
4. Copy the entire content
5. Paste it into the SQL Editor
6. Click **Run** to execute the migration

### Option B: Using Supabase CLI

```bash
cd apps/dashboard

# Login to Supabase (if not already)
npx supabase login

# Link your project
npx supabase link --project-ref <your-project-ref>

# Run the migration
npx supabase db push
```

### Verify Migration

Run this query in the SQL Editor to verify:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('wordpress_settings', 'published_posts');
```

You should see both tables listed.

## Step 3: Configure WordPress Application Password

WordPress Application Passwords allow secure authentication without exposing your main password.

### Create an Application Password:

1. Log in to your WordPress admin dashboard
2. Go to **Users** → **Profile**
3. Scroll down to **Application Passwords** section
4. Enter a name for the application (e.g., "Article Gen Platform")
5. Click **Add New Application Password**
6. **Copy the generated password** immediately - you won't be able to see it again!

The password will look like: `xxxx xxxx xxxx xxxx xxxx xxxx`

## Step 4: Configure WordPress in the App

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the dashboard and log in

3. Click on your profile dropdown → **Settings**

4. Click on **WordPress Integration**

5. Fill in the form:
   - **WordPress Site URL**: Your full WordPress URL (e.g., `https://yoursite.com`)
   - **WordPress Username**: Your WordPress admin username
   - **Application Password**: The password you just generated

6. Click **Test Connection** to verify the credentials

7. If successful, click **Save Settings**

## Step 5: Publish Your First Post

1. Go to **Blog Post Writer** in the dashboard

2. Create a blog post by going through the 5-step wizard:
   - Step 1: Enter details (description, language, creativity, keyword)
   - Step 2: Select or customize a title
   - Step 3: Review the introduction
   - Step 4: Edit the outline
   - Step 5: Generate and edit the full content

3. Once you're happy with the content, click **Publish to WordPress**

4. Confirm the publishing action in the dialog

5. The post will be published as a **draft** to your WordPress site

6. Click the link in the success message to view it in WordPress

7. Review and publish the post from your WordPress dashboard

## Features

### What's Included

- **Secure Credential Storage**: WordPress passwords are encrypted using AES encryption
- **Single Site Configuration**: Configure one WordPress site per user
- **Draft Publishing**: Posts are published as drafts for review before going live
- **Publishing History**: Track all published posts in the database
- **Connection Testing**: Verify credentials before saving
- **User-Specific Settings**: Each user has their own WordPress configuration

### Security Features

- **Encrypted Passwords**: Application passwords are encrypted before storage
- **Row Level Security**: Database policies ensure users can only access their own data
- **Application Passwords**: Uses WordPress Application Passwords (no main password exposure)
- **Secure Environment Variables**: Encryption key stored in environment, not in code

## Troubleshooting

### "WordPress not configured" Error

**Solution**: Go to Settings → WordPress Integration and configure your WordPress credentials.

### "Authentication failed" Error

**Possible causes**:
1. Incorrect username or application password
2. WordPress Application Passwords not enabled (requires WordPress 5.6+)
3. Security plugin blocking REST API access

**Solutions**:
1. Double-check your username and application password
2. Ensure WordPress is version 5.6 or later
3. Check your WordPress security settings/plugins

### "Could not connect to WordPress site" Error

**Possible causes**:
1. Incorrect site URL
2. WordPress site is offline
3. REST API is disabled

**Solutions**:
1. Verify the site URL (include `https://`)
2. Check if your WordPress site is accessible
3. Ensure REST API is enabled (check with your hosting provider)

### "Failed to decrypt password" Error

**Cause**: The encryption key has changed or is missing.

**Solution**:
1. Verify `WORDPRESS_ENCRYPTION_KEY` is set in `.env.local`
2. Ensure the key hasn't changed since saving credentials
3. If the key was changed, you'll need to re-save your WordPress settings

## Architecture Overview

### Database Schema

```sql
-- WordPress Settings (one per user)
wordpress_settings {
  id: UUID (primary key)
  user_id: UUID (foreign key to auth.users)
  site_url: TEXT
  username: TEXT
  encrypted_password: TEXT (AES encrypted)
  site_name: TEXT (optional)
  is_active: BOOLEAN
  last_tested_at: TIMESTAMPTZ
  created_at: TIMESTAMPTZ
  updated_at: TIMESTAMPTZ
}

-- Published Posts (tracking)
published_posts {
  id: UUID (primary key)
  user_id: UUID (foreign key to auth.users)
  wordpress_post_id: INTEGER (WordPress post ID)
  title: TEXT
  content: TEXT
  excerpt: TEXT
  status: TEXT (draft, published, scheduled)
  wordpress_url: TEXT
  published_at: TIMESTAMPTZ
  created_at: TIMESTAMPTZ
  updated_at: TIMESTAMPTZ
}
```

### API Routes

- `POST /api/wordpress/test-connection` - Test WordPress credentials
- `POST /api/wordpress/save-settings` - Save encrypted credentials
- `GET /api/wordpress/get-settings` - Retrieve user's WordPress settings
- `POST /api/wordpress/publish` - Publish post to WordPress as draft

### Technology Stack

- **Encryption**: crypto-js with AES encryption
- **WordPress API**: REST API v2 with Basic Authentication
- **Database**: Supabase with Row Level Security
- **Authentication**: WordPress Application Passwords

## Best Practices

1. **Never share your encryption key** - Keep `WORDPRESS_ENCRYPTION_KEY` secure
2. **Use Application Passwords** - Never use your main WordPress password
3. **Review drafts before publishing** - Always review posts in WordPress before making them live
4. **Rotate passwords periodically** - Update your application password regularly
5. **Test before production** - Verify the integration works with test posts first

## Support

For more information:
- [WordPress Application Passwords Documentation](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)
- [WordPress REST API Documentation](https://developer.wordpress.org/rest-api/)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## Changelog

### Version 1.0 (2025-01-19)
- Initial WordPress integration
- Single site configuration
- Draft publishing
- Encrypted credential storage
- Connection testing
- Publishing history tracking
