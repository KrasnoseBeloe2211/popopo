'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TestsStore } from '@/entities/test/model/store'
import { useShallow } from 'zustand/shallow'
import { getTests } from '@/entities/test/model/api'
import type { Test as TestType } from '@/entities/test/model/types'
import {
	Box,
	Typography,
	TextField,
	InputAdornment,
	Button,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Chip,
} from '@mui/material'
import { Search, ContentCopy, Delete, Edit, Add } from '@mui/icons-material'
import Link from 'next/link'
import { Modal } from '@/shared/ui/Modal/ui/Modal'
import { generateSession } from '@/entities/session'
import { set } from 'react-hook-form'
import { CopyButton } from '@/shared/ui'

export const Test = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [sessionUrl, setSessionUrl] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const tests = TestsStore(
		useShallow?.(state => state.tests) || (state => state.tests),
	)

	useEffect(() => {
		TestsStore.getState().refetch?.()
	}, [])

	// const filteredTests = useMemo(
	// 	() =>
	// 		tests.filter(test =>
	// 			test.title.toLowerCase().includes(searchTerm.toLowerCase()),
	// 		),
	// 	[tests, searchTerm],
	// )
	const handleClose = () => {
		setIsOpen(false)
	}

	const fetchSessionUrl = async (testId: string) => {
		const url = await generateSession(testId)
		setSessionUrl(url || '')
		setIsOpen(true)
	}

	return (
		<Box sx={{ p: 3 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
				<Typography variant='h5'>Мои опросники</Typography>
				<Link href={'/construct'}>Создать опросник</Link>
			</Box>

			<TextField
				fullWidth
				placeholder='Поиск по названию...'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				sx={{ mb: 3 }}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Search />
						</InputAdornment>
					),
				}}
			/>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Название</TableCell>
							<TableCell align='center'>Прохождений</TableCell>
							<TableCell align='center'>Дата активности</TableCell>
							<TableCell align='center'>Действия</TableCell>
							<TableCell align='center'>Cсылка</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tests?.map(test => (
							<TableRow key={test.id}>
								<TableCell>
									<Typography fontWeight={500}>{test.title}</Typography>
									<Typography variant='caption' color='text.secondary'>
										{test.description}
									</Typography>
								</TableCell>
								<TableCell align='center'>{test.counter}</TableCell>
								<TableCell align='center'>
									{test.lastActive
										? new Date(test.lastActive).toLocaleDateString('ru-RU')
										: 'Нет данных'}
								</TableCell>
								<TableCell align='center'>
									<IconButton>
										<Delete />
									</IconButton>
								</TableCell>
								<TableCell align='center'>
									<Modal
										onClose={handleClose}
										setIsOpen={setIsOpen}
										isOpen={isOpen}
										openElement={
											<Button
												onClick={() => {
													fetchSessionUrl(test.id)
												}}
												sx={{ fontSize: '12px' }}
											>
												Создать
											</Button>
										}
									>
										<Box
											sx={theme => ({
												backgroundColor: theme.palette.background.paper,
												padding: '20px',
											})}
										>
											<Typography variant='h6' sx={{ mb: 2 }}>
												Ссылка на прохождение теста
											</Typography>
											<CopyButton textToCopy={sessionUrl} />
										</Box>
									</Modal>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{tests?.length === 0 && (
				<Typography align='center' sx={{ mt: 4 }} color='text.secondary'>
					Нет опросников. Создайте первый!
				</Typography>
			)}
		</Box>
	)
}
