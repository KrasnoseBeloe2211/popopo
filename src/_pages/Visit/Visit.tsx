'use client'

import { ProfileAbout, ProfileSidebar } from '@/features/profile'
import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getVisit } from './api/api'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

export const Visit = ({ id }: any) => {
	const [visit, setVisit] = useState<any>()

	const fetchVisit = async () => {
		const response: any = await getVisit(id)
		setVisit(response)
	}

	useEffect(() => {
		fetchVisit()
	}, [])

	if (!visit) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
				}}
			>
				<Typography>Загрузка...</Typography>
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
			{/* Заголовок страницы */}
			<Box
				sx={{
					marginBottom: '32px',
					display: 'flex',
					justifyContent: 'space-between',
          flexDirection:'column',
					alignItems: 'center',
					flexWrap: 'wrap',
					gap: '16px',
				}}
			>
				<Box>
					<Typography
						variant='h3'
						sx={{
							fontWeight: 600,
							color: '#ffffff',
							marginBottom: '8px',
						}}
					>
						Визитка психолога
					</Typography>
					<Typography
						variant='body1'
						sx={{
							color: '#b3b3b3',
						}}
					>
						Информация о специалисте
					</Typography>
				</Box>
			</Box>

			{/* Основной контент */}
			<Grid container spacing={4}>
				{/* Левая колонка - Sidebar */}
				<Grid size={{ xs: 12, md: 4 }}>
					<ProfileSidebar
						id={id}
						photoUrl={visit?.photoUrl}
						fullName={visit?.fullname}
						email={visit?.email}
					/>
				</Grid>

				{/* Правая колонка - Основной контент */}
				<Grid size={{ xs: 12, md: 8 }}>
					<Box
						sx={{
							background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)',
							borderRadius: '24px',
							padding: '32px',
							border: '1px solid rgba(19, 167, 73, 0.3)',
						}}
					>
						{/* Заголовок */}
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: '24px',
							}}
						>
							<Typography
								variant='h5'
								sx={{
									fontWeight: 600,
									color: '#ffffff',
								}}
							>
								О себе
							</Typography>
						</Box>

						<Box
							sx={{
								color: '#b3b3b3',
								fontSize: '16px',
								minHeight: '100px',
								'& h1': {
									fontSize: '28px',
									fontWeight: 600,
									marginBottom: '16px',
									color: '#ffffff',
								},
								'& h2': {
									fontSize: '22px',
									fontWeight: 600,
									marginBottom: '12px',
									color: '#ffffff',
								},
								'& h3': {
									fontSize: '18px',
									fontWeight: 600,
									marginBottom: '8px',
									color: '#ffffff',
								},
								'& p': { marginBottom: '12px', lineHeight: 1.8 },
								'& strong': { fontWeight: 600, color: '#ffffff' },
								'& em': { fontStyle: 'italic' },
								'& ul': { paddingLeft: '24px', marginBottom: '12px' },
								'& ol': { paddingLeft: '24px', marginBottom: '12px' },
								'& li': { marginBottom: '8px' },
								'& blockquote': {
									borderLeft: '3px solid #13a749',
									paddingLeft: '16px',
									margin: '16px 0',
									color: '#13a749',
									fontStyle: 'italic',
								},
								'& code': {
									background: 'rgba(19, 167, 73, 0.1)',
									padding: '2px 6px',
									borderRadius: '4px',
									fontFamily: 'monospace',
									color: '#13a749',
								},
								'& pre': {
									background: 'rgba(0, 0, 0, 0.3)',
									padding: '16px',
									borderRadius: '8px',
									overflow: 'auto',
									marginBottom: '12px',
								},
								'& a': { color: '#13a749', textDecoration: 'underline' },
								'& hr': {
									borderColor: 'rgba(19, 167, 73, 0.3)',
									margin: '24px 0',
								},
							}}
						>
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{visit?.about || 'Описание отсутствует'}
							</ReactMarkdown>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}
