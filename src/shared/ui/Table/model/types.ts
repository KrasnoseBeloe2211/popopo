import { AdminTableEntity } from '@/entities/admin'

export interface IColumnsConfig {
	label: string
	key: keyof AdminTableEntity
	align?: 'right' | 'left' | 'center'
}
