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
export interface IResponse<T> {
	data: T
	success: boolean
	error?: string
}

const api = axios.create({ withCredentials: true })
export { api }

// Создаём отдельный экземпляр axios для refresh токена без interceptors
const refreshApi = axios.create({ withCredentials: true })

api.interceptors.request.use((config: any) => {
	if (typeof window !== 'undefined') {
		const access_token = localStorage.getItem('access_token')
		if (access_token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${access_token}`,
			}
		}
	}
	return config
})

let isRefreshing = false
let failedQueue: Array<{
	resolve: (value: any) => void
	reject: (reason?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error)
		} else {
			prom.resolve(token)
		}
	})
	failedQueue = []
}

api.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			retry?: boolean
			_skipRetry?: boolean
		}

		// Если запрос помечен как _skipRetry, не пытаемся обновить токен
		if (originalRequest._skipRetry) {
			return Promise.reject(error)
		}

		if (
			error.response?.status === 401 &&
			!originalRequest.retry &&
			!isRefreshing
		) {
			originalRequest.retry = true
			isRefreshing = true

			try {
				if (typeof window === 'undefined') {
					throw new Error('SSR')
				}
				const currentToken = localStorage.getItem('access_token')
				if (!currentToken) throw new Error('Токен отсутствует')

				const newToken = await refreshToken(currentToken)
				localStorage.setItem('access_token', newToken)

				processQueue(null, newToken)

				originalRequest.headers = {
					...originalRequest.headers,
					Authorization: `Bearer ${newToken}`,
				}
				return api(originalRequest)
			} catch (refreshError) {
				processQueue(refreshError, null)
				if (typeof window !== 'undefined') {
					localStorage.removeItem('access_token')
					window.location.href = '/login'
				}
				return Promise.reject(refreshError)
			} finally {
				isRefreshing = false
			}
		}

		// Если токен обновляется в данный момент, ставим запрос в очередь
		if (error.response?.status === 401 && isRefreshing) {
			return new Promise((resolve, reject) => {
				failedQueue.push({ resolve, reject })
			})
				.then(token => {
					originalRequest.headers = {
						...originalRequest.headers,
						Authorization: `Bearer ${token}`,
					}
					return api(originalRequest)
				})
				.catch(err => {
					console.log('')
					return Promise.reject(err)
				})
		}

		return Promise.reject(error)
	},
)

export const refreshToken = async (access_token: string | null) => {
	if (access_token === null) {
		throw new Error('Токен доступа отсутствует')
	}

	// Используем отдельный экземпляр axios без interceptors
	try {
		const response = await refreshApi.post(
			`${baseUrl}/api/login/refresh`,
			{ access_token },
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		return response.data.access_token
	} catch (error) {
		console.error('Refresh token failed:', error)
		throw error
	}
}

export const apiController = async <T>(
	base: string = baseUrl,
	method: Method,
	endpoint: string,
	data?: object,
	params?: object,
	responseType?: ResponseType,
	headers?: AxiosHeaders | RawAxiosRequestHeaders,
): Promise<IResponse<T>> => {
	const response = await api.request<IResponse<T>>({
		method,
		url: base + endpoint,
		data,
		params,
		responseType,
		headers,
	})
	return response.data
}
