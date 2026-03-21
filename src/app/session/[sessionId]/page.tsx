import { Session } from '@/_pages'
import { Box } from '@mui/material'

export default async function page({ params }: any) {
	const { sessionId } = await params
	return <Session sessionId={sessionId} />
}
