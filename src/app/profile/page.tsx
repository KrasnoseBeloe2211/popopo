'use client'

import { useState } from 'react'
import { Box, Button, Typography, Grid } from '@mui/material'
import BadgeIcon from '@mui/icons-material/Badge'
import { ProfileSidebar, ProfileAbout, QRCodeModal } from '@/features/profile'

// Моковые данные (в реальности будут приходить из API/аутентификации)
const psychologistData = {
	photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
	fullName: 'Иванова Мария Александровна',
	email: 'maria.ivanova@psychology.com',
	phone: '+7 (999) 123-45-67',
	about: `# Привет! 👋

Я **профессиональный психолог** с *более чем 10-летним опытом* работы.

## Мои специализации:
- Индивидуальное консультирование
- Семейная терапия
- Работа с тревожностью и депрессией
- Личностный рост

## Образование:
1. МГУ им. Ломоносова - Факультет психологии
2. Московский Институт Психоанализа

> Важно: я создаю безопасное пространство для каждого клиента!

**Давайте вместе сделаем вашу жизнь счастливее!** 🌟`,
	publicUrl: 'https://psychology.example.com/specialist/maria-ivanova',
}

export default function ProfilePage() {
	const [about, setAbout] = useState(psychologistData.about)
	const [isQRModalOpen, setIsQRModalOpen] = useState(false)

	const handleSaveAbout = (newAbout: string) => {
		setAbout(newAbout)
		// Здесь будет вызов API для сохранения
		console.log('Сохранено:', newAbout)
	}

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
						variant="h3"
						sx={{
							fontWeight: 600,
							color: '#ffffff',
							marginBottom: '8px',
						}}
					>
						Личный кабинет
					</Typography>
					<Typography
						variant="body1"
						sx={{
							color: '#b3b3b3',
						}}
					>
						Управление вашим профилем психолога
					</Typography>
				</Box>

				{/* Кнопка показать визитку */}
				<Button
					variant="contained"
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
						photoUrl={psychologistData.photoUrl}
						fullName={psychologistData.fullName}
						email={psychologistData.email}
						phone={psychologistData.phone}
					/>
				</Grid>

				{/* Правая колонка - Основной контент */}
				<Grid size={{ xs: 12, md: 8 }}>
					<ProfileAbout about={about} onSave={handleSaveAbout} />

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
							variant="body2"
							sx={{
								color: '#666',
								lineHeight: 1.6,
							}}
						>
							💡 <strong>Совет:</strong> Расскажите о себе максимально подробно. 
							Клиенты ценят честность и открытость. Опишите ваш подход к работе, 
							специализацию и образование. Это поможет привлечь подходящих вам людей.
						</Typography>
					</Box>
				</Grid>
			</Grid>

			{/* Модальное окно с QR-кодом */}
			<QRCodeModal
				open={isQRModalOpen}
				onClose={() => setIsQRModalOpen(false)}
				psychologistData={{
					photoUrl: psychologistData.photoUrl,
					fullName: psychologistData.fullName,
					publicUrl: psychologistData.publicUrl,
				}}
			/>
		</>
	)
}
