'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useReportStore } from '@/entities/report/model/reportStore'
import {
	Card,
	CardContent,
	Typography,
	Box,
	CircularProgress,
} from '@mui/material'

export default function Page() {
	const { sessionId } = useParams()
	const { report, fetchReport, loading, error } = useReportStore()

	useEffect(() => {
		if (sessionId) {
			fetchReport(sessionId as string, 'pdf', 'client')
		}
	}, [sessionId, fetchReport])

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
				<CircularProgress />
			</Box>
		)
	}

	if (error || !report) {
		return (
			<Card>
				<CardContent>
					<Typography color='error'>{error || 'Отчёт не найден'}</Typography>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardContent>
				<Typography variant='h5'>Ваш результат</Typography>
				<Typography sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
					{report.conclusion || 'Заключение отсутствует'}
				</Typography>
			</CardContent>
		</Card>
	)
}
