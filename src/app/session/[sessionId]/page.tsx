import { Session } from '@/_pages'
import { getMyTest, Test } from '@/entities/test'
import { Box } from '@mui/material'

export default async function page({ params }: any) {
	const { sessionId } = await params
	const test: any = await getMyTest(sessionId)
	return <Session sessionId={sessionId} test={test} />
}
