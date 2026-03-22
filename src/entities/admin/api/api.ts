import { apiController } from '@/shared/config/api/api'
import { AdminTableEntity } from '../model/type'

export const getUsers = async () => {
	try {
		const response = (await apiController)<AdminTableEntity>(
			undefined,
			'GET',
			'/api/admin/users',
		)
		return response
	} catch (error) {
		console.error('Error fetching users:', error)
		throw error
	}
}
