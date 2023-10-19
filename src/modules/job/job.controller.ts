import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IGetAllOptions, IJob } from './Job.interface';
import { JobService } from './job.service';

@Controller('job')
export class JobController {

	constructor(private readonly jobService: JobService) {}

	@Post()
	public async create(@Body() job: IJob) {

		return this.jobService.create(job);
	}

	
	@Put('/:id')
	public async update(@Param('id') id: number, @Body() job: IJob) {

		return this.jobService.update(id, job);
	}

	@Get()
	public async getAll(@Query() queryParams: IGetAllOptions) {

		return this.jobService.getAll(queryParams);
	}

	@Get('/:id')
	public async getOne(@Param('id') id: number) {

		return this.jobService.getOneById(id);
	}

	@Delete('/:id')
	public async delete(@Param('id') id: number) {

		return this.jobService.removeById(id);
	}
}
