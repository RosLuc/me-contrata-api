import { Test, TestingModule } from '@nestjs/testing';
import { CandidateController } from '../candidate.controller';
import { CandidateService } from '../candidate.service';
import { UserType } from '../../user/user.interface';
import { Candidate } from '../../../core/ententies/candidate.entity';

describe('CandidateController', () => {
	let candidateController: CandidateController;
	let candidateService: CandidateService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CandidateController],
			providers: [
				{
					provide: CandidateService,
					useValue: {
						create: jest.fn(),
					},
				},
			],
		}).compile();

		candidateService = module.get<CandidateService>(CandidateService);
		candidateController =
			module.get<CandidateController>(CandidateController);
	});

	it('candidate controller should be defined', () => {
		expect(candidateController).toBeDefined();
	});

	it('candidate controller should be defined', () => {
		expect(candidateService).toBeDefined();
	});

	describe('create', () => {
		const createdAt = new Date('2023-10-13');

		beforeEach(() => {
			jest.spyOn(candidateService, 'create').mockImplementation(
				(object) => {
					return Promise.resolve({
						...object,
						user: {
							...object.user,
							id: 1,
							password: undefined,
							created_at: createdAt,
							updated_at: createdAt,
						},
						id: 1,
						created_at: createdAt,
						updated_at: createdAt,
					} as Candidate);
				},
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
					created_at: createdAt,
					updated_at: createdAt,
				},
				created_at: createdAt,
				updated_at: createdAt,
			};

			expect(candidateController.create(input)).resolves.toEqual(
				expected,
			);
		});
	});
});
