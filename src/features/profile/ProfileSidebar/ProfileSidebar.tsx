'use client'

import { Box, Typography, Avatar, Divider } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import PersonIcon from '@mui/icons-material/Person'

interface ProfileSidebarProps {
	photoUrl: string
	fullName: string
	email: string
	phone: string
}

export const ProfileSidebar = ({
	photoUrl,
	fullName,
	email,
	phone,
}: ProfileSidebarProps) => {
	return (
		<Box
			sx={{
				background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)',
				borderRadius: '24px',
				padding: '32px',
				border: '1px solid rgba(19, 167, 73, 0.3)',
				height: 'fit-content',
				position: 'sticky',
				top: '100px',
			}}
		>
			{/* Фотография */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginBottom: '32px',
				}}
			>
				<Avatar
					src={photoUrl}
					alt={fullName}
					sx={{
						width: 180,
						height: 180,
						marginBottom: '20px',
						border: '4px solid #13a749',
						boxShadow: '0 8px 24px rgba(19, 167, 73, 0.2)',
					}}
				/>
				<Typography
					variant="h5"
					sx={{
						fontWeight: 600,
						color: '#ffffff',
						textAlign: 'center',
					}}
				>
					{fullName}
				</Typography>
				<Typography
					variant="body1"
					sx={{
						color: '#13a749',
						mt: 1,
						fontWeight: 500,
					}}
				>
					Психолог
				</Typography>
			</Box>

			<Divider sx={{ my: 3, borderColor: 'rgba(19, 167, 73, 0.3)' }} />

			{/* Контактная информация (только для просмотра) */}
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
				{/* ФИО */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '12px',
					}}
				>
					<Box
						sx={{
							width: 40,
							height: 40,
							borderRadius: '10px',
							background: 'rgba(19, 167, 73, 0.1)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<PersonIcon sx={{ color: '#13a749', fontSize: 20 }} />
					</Box>
					<Box>
						<Typography
							variant="caption"
							sx={{
								color: '#666',
								display: 'block',
							}}
						>
							ФИО
						</Typography>
						<Typography
							variant="body2"
							sx={{
								color: '#b3b3b3',
								fontWeight: 500,
							}}
						>
							{fullName}
						</Typography>
					</Box>
				</Box>

				{/* Email */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '12px',
					}}
				>
					<Box
						sx={{
							width: 40,
							height: 40,
							borderRadius: '10px',
							background: 'rgba(19, 167, 73, 0.1)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<EmailIcon sx={{ color: '#13a749', fontSize: 20 }} />
					</Box>
					<Box>
						<Typography
							variant="caption"
							sx={{
								color: '#666',
								display: 'block',
							}}
						>
							Почта
						</Typography>
						<Typography
							variant="body2"
							sx={{
								color: '#b3b3b3',
								fontWeight: 500,
							}}
						>
							{email}
						</Typography>
					</Box>
				</Box>

				{/* Телефон */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '12px',
					}}
				>
					<Box
						sx={{
							width: 40,
							height: 40,
							borderRadius: '10px',
							background: 'rgba(19, 167, 73, 0.1)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<PhoneIcon sx={{ color: '#13a749', fontSize: 20 }} />
					</Box>
					<Box>
						<Typography
							variant="caption"
							sx={{
								color: '#666',
								display: 'block',
							}}
						>
							Номер телефона
						</Typography>
						<Typography
							variant="body2"
							sx={{
								color: '#b3b3b3',
								fontWeight: 500,
							}}
						>
							{phone}
						</Typography>
					</Box>
				</Box>
			</Box>

			<Divider sx={{ my: 3, borderColor: 'rgba(19, 167, 73, 0.3)' }} />

			{/* Информация о том, что нельзя редактировать */}
			<Box
				sx={{
					padding: '16px',
					background: 'rgba(255, 167, 73, 0.05)',
					borderRadius: '12px',
					border: '1px solid rgba(255, 167, 73, 0.2)',
				}}
			>
				<Typography
					variant="caption"
					sx={{
						color: '#ffa749',
						display: 'block',
						mb: 1,
						fontWeight: 600,
					}}
				>
					ℹ️ Информация
				</Typography>
				<Typography
					variant="caption"
					sx={{
						color: '#b3b3b3',
						lineHeight: 1.5,
					}}
				>
					Почта, номер телефона и ФИО нельзя изменить. Эти данные закреплены за вашим аккаунтом.
				</Typography>
			</Box>
		</Box>
	)
}
