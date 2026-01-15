/**
 * WordPress REST API Client
 * Handles all interactions with WordPress REST API
 */

import type {
  WordPressPost,
  WordPressPostResponse,
  WordPressSiteInfo,
  WordPressError,
  WordPressConnectionTest,
} from './types'

/**
 * WordPress API Client
 * Handles authentication and API requests to WordPress sites
 */
export class WordPressClient {
  private siteUrl: string
  private username: string
  private password: string
  private apiBase: string

  constructor(siteUrl: string, username: string, password: string) {
    // Ensure site URL doesn't end with slash
    this.siteUrl = siteUrl.replace(/\/$/, '')
    this.username = username
    this.password = password
    // WordPress REST API base path
    this.apiBase = `${this.siteUrl}/wp-json/wp/v2`
  }

  /**
   * Create basic authentication header
   */
  private getAuthHeader(): string {
    const credentials = Buffer.from(`${this.username}:${this.password}`).toString('base64')
    return `Basic ${credentials}`
  }

  /**
   * Make authenticated request to WordPress REST API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.apiBase}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader(),
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error: WordPressError = await response.json().catch(() => ({
        code: 'unknown_error',
        message: response.statusText,
        data: { status: response.status },
      }))

      throw new Error(error.message || `WordPress API error: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Test connection to WordPress site
   * Verifies credentials and checks if Application Passwords are enabled
   */
  async testConnection(): Promise<WordPressConnectionTest> {
    try {
      // Try to fetch site info - this requires authentication
      const siteInfo = await this.request<WordPressSiteInfo>(`${this.siteUrl}/wp-json`)

      return {
        success: true,
        message: 'Connection successful',
        site_name: siteInfo.name,
        site_url: siteInfo.url || this.siteUrl,
      }
    } catch (error) {
      console.error('WordPress connection test failed:', error)

      // Provide helpful error messages
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('403')) {
          return {
            success: false,
            message: 'Authentication failed. Please check your username and application password.',
          }
        }

        if (error.message.includes('404')) {
          return {
            success: false,
            message: 'WordPress site not found. Please check the site URL.',
          }
        }

        if (error.message.includes('fetch')) {
          return {
            success: false,
            message: 'Could not connect to WordPress site. Please check the URL and your internet connection.',
          }
        }

        return {
          success: false,
          message: error.message,
        }
      }

      return {
        success: false,
        message: 'Unknown error occurred while testing connection.',
      }
    }
  }

  /**
   * Publish a post to WordPress
   *
   * @param post - Post data to publish
   * @returns WordPress post response with ID and URL
   */
  async publishPost(post: WordPressPost): Promise<WordPressPostResponse> {
    try {
      const response = await this.request<WordPressPostResponse>('/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || '',
          status: post.status,
          date: post.date,
        }),
      })

      return response
    } catch (error) {
      console.error('Failed to publish post to WordPress:', error)

      if (error instanceof Error) {
        throw new Error(`Failed to publish post: ${error.message}`)
      }

      throw new Error('Failed to publish post to WordPress')
    }
  }

  /**
   * Update an existing WordPress post
   *
   * @param postId - WordPress post ID
   * @param post - Updated post data
   * @returns WordPress post response
   */
  async updatePost(
    postId: number,
    post: Partial<WordPressPost>
  ): Promise<WordPressPostResponse> {
    try {
      const response = await this.request<WordPressPostResponse>(`/posts/${postId}`, {
        method: 'POST',
        body: JSON.stringify(post),
      })

      return response
    } catch (error) {
      console.error('Failed to update WordPress post:', error)

      if (error instanceof Error) {
        throw new Error(`Failed to update post: ${error.message}`)
      }

      throw new Error('Failed to update WordPress post')
    }
  }

  /**
   * Get WordPress site information
   *
   * @returns Site information from WordPress REST API
   */
  async getSiteInfo(): Promise<WordPressSiteInfo> {
    return this.request<WordPressSiteInfo>(`${this.siteUrl}/wp-json`)
  }
}

/**
 * Create a WordPress client instance
 *
 * @param siteUrl - WordPress site URL
 * @param username - WordPress username
 * @param password - WordPress application password (plain text)
 * @returns WordPress client instance
 */
export function createWordPressClient(
  siteUrl: string,
  username: string,
  password: string
): WordPressClient {
  return new WordPressClient(siteUrl, username, password)
}
