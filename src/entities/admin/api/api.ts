import { apiController } from '@/shared/config/api/api'
import { AdminTableEntity } from '../model/type'

export interface UserCreateRequest {
	email: string
	password: string
	full_name: string
	role: 'ROLE_PORTAL_ADMIN' | 'ROLE_PORTAL_PSYCHOLOG'
	about?: string
}

export interface UserUpdateRequest {
	email?: string
	full_name?: string
	role?: 'ROLE_PORTAL_ADMIN' | 'ROLE_PORTAL_PSYCHOLOG'
	about?: string
}

export const getUsers = async () => {
	try {
		const response = await apiController<AdminTableEntity[]>(
			undefined,
			'GET',
			'/api/admin/users',
		)
		// Сервер возвращает массив напрямую, а не в обёртке IResponse
		return Array.isArray(response) ? response : response.data || []
	} catch (error) {
		console.error('Error fetching users:', error)
		throw error
	}
}

export const createUser = async (user: UserCreateRequest) => {
	try {
		const response = await apiController<{ id: string }>(
			undefined,
			'POST',
			'/api/admin/user',
			user,
		)
		return response.data
	} catch (error) {
		console.error('Error creating user:', error)
		throw error
	}
}

export const updateUser = async (userId: string, user: UserUpdateRequest) => {
	try {
		const response = await apiController<AdminTableEntity>(
			undefined,
			'PATCH',
			`/api/admin/users?id=${userId}`,
			user,
		)
		return response.data
	} catch (error) {
		console.error('Error updating user:', error)
		throw error
	}
}

export const deleteUser = async (userId: string) => {
	try {
		await apiController(undefined, 'DELETE', `/api/admin/users?id=${userId}`)
		return true
	} catch (error) {
		console.error('Error deleting user:', error)
		throw error
	}
}
