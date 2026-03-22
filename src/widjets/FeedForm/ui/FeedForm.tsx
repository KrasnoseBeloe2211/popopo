'use client'

import { Box, TextField, Button, Typography } from '@mui/material'
import { useSendForm } from '../hooks/useSendForm'

interface FeedFormProps {
	sessionId: string
	onSuccess?: () => void
}

export const FeedForm = ({ sessionId, onSuccess,  }: FeedFormProps) => {
	const {
		onSubmit,
		register,
		errors,
		formState: { isSubmitting },
	} = useSendForm(sessionId, onSuccess)

	return (
		<Box
			component='form'
			onSubmit={onSubmit}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				maxWidth: '500px',
        margin:'auto'
			}}
		>
			<Typography variant='h5' sx={{ fontWeight: 600, color: '#ffffff' }}>
				Информация о клиенте
			</Typography>

			<TextField
				fullWidth
				label='Имя клиента'
				variant='outlined'
				error={!!errors.client_name}
				helperText={errors.client_name?.message || ''}
				{...register('client_name', {
					required: 'Имя обязательно для заполнения',
					minLength: {
						value: 2,
						message: 'Имя должно содержать минимум 2 символа',
					},
				})}
				sx={{
					'& .MuiOutlinedInput-root': {
						borderRadius: 3,
						color: 'white',
						'& fieldset': {
							borderColor: 'rgba(19, 167, 73, 0.3)',
						},
						'&:hover fieldset': {
							borderColor: '#13a749',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#13a749',
						},
					},
					'& .MuiFormLabel-root': {
						color: '#b3b3b3',
					},
					'& .MuiFormHelperText-root': {
						color: '#ff4444',
					},
				}}
			/>

			<TextField
				fullWidth
				label='Email'
				type='email'
				variant='outlined'
				error={!!errors.client_contacts?.email}
				helperText={errors.client_contacts?.email?.message || ''}
				{...register('client_contacts.email', {
					required: 'Email обязателен для заполнения',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: 'Некорректный email адрес',
					},
				})}
				sx={{
					'& .MuiOutlinedInput-root': {
						borderRadius: 3,
						color: 'white',
						'& fieldset': {
							borderColor: 'rgba(19, 167, 73, 0.3)',
						},
						'&:hover fieldset': {
							borderColor: '#13a749',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#13a749',
						},
					},
					'& .MuiFormLabel-root': {
						color: '#b3b3b3',
					},
					'& .MuiFormHelperText-root': {
						color: '#ff4444',
					},
				}}
			/>

			<TextField
				fullWidth
				label='Телефон'
				type='tel'
				variant='outlined'
				error={!!errors.client_contacts?.phone}
				helperText={errors.client_contacts?.phone?.message || ''}
				{...register('client_contacts.phone', {
					required: 'Телефон обязателен для заполнения',
					pattern: {
						value: /^[\d\s\+\-\(\)]+$/,
						message: 'Некорректный номер телефона',
					},
				})}
				sx={{
					'& .MuiOutlinedInput-root': {
						borderRadius: 3,
						color: 'white',
						'& fieldset': {
							borderColor: 'rgba(19, 167, 73, 0.3)',
						},
						'&:hover fieldset': {
							borderColor: '#13a749',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#13a749',
						},
					},
					'& .MuiFormLabel-root': {
						color: '#b3b3b3',
					},
					'& .MuiFormHelperText-root': {
						color: '#ff4444',
					},
				}}
			/>

			<Button
				type='submit'
				variant='contained'
				disabled={isSubmitting}
				sx={{
					background: '#13a749',
					color: '#ffffff',
					padding: '14px 28px',
					borderRadius: '14px',
					textTransform: 'none',
					fontWeight: 600,
					fontSize: '16px',
					'&:hover': {
						background: '#0f8a3b',
					},
					'&:disabled': {
						background: 'rgba(19, 167, 73, 0.5)',
					},
					boxShadow: '0 4px 16px rgba(19, 167, 73, 0.3)',
				}}
			>
				{isSubmitting ? 'Сохранение...' : 'Сохранить'}
			</Button>
		</Box>
	)
}
