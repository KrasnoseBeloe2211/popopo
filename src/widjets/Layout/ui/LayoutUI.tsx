'use client'
import { Box, Typography } from '@mui/material'

export const LayoutUI = ({ children }: any) => {
	return (
		<Box
			sx={theme => ({
				minHeight: 'calc(100vh-80px)',
				backgroundColor: theme.palette.background.default,
				display: 'flex',
				flexDirection: 'column',
				flexGrow: '100%',
				width: '100%',
				margin: 'auto',
			})}
		>
			<Box marginY={'30px'} padding={'20px'} width={'100%'}>
				{children}
			</Box>
		</Box>
	)
}
