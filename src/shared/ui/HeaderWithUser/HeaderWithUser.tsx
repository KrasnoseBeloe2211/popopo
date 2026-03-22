'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { UserMenu } from '../UserMenu/UserMenu'

export const HeaderWithUser = () => {
	const router = useRouter()
	const [username, setUsername] = useState<string | null>(null)

	useEffect(() => {
		const storedUsername = localStorage.getItem('username')
		const token = localStorage.getItem('access_token')
		if (token && storedUsername) {
			setUsername(storedUsername)
		}
	}, [])

	return (
		<AppBar
			position="fixed"
			elevation={0}
			sx={{ background: 'transparent', padding: '16px 40px' }}
		>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
					<Box
						component="img"
						src="/logo.svg"
						alt="Logo"
						sx={{
							height: '20px',
							width: 'auto',
							cursor: 'pointer',
						}}
					/>
				</Link>

				{username ? (
					<UserMenu username={username} />
				) : (
					<Button
						variant="outlined"
						onClick={() => router.push('/login')}
						sx={{
							borderRadius: '999px',
							background: '#fff',
							color: '#000',
							textTransform: 'none',
							border: '1px solid transparent',
							transition: 'all 0.3s ease',
							'&:hover': {
								background: 'transparent',
								color: '#ffffff',
								border: '1px solid #ffffff'
							}
						}}
					>
						Sign in
					</Button>
				)}
			</Toolbar>
		</AppBar>
	)
}
