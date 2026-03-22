import { useForm } from 'react-hook-form'
import { auth } from '../api/auth'
import { toast } from 'react-toastify'
import type { ILoginForm } from '../types/types'

export const useSendForm = (data: ILoginForm) => {
	const form = useForm<ILoginForm>({
		mode: 'onBlur',
		defaultValues: {
			username: data.username || '',
			password: data.password || '',
		},
	})

	form.register('username', { required: 'Имя обязательно для ввода' })
	form.register('password', { required: 'Пароль обязателен' })

	const { handleSubmit, formState, reset, clearErrors } = form
	const { errors } = formState
	const onSubmit = handleSubmit(async (e: ILoginForm) => {
		try {
			const response: any = await auth(e)
			localStorage.setItem('access_token', response.access_token)
			toast.success('Авторизация прошла успешно')
			reset()
			clearErrors()
		} catch (err) {
			toast.error('Не удалось авторизоваться')
			console.error(err)
		}
	})

	return { onSubmit, ...form, errors }
}
