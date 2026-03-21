'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
	Box,
	Typography,
	TextField,
	Button,
	Divider,
	SwipeableDrawer,
	IconButton,
} from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'

interface ProfileAboutProps {
	about: string
	onSave: (about: string) => void
}

export const ProfileAbout = ({ about, onSave }: ProfileAboutProps) => {
	const [editedAbout, setEditedAbout] = useState(about)
	const [isHelpOpen, setIsHelpOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	const handleSave = () => {
		onSave(editedAbout)
		setIsEditing(false)
	}

	const handleCancel = () => {
		setEditedAbout(about)
		setIsEditing(false)
	}

	// Markdown инструкции для детей
	const markdownHelp = [
		{ title: 'Жирный текст', syntax: '**текст**', example: '**важно** → **важно**' },
		{ title: 'Курсив', syntax: '*текст*', example: '*акцент* → *акцент*' },
		{ title: 'Заголовок', syntax: '# Заголовок', example: '# Главный → Главный заголовок' },
		{ title: 'Подзаголовок', syntax: '## Подзаголовок', example: '## Раздел → Раздел' },
		{ title: 'Список', syntax: '- Пункт', example: '- Первый → • Первый' },
		{ title: 'Нумерованный список', syntax: '1. Пункт', example: '1. Первый → 1. Первый' },
		{ title: 'Цитата', syntax: '> Цитата', example: '> Важно → Цитата' },
		{ title: 'Код', syntax: '`код`', example: '`print()` → код' },
		{ title: 'Ссылка', syntax: '[текст](url)', example: '[сайт](https://...) → сайт' },
	]

	return (
		<>
			<Box
				sx={{
					background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)',
					borderRadius: '24px',
					padding: '32px',
					border: '1px solid rgba(19, 167, 73, 0.3)',
				}}
			>
				{/* Заголовок */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: '24px',
					}}
				>
					<Typography
						variant="h5"
						sx={{
							fontWeight: 600,
							color: '#ffffff',
						}}
					>
						О себе
					</Typography>
					<IconButton
						onClick={() => setIsHelpOpen(true)}
						sx={{
							color: '#13a749',
							'&:hover': {
								background: 'rgba(19, 167, 73, 0.1)',
							},
						}}
					>
						<HelpOutlineIcon />
					</IconButton>
				</Box>

				{/* Поле ввода */}
				{isEditing ? (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
						<TextField
							multiline
							rows={12}
							value={editedAbout}
							onChange={(e) => setEditedAbout(e.target.value)}
							placeholder="Расскажите о себе, своём опыте и подходе к работе..."
							fullWidth
							sx={{
								'& .MuiOutlinedInput-root': {
									background: 'rgba(0, 0, 0, 0.3)',
									borderRadius: '16px',
									color: '#ffffff',
									'& fieldset': {
										borderColor: 'rgba(19, 167, 73, 0.3)',
									},
									'&:hover fieldset': {
										borderColor: 'rgba(19, 167, 73, 0.5)',
									},
									'&.Mui-focused fieldset': {
										borderColor: '#13a749',
									},
								},
								'& .MuiInputBase-input': {
									color: '#ffffff',
									fontSize: '16px',
									lineHeight: 1.6,
								},
							}}
						/>

						{/* Кнопки действий */}
						<Box
							sx={{
								display: 'flex',
								gap: '12px',
								justifyContent: 'flex-end',
							}}
						>
							<Button
								onClick={handleCancel}
								variant="outlined"
								sx={{
									color: '#b3b3b3',
									borderColor: '#b3b3b3',
									padding: '10px 24px',
									borderRadius: '12px',
									textTransform: 'none',
									'&:hover': {
										borderColor: '#ffffff',
										color: '#ffffff',
									},
								}}
							>
								Отмена
							</Button>
							<Button
								onClick={handleSave}
								variant="contained"
								sx={{
									background: '#13a749',
									color: '#ffffff',
									padding: '10px 24px',
									borderRadius: '12px',
									textTransform: 'none',
									fontWeight: 600,
									'&:hover': {
										background: '#0f8a3b',
									},
								}}
							>
								Сохранить
							</Button>
						</Box>
					</Box>
				) : (
					<Box sx={{ position: 'relative' }}>
						<Box
							sx={{
								color: '#b3b3b3',
								fontSize: '16px',
								minHeight: '100px',
								'& h1': { fontSize: '28px', fontWeight: 600, marginBottom: '16px', color: '#ffffff' },
								'& h2': { fontSize: '22px', fontWeight: 600, marginBottom: '12px', color: '#ffffff' },
								'& h3': { fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#ffffff' },
								'& p': { marginBottom: '12px', lineHeight: 1.8 },
								'& strong': { fontWeight: 600, color: '#ffffff' },
								'& em': { fontStyle: 'italic' },
								'& ul': { paddingLeft: '24px', marginBottom: '12px' },
								'& ol': { paddingLeft: '24px', marginBottom: '12px' },
								'& li': { marginBottom: '8px' },
								'& blockquote': {
									borderLeft: '3px solid #13a749',
									paddingLeft: '16px',
									margin: '16px 0',
									color: '#13a749',
									fontStyle: 'italic',
								},
								'& code': {
									background: 'rgba(19, 167, 73, 0.1)',
									padding: '2px 6px',
									borderRadius: '4px',
									fontFamily: 'monospace',
									color: '#13a749',
								},
								'& pre': {
									background: 'rgba(0, 0, 0, 0.3)',
									padding: '16px',
									borderRadius: '8px',
									overflow: 'auto',
									marginBottom: '12px',
								},
								'& a': { color: '#13a749', textDecoration: 'underline' },
								'& hr': { borderColor: 'rgba(19, 167, 73, 0.3)', margin: '24px 0' },
							}}
						>
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{about || 'Нажмите "Редактировать", чтобы добавить информацию о себе'}
							</ReactMarkdown>
						</Box>

						<Button
							onClick={() => setIsEditing(true)}
							variant="outlined"
							sx={{
								mt: 2,
								color: '#13a749',
								borderColor: '#13a749',
								padding: '10px 24px',
								borderRadius: '12px',
								textTransform: 'none',
								'&:hover': {
									background: 'rgba(19, 167, 73, 0.1)',
								},
							}}
						>
							Редактировать
						</Button>
					</Box>
				)}

				<Divider sx={{ my: 3, borderColor: 'rgba(19, 167, 73, 0.3)' }} />

				{/* Подсказка по Markdown */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
					}}
				>
					<HelpOutlineIcon sx={{ fontSize: 16, color: '#666' }} />
					<Typography
						variant="caption"
						sx={{
							color: '#666',
						}}
					>
						Поддержка Markdown. Нажмите на «?» чтобы увидеть инструкцию
					</Typography>
				</Box>
			</Box>

			{/* Помощник по Markdown */}
			<SwipeableDrawer
				anchor="right"
				open={isHelpOpen}
				onClose={() => setIsHelpOpen(false)}
				onOpen={() => setIsHelpOpen(true)}
				PaperProps={{
					sx: {
						background: 'linear-gradient(145deg, #0a0a0a 0%, #111111 100%)',
						borderLeft: '1px solid rgba(19, 167, 73, 0.3)',
						maxWidth: '500px',
					},
				}}
			>
				<Box
					sx={{
						padding: '32px',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{/* Заголовок помощника */}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: '24px',
						}}
					>
						<Typography
							variant="h5"
							sx={{
								fontWeight: 600,
								color: '#13a749',
							}}
						>
							📝 Как использовать Markdown
						</Typography>
						<IconButton
							onClick={() => setIsHelpOpen(false)}
							sx={{
								color: '#b3b3b3',
								'&:hover': {
									background: 'rgba(255, 255, 255, 0.05)',
								},
							}}
						>
							<CloseIcon />
						</IconButton>
					</Box>

					<Typography
						sx={{
							color: '#b3b3b3',
							marginBottom: '24px',
							lineHeight: 1.6,
						}}
					>
						Markdown — это простой способ сделать текст красивым. Используй эти
						значки, чтобы добавить жирность, курсив или заголовки:
					</Typography>

					{/* Список инструкций */}
					<Box
						sx={{
							flexGrow: 1,
							overflow: 'auto',
							display: 'flex',
							flexDirection: 'column',
							gap: '16px',
						}}
					>
						{markdownHelp.map((item, index) => (
							<Box
								key={index}
								sx={{
									background: 'rgba(19, 167, 73, 0.05)',
									border: '1px solid rgba(19, 167, 73, 0.2)',
									borderRadius: '12px',
									padding: '16px',
								}}
							>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: '8px',
										marginBottom: '8px',
									}}
								>
									<CheckIcon sx={{ fontSize: 16, color: '#13a749' }} />
									<Typography
										variant="subtitle2"
										sx={{
											color: '#ffffff',
											fontWeight: 600,
										}}
									>
										{item.title}
									</Typography>
								</Box>
								<Typography
									variant="caption"
									sx={{
										color: '#666',
										display: 'block',
										mb: 1,
									}}
								>
									Синтаксис: {item.syntax}
								</Typography>
								<Typography
									variant="body2"
									sx={{
										color: '#b3b3b3',
										fontFamily: 'monospace',
										background: 'rgba(0, 0, 0, 0.3)',
										padding: '8px 12px',
										borderRadius: '8px',
									}}
								>
									{item.example}
								</Typography>
							</Box>
						))}
					</Box>

					{/* Пример */}
					<Box
						sx={{
							mt: 3,
							padding: '20px',
							background: 'rgba(19, 167, 73, 0.1)',
							borderRadius: '16px',
							border: '1px solid rgba(19, 167, 73, 0.3)',
						}}
					>
						<Typography
							variant="subtitle1"
							sx={{
								color: '#13a749',
								fontWeight: 600,
								marginBottom: '12px',
							}}
						>
							💡 Пример использования:
						</Typography>
						<Box
							sx={{
								background: 'rgba(0, 0, 0, 0.3)',
								padding: '16px',
								borderRadius: '12px',
							}}
						>
							<Typography
								variant="body2"
								sx={{
									color: '#888',
									fontFamily: 'monospace',
									fontSize: '13px',
									lineHeight: 1.8,
								}}
							>
								# Привет!{'\n'}
								{'\n'}
								Я **психолог** с *большим опытом* работы.{'\n'}
								{'\n'}
								Мои навыки:{'\n'}
								- Консультирование{'\n'}
								- Терапия{'\n'}
								{'\n'}
								&gt; Важно: я помогаю стать счастливее!
							</Typography>
						</Box>
					</Box>
				</Box>
			</SwipeableDrawer>
		</>
	)
}
