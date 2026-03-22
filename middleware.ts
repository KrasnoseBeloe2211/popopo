// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get('refresh')?.value
	const { pathname } = request.nextUrl

	// Публичные страницы, доступные без авторизации
	const publicPages = ['/login', '/register', '/']

	// Проверяем, является ли путь публичным (включая динамические маршруты)
	const isPublicPage = publicPages.some(page => {
		if (page.includes(':')) {
			// Динамический маршрут (например, /session/:sessionId)
			const pattern = page.replace(/:\w+/g, '[^/]+')
			return new RegExp(`^${pattern}$`).test(pathname)
		}
		return pathname === page || pathname.startsWith(page + '/')
	})

	// Если нет refresh токена и страница не публичная — редирект на login
	if (!refreshToken && !isPublicPage) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
