'use client'

import { Box, Button, TextField, Typography } from '@mui/material'
import { useSendForm } from '@/features/authentification/index'

export const Auth = () => {
	const { onSubmit, register, errors } = useSendForm({
		username: '',
		password: '',
	})

	return (
		<Box>
			<Typography variant='h4'>Логин</Typography>
			<Box onSubmit={onSubmit} component='form'>
				<TextField
					error={!!errors.username}
					helperText={errors.username?.message || ''}
					variant='filled'
					{...register('username', { required: 'Поле обязательно' })}
				/>
				<TextField
					error={!!errors.password}
					helperText={errors.password?.message || ''}
					{...register('password', { required: 'Поле обязательно' })}
				/>
				<Button type='submit'>Войти</Button>
			</Box>
		</Box>
	)
}
