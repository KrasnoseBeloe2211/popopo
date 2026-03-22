import { apiController } from '@/shared/config/api/api';
import type { Method } from 'axios';

export type FileChoice = 'docx' | 'pdf';
export type PersonChoice = 'client' | 'expert';

export interface IReportResponse {
	metrics: Record<string, number>;
	summary: string;
}

export const getReport = async (
	sessionId: string,
	fileChoice: FileChoice = 'pdf',
	personChoice: PersonChoice = 'client',
) => {
	const endpoint = `/api/client/session/${sessionId}/result`;
	const params = {
		file_choice: fileChoice,
		person_choice: personChoice,
	};

	return await apiController<IReportResponse>(
		undefined,
		'GET' as Method,
		endpoint,
		undefined,
		params,
	);
};