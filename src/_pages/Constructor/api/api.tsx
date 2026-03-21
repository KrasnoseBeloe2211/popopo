import { apiController } from '@/shared/config/api/api'
import { toast } from 'react-toastify'

const creatTest = async (e: any) => {
	try {
		const response = await apiController(undefined, 'POST', '/api/tests', e)
		toast.success('Тест успешно создан')
	} catch (err) {
		console.error(err)
	}
}
