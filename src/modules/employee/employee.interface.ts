import { ICompany } from "../company/company.interface";
import { IUser } from "../user/user.interface";

export interface IEmployee {
	name: string;
	company: ICompany
	user: IUser;
}