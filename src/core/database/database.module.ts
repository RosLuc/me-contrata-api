import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITIES } from '../ententies';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ENTITIES
    }),
  ],

  providers: [databaseProvider],
  exports: [databaseProvider, TypeOrmModule],
})
export class DatabaseModule {}