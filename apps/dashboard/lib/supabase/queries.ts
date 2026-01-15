/**
 * Supabase Database Query Helpers
 * Reusable functions for database operations
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type {
  WordPressSettings,
  WordPressSettingsForm,
  PublishedPost,
} from '../wordpress/types'
import { encryptPassword, decryptPassword } from '../wordpress/encryption'

/**
 * Get WordPress settings for the current user
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID
 * @returns WordPress settings or null if not configured
 */
export async function getWordPressSettings(
  supabase: SupabaseClient,
  userId: string
): Promise<WordPressSettings | null> {
  const { data, error } = await supabase
    .from('wordpress_settings')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows found - user hasn't configured WordPress yet
      return null
    }
    console.error('Error fetching WordPress settings:', error)
    throw new Error('Failed to fetch WordPress settings')
  }

  return data
}

/**
 * Save or update WordPress settings for a user
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID
 * @param settings - WordPress settings form data
 * @returns Saved WordPress settings
 */
export async function saveWordPressSettings(
  supabase: SupabaseClient,
  userId: string,
  settings: WordPressSettingsForm
): Promise<WordPressSettings> {
  // Encrypt the password before saving
  const encryptedPassword = encryptPassword(settings.password)

  // Check if settings already exist
  const existing = await getWordPressSettings(supabase, userId)

  if (existing) {
    // Update existing settings
    const { data, error } = await supabase
      .from('wordpress_settings')
      .update({
        site_url: settings.site_url,
        username: settings.username,
        encrypted_password: encryptedPassword,
        site_name: settings.site_name,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating WordPress settings:', error)
      throw new Error('Failed to update WordPress settings')
    }

    return data
  } else {
    // Insert new settings
    const { data, error } = await supabase
      .from('wordpress_settings')
      .insert({
        user_id: userId,
        site_url: settings.site_url,
        username: settings.username,
        encrypted_password: encryptedPassword,
        site_name: settings.site_name,
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating WordPress settings:', error)
      throw new Error('Failed to save WordPress settings')
    }

    return data
  }
}

/**
 * Update last tested timestamp for WordPress settings
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID
 */
export async function updateLastTested(
  supabase: SupabaseClient,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from('wordpress_settings')
    .update({
      last_tested_at: new Date().toISOString(),
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Error updating last tested timestamp:', error)
  }
}

/**
 * Delete WordPress settings for a user
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID
 */
export async function deleteWordPressSettings(
  supabase: SupabaseClient,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from('wordpress_settings')
    .delete()
    .eq('user_id', userId)

  if (error) {
    console.error('Error deleting WordPress settings:', error)
    throw new Error('Failed to delete WordPress settings')
  }
}

/**
 * Get decrypted WordPress credentials for API calls
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID
 * @returns Decrypted credentials or null
 */
export async function getWordPressCredentials(
  supabase: SupabaseClient,
  userId: string
): Promise<{
  siteUrl: string
  username: string
  password: string
} | null> {
  const settings = await getWordPressSettings(supabase, userId)

  if (!settings) {
    return null
  }

  try {
    const password = decryptPassword(settings.encrypted_password)

    return {
      siteUrl: settings.site_url,
      username: settings.username,
      password,
    }
  } catch (error) {
    console.error('Failed to decrypt WordPress password:', error)
    throw new Error('Failed to decrypt WordPress credentials')
  }
}

/**
 * Save a published post record
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID
 * @param post - Published post data
 * @returns Created post record
 */
export async function savePublishedPost(
  supabase: SupabaseClient,
  userId: string,
  post: {
    wordpress_post_id?: number
    title: string
    content: string
    excerpt?: string
    status: string
    wordpress_url?: string
  }
): Promise<PublishedPost> {
  const { data, error } = await supabase
    .from('published_posts')
    .insert({
      user_id: userId,
      wordpress_post_id: post.wordpress_post_id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      status: post.status,
      wordpress_url: post.wordpress_url,
      published_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving published post:', error)
    throw new Error('Failed to save published post record')
  }

  return data
}

/**
 * Get all published posts for a user
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID
 * @param limit - Number of posts to fetch (default: 50)
 * @returns Array of published posts
 */
export async function getPublishedPosts(
  supabase: SupabaseClient,
  userId: string,
  limit: number = 50
): Promise<PublishedPost[]> {
  const { data, error } = await supabase
    .from('published_posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching published posts:', error)
    throw new Error('Failed to fetch published posts')
  }

  return data || []
}

/**
 * Get a single published post by ID
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID
 * @param postId - Post ID
 * @returns Published post or null
 */
export async function getPublishedPost(
  supabase: SupabaseClient,
  userId: string,
  postId: string
): Promise<PublishedPost | null> {
  const { data, error } = await supabase
    .from('published_posts')
    .select('*')
    .eq('id', postId)
    .eq('user_id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    console.error('Error fetching published post:', error)
    throw new Error('Failed to fetch published post')
  }

  return data
}
