import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user.service';
import { User } from '../../../core/ententies/user.entity';
import { IUser, UserType } from '../user.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
	let userService: UserService;
	let userRepository: Repository<User>;

	beforeEach(async () => {
		const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: USER_REPOSITORY_TOKEN,
					useValue: {
						create: jest.fn(),
						save: jest.fn(),
					},
				},
			],
		}).compile();

		
		userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
		userService = module.get<UserService>(UserService);
	});

	it('user service should be defined', () => {
		expect(userService).toBeDefined();
	});

	it('user repository should be defined', () => {
		expect(userRepository).toBeDefined();
	});

	describe('create', () => {
		const createdAt = new Date('2023-10-13');
		const passwordHash = 'hash_token';
		beforeEach(() => {
			jest.spyOn(userRepository, 'create').mockImplementation(
				(object) => {
					return {
						...object,
						created_at: createdAt,
						updated_at: createdAt,
					} as User;
				},
			);
			jest.spyOn(userRepository, 'save').mockImplementation(
				(object: User) => Promise.resolve(object),
			);
			jest.spyOn(bcrypt, 'hashSync').mockReturnValue(passwordHash);
		});

		it('successfully creating user', async () => {
			const input = {
				email: 'me@contrata.com.br',
				password: '12345678',
				type: UserType.Candidate,
				username: 'meContrata',
			} as IUser;
			const expected = {
				...input,
				password: undefined,
				created_at: createdAt,
				updated_at: createdAt,
			};

			expect(userService.create(input)).resolves.toEqual(expected);
			expect(userRepository.create).toBeCalledWith({
				...input,
				password: passwordHash,
			});
			expect(userRepository.save).toBeCalledWith({
				...input,
				password: passwordHash,
				created_at: createdAt,
				updated_at: createdAt,
			});
		});
	});
});
