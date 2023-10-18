import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Employee } from '../../core/ententies/employee.entity';
import { CompanyService } from '../company/company.service';
import { IEmployee } from './employee.interface';

@Injectable()
export class EmployeeService {
	
	constructor(
		@InjectRepository(Employee)
		private readonly candidateRepository: Repository<Employee>,
		private readonly userService: UserService,
		private readonly companyService: CompanyService
	) {}

	public async create(employee: IEmployee) {

		const { user, company } = employee;

		const databaseUser = await this.userService.create(user);
		const databaseCompany = await this.companyService.create(company);

		const candidateToCreate = this.candidateRepository.create({
			...employee,
			company: databaseCompany,
			user: databaseUser
		});

		return this.candidateRepository.save(candidateToCreate);
	}
}
