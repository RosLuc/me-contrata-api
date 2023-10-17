import { IUser } from "../user/user.interface";

export interface ICandidate {
	name: string;
	bio: string;
	birth_date: Date;
	user: IUser;
}