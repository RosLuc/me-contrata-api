import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '../../core/ententies/job.entity';
import { CandidateModule } from '../candidate/candidate.module';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [
    CandidateModule,
    TypeOrmModule.forFeature([Job])
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [TypeOrmModule]
})
export class JobModule {}
