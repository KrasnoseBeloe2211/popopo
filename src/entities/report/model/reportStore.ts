import { create } from 'zustand';
import { getReport } from '../api/getReport';

interface ReportState {
  metrics: Record<string, number>;
  summary: string;
  fetchReport: () => Promise<void>;
}

export const useReportStore = create<ReportState>((set) => ({
  metrics: {},
  summary: '',

  fetchReport: async () => {
    const res = await getReport();

    if (res.succes) {
      set({
        metrics: res.data.metrics,
        summary: res.data.summary,
      });
    }
  },
}));