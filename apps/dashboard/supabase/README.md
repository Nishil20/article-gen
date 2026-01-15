# Supabase Migrations

This directory contains SQL migrations for the Article Generation platform.

## Running Migrations

You can run these migrations using the Supabase CLI or directly in the Supabase SQL Editor.

### Option 1: Using Supabase CLI (Recommended)

```bash
# Login to Supabase
npx supabase login

# Link your project
npx supabase link --project-ref <your-project-ref>

# Run migrations
npx supabase db push
```

### Option 2: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the migration file: `migrations/20250119_wordpress_integration.sql`
4. Copy and paste the SQL content
5. Click **Run** to execute the migration

## Migrations

### 20250119_wordpress_integration.sql

Creates tables and policies for WordPress integration:
- `wordpress_settings` - Stores encrypted WordPress credentials (one per user)
- `published_posts` - Tracks posts published to WordPress
- Row Level Security (RLS) policies for data isolation
- Indexes for performance
- Triggers for auto-updating timestamps

## Verifying Migration

After running the migration, verify it worked:

```sql
-- Check if tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('wordpress_settings', 'published_posts');

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('wordpress_settings', 'published_posts');
```

Expected result: Both tables should exist and have `rowsecurity = true`.
