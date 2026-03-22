'use client'

import { Test } from '@/entities/test'
import { apiController } from '@/shared/config/api/api'
import {
	Box,
	Typography,
	Radio,
	RadioGroup,
	FormControlLabel,
	Button,
	Checkbox,
} from '@mui/material'
import { useState } from 'react'

export const Session = ({
	test,
	sessionId,
}: {
	test: Test
	sessionId: string
}) => {
	const [answers, setAnswers] = useState<Record<string, string[]>>({})

	const handleAnswer = (
		questionId: string,
		answerId: string,
		isMulti: boolean,
	) => {
		setAnswers(prev => {
			const current = prev[questionId] || []
			if (isMulti) {
				return {
					...prev,
					[questionId]: current.includes(answerId)
						? current.filter(id => id !== answerId)
						: [...current, answerId],
				}
			} else {
				return { ...prev, [questionId]: [answerId] }
			}
		})
	}

	const handleSubmit = async () => {
		const payload = {
			test_id: test.id,
			raw_answers: answers,
		}
		const response = await apiController(
			undefined,
			'POST',
			`/api/client/session/${sessionId}/result`,
			payload,
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
			<Box
				sx={{
					maxWidth: '800px',
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
						{test.title}
					</Typography>
					<Typography
						variant='body1'
						sx={{
							color: '#b3b3b3',
							fontSize: '16px',
							lineHeight: 1.6,
						}}
					>
						{test.description}
					</Typography>
				</Box>

				{/* Вопросы */}
				{test.schema.questions.map((question, qIndex) => (
					<Box
						key={question.id}
						sx={{
							mb: 4,
							p: { xs: 3, md: 4 },
							background: 'rgba(19, 167, 73, 0.05)',
							border: '1px solid rgba(19, 167, 73, 0.2)',
							borderRadius: '16px',
						}}
					>
						<Typography
							variant='h6'
							sx={{
								color: '#ffffff',
								fontWeight: 600,
								marginBottom: '24px',
								fontSize: '18px',
							}}
						>
							<Box
								component='span'
								sx={{
									color: '#13a749',
									mr: 1,
								}}
							>
								{qIndex + 1}.
							</Box>
							{question.text}
						</Typography>

						{question.type === 'single_choice' && (
							<RadioGroup>
								{question.options.map(opt => (
									<FormControlLabel
										key={opt.id}
										control={
											<Radio
												checked={(answers[question.id] || []).includes(opt.id)}
												onChange={() =>
													handleAnswer(question.id, opt.id, false)
												}
												sx={{
													color: '#13a749',
													'&.Mui-checked': {
														color: '#13a749',
													},
												}}
											/>
										}
										label={
											<Typography
												sx={{
													color: '#e0e0e0',
													fontSize: '15px',
												}}
											>
												{opt.text}
											</Typography>
										}
										sx={{
											width: '100%',
											mb: 1,
											p: 2,
											borderRadius: '10px',
											border: '1px solid rgba(19, 167, 73, 0.1)',
											background: 'rgba(19, 167, 73, 0.03)',
											transition: 'all 0.2s ease',
											'&:hover': {
												background: 'rgba(19, 167, 73, 0.08)',
												borderColor: 'rgba(19, 167, 73, 0.3)',
											},
										}}
									/>
								))}
							</RadioGroup>
						)}

						{question.type === 'multi_choice' && (
							<Box>
								{question.options.map(opt => (
									<FormControlLabel
										key={opt.id}
										control={
											<Checkbox
												checked={(answers[question.id] || []).includes(opt.id)}
												onChange={() => handleAnswer(question.id, opt.id, true)}
												sx={{
													color: '#13a749',
													'&.Mui-checked': {
														color: '#13a749',
													},
												}}
											/>
										}
										label={
											<Typography
												sx={{
													color: '#e0e0e0',
													fontSize: '15px',
												}}
											>
												{opt.text}
											</Typography>
										}
										sx={{
											width: '100%',
											mb: 1,
											p: 2,
											borderRadius: '10px',
											border: '1px solid rgba(19, 167, 73, 0.1)',
											background: 'rgba(19, 167, 73, 0.03)',
											transition: 'all 0.2s ease',
											'&:hover': {
												background: 'rgba(19, 167, 73, 0.08)',
												borderColor: 'rgba(19, 167, 73, 0.3)',
											},
										}}
									/>
								))}
							</Box>
						)}
					</Box>
				))}

				{/* Кнопка завершения */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						mt: 6,
						mb: 4,
					}}
				>
					<Button
						variant='contained'
						onClick={handleSubmit}
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
						Завершить тест
					</Button>
				</Box>
			</Box>
		</Box>
	)
}
