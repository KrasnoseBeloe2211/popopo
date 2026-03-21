'use client'

import { IQuestion, IScale } from '@/entities/test'
import { createTest } from '@/entities/test/model/api'
import { useUserStore } from '@/entities/user/model/store'
import { apiController } from '@/shared/config/api/api'
import { AddScale, QuestionConst, ScalesView } from '@/widjets'
import { Box, Button } from '@mui/material'
import { useState } from 'react'

export const Constructor = () => {
	const [scales, setScales] = useState<IScale[]>([])
	const [droppedItems, setDroppedItems] = useState<IQuestion[]>([])
	const { user } = useUserStore()
	const request: any = {
		psychologist_id: user.id,
		title: 'qwery',
		description: 'des',
		schema: { scales: scales, questions: droppedItems },
	}
	return (
		<Box>
			<AddScale setScales={setScales} scales={scales} />
			<ScalesView scales={scales} />
			<QuestionConst
				droppedItems={droppedItems}
				setDroppedItems={setDroppedItems}
				scales={scales}
			/>
			<Button
				onClick={() => {
					createTest(request)
				}}
				sx={{ margin: 'auto' }}
				variant='contained'
			>
				Создать тест
			</Button>
		</Box>
	)
}
