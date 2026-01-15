/**
 * WordPress Publish API Route
 * Publishes blog posts to WordPress as drafts
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getWordPressCredentials, savePublishedPost } from '@/lib/supabase/queries'
import { createWordPressClient } from '@/lib/wordpress/client'
import type { WordPressPost } from '@/lib/wordpress/types'

interface PublishRequest {
  title: string
  content: string
  excerpt?: string
}

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse request body
    const body: PublishRequest = await request.json()
    const { title, content, excerpt } = body

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content' },
        { status: 400 }
      )
    }

    // Get WordPress credentials
    const credentials = await getWordPressCredentials(supabase, user.id)

    if (!credentials) {
      return NextResponse.json(
        { error: 'WordPress not configured. Please configure WordPress settings first.' },
        { status: 400 }
      )
    }

    // Create WordPress client
    const wpClient = createWordPressClient(
      credentials.siteUrl,
      credentials.username,
      credentials.password
    )

    // Prepare post data (publish as draft)
    const post: WordPressPost = {
      title,
      content,
      excerpt: excerpt || '',
      status: 'draft',
    }

    // Publish to WordPress
    const wpResponse = await wpClient.publishPost(post)

    // Save published post record in our database
    await savePublishedPost(supabase, user.id, {
      wordpress_post_id: wpResponse.id,
      title: wpResponse.title.rendered,
      content,
      excerpt,
      status: wpResponse.status,
      wordpress_url: wpResponse.link,
    })

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Post published to WordPress as draft',
      post: {
        id: wpResponse.id,
        url: wpResponse.link,
        status: wpResponse.status,
        title: wpResponse.title.rendered,
      },
    })
  } catch (error) {
    console.error('WordPress publish error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to publish post to WordPress',
      },
      { status: 500 }
    )
  }
}
