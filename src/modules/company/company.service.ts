import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../core/ententies/company.entity';
import { ICompany } from './company.interface';

@Injectable()
export class CompanyService {
	constructor(
		@InjectRepository(Company)
		private readonly companyRepository: Repository<Company>,
	) {}

	public async create(company: ICompany) {
		const jobToCreate = this.companyRepository.create(company);

		return this.companyRepository.save(jobToCreate);
	}
}
