import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../core/ententies/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	public async create(user: IUser) {

		user.password = this.encryptPassword(user.password);

		const userToCreate = this.userRepository.create(user);

		const databaseUser = await this.userRepository.save(userToCreate);

		delete databaseUser.password;

		return databaseUser;
	}

	private encryptPassword(password: string, databaseUser?: User) {

		if (databaseUser && password === databaseUser.password) {

			return password;
		}

		const salt = bcrypt.genSaltSync(10);

		return bcrypt.hashSync(password, salt);
	}
}
