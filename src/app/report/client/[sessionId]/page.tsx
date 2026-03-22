'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useReportStore } from '@/entities/report/model/reportStore'
import {
	Card,
	CardContent,
	Typography,
	Box,
	Button,
	CircularProgress,
	Divider,
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import DescriptionIcon from '@mui/icons-material/Description'

export default function ClientReportPage() {
	const { sessionId } = useParams()
	const { report, loading, error, fetchReport } = useReportStore()
	const [pdfUrl, setPdfUrl] = useState<string | null>(null)

	useEffect(() => {
		if (sessionId) {
			fetchReport(sessionId as string, 'pdf', 'client')
		}
	}, [sessionId, fetchReport])

	useEffect(() => {
		if (report?.file_data && report?.content_type) {
			// Создаём URL из base64 данных
			const byteCharacters = atob(report.file_data)
			const byteNumbers = new Array(byteCharacters.length)
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i)
			}
			const byteArray = new Uint8Array(byteNumbers)
			const blob = new Blob([byteArray], { type: report.content_type })
			const url = URL.createObjectURL(blob)
			setPdfUrl(url)

			return () => {
				if (url) {
					URL.revokeObjectURL(url)
				}
			}
		}
	}, [report])

	const handleDownload = () => {
		if (pdfUrl && report?.file_name) {
			const link = document.createElement('a')
			link.href = pdfUrl
			link.download = report.file_name
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		}
	}

	if (loading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
					background: 'linear-gradient(145deg, #0a0a0a 0%, #111111 100%)',
				}}
			>
				<CircularProgress sx={{ color: '#13a749' }} />
			</Box>
		)
	}

	if (error || !report) {
		return (
			<Box
				sx={{
					p: 4,
					textAlign: 'center',
					minHeight: '100vh',
					background: 'linear-gradient(145deg, #0a0a0a 0%, #111111 100%)',
				}}
			>
				<Typography color='error' variant='h6'>
					{error || 'Отчёт не найден'}
				</Typography>
			</Box>
		)
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				background: 'linear-gradient(145deg, #0a0a0a 0%, #111111 100%)',
				p: { xs: 2, md: 4 },
			}}
		>
			<Box
				sx={{
					maxWidth: '800px',
					margin: '0 auto',
				}}
			>
				{/* Заголовок */}
				<Box
					sx={{
						marginBottom: '32px',
						textAlign: 'center',
					}}
				>
					<Typography
						variant='h3'
						sx={{
							fontWeight: 600,
							color: '#ffffff',
							marginBottom: '16px',
						}}
					>
						Результаты тестирования
					</Typography>
					<Typography
						variant='body1'
						sx={{
							color: '#b3b3b3',
							fontSize: '16px',
						}}
					>
						Ваш персональный отчёт по итогам опросника
					</Typography>
				</Box>

				{/* Карточка с заключением */}
				<Card
					sx={{
						marginBottom: '24px',
						background: 'rgba(19, 167, 73, 0.05)',
						border: '1px solid rgba(19, 167, 73, 0.2)',
						borderRadius: '20px',
					}}
				>
					<CardContent sx={{ p: 4 }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 2,
								marginBottom: 3,
							}}
						>
							<DescriptionIcon
								sx={{
									fontSize: 32,
									color: '#13a749',
								}}
							/>
							<Typography
								variant='h5'
								sx={{
									fontWeight: 600,
									color: '#ffffff',
								}}
							>
								Заключение
							</Typography>
						</Box>
						<Divider
							sx={{
								mb: 3,
								backgroundColor: 'rgba(19, 167, 73, 0.3)',
							}}
						/>
						<Typography
							sx={{
								color: '#e0e0e0',
								fontSize: '16px',
								lineHeight: 1.8,
								whiteSpace: 'pre-wrap',
							}}
						>
							{report.conclusion || 'Заключение отсутствует'}
						</Typography>
					</CardContent>
				</Card>

				{/* Карточка для скачивания PDF */}
				<Card
					sx={{
						background: 'rgba(19, 167, 73, 0.05)',
						border: '1px solid rgba(19, 167, 73, 0.2)',
						borderRadius: '20px',
					}}
				>
					<CardContent
						sx={{
							p: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 3,
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 2,
							}}
						>
							<DownloadIcon
								sx={{
									fontSize: 32,
									color: '#13a749',
								}}
							/>
							<Typography
								variant='h5'
								sx={{
									fontWeight: 600,
									color: '#ffffff',
								}}
							>
								Полный отчёт
							</Typography>
						</Box>

						<Typography
							sx={{
								color: '#b3b3b3',
								fontSize: '14px',
								textAlign: 'center',
							}}
						>
							Скачайте подробный отчёт в формате PDF
						</Typography>

						{pdfUrl && (
							<Box
								sx={{
									display: 'flex',
									gap: 2,
									flexWrap: 'wrap',
									justifyContent: 'center',
								}}
							>
								<Button
									variant='contained'
									onClick={handleDownload}
									startIcon={<DownloadIcon />}
									sx={{
										background: '#13a749',
										color: '#ffffff',
										padding: '14px 28px',
										borderRadius: '14px',
										textTransform: 'none',
										fontWeight: 600,
										fontSize: '16px',
										'&:hover': {
											background: '#0f8a3b',
											transform: 'translateY(-2px)',
											boxShadow: '0 8px 24px rgba(19, 167, 73, 0.4)',
										},
										boxShadow: '0 4px 16px rgba(19, 167, 73, 0.3)',
									}}
								>
									Скачать PDF
								</Button>

								{pdfUrl && (
									<Button
										variant='outlined'
										onClick={() => window.open(pdfUrl, '_blank')}
										sx={{
											color: '#13a749',
											borderColor: '#13a749',
											padding: '14px 28px',
											borderRadius: '14px',
											textTransform: 'none',
											fontWeight: 600,
											fontSize: '16px',
											'&:hover': {
												background: 'rgba(19, 167, 73, 0.1)',
												borderColor: '#0f8a3b',
											},
										}}
									>
										Открыть в новой вкладке
									</Button>
								)}
							</Box>
						)}

						{report?.file_name && (
							<Typography
								sx={{
									color: '#666',
									fontSize: '13px',
									mt: 1,
								}}
							>
								{report.file_name}
							</Typography>
						)}
					</CardContent>
				</Card>
			</Box>
		</Box>
	)
}
