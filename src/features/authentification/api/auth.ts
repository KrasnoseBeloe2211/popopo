import { apiController } from '@/shared/config/api/api'
import type { ILoginForm, IRegisterForm } from '../types/types'

export const auth = async (e: ILoginForm) => {
	const response = await apiController<ILoginForm>(
		undefined,
		'POST',
		'/api/login/access',
		e,
		undefined,
		undefined,
		{ 'Content-Type': 'application/x-www-form-urlencoded' },
	)
	if (response) return response
}
