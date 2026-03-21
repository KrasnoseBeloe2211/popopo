import { IQuestion, IScale, Option } from '@/entities/test'
import { NumberField } from '@base-ui/react/number-field'
import {
	Box,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@mui/material'
import { MultipleCheckbox } from '../MultipleCheckBox/MultipleCheckbox'
import { SingleChoice } from '../SingleChoice/SingleChoice'
import { ArrowDropDown, Delete } from '@mui/icons-material'
import { v4 } from 'uuid'

interface QuestionTemplateProps {
	question: IQuestion
	onChange?: (value: IQuestion) => void
	Deleted?: any
	readOnly?: boolean
	isDropped?: boolean
	questions?: IQuestion[]
	scales?: IScale[]
}

export const QuestionTemplate = ({
	question,
	onChange,
	Deleted,
	scales,
	questions,
	isDropped,
	readOnly = false,
}: QuestionTemplateProps) => {
	const handleAddOption = (options: any) => {
		const currentOpts = options || []

		onChange?.({
			...question,
			options: [...currentOpts, { id: v4(), text: '', weights: {} }],
		})

		// onChange?.({
		// 	...question,
		// 	options: [...options, { id: v4(), text: '', weights: {} }],
		// })
		const currentOptions = question.options
	}
	const handleDeleteQuestion = (id: string) => {
		if (questions && Deleted) {
			const updatedQuestions = questions.filter(
				(quest: IQuestion) => quest.id !== id,
			)
			Deleted(updatedQuestions)
		}
	}

	return (
		<Box p={2} border='1px solid #ccc' borderRadius={1} sx={(theme)=>({backgroundColor:theme.palette.background.paper})} width='100%'>
			<Box marginY={'10px'} display={'flex'} gap={'10px'} alignItems={'center'}>
				<TextField
					disabled={!isDropped}
					fullWidth
					label='Текст вопроса'
					value={question.text}
					onChange={e => onChange?.({ ...question, text: e.target.value })}
					size='small'
				/>
				<Button
					onClick={e => {
						e.stopPropagation()
						handleDeleteQuestion(question.id)
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
			</Box>
			{question.type === 'single_choice' ? (
				<Box
					marginBottom={'10px'}
					boxShadow={'4px 4px 8px 0px rgba(34, 60, 80, 0.2)'}
				>
					<SingleChoice
						question={question}
						onChange={onChange}
						scales={scales || []}
						isDropped={isDropped || false}
						data={
							question.options || [
								{ id: v4().split('-')[1], text: '', weights: {} },
							]
						}
					/>
				</Box>
			) : (
				<Box
					boxShadow={'4px 4px 8px 0px rgba(34, 60, 80, 0.2)'}
					marginBottom={'10px'}
				>
					<MultipleCheckbox
						question={question}
						onChange={onChange}
						scales={scales || []}
						isDropped={isDropped || false}
						data={
							question.options || [
								{ id: v4().split('-')[1], text: '', weights: {} },
							]
						}
					/>
				</Box>
			)}
			<Box display={'flex'}>
				<Button
					onClick={e => {
						e.stopPropagation()
						handleAddOption(question.options)
					}}
					disabled={!isDropped}
					variant='contained'
					sx={{ width: '10px', height: '60px', borderRadius: '100%' }}
				>
					<Typography variant='h4'>+</Typography>
				</Button>
			</Box>
		</Box>
	)
}
