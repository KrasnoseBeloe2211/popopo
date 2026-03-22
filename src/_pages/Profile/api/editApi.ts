import { apiController } from '@/shared/config/api/api'

export const edit = async (about: any) => {
	try {
		const response = await apiController(undefined, 'patch', '/api/users', {
			about: about,
		})
		return response
		console.log(response)
	} catch (err) {
		console.error(err)
	}
}
