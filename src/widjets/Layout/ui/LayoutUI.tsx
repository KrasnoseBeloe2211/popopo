'use client'
import { Box, Typography } from '@mui/material'

export const LayoutUI = ({ children }: any) => {

  

	return (
		<Box
			sx={(theme)=>({
				minHeight: 'calc(100vh-80px)',
				backgroundColor:theme.palette.background.default,
				display: 'flex',
				flexDirection: 'column',
				flexGrow: '100%',
				width: '100%',
			})}
		>
			
			<Box marginY={'30px'} width={'90%'}>
				{children}
			</Box>
		</Box>
	)
}
