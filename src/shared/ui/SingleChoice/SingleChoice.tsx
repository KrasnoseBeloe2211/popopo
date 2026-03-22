import { IQuestion, IScale, Option } from '@/entities/test'
import { ArrowDropDown, Delete } from '@mui/icons-material'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormGroup,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material'
import { useState } from 'react'

export const SingleChoice = ({
	data,
	scales,
	onChange,
	question,
	isSession = false,
	isDropped,
}: {
	data: Option[]
	scales: IScale[]
	question: IQuestion
	onChange: any
	isSession?: boolean
	isDropped: boolean
}) => {
	const [selectedValue, setSelectedValue] = useState<string>('')

	const handleWeightChange = (
		optionId: string,
		scaleId: string,
		value: string,
	) => {
		// Преобразуем в число, пустое значение оставляем как 0
		const numericValue = value === '' ? 0 : Number(value)
		const updateOptions =
			data?.map((opt: Option) => {
				if (!opt?.id) return opt
				return opt.id === optionId
					? {
							...opt,
							weights: { ...(opt.weights || {}), [scaleId]: numericValue },
						}
					: opt
			}) || []
		onChange?.({ ...question, options: updateOptions })
	}

	const handleAnswerChange = (value: string, optionId: string) => {
		const updateOptions =
			data?.map((opt: Option) => {
				if (!opt?.id) return opt
				return opt.id === optionId ? { ...opt, text: value } : opt
			}) || []
		onChange?.({ ...question, options: updateOptions })
	}
	const handleDeleteOption = (id: string) => {
		const updateOptions = data?.filter((opt: Option) => opt.id !== id) || []
		onChange?.({ ...question, options: updateOptions })
	}
	return (
		<Box>
			<RadioGroup
				value={selectedValue}
				onChange={e => setSelectedValue(e.target.value)}
			>
				{data?.map((opt: Option) => (
					<Box width={'100%'} key={opt.id}>
						<FormControlLabel
							control={<Radio disabled={!isDropped} value={opt.id} />}
							label={
								<Box
									display={'flex'}
									alignItems={'center'}
									gap={'10px'}
									justifyContent={'space-between'}
								>
									{isSession ? (
										<Typography>{opt.text}</Typography>
									) : (
										<>
											<TextField
												size='small'
												value={opt.text}
												onChange={e =>
													handleAnswerChange(e.target.value, opt.id)
												}
												disabled={!isDropped}
												label='Ответ'
												onClick={e => e.stopPropagation()}
											/>
											<Button
												onClick={e => {
													e.stopPropagation()
													handleDeleteOption(opt.id)
												}}
												disabled={!isDropped}
												variant='outlined'
												color='error'
												sx={{
													minWidth: '40px',
													width: '40px',
													height: '40px',
													borderRadius: '50%',
													padding: 0,
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
												}}
											>
												<Delete sx={{ width: '20px', height: '20px' }} />
											</Button>
										</>
									)}
								</Box>
							}
						/>
						<Accordion>
							<AccordionSummary expandIcon={<ArrowDropDown />}>
								<Box
									width={'100%'}
									display={'flex'}
									alignItems={'center'}
									justifyContent={'space-between'}
								>
									<Typography>Разбалловка по шкалам</Typography>{' '}
								</Box>
							</AccordionSummary>
							<AccordionDetails>
								{scales?.map((scale: IScale) => (
									<TextField
										value={opt.weights?.[scale.id] ?? ''}
										onChange={e =>
											handleWeightChange(opt.id, scale.id, e.target.value)
										}
										disabled={!isDropped}
										key={scale.id}
										type='number'
										label={scale.name}
										size='small'
										sx={{ mr: 1 }}
									/>
								))}
							</AccordionDetails>
						</Accordion>
					</Box>
				))}
			</RadioGroup>
		</Box>
	)
}
