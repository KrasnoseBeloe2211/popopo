'use client'

import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { Droppable } from '@/shared/ui/Droppable/Droppable'
import { Draggable } from '@/shared/ui/Draggable/Draggable'
import { QuestionTemplate } from '@/shared/ui/QuestionTemplate/QuestionTemplate'
import { IQuestion, IScale } from '@/entities/test'
import { useIsMobile } from '@/shared/helpers/hooks/useIsMobile'
import { v4 } from 'uuid'

export const QuestionConst = ({
	scales,
	droppedItems,
	setDroppedItems,
}: {
	scales: IScale[]
	droppedItems: IQuestion[]
	setDroppedItems: any
}) => {
	const [dropped, setIsDropped] = useState(false)
	const { isMobile } = useIsMobile()
	const templates: IQuestion[] = [
		{
			id: '1',
			text: 'Ваш вопрос',
			type: 'single_choice',
			options: [{ id: v4(), text: '', weights: {} }],
		},
		{
			id: '2',
			text: 'Ваш вопрос',
			type: 'multi_choice',
			options: [{ id: v4(), text: '', weights: {} }],
		},
	]

	return (
		<Box>
			{/* Заголовок */}
			<Box
				sx={{
					marginBottom: '24px',
					p: 3,
					background: 'rgba(19, 167, 73, 0.05)',
					border: '1px solid rgba(19, 167, 73, 0.2)',
					borderRadius: '20px',
				}}
			>
				<Typography
					variant='h5'
					sx={{
						fontWeight: 600,
						color: '#ffffff',
						marginBottom: '8px',
					}}
				>
					Конструктор вопросов
				</Typography>
				<Typography
					variant='body1'
					sx={{
						color: '#b3b3b3',
						fontSize: '15px',
						lineHeight: 1.6,
					}}
				>
					Перетащите шаблоны в зону ниже
				</Typography>
			</Box>

			<DragDropProvider
				onDragEnd={event => {
					if (event.canceled) return

					const { target, source } = event.operation
					if (target?.id === 'droppable') {
						const template = templates.find(t => t.id === source?.id)
						if (template) {
							setDroppedItems((prev: IQuestion[]) => [
								...prev,
								{
									...template,
									id: v4(),
									options: template.options?.map(opt => ({
										...opt,
										id: v4(),
									})),
								},
							])
							setIsDropped(true)
						}
					}
				}}
			>
				<Box
					gap={'24px'}
					display={'flex'}
					flexDirection={{ xs: 'column', md: 'row' }}
				>
					{/* Шаблоны вопросов */}
					<Box
						sx={{
							flex: '0 0 300px',
						}}
					>
						<Box
							sx={{
								p: 2.5,
								background: 'rgba(19, 167, 73, 0.08)',
								border: '1px solid rgba(19, 167, 73, 0.25)',
								borderRadius: '20px',
							}}
						>
							<Typography
								variant='subtitle1'
								sx={{
									color: '#13a749',
									fontWeight: 600,
									marginBottom: '20px',
									fontSize: '14px',
									textTransform: 'uppercase',
									letterSpacing: '0.8px',
								}}
							>
								Шаблоны
							</Typography>
							<Box display='flex' flexDirection='column' gap={2.5}>
								{templates.map(template => (
									<Draggable key={template.id} id={template.id}>
										<Box
											sx={{
												cursor: 'grab',
												transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
												'&:hover': {
													transform: 'translateX(8px) scale(1.02)',
												},
											}}
										>
											<QuestionTemplate question={template} readOnly />
										</Box>
									</Draggable>
								))}
							</Box>
						</Box>
					</Box>

					{/* Зона для перетаскивания */}
					<Box
						sx={{
							flex: 1,
							minWidth: 0,
						}}
					>
						<Box
							sx={{
								p: 2.5,
								background: 'rgba(19, 167, 73, 0.08)',
								border: '1px solid rgba(19, 167, 73, 0.25)',
								borderRadius: '20px',
								minHeight: '400px',
							}}
						>
							<Typography
								variant='subtitle1'
								sx={{
									color: '#13a749',
									fontWeight: 600,
									marginBottom: '20px',
									fontSize: '14px',
									textTransform: 'uppercase',
									letterSpacing: '0.8px',
								}}
							>
								Вопросы теста
							</Typography>
							<Droppable isDropped={dropped}>
								<Box
									display='flex'
									flexDirection='column'
									gap={2.5}
									sx={{
										minHeight: '320px',
										justifyContent:
											droppedItems.length === 0 ? 'center' : 'flex-start',
									}}
								>
									{droppedItems.length === 0 && (
										<Box
											sx={{
												textAlign: 'center',
												color: '#666',
												fontStyle: 'italic',
												p: 6,
												border: '3px dashed rgba(19, 167, 73, 0.3)',
												borderRadius: '16px',
												background: 'rgba(19, 167, 73, 0.03)',
												transition: 'all 0.3s ease',
												'&:hover': {
													borderColor: 'rgba(19, 167, 73, 0.5)',
													background: 'rgba(19, 167, 73, 0.06)',
												},
											}}
										>
											<Box
												sx={{
													fontSize: '48px',
													marginBottom: '16px',
												}}
											>
												📋
											</Box>
											<Typography
												sx={{
													fontSize: '16px',
													color: '#13a749',
													fontWeight: 500,
												}}
											>
												Перетащите сюда шаблоны вопросов
											</Typography>
											<Typography
												sx={{
													fontSize: '13px',
													color: '#666',
													marginTop: '8px',
												}}
											>
												Просто перетащите любой шаблон из левой колонки
											</Typography>
										</Box>
									)}
									{droppedItems.map((item, index) => (
										<Draggable key={`${item.id}-${index}`} id={item.id}>
											<QuestionTemplate
												scales={scales}
												isDropped={dropped}
												questions={droppedItems}
												question={item}
												Deleted={setDroppedItems}
												onChange={updated => {
													setDroppedItems((prev: IQuestion[]) =>
														prev.map((it, i) => (i === index ? updated : it)),
													)
												}}
											/>
										</Draggable>
									))}
								</Box>
							</Droppable>
						</Box>
					</Box>
				</Box>
			</DragDropProvider>
		</Box>
	)
}
