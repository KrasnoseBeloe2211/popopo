'use client'

import { Box, Button, TextField, Typography } from '@mui/material'
import { useSendForm } from '@/features/authentification/index'

export const Auth = () => {
	const { onSubmit, register, errors } = useSendForm({
		username: '',
		password: '',
	})

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'none',
				p: 2,
			}}
		>
			<Box
				sx={{
					width: '100%',
					maxWidth: 420,
					bgcolor: 'background.paper',
					borderRadius: 4,
					boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
					overflow: 'hidden',
				}}
			>
				{/* Верхняя часть с картинкой */}
				<Box
					sx={{
						height: 200,
						backgroundImage: 'url(/assets/auth-bg.webp)',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Box
						sx={{
							position: 'absolute',
							inset: 0,
							background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(19,167,73,0.85) 30%, rgba(19,167,73,0.85) 70%, rgba(0,0,0,0.6) 100%)',
						}}
					/>
					<Typography
						variant='h4'
						component='h1'
						sx={{
							position: 'relative',
							zIndex: 1,
							color: 'white',
							fontWeight: 700,
							letterSpacing: '0.5px',
						}}
					>
						С возвращением!
					</Typography>
				</Box>

				{/* Форма */}
				<Box
					onSubmit={onSubmit}
					component='form'
					sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2.5 }}
				>
					<TextField
						fullWidth
						error={!!errors.username}
						helperText={errors.username?.message || ''}
						label='Имя пользователя'
						variant='outlined'
						{...register('username', { required: 'Поле обязательно' })}
						sx={{
							'& .MuiOutlinedInput-root': {
								borderRadius: 3,
								color: 'white',
								'&::placeholder': {
									color: 'white',
									opacity: 1,
								},
								'&:hover fieldset': {
									borderColor: '#13a749',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#13a749',
								},
							},
						}}
					/>
					<TextField
						fullWidth
						error={!!errors.password}
						helperText={errors.password?.message || ''}
						label='Пароль'
						type='password'
						variant='outlined'
						{...register('password', { required: 'Поле обязательно' })}
						sx={{
							'& .MuiOutlinedInput-root': {
								borderRadius: 3,
								color: 'white',
								'&::placeholder': {
									color: 'white',
									opacity: 1,
								},
								'&:hover fieldset': {
									borderColor: '#13a749',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#13a749',
								},
							},
						}}
					/>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{
							mt: 1,
							py: 1.5,
							borderRadius: 3,
							fontSize: '1rem',
							fontWeight: 600,
							textTransform: 'none',
							backgroundColor: '#13a749',
							boxShadow: '0 4px 15px rgba(19, 167, 73, 0.4)',
							'&:hover': {
								backgroundColor: '#0f8a3c',
								boxShadow: '0 6px 20px rgba(19, 167, 73, 0.5)',
								transform: 'translateY(-1px)',
							},
						}}
					>
						Войти
					</Button>
				</Box>
			</Box>
		</Box>
	)
}
