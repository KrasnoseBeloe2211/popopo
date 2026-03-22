import { create } from 'zustand'
import {
	getReport,
	type FileChoice,
	type PersonChoice,
	type IReportResponse,
} from '../api/getReport'

interface ReportState {
	report: IReportResponse | null
	loading: boolean
	error: string | null
	fetchReport: (
		sessionId: string,
		fileChoice?: FileChoice,
		personChoice?: PersonChoice,
	) => Promise<void>
}

export const useReportStore = create<ReportState>(set => ({
	report: null,
	loading: false,
	error: null,

	fetchReport: async (
		sessionId,
		fileChoice = 'pdf',
		personChoice = 'client',
	) => {
		set({ loading: true, error: null })
		try {
			const res = await getReport(sessionId, fileChoice, personChoice)

			if (res && res.data) {
				set({
					report: res.data,
					loading: false,
				})
			} else {
				set({ error: 'Ошибка при загрузке отчёта', loading: false })
			}
		} catch (err) {
			set({
				error: err instanceof Error ? err.message : 'Неизвестная ошибка',
				loading: false,
			})
		}
	},
}))
