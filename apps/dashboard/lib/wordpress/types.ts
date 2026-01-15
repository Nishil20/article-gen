/**
 * WordPress Integration Types
 * Type definitions for WordPress REST API and settings
 */

// WordPress Settings stored in Supabase
export interface WordPressSettings {
  id: string
  user_id: string
  site_url: string
  username: string
  encrypted_password: string
  site_name?: string
  is_active: boolean
  last_tested_at?: string
  created_at: string
  updated_at: string
}

// WordPress Settings form data (before encryption)
export interface WordPressSettingsForm {
  site_url: string
  username: string
  password: string // Plain text password (will be encrypted before storage)
  site_name?: string
}

// WordPress connection test result
export interface WordPressConnectionTest {
  success: boolean
  message: string
  site_name?: string
  site_url?: string
}

// WordPress post data for publishing
export interface WordPressPost {
  title: string
  content: string
  excerpt?: string
  status: 'draft' | 'publish' | 'future'
  date?: string // ISO 8601 format for scheduling
}

// WordPress API response for post creation
export interface WordPressPostResponse {
  id: number
  link: string
  status: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
}

// Published post record in our database
export interface PublishedPost {
  id: string
  user_id: string
  wordpress_post_id?: number
  title: string
  content: string
  excerpt?: string
  status: string
  wordpress_url?: string
  published_at?: string
  created_at: string
  updated_at: string
}

// WordPress API error response
export interface WordPressError {
  code: string
  message: string
  data?: {
    status: number
  }
}

// WordPress site information from REST API
export interface WordPressSiteInfo {
  name: string
  description: string
  url: string
  home: string
  gmt_offset: number
  timezone_string: string
  namespaces: string[]
  authentication: {
    application_passwords?: boolean
  }
  routes?: Record<string, unknown>
}
