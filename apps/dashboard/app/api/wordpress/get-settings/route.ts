/**
 * WordPress Settings Get API Route
 * Retrieves WordPress settings for the current user (without password)
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getWordPressSettings } from '@/lib/supabase/queries'

export async function GET(request: NextRequest) {
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

    // Get WordPress settings from database
    const settings = await getWordPressSettings(supabase, user.id)

    if (!settings) {
      return NextResponse.json({
        configured: false,
        settings: null,
      })
    }

    // Return settings (without encrypted password)
    return NextResponse.json({
      configured: true,
      settings: {
        id: settings.id,
        site_url: settings.site_url,
        username: settings.username,
        site_name: settings.site_name,
        is_active: settings.is_active,
        last_tested_at: settings.last_tested_at,
        created_at: settings.created_at,
        updated_at: settings.updated_at,
      },
    })
  } catch (error) {
    console.error('WordPress settings fetch error:', error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch WordPress settings',
      },
      { status: 500 }
    )
  }
}
