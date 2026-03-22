import { useForm } from 'react-hook-form'
import { auth } from '../api/auth'
import { toast } from 'react-toastify'
import type { ILoginForm } from '../types/types'
import { useRouter } from 'next/navigation'

export const useSendForm = (data: ILoginForm) => {
	const router = useRouter()
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
			localStorage.setItem('username', e.username)
			toast.success('Авторизация прошла успешно')
			reset()
			clearErrors()
			router.push('/profile')
		} catch (err) {
			toast.error('Не удалось авторизоваться')
			console.error(err)
		}
	})

	return { onSubmit, ...form, errors }
}
