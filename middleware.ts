import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

const authPathnames = ['/u/signin', '/u/signup']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session && authPathnames.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return res
}
