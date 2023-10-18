import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../../core/ententies/company.entity';
import { CompanyService } from './company.service';

@Module({
  imports: [
    CompanyModule,
    TypeOrmModule.forFeature([Company])
  ],
  providers: [CompanyService]
})
export class CompanyModule {}
