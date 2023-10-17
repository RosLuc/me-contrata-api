import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetAllOptions, IJob } from './Job.interface';
import { Job } from '../../core/ententies/job.entity';
import { CandidateService } from '../candidate/candidate.service';

@Injectable()
export class JobService {
	constructor(
		@InjectRepository(Job)
		private readonly jobRepository: Repository<Job>,
		private readonly candidateService: CandidateService,
	) {}

	public async create(job: IJob) {

		const databaseCandidate = await this.candidateService.findOneById(job.candidate_id);

		if (!databaseCandidate) {

			throw new NotFoundException('Candidato não encontrado');
		}

		const jobToCreate = this.jobRepository.create(job);

		return this.jobRepository.save(jobToCreate);
	}

	public getAll(options: IGetAllOptions) {

		return this.jobRepository.find({
			where: {
				category: options.category ? options.category : undefined
			},
			order: options.orderBy ? { [options.orderBy]: options.order || 'ASC' } : undefined
		});
	}

	public getOneById(id: number) {

		return this.jobRepository.findOne({ where: { id }, relations: ['candidate'] });
	}
}