import { apiController } from '@/shared/config/api/api'
import type { ILoginForm, IRegisterForm } from '../types/types'

export const auth = async (e: ILoginForm) => {
	const response = await apiController<ILoginForm>(
		'http://26.142.149.241:8080',
		'POST',
		'/api/login/access',
		e,
		undefined,
		undefined,
		{ 'Content-Type': 'application/x-www-form-urlencoded' },
	)
	if (response) return response
}

export const register = async (e: IRegisterForm) => {
	const response = await apiController<IRegisterForm>(
		'http://26.142.149.241:8080',
		'POST',
		'/register',
		e,
	)
	if (response) return response
}
