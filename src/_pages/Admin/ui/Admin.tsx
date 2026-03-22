'use client'
import { AdminTableEntity, useUsersStore } from '@/entities/admin'

import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'

export const Admin = () => {
	const { users, refetch } = useUsersStore()
	useEffect(() => {
		refetch()
	}, [])

	return (
		<Box>
			<Typography>Админ панель</Typography>
			<Box></Box>
		</Box>
	)
}
