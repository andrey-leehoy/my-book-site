import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function middleware(req) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({
    req,
    res,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isChapter = req.nextUrl.pathname.startsWith('/chapter')

  if (isChapter && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/chapter/:path*'],
}