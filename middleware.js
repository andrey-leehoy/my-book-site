import { NextResponse } from 'next/server'

export function middleware(req) {

  const hasSession =
    req.cookies.get('sb-access-token') ||
    req.cookies.get('sb:token')

  const isChapter = req.nextUrl.pathname.startsWith('/chapter')

  if (isChapter && !hasSession) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/chapter/:path*'],
}