import { useUserStore } from '@/entities/user/model/store'
import { getTests } from './api'
import { Test } from './types'
import { create } from 'zustand'

interface ITestsStore {
	tests: Test[]
	setTests: (tests: Test[]) => void
	refetch: () => Promise<void>
}

export const TestsStore = create<ITestsStore>(set => ({
	tests: [],
	setTests: tests => set({ tests }),
	refetch: async () => {
		const user = useUserStore.getState().user
		const response = await getTests(user.id)
		//@ts-ignore
		set({ tests: response })
		console.log(response)
	},
}))
