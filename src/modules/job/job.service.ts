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
		const databaseCandidate = await this.candidateService.findOneById(
			job.candidate_id,
		);

		if (!databaseCandidate) {
			throw new NotFoundException('Candidato não encontrado');
		}

		const jobToCreate = this.jobRepository.create(job);

		return this.jobRepository.save(jobToCreate);
	}

	public async update(jobId: number, job: IJob) {
		const databaseJob = await this.jobRepository.findOne({
			where: { id: jobId },
		});

		if (!databaseJob) {
			throw new NotFoundException('Job não encontrado');
		}

		const jobToUpdate = this.jobRepository.create({
			...databaseJob,
			...job,
		});

		return this.jobRepository.save(jobToUpdate);
	}

	public getAll(options: IGetAllOptions) {
		const { category, orderBy, order = 'ASC' } = options;
		const findOptions = {
			where: {},
			order: {},
		};

		if (category) {
			findOptions.where = {
				category,
			};
		}

		if (orderBy && order) {
			findOptions.order = {
				[orderBy]: order,
			};
		}

		return this.jobRepository.find(findOptions);
	}

	public getOneById(id: number) {
		return this.jobRepository.findOne({
			where: { id },
			relations: ['candidate'],
		});
	}

	public async removeById(id: number) {
		const databaseJob = await this.jobRepository.findOne({ where: { id } });

		if (!databaseJob) {
			throw new NotFoundException('Job não encontrado');
		}

		await this.jobRepository.remove([databaseJob]);
	}
}
