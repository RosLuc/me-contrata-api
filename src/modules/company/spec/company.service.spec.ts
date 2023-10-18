import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyService } from '../company.service';
import { Company } from '../../../core/ententies/company.entity';

describe('CompanyService', () => {
	let companyService: CompanyService;
	let companyRepository: Repository<Company>;

	beforeEach(async () => {
		const JOB_REPOSITORY_TOKEN = getRepositoryToken(Company);

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CompanyService,
				{
					provide: JOB_REPOSITORY_TOKEN,
					useValue: {
						create: jest.fn(),
						save: jest.fn(),
						find: jest.fn(),
						findOne: jest.fn(),
					},
				},
			],
		}).compile();

		companyService = module.get<CompanyService>(CompanyService);
		companyRepository = module.get<Repository<Company>>(JOB_REPOSITORY_TOKEN);
	});

	it('company service should be defined', () => {
		expect(companyService).toBeDefined();
	});

	it('company repository should be defined', () => {
		expect(companyRepository).toBeDefined();
	});

	describe('create', () => {
		const createdAt = new Date('2023-10-13');

		beforeEach(() => {
			jest.spyOn(companyRepository, 'create').mockImplementation((object) => {
				return {
					...object,
					id: 1,
					created_at: createdAt,
					updated_at: createdAt,
				} as Company;
			});
			jest.spyOn(companyRepository, 'save').mockImplementation(
				(object: Company) => Promise.resolve(object),
			);
		});

		it('successfully creating company', async () => {
			const input = {
				name: 'me contrata',
				number_employees: 1,
				sector: 'software'
			};
			const expected = {
				...input,
				id: 1,
				created_at: createdAt,
				updated_at: createdAt,
			};

			expect(companyService.create(input)).resolves.toEqual(expected);
		});
	});
});
