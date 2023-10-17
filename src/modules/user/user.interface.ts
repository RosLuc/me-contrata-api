export interface IUser {
	username: string;
	email: string;
	password: string;
	type: UserType;
}

export enum UserType {
	Employee = 'employee',
	Candidate = 'candidate'
}