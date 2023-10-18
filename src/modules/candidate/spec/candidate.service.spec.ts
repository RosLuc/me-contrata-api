import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidateService } from '../candidate.service';
import { Candidate } from '../../../core/ententies/candidate.entity';
import { UserService } from '../../user/user.service';
import { UserType } from '../../user/user.interface';

describe('CandidateService', () => {
	let candidateService: CandidateService;
	let userService: UserService;
	let candidateRepository: Repository<Candidate>;

	beforeEach(async () => {
		const CANDIDATE_REPOSITORY_TOKEN = getRepositoryToken(Candidate);

		const module: TestingModule = await Test.createTestingModule({
			imports: [
				{
					module: class FakeModule {},
					providers: [
						{
							provide: UserService,
							useValue: {
								create: jest
									.fn()
									.mockImplementation((object) => ({
										...object,
										id: 1,
										password: undefined,
									})),
							},
						},
					],
					exports: [UserService],
				},
			],
			providers: [
				CandidateService,
				{
					provide: CANDIDATE_REPOSITORY_TOKEN,
					useValue: {
						create: jest.fn(),
						save: jest.fn(),
						findOne: jest.fn()
					},
				},
			],
		}).compile();

		candidateService = module.get<CandidateService>(CandidateService);
		userService = module.get<UserService>(UserService);
		candidateRepository = module.get<Repository<Candidate>>(
			CANDIDATE_REPOSITORY_TOKEN,
		);
	});

	it('user service should be defined', () => {
		expect(userService).toBeDefined();
	});

	it('candidate service should be defined', () => {
		expect(candidateService).toBeDefined();
	});

	it('candidate repository should be defined', () => {
		expect(candidateRepository).toBeDefined();
	});

	describe('create', () => {
		const createdAt = new Date('2023-10-13');

		beforeEach(() => {
			jest.spyOn(candidateRepository, 'create').mockImplementation(
				(object) => {
					return {
						...object,
						id: 1,
						created_at: createdAt,
						updated_at: createdAt,
					} as Candidate;
				},
			);
			jest.spyOn(candidateRepository, 'save').mockImplementation(
				(object: Candidate) => Promise.resolve(object),
			);
		});

		it('successfully creating candidate', async () => {
			const input = {
				name: 'me contrata',
				bio: 'Maior plataforma',
				birth_date: createdAt,
				user: {
					email: 'me@contrata.com.br',
					password: '12345678',
					type: UserType.Candidate,
					username: 'meContrata',
				},
			};
			const expected = {
				...input,
				id: 1,
				user: {
					...input.user,
					id: 1,
					password: undefined,
				},
				created_at: createdAt,
				updated_at: createdAt,
			};

			expect(candidateService.create(input)).resolves.toEqual(expected);
		});
	});

	describe('findOneById', () => {
		const createdAt = new Date('2023-10-13');

		beforeEach(() => {
			jest.spyOn(candidateRepository, 'findOne').mockResolvedValue({
				id: 1,
				name: 'me contrata',
				bio: 'Maior plataforma',
				birth_date: createdAt,
				user: {
					id: 1,
					email: 'me@contrata.com.br',
					password: '12345678',
					type: UserType.Candidate,
					username: 'meContrata',
					created_at: createdAt,
					updated_at: createdAt,
				},
				created_at: createdAt,
				updated_at: createdAt,
			} as Candidate);
		});

		it('successfully creating candidate', async () => {
			const input = 1;
			const expected = {
				id: 1,
				name: 'me contrata',
				bio: 'Maior plataforma',
				birth_date: createdAt,
				user: {
					id: 1,
					email: 'me@contrata.com.br',
					password: '12345678',
					type: UserType.Candidate,
					username: 'meContrata',
					created_at: createdAt,
					updated_at: createdAt,
				},
				created_at: createdAt,
				updated_at: createdAt,
			};

			expect(candidateService.findOneById(input)).resolves.toEqual(expected);
			expect(candidateRepository.findOne).toBeCalledWith({ where: { id: 1 } });
		});
	});
});
