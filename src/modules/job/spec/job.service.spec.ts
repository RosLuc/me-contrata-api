import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobService } from '../job.service';
import { Job } from '../../../core/ententies/job.entity';
import { CandidateService } from '../../candidate/candidate.service';
import { NotFoundException } from '@nestjs/common';

describe('JobService', () => {

	const repositoryMock = {
		create: jest.fn(),
		save: jest.fn(),
		find: jest.fn(),
		findOne: jest.fn(),
		remove: jest.fn()
	}

	let jobService: JobService;
	let candidateService: CandidateService;
	let jobRepository: Repository<Job>;

	beforeEach(async () => {
		const JOB_REPOSITORY_TOKEN = getRepositoryToken(Job);

		const module: TestingModule = await Test.createTestingModule({
			imports: [
				{
					module: class FakeModule {},
					providers: [
						{
							provide: CandidateService,
							useValue: {
								findOneById: jest
									.fn()
									.mockImplementation((object) => ({
										...object,
										id: 1,
										password: undefined,
									})),
							},
						},
					],
					exports: [CandidateService],
				},
			],
			providers: [
				JobService,
				{
					provide: JOB_REPOSITORY_TOKEN,
					useValue: {
						create: jest.fn(),
						save: jest.fn(),
						find: jest.fn(),
						findOne: jest.fn(),
						remove: jest.fn()
					},
				},
			],
		}).compile();

		jobService = module.get<JobService>(JobService);
		candidateService = module.get<CandidateService>(CandidateService);
		jobRepository = module.get<Repository<Job>>(JOB_REPOSITORY_TOKEN);
	});

	it('user service should be defined', () => {
		expect(candidateService).toBeDefined();
	});

	it('candidate service should be defined', () => {
		expect(jobService).toBeDefined();
	});

	it('candidate repository should be defined', () => {
		expect(jobRepository).toBeDefined();
	});

	describe('create', () => {
		const createdAt = new Date('2023-10-13');

		beforeEach(() => {
			jest.spyOn(jobRepository, 'create').mockImplementation((object) => {
				return {
					...object,
					id: 1,
					created_at: createdAt,
					updated_at: createdAt,
				} as Job;
			});
			jest.spyOn(jobRepository, 'save').mockImplementation(
				(object: Job) => Promise.resolve(object),
			);
		});

		it('successfully creating job', async () => {
			const input = {
				name: 'me contrata',
				price: 100,
				description: 'descrição',
				category: 'dev',
				status: 'aberta',
				candidate_id: 1,
			};
			const expected = {
				...input,
				id: 1,
				created_at: createdAt,
				updated_at: createdAt,
			};

			expect(jobService.create(input)).resolves.toEqual(expected);
			expect(candidateService.findOneById).toBeCalledWith(
				input.candidate_id,
			);
		});

		it('errored creating job', async () => {
			const input = {
				name: 'me contrata',
				price: 100,
				description: 'descrição',
				category: 'dev',
				status: 'aberta',
				candidate_id: 1,
			};
			const expected = new NotFoundException('Candidato não encontrado');

			jest.spyOn(candidateService, 'findOneById').mockResolvedValueOnce(
				null,
			);

			expect(jobService.create(input)).rejects.toThrowError(expected);
			expect(candidateService.findOneById).toBeCalledWith(
				input.candidate_id,
			);
		});
	});

	describe('update', () => {
		const createdAt = new Date('2023-10-13');
		const DATABASE_JOB = {
			id: 1,
			name: 'me contrata',
			price: 100,
			description: 'descrição',
			category: 'dev',
			status: 'aberta',
			candidate_id: 1,
			created_at: createdAt,
			updated_at: createdAt,
		};

		beforeEach(() => {
			jest.spyOn(jobRepository, 'findOne').mockResolvedValue(DATABASE_JOB as Job);
			jest.spyOn(jobRepository, 'create').mockImplementation((object) => {
				return {
					...object,
					id: 1,
					created_at: createdAt,
					updated_at: createdAt,
				} as Job;
			});
			jest.spyOn(jobRepository, 'save').mockImplementation(
				(object: Job) => Promise.resolve(object),
			);
		});

		it('successfully updating job', async () => {
			const firstInput = 1
			const secondInput = {
				name: 'novo job',
				price: 120,
				description: 'descrição',
				category: 'dev',
				status: 'aberta',
				candidate_id: 1,
			};
			const expected = {
				...secondInput,
				id: 1,
				created_at: createdAt,
				updated_at: createdAt,
			};

			expect(jobService.update(firstInput, secondInput)).resolves.toEqual(expected);
			expect(jobRepository.findOne).toBeCalledWith({
				where: { id: firstInput },
			});
		});

		it('errored creating job', async () => {
			const firstInput = 1
			const secondInput = {
				name: 'novo job',
				price: 120,
				description: 'descrição',
				category: 'dev',
				status: 'aberta',
				candidate_id: 1,
			};
			const expected = new NotFoundException('Job não encontrado');

			jest.spyOn(jobRepository, 'findOne').mockResolvedValue(null);

			expect(jobService.update(firstInput, secondInput)).rejects.toThrowError(expected);
			expect(jobRepository.findOne).toBeCalledWith({
				where: { id: firstInput },
			});
		});
	});

	describe('getAll', () => {
		const createdAt = new Date('2023-10-13');

		beforeEach(() => {
			jest.spyOn(jobRepository, 'find').mockResolvedValue([
				{
					id: 1,
					name: 'me contrata',
					price: 100,
					description: 'descrição',
					category: 'dev',
					status: 'aberta',
					candidate_id: 1,
					created_at: createdAt,
					updated_at: createdAt,
				} as Job,
				{
					id: 2,
					name: 'me contrata',
					price: 100,
					description: 'descrição',
					category: 'dev',
					status: 'aberta',
					candidate_id: 1,
					created_at: createdAt,
					updated_at: createdAt,
				} as Job,
			]);
			jest.spyOn(jobRepository, 'findOne').mockResolvedValue({
				id: 1,
				name: 'me contrata',
				price: 100,
				description: 'descrição',
				category: 'dev',
				status: 'aberta',
				candidate_id: 1,
				created_at: createdAt,
				updated_at: createdAt,
			} as Job);
		});

		it('successfully find all job', async () => {
			const input = {};
			const expected = [
				{
					id: 1,
					name: 'me contrata',
					price: 100,
					description: 'descrição',
					category: 'dev',
					status: 'aberta',
					candidate_id: 1,
					created_at: createdAt,
					updated_at: createdAt,
				} as Job,
				{
					id: 2,
					name: 'me contrata',
					price: 100,
					description: 'descrição',
					category: 'dev',
					status: 'aberta',
					candidate_id: 1,
					created_at: createdAt,
					updated_at: createdAt,
				} as Job,
			];

			expect(jobService.getAll(input)).resolves.toEqual(expected);
			expect(jobRepository.find).toBeCalledWith({
				where: {},
				order: {},
			});
		});

		it('successfully find all job with options', async () => {
			const input = {
				category: 'dev',
				orderBy: 'id',
				order: 'ASC',
			};
			const expected = [
				{
					id: 1,
					name: 'me contrata',
					price: 100,
					description: 'descrição',
					category: 'dev',
					status: 'aberta',
					candidate_id: 1,
					created_at: createdAt,
					updated_at: createdAt,
				} as Job,
				{
					id: 2,
					name: 'me contrata',
					price: 100,
					description: 'descrição',
					category: 'dev',
					status: 'aberta',
					candidate_id: 1,
					created_at: createdAt,
					updated_at: createdAt,
				} as Job,
			];

			expect(jobService.getAll(input)).resolves.toEqual(expected);
			expect(jobRepository.find).toBeCalledWith({
				where: {
					category: input.category,
				},
				order: {
					[input.orderBy]: input.order,
				},
			});
		});
	});

	describe('getOneById', () => {
		const createdAt = new Date('2023-10-13');

		beforeEach(() => {
			jest.spyOn(jobRepository, 'findOne').mockResolvedValue({
				id: 1,
				name: 'me contrata',
				price: 100,
				description: 'descrição',
				category: 'dev',
				status: 'aberta',
				candidate_id: 1,
				created_at: createdAt,
				updated_at: createdAt,
			} as Job);
		});

		it('successfully find job', async () => {
			const input = 1;
			const expected = {
				id: 1,
				name: 'me contrata',
				price: 100,
				description: 'descrição',
				category: 'dev',
				status: 'aberta',
				candidate_id: 1,
				created_at: createdAt,
				updated_at: createdAt,
			};

			expect(jobService.getOneById(input)).resolves.toEqual(expected);
			expect(jobRepository.findOne).toBeCalledWith({
				where: { id: input },
				relations: ['candidate'],
			});
		});
	});

	describe('removeById', () => {
		const DATABASE_JOB = {
			id: 1,
			name: 'me contrata',
			price: 100,
			description: 'descrição',
			category: 'dev',
			status: 'aberta',
			candidate_id: 1,
			created_at: new Date('2023-10-13'),
			updated_at: new Date('2023-10-13'),
		}

		beforeEach(() => {
			jest.spyOn(jobRepository, 'findOne').mockResolvedValue(DATABASE_JOB as Job);
			jest.spyOn(jobRepository, 'remove').mockResolvedValue(DATABASE_JOB as Job);
		});

		it('successfully delete job', async () => {
			const input = 1;

			expect(jobService.removeById(input)).resolves.toBeUndefined();
			expect(jobRepository.findOne).toBeCalledWith({
				where: { id: input },
			});
		});

		it('erroed delete job', async () => {
			const input = 1;
			const expected = new NotFoundException('Job não encontrado');

			jest.spyOn(jobRepository, 'findOne').mockResolvedValue(null);

			expect(jobService.removeById(input)).rejects.toThrowError(expected);
			expect(jobRepository.findOne).toBeCalledWith({
				where: { id: input },
			});
		});
	});
});
