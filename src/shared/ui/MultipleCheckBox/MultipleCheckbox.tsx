import { IQuestion, IScale, Option } from '@/entities/test'
import { ArrowDropDown, Delete } from '@mui/icons-material'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	TextField,
	Typography,
} from '@mui/material'

export const MultipleCheckbox = ({
	data,
	isDropped,
	scales,
	question,
	onChange,
}: {
	data: Option[]
	scales: IScale[]
	isDropped: boolean
	question: IQuestion
	onChange: any
}) => {
	const handleDeleteOption = (id: string) => {
		const updateOptions = data.filter((opt: Option) => opt.id !== id)
		onChange?.({ ...question, options: updateOptions })
	}

	const handleAnswerChange = (value: string, optionId: string) => {
		const updateOptions = data.map((opt: Option) =>
			opt.id === optionId ? { ...opt, text: value } : opt,
		)
		onChange?.({ ...question, options: updateOptions })
	}

	const handleWeightChange = (
		optionId: string,
		scaleId: string,
		value: string,
	) => {
		const updateOptions = data.map((opt: Option) =>
			opt.id === optionId
				? { ...opt, weights: { ...opt.weights, [scaleId]: value } }
				: opt,
		)
		onChange?.({ ...question, options: updateOptions })
	}

	return (
		<Box>
			{data.map((opt: Option) => (
				<Box key={opt.id}>
					<Box display='flex' alignItems='flex-start' gap={1}>
						<FormControlLabel
							control={<Checkbox disabled={!isDropped} />}
							label={
								<TextField
									size='small'
									disabled={!isDropped}
									label='Ответ'
									value={opt.text}
									onChange={e => handleAnswerChange(e.target.value, opt.id)}
								/>
							}
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
								justifyContent: 'center'
							}}
						>
							<Delete sx={{ width: '20px', height: '20px' }} />
						</Button>
					</Box>
					<Accordion>
						<AccordionSummary expandIcon={<ArrowDropDown />}>
							<Typography>Разбалловка по шкалам</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{scales?.length > 0 && (
								<Box sx={{ mb: 1 }}>
									<Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
										{scales.map((scale: IScale) => (
											<Box
												key={scale.id}
												sx={{
													flex: 1,
													minWidth: '100px',
													p: 1,
													bgcolor: '#f5f5f5',
													borderRadius: 1,
													textAlign: 'center',
												}}
											>
												<Typography variant='caption' fontWeight='bold'>
													{scale.name}
												</Typography>
											</Box>
										))}
									</Box>
								</Box>
							)}
							{scales?.map((scale: IScale) => (
								<TextField
									value={opt.weights[scale.id]}
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
		</Box>
	)
}
