import { toast } from 'react-toastify'
import { TestsStore } from './store'
import { Test } from './types'
import { apiController } from '@/shared/config/api/api'
import type { IResponse } from '@/shared/config/api/api'

export const createTest = async (e: any) => {
	try {
		const response = await apiController(undefined, 'POST', '/api/tests', e)
	} catch (err) {
		console.error(err)
		toast.error('Не удалось создать тест')
	}
}

export const getTests = async (
	id: string,
): Promise<IResponse<Test[]> | undefined> => {
	try {
		const response = await apiController<Test[]>(
			undefined,
			'GET',
			`/api/tests?${id}`,
		)

		return response
	} catch (err) {
		console.error(err)
		toast.error('Не удалось получить тесты')
	}
}

export const getMyTest = async (
	sessionId: string,
): Promise<IResponse<Test> | undefined> => {
	try {
		const response = await apiController<Test>(
			undefined,
			'GET',
			`/api/client/session/${sessionId}`,
		)
		return response
	} catch (err) {
		console.error(err)
		toast.error('Не удалось получить тест')
	}
}
