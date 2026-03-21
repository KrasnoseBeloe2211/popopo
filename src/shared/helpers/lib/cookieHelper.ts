export const getCookie = (key: string) => {
	const cookieString: string | undefined = document.cookie
		.split('; ')
		.find(name => name.startsWith(key + '='))
	return cookieString ? cookieString.split('=')[1] : ''
}
