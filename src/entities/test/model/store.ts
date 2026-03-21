import { Test } from "./types"
import { create } from 'zustand'

interface ITestsStore {
	tests: Test[];
	loading: boolean;
	error: string | null;

	setTests: (tests: Test[]) => void
	addTest: (test: Test) => void
	updateTest: (id: string, updatedTest: Partial<Test>) => void
	deleteTest: (id: string) => void
}

export const TestsStore = create<ITestsStore>((set) => ({
	tests: [],
	loading: false,
	error: null,

	setTests: (tests) => set({ tests }),

	addTest: (test) => set((state) => ({
		tests: [...state.tests, test]
	})),

	updateTest: (id, updatedTest) => set((state) => ({
		tests: state.tests.map((test) =>
			test.id === id ? { ...test, ...updatedTest } : test
		)
	})),

	deleteTest: (id) => set((state) => ({
		tests: state.tests.filter((test) => test.id !== id)
	})),
}));