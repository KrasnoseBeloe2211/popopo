import { Box, Typography } from '@mui/material'
import { IColumnsConfig } from '../model/types'

export const HeaderRow = ({ config }: { config: IColumnsConfig[] }) => {
	return (
		<Box
			display='grid'
			gridTemplateColumns={`${Array(config.length).fill('1fr').join(' ')} 40px 40px`}
			width='100%'
			alignItems='center'
			gap={1}
			p={2}
			sx={{ bgcolor: 'action.hover', fontWeight: 'bold' }}
		>
			{config.map(col => (
				<Typography
					key={col.label}
					align={col.align || 'center'}
					variant='body2'
				>
					{col.label}
				</Typography>
			))}
			<Box />
			<Box />
		</Box>
	)
}
