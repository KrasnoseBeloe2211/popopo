import { Visit } from '@/_pages/'
import { getVisit } from '@/_pages/Visit/api/api'


export default async function page({ params }: any) {
	const { id } = await params

	return <Visit id={id} />
}
