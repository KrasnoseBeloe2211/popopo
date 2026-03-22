'use client'
import { create } from 'zustand'
import { AdminTableEntity } from './type'
import {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
	UserCreateRequest,
	UserUpdateRequest,
} from '../api/api'
import { toast } from 'react-toastify'

interface UsersStore {
	users: AdminTableEntity[]
	loading: boolean
	error: string | null
	setUsers: (users: AdminTableEntity[]) => void
	refetch: () => Promise<void>
	addUser: (user: UserCreateRequest) => Promise<void>
	editUser: (userId: string, user: UserUpdateRequest) => Promise<void>
	removeUser: (userId: string) => Promise<void>
}

export const useUsersStore = create<UsersStore>(set => ({
	users: [] as AdminTableEntity[],
	loading: false,
	error: null,
	setUsers: (users: AdminTableEntity[]) => set({ users }),
	refetch: async () => {
		set({ loading: true, error: null })
		try {
			const response = await getUsers()
			set({ users: Array.isArray(response) ? response : [], loading: false })
		} catch (error) {
			set({ error: 'Ошибка загрузки пользователей', loading: false })
			toast.error('Всё хуйня давай по новой миша')
		}
	},
	addUser: async (user: UserCreateRequest) => {
		set({ loading: true, error: null })
		try {
			await createUser(user)
			const response = await getUsers()
			set({ users: Array.isArray(response) ? response : [], loading: false })
		} catch (error) {
			set({ error: 'Ошибка создания пользователя', loading: false })
			console.error('Error creating user:', error)
			throw error
		}
	},
	editUser: async (userId: string, user: UserUpdateRequest) => {
		set({ loading: true, error: null })
		try {
			await updateUser(userId, user)
			const response = await getUsers()
			set({ users: Array.isArray(response) ? response : [], loading: false })
		} catch (error) {
			set({ error: 'Ошибка обновления пользователя', loading: false })
			console.error('Error updating user:', error)
			throw error
		}
	},
	removeUser: async (userId: string) => {
		set({ loading: true, error: null })
		try {
			await deleteUser(userId)
			const response = await getUsers()
			set({ users: Array.isArray(response) ? response : [], loading: false })
		} catch (error) {
			set({ error: 'Ошибка удаления пользователя', loading: false })
			console.error('Error deleting user:', error)
			throw error
		}
	},
}))
