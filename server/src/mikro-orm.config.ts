import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { defineConfig } from '@mikro-orm/postgresql';
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

const isDev = process.env.NODE_ENV !== 'production';

const config = defineConfig({
	dbName: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	driverOptions: {
		connection: {
			ssl: {
				rejectUnauthorized: false,
			},
		},
	},
	entities: ['src/entities/**/*.js'],
	entitiesTs: ['src/entities/**/*.ts'],
	metadataProvider: TsMorphMetadataProvider,
	discovery: { warnWhenNoEntities: false },
	extensions: [...(isDev ? [require('@mikro-orm/entity-generator').EntityGenerator] : [])],
});

export default config;
