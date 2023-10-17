import { Injectable } from '@nestjs/common';
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

	public findOneById(id: number) {

		return this.candidateRepository.findOne({ where: { id } });
	}
}
