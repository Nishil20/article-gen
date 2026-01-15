-- WordPress Integration Schema
-- This migration creates tables for storing WordPress settings and published posts

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- WordPress Settings Table
-- Stores encrypted WordPress credentials for each user (single site per user)
CREATE TABLE IF NOT EXISTS wordpress_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  site_url TEXT NOT NULL,
  username TEXT NOT NULL,
  encrypted_password TEXT NOT NULL, -- Encrypted WordPress Application Password
  site_name TEXT,
  is_active BOOLEAN DEFAULT true,
  last_tested_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Ensure one WordPress site per user
  UNIQUE(user_id)
);

-- Published Posts Table
-- Tracks all posts published to WordPress from the blog post writer
CREATE TABLE IF NOT EXISTS published_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wordpress_post_id INTEGER, -- WordPress post ID
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  status TEXT DEFAULT 'draft', -- draft, published, scheduled
  wordpress_url TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_wordpress_settings_user_id ON wordpress_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_published_posts_user_id ON published_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_published_posts_status ON published_posts(status);
CREATE INDEX IF NOT EXISTS idx_published_posts_created_at ON published_posts(created_at DESC);

-- Row Level Security (RLS) Policies
-- Enable RLS on both tables
ALTER TABLE wordpress_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE published_posts ENABLE ROW LEVEL SECURITY;

-- WordPress Settings Policies
-- Users can only view their own settings
CREATE POLICY "Users can view own wordpress settings"
  ON wordpress_settings
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own settings
CREATE POLICY "Users can insert own wordpress settings"
  ON wordpress_settings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own settings
CREATE POLICY "Users can update own wordpress settings"
  ON wordpress_settings
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own settings
CREATE POLICY "Users can delete own wordpress settings"
  ON wordpress_settings
  FOR DELETE
  USING (auth.uid() = user_id);

-- Published Posts Policies
-- Users can view their own published posts
CREATE POLICY "Users can view own published posts"
  ON published_posts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own published posts
CREATE POLICY "Users can insert own published posts"
  ON published_posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own published posts
CREATE POLICY "Users can update own published posts"
  ON published_posts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own published posts
CREATE POLICY "Users can delete own published posts"
  ON published_posts
  FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_wordpress_settings_updated_at
  BEFORE UPDATE ON wordpress_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_published_posts_updated_at
  BEFORE UPDATE ON published_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE wordpress_settings IS 'Stores WordPress connection settings for each user';
COMMENT ON TABLE published_posts IS 'Tracks posts published to WordPress from the blog post writer';
COMMENT ON COLUMN wordpress_settings.encrypted_password IS 'WordPress Application Password encrypted using AES encryption';
COMMENT ON COLUMN wordpress_settings.last_tested_at IS 'Timestamp of last successful connection test';
