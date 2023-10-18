import { Test, TestingModule } from '@nestjs/testing';
import { UserType } from '../../user/user.interface';
import { EmployeeController } from '../employee.controller';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../../core/ententies/employee.entity';

describe('EmployeeController', () => {
	let employeeController: EmployeeController;
	let employeeService: EmployeeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EmployeeController],
			providers: [
				{
					provide: EmployeeService,
					useValue: {
						create: jest.fn(),
					},
				},
			],
		}).compile();

		employeeService = module.get<EmployeeService>(EmployeeService);
		employeeController = module.get<EmployeeController>(EmployeeController);
	});

	it('employee controller should be defined', () => {
		expect(employeeController).toBeDefined();
	});

	it('employee service should be defined', () => {
		expect(employeeService).toBeDefined();
	});

	describe('create', () => {
		const createdAt = new Date('2023-10-13');

		beforeEach(() => {
			jest.spyOn(employeeService, 'create').mockImplementation(
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
						company: {
							...object.company,
							id: 1,
							created_at: createdAt,
							updated_at: createdAt,
						},
						id: 1,
						created_at: createdAt,
						updated_at: createdAt,
					} as Employee);
				},
			);
		});

		it('successfully creating company', async () => {
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
					created_at: createdAt,
					updated_at: createdAt,
				},
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

			
			expect(employeeController.create(input)).resolves.toEqual(expected);
			expect(employeeService.create).toBeCalledWith(input);
		});
	});
});
