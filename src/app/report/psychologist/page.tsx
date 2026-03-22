// 'use client'

// import { useEffect } from 'react'
// import { useReportStore } from '@/entities/report/model/reportStore'
// import { toChartData } from '@/entities/report/lib/transform'
// import { BarChartBlock } from '@/shared/ui/charts/BarChart'
// import { RadarChartBlock } from '@/shared/ui/charts/RadarChart'
// import {
// 	Card,
// 	CardContent,
// 	Typography,
// 	Box,
// 	Grid,
// 	CircularProgress,
// } from '@mui/material'
// import { useSearchParams } from 'next/navigation'

// export default function PsychologistReportPage() {
// 	const { metrics, fetchReport, loading, error } = useReportStore()
// 	const searchParams = useSearchParams()
// 	const sessionId = searchParams.get('sessionId')

// 	useEffect(() => {
// 		if (sessionId) {
// 			fetchReport(sessionId)
// 		}
// 	}, [sessionId, fetchReport])

// 	if (loading) {
// 		return (
// 			<Box
// 				sx={{
// 					display: 'flex',
// 					justifyContent: 'center',
// 					alignItems: 'center',
// 					minHeight: '100vh',
// 				}}
// 			>
// 				<CircularProgress />
// 			</Box>
// 		)
// 	}

// 	if (error || !sessionId) {
// 		return (
// 			<Box sx={{ p: 3, textAlign: 'center' }}>
// 				<Typography color='error'>{error || 'Не указан sessionId'}</Typography>
// 			</Box>
// 		)
// 	}

// 	const data = toChartData(metrics)

// 	return (
// 		<Box className='report-page'>
// 			<Box className='report-header'>
// 				<Typography variant='h4' className='report-title'>
// 					Отчёт для психолога
// 				</Typography>
// 				<Typography variant='body1' className='report-subtitle'>
// 					Показатели метрик клиента
// 				</Typography>
// 			</Box>

// 			<Grid container spacing={3}>
// 				<Grid size={{ xs: 12, md: 6 }}>
// 					<Card className='report-card'>
// 						<CardContent>
// 							<Typography variant='h6' className='card-title'>
// 								Диаграмма показателей
// 							</Typography>
// 							<RadarChartBlock data={data} />
// 						</CardContent>
// 					</Card>
// 				</Grid>

// 				<Grid size={{ xs: 12, md: 6 }}>
// 					<Card className='report-card'>
// 						<CardContent>
// 							<Typography variant='h6' className='card-title'>
// 								Сравнение метрик
// 							</Typography>
// 							<BarChartBlock data={data} />
// 						</CardContent>
// 					</Card>
// 				</Grid>

// 				<Grid size={{ xs: 12 }}>
// 					<Card className='report-card'>
// 						<CardContent>
// 							<Typography variant='h6' className='card-title'>
// 								Числовые значения
// 							</Typography>
// 							<Box className='metrics-table'>
// 								<Box className='metrics-table-header'>
// 									<Typography>Метрика</Typography>
// 									<Typography>Значение</Typography>
// 								</Box>
// 								{data.map(item => (
// 									<Box key={item.name} className='metrics-table-row'>
// 										<Typography className='metric-name'>{item.name}</Typography>
// 										<Typography className='metric-value'>
// 											{item.value}%
// 										</Typography>
// 									</Box>
// 								))}
// 							</Box>
// 						</CardContent>
// 					</Card>
// 				</Grid>
// 			</Grid>
// 		</Box>
// 	)
// }
