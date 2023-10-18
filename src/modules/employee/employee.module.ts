import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Employee } from '../../core/ententies/employee.entity';
import { EmployeeService } from './employee.service';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    UserModule,
    CompanyModule
  ],
  providers: [EmployeeService],
  exports: [EmployeeService]
})
export class EmployeeModule {}
