// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
// 	const refreshToken = request.cookies.get('refresh')?.value
// 	const { pathname } = request.nextUrl
// 	const token = localStorage.getItem('access_token')
// 	const publicPages = ['/login', '/register', '/']

// 	// if (!token && !publicPages.includes(pathname)) {
// 	// 	return NextResponse.redirect(new URL('/login', request.url))
// 	// }

// 	return NextResponse.next()
// }

// export const config = {
// 	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// }
