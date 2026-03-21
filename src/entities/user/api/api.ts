import { toast } from 'react-toastify'
import { apiController } from '@/shared/config/api/api'

export const getUser = async () => {
	try {
		const response = await apiController('GET', '/profile')
		return response
	} catch (err) {
		toast.error('Не удалось получить данные о пользователе')
		console.error(err)
	}
}
