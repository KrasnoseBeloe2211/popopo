'use client'
import { Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function UnauthorizedPage() {
	const router = useRouter()

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				gap: 2,
			}}
		>
			<Typography variant='h4' color='error'>
				Доступ запрещён
			</Typography>
			<Typography variant='body1' color='text.secondary'>
				У вас нет прав для просмотра этой страницы
			</Typography>
			<Button variant='contained' onClick={() => router.push('/')}>
				На главную
			</Button>
		</Box>
	)
}
