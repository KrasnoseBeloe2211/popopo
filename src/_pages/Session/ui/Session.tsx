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
		<Box sx={{ p: 3, maxWidth: '800px', margin: '0 auto' }}>
			<Typography variant='h4' gutterBottom>
				{test.title}
			</Typography>
			<Typography variant='body1' color='text.secondary' mb={3}>
				{test.description}
			</Typography>

			{test.schema.questions.map((question, qIndex) => (
				<Box
					key={question.id}
					sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: 1 }}
				>
					<Typography variant='h6' gutterBottom>
						{qIndex + 1}. {question.text}
					</Typography>

					{question.type === 'single_choice' && (
						<RadioGroup>
							{question.options.map(opt => (
								<FormControlLabel
									key={opt.id}
									control={
										<Radio
											checked={(answers[question.id] || []).includes(opt.id)}
											onChange={() => handleAnswer(question.id, opt.id, false)}
										/>
									}
									label={opt.text}
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
										<input
											type='checkbox'
											checked={(answers[question.id] || []).includes(opt.id)}
											onChange={() => handleAnswer(question.id, opt.id, true)}
										/>
									}
									label={opt.text}
								/>
							))}
						</Box>
					)}
				</Box>
			))}

			<Button
				variant='contained'
				color='primary'
				onClick={handleSubmit}
				sx={{ mt: 2 }}
			>
				Завершить тест
			</Button>
		</Box>
	)
}
