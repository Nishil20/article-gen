/**
 * WordPress Settings Save API Route
 * Saves WordPress credentials to database (encrypted)
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { saveWordPressSettings, updateLastTested } from '@/lib/supabase/queries'
import type { WordPressSettingsForm } from '@/lib/wordpress/types'

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
    const body: WordPressSettingsForm = await request.json()
    const { site_url, username, password, site_name } = body

    // Validate required fields
    if (!site_url || !username || !password) {
      return NextResponse.json(
        { error: 'Missing required fields: site_url, username, password' },
        { status: 400 }
      )
    }

    // Save settings to database (password will be encrypted)
    const settings = await saveWordPressSettings(supabase, user.id, {
      site_url,
      username,
      password,
      site_name,
    })

    // Update last tested timestamp
    await updateLastTested(supabase, user.id)

    // Return success (without encrypted password)
    return NextResponse.json({
      success: true,
      message: 'WordPress settings saved successfully',
      settings: {
        id: settings.id,
        site_url: settings.site_url,
        username: settings.username,
        site_name: settings.site_name,
        is_active: settings.is_active,
        last_tested_at: settings.last_tested_at,
      },
    })
  } catch (error) {
    console.error('WordPress settings save error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save WordPress settings',
      },
      { status: 500 }
    )
  }
}
