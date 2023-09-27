import { DataSource } from 'typeorm';
import { ENTITIES } from '../ententies';
import 'dotenv/config';

export default new DataSource({
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USERNAME,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
	migrations: [`${__dirname}/migrations/*.ts`],
	entities: ENTITIES
});
