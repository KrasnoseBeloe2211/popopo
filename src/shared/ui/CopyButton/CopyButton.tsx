import { CopyAllRounded } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
	const [copied, setCopied] = useState(false)
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(textToCopy)
			setCopied(true)
		} catch (err) {
			console.error(err)
			toast.error('не удалось скопировать')
		}
	}

	return (
		<>
			{copied && <Typography>Успешно скопировано</Typography>}
			<Button onClick={handleCopy}>
				{textToCopy} <CopyAllRounded />
			</Button>
		</>
	)
}
