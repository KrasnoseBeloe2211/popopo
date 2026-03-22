'use client'
import { create } from 'zustand'
import { AdminTableEntity } from './type'
import { getUsers } from '../api/api'

interface UsersStore {
	users: AdminTableEntity[]
	setUsers: (users: AdminTableEntity[]) => void
	refetch: () => Promise<void>
}

export const useUsersStore = create<UsersStore>(set => ({
	users: [] as AdminTableEntity[],
	setUsers: (users: AdminTableEntity[]) => set({ users }),
	refetch: async () => {
		try {
			const response: any = await getUsers()
			set({ users: response })
		} catch (error) {
			console.error('Error fetching users:', error)
		}
	},
}))
