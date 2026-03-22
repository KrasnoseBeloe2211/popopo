'use client'
import { useEffect, useState } from 'react'
import { Box, Button, Typography, Grid } from '@mui/material'
import BadgeIcon from '@mui/icons-material/Badge'
import { ProfileSidebar, ProfileAbout, QRCodeModal } from '@/features/profile'
import { useUserStore } from '@/entities/user/model/store'

import { edit } from '../api/editApi'
import { baseUrl } from '@/shared/params'
export const Profile = () => {
	const [about, setAbout] = useState('')
	const [isQRModalOpen, setIsQRModalOpen] = useState(false)
	const { user, setAuth, fetchProfile } = useUserStore()

	// Обновляем about при загрузке профиля
	useEffect(() => {
		if (user.about) {
			setAbout(user.about)
		}
	}, [user.about])

	const handleSaveAbout = async (newAbout: string) => {
		setAbout(newAbout)
		const response: any = await edit(newAbout)
		if (response) {
			await fetchProfile()
			setAbout(user.about || newAbout)
		}
		console.log('Сохранено:', newAbout)
	}

	useEffect(() => {
		fetchProfile()
	}, [])

	return (
		<>
			{/* Заголовок страницы */}
			<Box
				sx={{
					marginBottom: '32px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexWrap: 'wrap',
					gap: '16px',
				}}
			>
				<Box>
					<Typography
						variant='h3'
						sx={{
							fontWeight: 600,
							color: '#ffffff',
							marginBottom: '8px',
						}}
					>
						Личный кабинет
					</Typography>
					<Typography
						variant='body1'
						sx={{
							color: '#b3b3b3',
						}}
					>
						Управление вашим профилем психолога
					</Typography>
				</Box>

				{/* Кнопка показать визитку */}
				<Button
					variant='contained'
					onClick={() => setIsQRModalOpen(true)}
					startIcon={<BadgeIcon />}
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
						boxShadow: '0 4px 16px rgba(19, 167, 73, 0.3)',
					}}
				>
					Показать визитку
				</Button>
			</Box>

			{/* Основной контент */}
			<Grid container spacing={4}>
				{/* Левая колонка - Sidebar */}
				<Grid size={{ xs: 12, md: 4 }}>
					<ProfileSidebar
						photoUrl={user.photoUrl}
						fullName={user.full_name}
						email={user.email}
						phone={user.phone}
					/>
				</Grid>

				{/* Правая колонка - Основной контент */}
				<Grid size={{ xs: 12, md: 8 }}>
					<ProfileAbout about={user.about} onSave={handleSaveAbout} />

					{/* Дополнительная информация */}
					<Box
						sx={{
							marginTop: '24px',
							padding: '24px',
							background: 'rgba(19, 167, 73, 0.05)',
							borderRadius: '16px',
							border: '1px solid rgba(19, 167, 73, 0.2)',
						}}
					>
						<Typography
							variant='body2'
							sx={{
								color: '#666',
								lineHeight: 1.6,
							}}
						>
							💡 <strong>Совет:</strong> Расскажите о себе максимально подробно.
							Клиенты ценят честность и открытость. Опишите ваш подход к работе,
							специализацию и образование. Это поможет привлечь подходящих вам
							людей.
						</Typography>
					</Box>
				</Grid>
			</Grid>

			<QRCodeModal
				open={isQRModalOpen}
				onClose={() => setIsQRModalOpen(false)}
				psychologistData={{
					photoUrl: user.photoUrl,
					fullName: user.full_name,
					publicUrl: `${baseUrl}/visit/${user.id}`,
				}}
			/>
		</>
	)
}
