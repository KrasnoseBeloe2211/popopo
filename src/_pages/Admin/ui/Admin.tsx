'use client'
import { AdminTableEntity, useUsersStore } from '@/entities/admin'
import { IColumnsConfig } from '@/shared/ui/Table/model/types'
import { GridRow } from '@/shared/ui/Table/ui/GridRow'
import { HeaderRow } from '@/shared/ui/Table/ui/HeaderRow'
import {
	Box,
	Typography,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress,
	Alert,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { UserCreateRequest, UserUpdateRequest } from '@/entities/admin/api/api'
import ReactMarkdown from 'react-markdown'
import { useUserStore } from '@/entities/user/model/store'
import { useRouter } from 'next/navigation'

const ROLES = [
	{ value: 'ROLE_PORTAL_ADMIN', label: 'Админ' },
	{ value: 'ROLE_PORTAL_PSYCHOLOG', label: 'Психолог' },
]

export const Admin = () => {
	const router = useRouter()
	const { user, isAuthed } = useUserStore()
	const { users, loading, error, refetch, addUser, editUser, removeUser } =
		useUsersStore()

	const [isRoleChecked, setIsRoleChecked] = useState(false)
	const [hasAccess, setHasAccess] = useState(false)

	const [dialogOpen, setDialogOpen] = useState(false)
	const [editingUser, setEditingUser] = useState<AdminTableEntity | null>(null)
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
	const [userToDelete, setUserToDelete] = useState<string | null>(null)

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		full_name: '',
		role: 'ROLE_PORTAL_PSYCHOLOG' as
			| 'ROLE_PORTAL_ADMIN'
			| 'ROLE_PORTAL_PSYCHOLOG',
		about: '',
	})

	useEffect(() => {
		// Проверка роли администратора
		const userRole = user?.role || user?.roles?.[0]
		const isAdmin = userRole === 'ROLE_PORTAL_ADMIN'

		if (!isAuthed || !isAdmin) {
			router.push('/unauthorized')
			return
		}

		setHasAccess(true)
		setIsRoleChecked(true)
		refetch()
	}, [isAuthed, user, router, refetch])

	if (!isRoleChecked || !hasAccess) {
		return (
			<Box
				sx={{
					p: 3,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
				}}
			>
				<CircularProgress />
			</Box>
		)
	}

	const columns: IColumnsConfig[] = [
		{ label: 'Email', key: 'email' },
		{ label: 'ФИО', key: 'full_name' },
		{ label: 'Роль', key: 'role' },
	]

	const handleOpenDialog = (user?: AdminTableEntity) => {
		if (user) {
			setEditingUser(user)
			setFormData({
				email: user.email || '',
				password: '',
				full_name: user.full_name || '',
				role: user.role as 'ROLE_PORTAL_ADMIN' | 'ROLE_PORTAL_PSYCHOLOG',
				about: user.about || '',
			})
		} else {
			setEditingUser(null)
			setFormData({
				email: '',
				password: '',
				full_name: '',
				role: 'ROLE_PORTAL_PSYCHOLOG',
				about: '',
			})
		}
		setDialogOpen(true)
	}

	const handleCloseDialog = () => {
		setDialogOpen(false)
		setEditingUser(null)
		setFormData({
			email: '',
			password: '',
			full_name: '',
			role: 'ROLE_PORTAL_PSYCHOLOG',
			about: '',
		})
	}

	const handleSubmit = async () => {
		try {
			if (editingUser) {
				const updateData: UserUpdateRequest = {
					email: formData.email || undefined,
					full_name: formData.full_name || undefined,
					role: formData.role || undefined,
					about: formData.about || undefined,
				}
				await editUser(editingUser.id, updateData)
			} else {
				await addUser({
					email: formData.email,
					password: formData.password,
					full_name: formData.full_name,
					role: formData.role,
					about: formData.about || undefined,
				})
			}
			handleCloseDialog()
		} catch (err) {
			console.error(err)
		}
	}

	const handleDeleteConfirm = async () => {
		if (userToDelete) {
			try {
				await removeUser(userToDelete)
				setDeleteConfirmOpen(false)
				setUserToDelete(null)
			} catch (err) {
				console.error(err)
			}
		}
	}

	return (
		<Box sx={{ p: 3 }}>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				mb={3}
			>
				<Typography variant='h4'>Админ панель</Typography>
				<Button variant='contained' onClick={() => handleOpenDialog()}>
					Добавить пользователя
				</Button>
			</Box>

			{error && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}
			{loading && (
				<Box display='flex' justifyContent='center' p={3}>
					<CircularProgress />
				</Box>
			)}

			<Box>
				<HeaderRow config={columns} />
				{users?.map(user => (
					<GridRow
						key={user.id}
						user={user}
						config={columns}
						onEdit={handleOpenDialog}
						onDelete={id => {
							setUserToDelete(id)
							setDeleteConfirmOpen(true)
						}}
						details={
							user.about ? (
								<Box>
									<Typography variant='subtitle2' color='text.secondary'>
										О себе:
									</Typography>
									<Box
										sx={{
											mt: 1,
											p: 2,
											bgcolor: 'background.default',
											borderRadius: 1,
										}}
									>
										<ReactMarkdown>{user.about}</ReactMarkdown>
									</Box>
								</Box>
							) : (
								<Typography color='text.secondary'>
									О себе не указано
								</Typography>
							)
						}
					/>
				))}
			</Box>

			{/* Dialog создания/редактирования */}
			<Dialog
				open={dialogOpen}
				onClose={handleCloseDialog}
				maxWidth='sm'
				fullWidth
			>
				<DialogTitle>
					{editingUser ? 'Редактирование пользователя' : 'Новый пользователь'}
				</DialogTitle>
				<DialogContent>
					<Box display='flex' flexDirection='column' gap={2} pt={1}>
						<TextField
							label='Email'
							type='email'
							fullWidth
							required
							value={formData.email}
							onChange={e =>
								setFormData({ ...formData, email: e.target.value })
							}
						/>
						{!editingUser && (
							<TextField
								label='Пароль'
								type='password'
								fullWidth
								required
								value={formData.password}
								onChange={e =>
									setFormData({ ...formData, password: e.target.value })
								}
							/>
						)}
						<TextField
							label='ФИО'
							fullWidth
							required
							value={formData.full_name}
							onChange={e =>
								setFormData({ ...formData, full_name: e.target.value })
							}
						/>
						<FormControl fullWidth required>
							<InputLabel>Роль</InputLabel>
							<Select
								value={formData.role}
								label='Роль'
								onChange={e =>
									setFormData({
										...formData,
										role: e.target.value as typeof formData.role,
									})
								}
							>
								{ROLES.map(role => (
									<MenuItem key={role.value} value={role.value}>
										{role.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							label='О себе'
							fullWidth
							multiline
							rows={3}
							value={formData.about}
							onChange={e =>
								setFormData({ ...formData, about: e.target.value })
							}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Отмена</Button>
					<Button onClick={handleSubmit} variant='contained' disabled={loading}>
						{editingUser ? 'Сохранить' : 'Создать'}
					</Button>
				</DialogActions>
			</Dialog>

			{/* Dialog подтверждения удаления */}
			<Dialog
				open={deleteConfirmOpen}
				onClose={() => setDeleteConfirmOpen(false)}
			>
				<DialogTitle>Подтверждение удаления</DialogTitle>
				<DialogContent>
					<Typography>
						Вы уверены, что хотите удалить этого пользователя?
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteConfirmOpen(false)}>Отмена</Button>
					<Button
						onClick={handleDeleteConfirm}
						variant='contained'
						color='error'
					>
						Удалить
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}
