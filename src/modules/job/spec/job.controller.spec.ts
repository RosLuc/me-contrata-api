import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from '../job.controller';
import { JobService } from '../job.service';
import { Job } from '../../../core/ententies/job.entity';

describe('JobController', () => {
	let jobController: JobController;
	let jobService: JobService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [JobController],
			providers: [
				{
					provide: JobService,
					useValue: {
						create: jest.fn(),
						getAll: jest.fn(),
						getOneById: jest.fn(),
					},
				},
			],
		}).compile();

		jobService = module.get<JobService>(JobService);
		jobController = module.get<JobController>(JobController);
	});

	it('job controller should be defined', () => {
		expect(jobController).toBeDefined();
	});

	it('job service should be defined', () => {
		expect(jobService).toBeDefined();
	});

	describe('create', () => {
		const createdAt = new Date('2023-10-13');

		beforeEach(() => {
			jest.spyOn(jobService, 'create').mockImplementation((object) => {
				return Promise.resolve({
					...object,
					id: 1,
					created_at: createdAt,
					updated_at: createdAt,
				} as Job);
			});
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

			expect(jobController.create(input)).resolves.toEqual(expected);
			expect(jobService.create).toBeCalledWith(input);
		});
	});

	describe('getAll', () => {
		const createdAt = new Date('2023-10-13');

		beforeEach(() => {
			jest.spyOn(jobService, 'getAll').mockResolvedValue([
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
				} as Job
			]);
		});

		it('successfully getAll job', async () => {
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
				} as Job
			];

			expect(jobController.getAll(input)).resolves.toEqual(expected);
			expect(jobService.getAll).toBeCalledWith(input);
		});
	});

	describe('getOne', () => {
		const createdAt = new Date('2023-10-13');

		beforeEach(() => {
			jest.spyOn(jobService, 'getOneById').mockResolvedValue({
				id: 2,
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

		it('successfully get one job', async () => {
			const input = 2;
			const expected = {
				id: 2,
				name: 'me contrata',
				price: 100,
				description: 'descrição',
				category: 'dev',
				status: 'aberta',
				candidate_id: 1,
				created_at: createdAt,
				updated_at: createdAt,
			} as Job;

			expect(jobController.getOne(input)).resolves.toEqual(expected);
			expect(jobService.getOneById).toBeCalledWith(input);
		});
	});
});
