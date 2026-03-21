'use client'

import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	TextField,
	Typography,
} from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'
import { useState } from 'react'
import { v4 } from 'uuid'
import { IScale } from '@/entities/test'

export const AddScale = ({
	scales,
	setScales,
}: {
	scales: IScale[]
	setScales: any
}) => {
	const [scale, setScale] = useState<IScale>({
		id: v4(),
		name: '',
		max: 0,
		levels: [
			{ id: 'low', score_from: 0, score_to: 0, text_client: '', text_pro: '' },
			{ id: 'mid', score_from: 0, score_to: 0, text_client: '', text_pro: '' },
			{ id: 'high', score_from: 0, score_to: 0, text_client: '', text_pro: '' },
		],
	})

	const handleChangeLevel = (id: string, value: string, field: string) => {
		setScale(prev => ({
			...prev,
			levels: prev.levels.map(level =>
				level.id === id
					? {
							...level,
							[field]:
								field === 'score_from' || field === 'score_to'
									? Number(value)
									: value,
						}
					: level,
			),
		}))
	}

	console.log(scales)
	return (
		<Box marginBottom={'20px'}>
			<Typography variant='h4'>Создание шкал</Typography>
			<Typography
				sx={{ color: 'text.secondary', marginBottom: '20px' }}
				variant='body1'
			>
				Заполните поля для составления оценки
			</Typography>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'start'}
				flexWrap={'wrap'}
			>
				<TextField
					value={scale.name}
					onChange={e => {
						setScale({ ...scale, name: e.target.value })
					}}
					label='Название шкалы'
				/>
				<TextField
					type='number'
					onChange={e => {
						setScale({ ...scale, max: Number(e.target.value) })
					}}
					label='Макс. балл'
				/>
				<Box width={'40%'} height={'fit'} position={'relative'}>
					<Accordion sx={{ position: 'absolute', zIndex: '100' }}>
						<AccordionSummary  expandIcon={<ArrowDropDown />}>
							<Typography variant='h6'>
								Разбивка уровней заинтересованности
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant='h6'>Низкий</Typography>
							<Box
								display={'flex'}
								alignItems={'center'}
								justifyContent={'space-between'}
								gap={'20px'}
							>
								<TextField
									type='number'
									value={scale.levels[0].score_from}
									onChange={e => {
										handleChangeLevel(
											scale.levels[0].id,
											e.target.value,
											'score_from',
										)
									}}
									label='От'
								/>

								<TextField
									type='number'
									value={scale.levels[0].score_to}
									onChange={e => {
										handleChangeLevel(
											scale.levels[0].id,
											e.target.value,
											'score_to',
										)
									}}
									label='До'
								/>
							</Box>
							<Box
								display={'flex'}
								marginY={'20px'}
								alignItems={'center'}
								justifyContent={'space-between'}
								gap={'20px'}
							>
								<TextField
									fullWidth
									type='text'
									value={scale.levels[0].text_pro}
									onChange={e => {
										handleChangeLevel(
											scale.levels[0].id,
											e.target.value,
											'text_pro',
										)
									}}
									multiline
									label='Сообщение в отчет'
								/>

								<TextField
									fullWidth
									type='text'
									multiline
									value={scale.levels[0].text_client}
									onChange={e => {
										handleChangeLevel(
											scale.levels[0].id,
											e.target.value,
											'text_client',
										)
									}}
									label='Сообщение клиенту'
								/>
							</Box>
							<Typography variant='h6'>Средний</Typography>
							<Box
								display={'flex'}
								alignItems={'center'}
								justifyContent={'space-between'}
							>
								<TextField
									type='number'
									onChange={e => {
										handleChangeLevel(
											scale.levels[1].id,
											e.target.value,
											'score_from',
										)
									}}
									label='От'
								/>

								<TextField
									value={scale.levels[1].score_to}
									onChange={e => {
										handleChangeLevel(
											scale.levels[1].id,
											e.target.value,
											'score_to',
										)
									}}
									type='number'
									label='До'
								/>
							</Box>
							<Box
								display={'flex'}
								marginY={'20px'}
								alignItems={'center'}
								justifyContent={'space-between'}
								gap={'20px'}
							>
								<TextField
									fullWidth
									type='text'
									value={scale.levels[1].text_pro}
									onChange={e => {
										handleChangeLevel(
											scale.levels[1].id,
											e.target.value,
											'text_pro',
										)
									}}
									multiline
									label='Сообщение в отчет'
								/>

								<TextField
									fullWidth
									type='text'
									multiline
									value={scale.levels[1].text_client}
									onChange={e => {
										handleChangeLevel(
											scale.levels[1].id,
											e.target.value,
											'text_client',
										)
									}}
									label='Сообщение клиенту'
								/>
							</Box>
							<Typography variant='h6'>Высокий</Typography>

							<Box
								display={'flex'}
								alignItems={'center'}
								justifyContent={'space-between'}
							>
								<TextField
									type='number'
									value={scale.levels[2].score_from}
									onChange={e => {
										handleChangeLevel(
											scale.levels[2].id,
											e.target.value,
											'score_from',
										)
									}}
									label='От'
								/>
								<TextField
									type='number'
									value={scale.levels[2].score_to}
									onChange={e => {
										handleChangeLevel(
											scale.levels[2].id,
											e.target.value,
											'score_to',
										)
									}}
									label='До'
								/>
							</Box>
							<Box
								display={'flex'}
								marginY={'20px'}
								alignItems={'center'}
								justifyContent={'space-between'}
								gap={'20px'}
							>
								<TextField
									fullWidth
									type='text'
									value={scale.levels[2].text_client}
									onChange={e => {
										handleChangeLevel(
											scale.levels[2].id,
											e.target.value,
											'text_pro',
										)
									}}
									multiline
									label='Сообщение в отчет'
								/>

								<TextField
									fullWidth
									type='text'
									multiline
									value={scale.levels[2].text_client}
									onChange={e => {
										handleChangeLevel(
											scale.levels[2].id,
											e.target.value,
											'text_client',
										)
									}}
									label='Сообщение клиенту'
								/>
							</Box>
						</AccordionDetails>
					</Accordion>
				</Box>
				<Button
					variant='contained'
					onClick={() => setScales([...scales, scale])}
				>
					Добавить
				</Button>
			</Box>
		</Box>
	)
}
