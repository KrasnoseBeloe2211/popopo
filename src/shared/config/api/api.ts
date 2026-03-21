import type {
	AxiosError,
	AxiosHeaders,
	AxiosRequestConfig,
	Method,
	RawAxiosRequestHeaders,
	ResponseType,
} from 'axios'
import { baseUrl } from '../../params'
import axios from 'axios'
interface IResponse<T> {
	data: T
	succes: boolean
	error?: string
}

const api = axios.create({ baseURL: baseUrl, withCredentials: true })

api.interceptors.request.use((config: any) => {
	const access_token = localStorage.getItem('access_token')
	if (access_token) {
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${access_token}`,
		}
	}
	return config
})

api.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			retry?: boolean
		}

		if (error.response?.status === 401 && !originalRequest.retry) {
			originalRequest.retry = true

			try {
				const currentToken = localStorage.getItem('access_token')
				if (!currentToken) throw new Error('Токен отсутствует')

				const newToken = await refreshToken(currentToken)
				localStorage.setItem('access_token', newToken)

				originalRequest.headers = {
					...originalRequest.headers,
					Authorization: `Bearer ${newToken}`,
				}
				return api(originalRequest)
			} catch (refreshError) {
				window.location.href = '/auth'
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	},
)

export const refreshToken = async (access_token: string | null) => {
	if (access_token === null) {
		throw new Error('Токен доступа отсутствует')
	}

	const response: any = await apiController('POST', '/login/refresh', {
		access_token: access_token,
	})

	return response.data.access_token
}

export const apiController = async <T>(
	method: Method,
	endpoint: string,
	data?: object,
	params?: object,
	responseType?: ResponseType,
	headers?: AxiosHeaders | RawAxiosRequestHeaders,
): Promise<IResponse<T>> => {
	const response = await api.request<IResponse<T>>({
		method,
		url: endpoint,
		data,
		params,
		responseType,
		headers,
	})
	return response.data
}

