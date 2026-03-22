import { apiController } from '@/shared/config/api/api'
import type { Method } from 'axios'

export type FileChoice = 'docx' | 'pdf'
export type PersonChoice = 'client' | 'expert'

export interface IReportResponse {
	conclusion: string
	file_name: string
	file_data: string
	content_type: string
}

export const getReport = async (
	sessionId: string,
	fileChoice: FileChoice = 'pdf',
	personChoice: PersonChoice = 'client',
) => {
	const endpoint = `/api/client/session/${sessionId}/result`
	const params = {
		file_type: fileChoice,
		person_type: personChoice,
	}

	return await apiController<IReportResponse>(
		undefined,
		'GET' as Method,
		endpoint,
		undefined,
		params,
	)
}
