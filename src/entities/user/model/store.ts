'use client'

import { create } from 'zustand'
import type { IUser } from './type'
import { getCookie } from '@/shared/helpers/index'
import { jwtDecode } from 'jwt-decode'

interface IUserStore extends IUser {
	isAuthed: boolean
	setAuth: () => void
}

const defaultState: Omit<IUserStore, 'setAuth'> = {
	email: '',
	user: {},
	jwt_refresh: '',
	isAuthed: false,
}

const getInitialState = () => {
	if (typeof window === 'undefined') {
		return defaultState
	}

	const token = localStorage.getItem('access_token')
	if (!token) {
		return defaultState
	}
	try {
		const decoded = jwtDecode(token)
		return {
			email: decoded.sub || '',
			user: decoded,
			jwt_refresh: getCookie('refresh_token'),
			isAuthed: true,
		}
	} catch {
		return defaultState
	}
}

export const useUserStore = create<IUserStore>(set => ({
	...getInitialState(),
	setAuth: () => {
		if (typeof window === 'undefined') {
			set({ isAuthed: false })
			return
		}
		const token = localStorage.getItem('access_token')
		if (!token) {
			set({ isAuthed: false })
			return
		}
		const decoded = jwtDecode(token)
		set({
			isAuthed: true,
			user: decoded,
			jwt_refresh: getCookie('refresh_token'),
		})
	},
}))
