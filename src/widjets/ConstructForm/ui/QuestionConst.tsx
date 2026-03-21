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
	console.log(droppedItems)
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
			<Typography variant='h4'>Конструктор вопросов</Typography>
			<Typography variant='body1' color='text.secondary' mb={2}>
				Перетащите шаблоны в зону ниже
			</Typography>
			<DragDropProvider
				onDragEnd={event => {
					if (event.canceled) return

					const { target, source } = event.operation
					if (target?.id === 'droppable') {
						const template = templates.find(t => t.id === source?.id)
						if (template) {
							setDroppedItems((prev: IQuestion[]) => [
								...prev,
								{ ...template, id: `${v4().split('-')[1]}` },
							])
							setIsDropped(true)
						}
					}
				}}
			>
				<Box gap={'10px'} display={'flex'}>
					<Box mb={2}>
						{templates.map(template => (
							<Draggable key={template.id} id={template.id}>
								<QuestionTemplate question={template} readOnly />
							</Draggable>
						))}
					</Box>
					<Droppable isDropped={dropped}>
						<Box display='flex' flexDirection='column' gap={2}>
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
			</DragDropProvider>
		</Box>
	)
}
