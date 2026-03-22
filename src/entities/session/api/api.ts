import { apiController } from '@/shared/config/api/api'
import type { ISessionResponse } from '../model/types'
import { baseUrl } from '@/shared/params'

export const generateSession = async (
	test_id: string,
): Promise<string | undefined> => {
	try {
		const response: any = await apiController<ISessionResponse>(
			undefined,
			'POST',
			`/api/tests/${test_id}/links`,
		)
		// return baseUrl + '/session/' + response.id
		return 'http://localhost:3000' + '/session/' + response.id
	} catch (error) {
		console.error(error)
	}
}
