import databaseConfig from './database.config';

export const databaseProvider = {
	provide: 'DATA_SOURCE',
	useFactory: async () => {

		return databaseConfig.initialize();
	},
};