export interface Test {
	id: string
	psychologist_id: string
	title: string
	description: string
	responses?: number
	lastActive?: string
	schema: {
		scales: IScale[]
		questions: IQuestion[]
	}
}

export interface IQuestion {
	id: string
	type: string
	text: string
	options: Option[]
}

export interface Option {
	id: string
	text: string
	weights: any
}

export interface ILevels {
	id: string
	label: string
	score_from: number
	score_to: number
	text_client: string
	text_pro: string
}

export interface IScale {
	id: string
	name: string
	min: number
	max: number
	levels?: ILevels[]
}