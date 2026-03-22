'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
	Box,
	Avatar,
	Popover,
	MenuItem,
	Typography,
	Divider,
} from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

export const UserMenu = ({ username }: { username: string }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const open = Boolean(anchorEl)

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleCloseMenu = () => {
		setAnchorEl(null)
	}

	const handleLogout = () => {
		localStorage.removeItem('access_token')
		localStorage.removeItem('username')
		document.cookie = 'refresh_token=; path=/; max-age=0'
		window.location.reload()
	}

	const firstLetter = username.charAt(0).toUpperCase()

	return (
		<>
			<Box
				onClick={handleOpenMenu}
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					padding: '6px 12px',
					borderRadius: '999px',
					background: 'rgba(255, 255, 255, 0.1)',
					cursor: 'pointer',
					transition: 'none',
					minWidth: '120px',
					'&:hover': {
						background: 'rgba(255, 255, 255, 0.15)',
					},
				}}
			>
				<Avatar
					sx={{
						width: 32,
						height: 32,
						background: '#13a749',
						fontSize: '14px',
						fontWeight: 600,
					}}
				>
					{firstLetter}
				</Avatar>
				<Typography
					sx={{
						color: '#ffffff',
						fontSize: '14px',
						fontWeight: 500,
						whiteSpace: 'nowrap',
					}}
				>
					{username}
				</Typography>
			</Box>

			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleCloseMenu}
				onClick={handleCloseMenu}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				PaperProps={{
					sx: {
						mt: 1,
						minWidth: 220,
						borderRadius: '12px',
						boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
						background: '#00000',
					},
				}}
			>
				<Box sx={{ px: 2, py: 1.5 }}>
					<Typography variant="subtitle2" fontWeight={600} color="text.primary">
						{username}
					</Typography>
				</Box>

				<Divider />

				<MenuItem
					component={Link}
					href="/profile"
					onClick={handleCloseMenu}
					sx={{
						py: 1.5,
						px: 2,
						gap: 2,
						'&:hover': {
							background: 'rgba(19, 167, 73, 0.08)',
						},
					}}
				>
					<AccountCircleOutlinedIcon
						sx={{ color: '#13a749', fontSize: 20 }}
					/>
					<Typography variant="body2" color="text.primary">
						Личный кабинет
					</Typography>
				</MenuItem>

				<MenuItem
					component={Link}
					href="/mytests"
					onClick={handleCloseMenu}
					sx={{
						py: 1.5,
						px: 2,
						gap: 2,
						'&:hover': {
							background: 'rgba(19, 167, 73, 0.08)',
						},
					}}
				>
					<DescriptionOutlinedIcon
						sx={{ color: '#13a749', fontSize: 20 }}
					/>
					<Typography variant="body2" color="text.primary">
						Мои опросники
					</Typography>
				</MenuItem>

				<MenuItem
					component={Link}
					href="/construct"
					onClick={handleCloseMenu}
					sx={{
						py: 1.5,
						px: 2,
						gap: 2,
						'&:hover': {
							background: 'rgba(19, 167, 73, 0.08)',
						},
					}}
				>
					<DashboardOutlinedIcon
						sx={{ color: '#13a749', fontSize: 20 }}
					/>
					<Typography variant="body2" color="text.primary">
						Конструктор опросов
					</Typography>
				</MenuItem>

				<Divider />

				<MenuItem
					onClick={handleLogout}
					sx={{
						py: 1.5,
						px: 2,
						gap: 2,
						'&:hover': {
							background: 'rgba(244, 67, 54, 0.08)',
						},
					}}
				>
					<LogoutOutlinedIcon
						sx={{ color: '#f44336', fontSize: 20 }}
					/>
					<Typography variant="body2" color="error">
						Выйти
					</Typography>
				</MenuItem>
			</Popover>
		</>
	)
}
