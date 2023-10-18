import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../user/user.service';
import { UserType } from '../../user/user.interface';
import { CompanyService } from '../../company/company.service';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../../core/ententies/employee.entity';

describe('EmployeeService', () => {
	let emlpoyeeService: EmployeeService;
	let companyService: CompanyService;
	let userService: UserService;
	let employeeRepository: Repository<Employee>;

	beforeEach(async () => {
		const CANDIDATE_REPOSITORY_TOKEN = getRepositoryToken(Employee);

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
				{
					module: class FakeModule {},
					providers: [
						{
							provide: CompanyService,
							useValue: {
								create: jest
									.fn()
									.mockImplementation((object) => ({
										...object,
										id: 1,
									})),
							},
						},
					],
					exports: [CompanyService],
				},
			],
			providers: [
				EmployeeService,
				{
					provide: CANDIDATE_REPOSITORY_TOKEN,
					useValue: {
						create: jest.fn(),
						save: jest.fn(),
						findOne: jest.fn(),
					},
				},
			],
		}).compile();

		emlpoyeeService = module.get<EmployeeService>(EmployeeService);
		userService = module.get<UserService>(UserService);
		companyService = module.get<CompanyService>(CompanyService);
		employeeRepository = module.get<Repository<Employee>>(
			CANDIDATE_REPOSITORY_TOKEN,
		);
	});

	it('user service should be defined', () => {
		expect(userService).toBeDefined();
	});

	it('employee service should be defined', () => {
		expect(emlpoyeeService).toBeDefined();
	});

	it('employee repository should be defined', () => {
		expect(employeeRepository).toBeDefined();
	});

	it('company service should be defined', () => {
		expect(companyService).toBeDefined();
	});

	describe('create', () => {
		const createdAt = new Date('2023-10-13');

		beforeEach(() => {
			jest.spyOn(employeeRepository, 'create').mockImplementation(
				(object) => {
					return {
						...object,
						id: 1,
						created_at: createdAt,
						updated_at: createdAt,
					} as Employee;
				},
			);
			jest.spyOn(employeeRepository, 'save').mockImplementation(
				(object: Employee) => Promise.resolve(object),
			);
		});

		it('successfully creating employee', async () => {
			const input = {
				name: 'me contrata',
				user: {
					email: 'me@contrata.com.br',
					password: '12345678',
					type: UserType.Employee,
					username: 'meContrata',
				},
				company: {
					name: 'me contrata',
					number_employees: 3,
					sector: 'software',
				},
			};
			const expected = {
				...input,
				id: 1,
				company: {
					...input.company,
					id: 1,
				},
				user: {
					...input.user,
					id: 1,
					password: undefined,
				},
				created_at: createdAt,
				updated_at: createdAt,
			};

			expect(emlpoyeeService.create(input)).resolves.toEqual(expected);
		});
	});
});
