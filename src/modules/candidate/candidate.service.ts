import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from '../../core/ententies/candidate.entity';
import { ICandidate } from './candidate.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class CandidateService {
	
	constructor(
		@InjectRepository(Candidate)
		private readonly candidateRepository: Repository<Candidate>,
		private readonly userService: UserService
	) {}

	public async create(candidate: ICandidate) {

		const { user } = candidate;

		const databaseUser = await this.userService.create(user);

		const candidateToCreate = this.candidateRepository.create({
			...candidate,
			user: databaseUser
		});

		return this.candidateRepository.save(candidateToCreate);
	}

	public async update(jobId: number, candidate: ICandidate) {
		const databaseCandidate = await this.candidateRepository.findOne({
			where: { id: jobId },
		});

		if (!databaseCandidate) {
			throw new NotFoundException('Candidato não encontrado');
		}

		const candidateToUpdate = this.candidateRepository.create({
			...databaseCandidate,
			...candidate,
		});

		return this.candidateRepository.save(candidateToUpdate);
	}

	public findOneById(id: number) {

		return this.candidateRepository.findOne({ where: { id } });
	}

	public async delete(id: number) {
		const databaseCandidate = await this.candidateRepository.findOne({ where: { id } });

		if (!databaseCandidate) {
			throw new NotFoundException('Candidato não encontrado');
		}

		await this.candidateRepository.remove([databaseCandidate]);
	}
}
