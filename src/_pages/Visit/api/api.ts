import { apiController } from '@/shared/config/api/api'

export const getVisit = async (id: string) => {
	try {
		const response = await apiController(
			undefined,
			'GET',
			`/api/psychologist/${id}/about`,
		)
		return response
	} catch (err) {}
}
