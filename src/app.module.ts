import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { CandidateModule } from './modules/candidate/candidate.module';
import { JobModule } from './modules/job/job.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    CandidateModule,
    JobModule
  ]
})
export class AppModule {}
