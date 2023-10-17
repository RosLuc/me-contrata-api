import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from '../../core/ententies/candidate.entity';
import { UserModule } from '../user/user.module';
import { CandidateController } from './candidate.controller';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Candidate])
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
  exports: [
    TypeOrmModule,
    CandidateService
  ]
})
export class CandidateModule {}
