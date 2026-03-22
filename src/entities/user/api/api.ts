import { toast } from 'react-toastify'
import { apiController } from '@/shared/config/api/api'

export const getUser = async () => {
	try {
		const response = await apiController(undefined, 'GET', '/api/user')
		// apiController возвращает IResponse, нужен data
		if (response && typeof response === 'object' && 'data' in response) {
			return (response as any).data
		}
		return response
	} catch (err) {
		toast.error('Не удалось получить данные о пользователе')
		console.error(err)
		throw err
	}
}
