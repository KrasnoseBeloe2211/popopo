import { FC, ReactNode, useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'

interface IChipsNav {
	elements: Record<string, ReactNode>
}

export const ChipsNav: FC<IChipsNav> = ({ elements }) => {
	const [selectedElement, setSelectedElement] = useState(
		Object.keys(elements)[0],
	)

	const chipsArr = Object.keys(elements)

	const handleChange = (_: React.SyntheticEvent, newValue: string) => {
		setSelectedElement(newValue)
	}

	return (
		<>
			<Box
				sx={{
					borderBottom: 1,
					width: 'fit-content',
					borderColor: 'divider',
					mb: 2,
				}}
			>
				<Tabs
					value={selectedElement}
					onChange={handleChange}
					variant='scrollable'
					scrollButtons='auto'
				>
					{chipsArr.map(el => (
						<Tab key={el} label={el} value={el} />
					))}
				</Tabs>
			</Box>
			{elements[selectedElement]}
		</>
	)
}
