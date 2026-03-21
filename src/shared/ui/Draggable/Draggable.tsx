import { useIsMobile } from '@/shared/helpers/hooks/useIsMobile'
import { useDraggable } from '@dnd-kit/react'
import { Box } from '@mui/material'
import React from 'react'

export const Draggable = ({
	children,
	id,
}: {
	id: string
	children: React.ReactNode
}) => {
	const { ref } = useDraggable({
		id,
	})
	const { isMobile } = useIsMobile()

	return (
		<Box width={'100%'} ref={ref}>
			{children}
		</Box>
	)
}
