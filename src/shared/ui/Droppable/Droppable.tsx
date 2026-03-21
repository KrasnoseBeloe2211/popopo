import { useDroppable } from '@dnd-kit/react'
import { Box, Typography } from '@mui/material'
import React from 'react'

export const Droppable = ({
	children,
	isDropped,
}: {
	children?: React.ReactNode
	isDropped: boolean
}) => {
	const { ref } = useDroppable({ id: 'droppable' })

	return (
		<Box
			ref={ref}
			minWidth='400px'
			width={'80%'}
			p={2}
			sx={theme => ({
				transition: 'background-color 0.2s',
				borderRadius: 1,
				outline: 'solid ',
				outlineWidth: '0.1px',
				outlineColor: theme.palette.divider,
				backgroundColor: theme.palette.background.paper,
			})}
		>
			{!isDropped && <Typography marginY={'25%'} textAlign={'center'} sx={(theme)=>({color:theme.palette.divider})} variant='h1'>Drag n Drop</Typography>}
			{children}
		</Box>
	)
}
