import { useForm } from 'react-hook-form'
import { apiController } from '@/shared/config/api/api'
import { toast } from 'react-toastify'

export interface IClientInfoForm {
	client_name: string
	client_contacts: {
		email: string
		phone: string
	}
}

export const useSendForm = (sessionId: string, onSuccess?: () => void) => {
	const form = useForm<IClientInfoForm>({
		mode: 'onBlur',
		defaultValues: {
			client_name: '',
			client_contacts: {
				email: '',
				phone: '',
			},
		},
	})

	const { handleSubmit, formState, reset, clearErrors } = form
	const { errors } = formState

	const onSubmit = handleSubmit(async (data: IClientInfoForm) => {
		try {
			const response = await apiController(
				undefined,
				'PATCH',
				`/api/client/session/${sessionId}/client-info`,
				data,
			)
			toast.success('Данные клиента успешно сохранены')
			reset()
			clearErrors()
			onSuccess?.()
			return response
		} catch (err: any) {
			const message =
				err?.response?.data?.message ||
				err?.message ||
				'Ошибка сохранения данных'
			toast.error(message)
			console.error(err)
			throw err
		}
	})

	return { onSubmit, ...form, errors }
}
