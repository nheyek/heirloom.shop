import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

const isDev = process.env.NODE_ENV !== 'production';

const config = defineConfig({
	dbName: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	entityGenerator: {
		bidirectionalRelations: true,
	},
	driverOptions: isDev
		? {}
		: {
				connection: {
					ssl: {
						rejectUnauthorized: false,
					},
				},
		  },
	entities: ['dist/server/src/entities/*.js', 'dist/server/src/entities/generated/*.js'],
	entitiesTs: ['src/entities/*.ts', 'src/entities/generated/*.ts'],
	metadataProvider: TsMorphMetadataProvider,
	discovery: { warnWhenNoEntities: false },
	extensions: [...(isDev ? [require('@mikro-orm/entity-generator').EntityGenerator] : [])],
});

export default config;
