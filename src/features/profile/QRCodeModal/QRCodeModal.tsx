'use client'

import { useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Box,
	Typography,
	Avatar,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface QRCodeModalProps {
	open: boolean
	onClose: () => void
	psychologistData: {
		photoUrl: string
		fullName: string
		publicUrl: string
	}
}

export const QRCodeModal = ({ open, onClose, psychologistData }: QRCodeModalProps) => {
	const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
	const [isLoading, setIsLoading] = useState(false)

	const generateQRCode = async () => {
		if (qrCodeUrl) return

		setIsLoading(true)
		try {
			// Генерация QR-кода через API (не на фронте)
			const response = await fetch('/api/generate-qr', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					url: psychologistData.publicUrl,
				}),
			})

			if (response.ok) {
				const data = await response.json()
				setQrCodeUrl(data.qrCodeUrl)
			}
		} catch (error) {
			console.error('Ошибка генерации QR-кода:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleOpen = () => {
		generateQRCode()
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="sm"
			fullWidth
			onEnter={handleOpen}
			PaperProps={{
				sx: {
					background: 'linear-gradient(145deg, #0a0a0a 0%, #111111 100%)',
					borderRadius: '24px',
					border: '1px solid #13a749',
				},
			}}
		>
			<DialogTitle
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '24px 32px',
				}}
			>
				<Typography
					variant="h5"
					sx={{
						fontWeight: 600,
						color: '#13a749',
					}}
				>
					Визитка психолога
				</Typography>
				<Button
					onClick={onClose}
					sx={{
						minWidth: 'auto',
						color: '#b3b3b3',
						'&:hover': {
							color: '#ffffff',
							background: 'rgba(255, 255, 255, 0.05)',
						},
					}}
				>
					<CloseIcon />
				</Button>
			</DialogTitle>

			<DialogContent
				sx={{
					padding: '0 32px 32px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{/* Карточка визитки */}
				<Box
					sx={{
						width: '100%',
						maxWidth: '350px',
						background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)',
						borderRadius: '20px',
						padding: '32px',
						border: '1px solid rgba(19, 167, 73, 0.3)',
						boxShadow: '0 8px 32px rgba(19, 167, 73, 0.1)',
					}}
				>
					{/* Фото и имя */}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							marginBottom: '24px',
						}}
					>
						<Avatar
							src={psychologistData.photoUrl}
							alt={psychologistData.fullName}
							sx={{
								width: 120,
								height: 120,
								marginBottom: '16px',
								border: '3px solid #13a749',
							}}
						/>
						<Typography
							variant="h6"
							sx={{
								fontWeight: 600,
								color: '#ffffff',
								textAlign: 'center',
							}}
						>
							{psychologistData.fullName}
						</Typography>
						<Typography
							variant="body2"
							sx={{
								color: '#13a749',
								mt: 1,
								fontWeight: 500,
							}}
						>
							Психолог
						</Typography>
					</Box>

					{/* QR-код */}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							padding: '20px',
							background: 'rgba(19, 167, 73, 0.05)',
							borderRadius: '16px',
							border: '1px dashed rgba(19, 167, 73, 0.4)',
						}}
					>
						{isLoading ? (
							<Typography sx={{ color: '#13a749' }}>Генерация QR-кода...</Typography>
						) : qrCodeUrl ? (
							<Box
								component="img"
								src={qrCodeUrl}
								alt="QR Code"
								sx={{
									width: 200,
									height: 200,
									borderRadius: '12px',
									background: '#ffffff',
									padding: '8px',
								}}
							/>
						) : (
							<Typography sx={{ color: '#b3b3b3' }}>Нажмите "Сгенерировать"</Typography>
						)}
					</Box>
				</Box>

				<Typography
					variant="caption"
					sx={{
						color: '#666',
						mt: 2,
						textAlign: 'center',
					}}
				>
					Отсканируйте QR-код чтобы перейти на страницу психолога
				</Typography>
			</DialogContent>

			<DialogActions
				sx={{
					padding: '0 32px 24px',
					justifyContent: 'center',
				}}
			>
				<Button
					onClick={handleOpen}
					disabled={isLoading}
					variant="contained"
					sx={{
						background: '#13a749',
						color: '#ffffff',
						padding: '12px 32px',
						borderRadius: '12px',
						textTransform: 'none',
						fontWeight: 600,
						'&:hover': {
							background: '#0f8a3b',
						},
						'&:disabled': {
							background: 'rgba(19, 167, 73, 0.5)',
						},
					}}
				>
					{isLoading ? 'Генерация...' : 'Сгенерировать заново'}
				</Button>
			</DialogActions>
		</Dialog>
	)
}
