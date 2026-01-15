/**
 * WordPress Connection Test API Route
 * Tests WordPress credentials before saving
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createWordPressClient } from '@/lib/wordpress/client'

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
    const body = await request.json()
    const { site_url, username, password } = body

    // Validate required fields
    if (!site_url || !username || !password) {
      return NextResponse.json(
        { error: 'Missing required fields: site_url, username, password' },
        { status: 400 }
      )
    }

    // Create WordPress client and test connection
    const wpClient = createWordPressClient(site_url, username, password)
    const result = await wpClient.testConnection()

    // Return test result
    return NextResponse.json(result)
  } catch (error) {
    console.error('WordPress connection test error:', error)

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
