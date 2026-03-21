import { useForm } from 'react-hook-form'
import type { IRegisterForm } from '../types/types'
import { register as apiRegister } from '../api/auth'
import { toast } from 'react-toastify'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/entities/user/model/store'

export const useRegister = (registerData: IRegisterForm) => {
	const navigate = useNavigate()
	const { setAuth } = useUserStore()
	const form = useForm<IRegisterForm>({
		mode: 'onSubmit',
		defaultValues: {
			login: registerData.login || '',
			email: registerData.email || '',
			password: registerData.password || '',
		},
	})

	const { handleSubmit, control, register, formState, reset, clearErrors } =
		form
	const { errors } = formState

	const postRegister = useCallback(
		async (data: IRegisterForm) => {
			try {
				await apiRegister(data)
				setAuth()
				toast.success('Регистрация прошла успешно')
				reset()
				clearErrors()
				navigate('/')
				return true
			} catch (err: any) {
				toast.error('Не удалось зарегистрироваться')
				console.error('Ошибка регистрации:', err)
				throw err
			}
		},
		[reset, clearErrors, navigate, setAuth],
	)


	const onSubmit = handleSubmit(postRegister)

	return {
		onSubmit,
		control,
		register,
		errors,
	}
}
