export interface AdminTableEntity {
	id: string
	email: string
	full_name: string
	role: 'ROLE_PORTAL_ADMIN' | 'ROLE_PORTAL_PSYCHOLOG'
	about?: string
}
