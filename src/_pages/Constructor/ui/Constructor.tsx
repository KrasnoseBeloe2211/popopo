'use client'

import { IQuestion, IScale } from '@/entities/test'
import { createTest } from '@/entities/test/model/api'
import { useUserStore } from '@/entities/user/model/store'

import { AddScale, QuestionConst, ScalesView } from '@/widjets'

import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'

export const Constructor = () => {
	const [scales, setScales] = useState<IScale[]>([])
	const [droppedItems, setDroppedItems] = useState<IQuestion[]>([])
	const { user } = useUserStore()
	const request: any = {
		psychologist_id: user.id,
		title: 'qwery',
		description: 'deasdadadadasdasasdas',
		schema: { scales: scales, questions: droppedItems },
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
					maxWidth: '1200px',
					margin: '0 auto',
				}}
			>
				{/* Заголовок */}
				<Box
					sx={{
						marginBottom: '40px',
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
						Конструктор тестов
					</Typography>
					<Typography
						variant='body1'
						sx={{
							color: '#b3b3b3',
							fontSize: '16px',
							maxWidth: '600px',
							margin: '0 auto',
							lineHeight: 1.6,
						}}
					>
						Создавайте шкалы оценки и формируйте вопросы для тестирования
					</Typography>
				</Box>

				{/* Секция шкал */}
				<Box
					sx={{
						marginBottom: '32px',
						p: { xs: 3, md: 4 },
						background: 'rgba(19, 167, 73, 0.05)',
						border: '1px solid rgba(19, 167, 73, 0.2)',
						borderRadius: '16px',
					}}
				>
					<AddScale setScales={setScales} scales={scales} />
					{!scales.length && (
						<Typography
							sx={{
								color: '#666',
								textAlign: 'center',
								fontStyle: 'italic',
							}}
						>
							Шкалы пока не добавлены
						</Typography>
					)}
				</Box>

				{/* Просмотр шкал */}
				{scales.length > 0 && (
					<Box sx={{ marginBottom: '32px' }}>
						<ScalesView scales={scales} />
					</Box>
				)}

				{/* Конструктор вопросов */}
				<Box
					sx={{
						marginBottom: '32px',
						p: { xs: 3, md: 4 },
						background: 'rgba(19, 167, 73, 0.05)',
						border: '1px solid rgba(19, 167, 73, 0.2)',
						borderRadius: '16px',
					}}
				>
					<QuestionConst
						droppedItems={droppedItems}
						setDroppedItems={setDroppedItems}
						scales={scales}
					/>
				</Box>

				{/* Кнопка создания */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						mt: 6,
						mb: 4,
					}}
				>
					<Button
						onClick={() => {
							createTest(request)
						}}
						variant='contained'
						sx={{
							background: '#13a749',
							color: '#ffffff',
							padding: '16px 48px',
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
						Создать тест
					</Button>
				</Box>
			</Box>
		</Box>
	)
}
