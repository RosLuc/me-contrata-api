import { Body, Controller, Post } from '@nestjs/common';
import { IEmployee } from './employee.interface';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
	
	constructor(
		private readonly employeeService: EmployeeService
	) {}

	@Post()
	public async create(@Body() candidate: IEmployee) {

		return this.employeeService.create(candidate);
	}
}
