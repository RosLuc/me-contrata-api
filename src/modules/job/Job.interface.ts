export interface IJob {
	name: string;
	price: number;
	description: string;
	category: string;
	status: string;
	candidate_id: number;
}

export interface IGetAllOptions {
	category?: string;
	order?: string;
	orderBy?: string;
}