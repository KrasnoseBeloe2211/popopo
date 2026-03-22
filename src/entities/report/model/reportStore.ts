import { create } from 'zustand';
import { getReport, type FileChoice, type PersonChoice } from '../api/getReport';

interface ReportState {
	metrics: Record<string, number>;
	summary: string;
	loading: boolean;
	error: string | null;
	fetchReport: (
		sessionId: string,
		fileChoice?: FileChoice,
		personChoice?: PersonChoice,
	) => Promise<void>;
}

export const useReportStore = create<ReportState>(set => ({
	metrics: {},
	summary: '',
	loading: false,
	error: null,

	fetchReport: async (
		sessionId,
		fileChoice = 'pdf',
		personChoice = 'client',
	) => {
		set({ loading: true, error: null });
		try {
			const res = await getReport(sessionId, fileChoice, personChoice);

			if (res.success && res.data) {
				set({
					metrics: res.data.metrics,
					summary: res.data.summary,
					loading: false,
				});
			} else {
				set({ error: res.error || 'Ошибка при загрузке отчёта', loading: false });
			}
		} catch (err) {
			set({
				error: err instanceof Error ? err.message : 'Неизвестная ошибка',
				loading: false,
			});
		}
	},
}));