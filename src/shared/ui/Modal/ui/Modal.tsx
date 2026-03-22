import { Box, Button } from '@mui/material'
import React from 'react'

interface IModal {
	openElement: React.ReactNode
	isOpen: boolean
	onClose: () => void
	setIsOpen: (e: boolean) => void
	children: React.ReactNode
}

export const Modal = ({
	openElement,
	isOpen,
	onClose,
	setIsOpen,
	children,
}: IModal) => {
	return (
		<>
			<Box
				bgcolor={'#00000000'}
				sx={{ outline: 'none' }}
				border={'none'}
				component={'div'}
				onClick={e => {
					e.stopPropagation()
					setIsOpen(true)
				}}
			>
				{openElement}
			</Box>
			{isOpen && (
				<Box
					top={'0'}
					right={'0'}
					border={'none'}
					position={'fixed'}
					width={'100%'}
					height={'100vh'}
					bgcolor={'#0000004a'}
					display={'flex'}
					component={'button'}
					alignItems={'center'}
					justifyContent={'center'}
				>
					<Box
						onClick={e => {
							e.stopPropagation()
							onClose()
						}}
						width={'100vw'}
						height={'100vh'}
						position={'fixed'}
						top={'0'}
						right={'0'}
					></Box>
					{children}
				</Box>
			)}
		</>
	)
}
