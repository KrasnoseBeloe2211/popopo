import { IQuestion, IScale } from '@/entities/test'
import { ArrowDropDown } from '@mui/icons-material'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Typography,
	Divider,
} from '@mui/material'

export const ScalesView = ({ scales }: { scales: IScale[] }) => {
	return (
		<Box>
			<Accordion>
				<AccordionSummary expandIcon={<ArrowDropDown />}>
					<Typography variant='h6'>Все шкалы</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{scales.map((scale: IScale) => (
						<Box key={scale.id} mb={3}>
							<Box display={'flex'} flexDirection={'column'} gap={1} mb={2}>
								<Typography variant='h6'>Шкала: {scale.name}</Typography>
								<Typography variant='body1'>
									Макс. балл: <strong>{scale.max}</strong>
								</Typography>
							</Box>
							<Typography variant='subtitle1' fontWeight='bold' mb={1}>
								Уровни:
							</Typography>
							{scale.levels.map((level, index) => (
								<Box
									key={level.id}
									mb={2}
									p={2}
									bgcolor='#f5f5f5'
									borderRadius={1}
								>
									<Typography variant='body2' color='text.secondary' mb={1}>
										{index === 0
											? 'Низкий'
											: index === 1
												? 'Средний'
												: 'Высокий'}
									</Typography>
									<Box display={'flex'} gap={3}>
										<Typography variant='body2'>
											От: <strong>{level.score_from}</strong>
										</Typography>
										<Typography variant='body2'>
											До: <strong>{level.score_to}</strong>
										</Typography>
									</Box>
									{level.text_client && (
										<Typography variant='body2' mt={1}>
											Для клиента: {level.text_client}
										</Typography>
									)}
									{level.text_pro && (
										<Typography variant='body2'>
											Для психолога: {level.text_pro}
										</Typography>
									)}
								</Box>
							))}
							<Divider sx={{ my: 2 }} />
						</Box>
					))}
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}
