import { AdminTableEntity } from '@/entities/admin'
import { IColumnsConfig } from '@/shared/ui/Table/model/types'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Typography,
	IconButton,
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

interface GridRowProps {
	config: IColumnsConfig[]
	user: AdminTableEntity
	onEdit?: (user: AdminTableEntity) => void
	onDelete?: (userId: string) => void
	details?: React.ReactNode
}

const Roles: Record<string, string> = {
	ROLE_PORTAL_ADMIN: 'Админ',
	ROLE_PORTAL_PSYCHOLOG: 'Психолог',
}

export const GridRow = ({
	config,
	user,
	onEdit,
	onDelete,
	details,
}: GridRowProps) => {
	const getCellValue = (key: string) => {
		const value = user[key as keyof AdminTableEntity]
		if (key === 'role' && typeof value === 'string') {
			return Roles[value] || value
		}
		return (value as string) || '-'
	}

	return (
		<Accordion key={user.id}>
			<AccordionSummary
				sx={{
					'& .MuiAccordionSummary-expandIconWrapper': {
						display: 'none',
					},
				}}
			>
				<Box
					display='grid'
					gridTemplateColumns={`${Array(config.length).fill('1fr').join(' ')} 40px 40px`}
					width='100%'
					alignItems='center'
					gap={1}
					px={2}
				>
					{config.map(col => (
						<Typography
							key={`${user.id}-${col.key}`}
							align={col.align || 'center'}
							variant='body2'
						>
							{getCellValue(col.key)}
						</Typography>
					))}
					<IconButton
						onClick={e => {
							e.stopPropagation()
							onEdit?.(user)
						}}
						size='small'
						disableRipple
						component='div'
					>
						<Edit />
					</IconButton>
					<IconButton
						onClick={e => {
							e.stopPropagation()
							onDelete?.(user.id)
						}}
						size='small'
						color='error'
						disableRipple
						component='div'
					>
						<Delete />
					</IconButton>
				</Box>
			</AccordionSummary>
			<AccordionDetails>{details}</AccordionDetails>
		</Accordion>
	)
}
