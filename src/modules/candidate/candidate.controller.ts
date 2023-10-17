import { Body, Controller, Post } from '@nestjs/common';
import { ICandidate } from './candidate.interface';
import { CandidateService } from './candidate.service';

@Controller('candidate')
export class CandidateController {
	
	constructor(
		private readonly candidateService: CandidateService
	) {}

	@Post()
	public async create(@Body() candidate: ICandidate) {

		return this.candidateService.create(candidate);
	}
}
