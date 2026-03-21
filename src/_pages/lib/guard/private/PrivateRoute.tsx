'use client'

import { useUserStore } from '@/entities/user/model/store'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const publicPaths = ['/','/login', '/register']

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthed, setAuth } = useUserStore()
	const router = useRouter()
	const pathname = usePathname()
	const [isChecking, setIsChecking] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem('access_token')

		if (publicPaths.includes(pathname)) {
			setIsChecking(false)
			return
		}

		if (!token) {
			router.push('/login')
			return
		}

		setAuth()
		setIsChecking(false)
	}, [pathname, setAuth, router])

	if (isChecking) {
		return null
	}

	if (publicPaths.includes(pathname)) {
		return <>{children}</>
	}

	return isAuthed ? <>{children}</> : null
}
