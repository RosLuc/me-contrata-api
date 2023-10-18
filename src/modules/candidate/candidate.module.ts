import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from '../../core/ententies/candidate.entity';
import { UserModule } from '../user/user.module';
import { CandidateController } from './candidate.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate]),
    UserModule
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
  exports: [CandidateService]
})
export class CandidateModule {}
