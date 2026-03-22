'use client'

import { create } from 'zustand'
import type { IUser } from './type'
import { getCookie } from '@/shared/helpers/index'
import { jwtDecode } from 'jwt-decode'
import { getUser } from '../api/api'

interface IUserStore extends IUser {
	isAuthed: boolean
	loading: boolean
	error: string | null
	setAuth: () => Promise<void>
	logout: () => void
	fetchProfile: () => Promise<void>
}

const defaultState: Omit<IUserStore, 'setAuth' | 'logout' | 'fetchProfile'> = {
	email: '',
	user: {},
	jwt_refresh: '',
	isAuthed: false,
	loading: false,
	error: null,
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
			loading: false,
			error: null,
		}
	} catch {
		return defaultState
	}
}

export const useUserStore = create<IUserStore>(set => ({
	...getInitialState(),
	setAuth: async () => {
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
		// После установки авторизации загружаем полный профиль
		const profile = await getUser()

		if (profile) {
			set({ user: profile })
		}
	},
	logout: () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('access_token')
			document.cookie =
				'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
		}
		set(defaultState)
	},
	fetchProfile: async () => {
		set({ loading: true, error: null })
		try {
			const profile = await getUser()
			if (profile) {
				set({ user: profile, loading: false })
			}
		} catch (error) {
			set({ error: 'Ошибка загрузки профиля', loading: false })
			console.error('Error fetching profile:', error)
		}
	},
}))
