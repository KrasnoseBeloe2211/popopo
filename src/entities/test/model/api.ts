import { TestsStore } from './store'
import { Test } from './types'
import { apiController } from '@/shared/config/api/api'

export const getTests = async (psychologistId: string) => {
	try {
		const response = await apiController<Test[]>(
			undefined,
			'GET',
			`/api/tests?psychologist_id=${psychologistId}`,
		)
		TestsStore.getState().setTests(response.data)
	} catch (error) {
		console.error('Ошибка загрузки тестов:', error)
	}
}

export const getTestById = async (id: string) => {
	try {
		const response = await apiController<Test>(undefined, 'GET', `/tests/${id}`)
		return response.data
	} catch (error) {
		console.error('Ошибка загрузки теста:', error)
		return null
	}
}

export const createTest = async (testData: Omit<Test, 'id'>) => {
	try {
		const response = await apiController<Test>(
			undefined,
			'POST',
			'/api/tests',
			testData,
		)
		TestsStore.getState().addTest(response.data)
	} catch (error) {
		console.error('Ошибка создания теста:', error)
	}
}

export const updateTest = async (id: string, data: Partial<Test>) => {
	try {
		const response = await apiController<Test>(
			undefined,
			'PUT',
			`/tests/${id}`,
			data,
		)
		TestsStore.getState().updateTest(id, response.data)
	} catch (error) {
		console.error('Ошибка обновления теста:', error)
	}
}

export const deleteTest = async (id: string) => {
	try {
		const response = await apiController<void>(
			undefined,
			'DELETE',
			`/tests/${id}`,
		)
		TestsStore.getState().deleteTest(id)
	} catch (error) {
		console.error('Ошибка удаления теста:', error)
	}
}
