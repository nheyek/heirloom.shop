import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import dotenvFlow from 'dotenv-flow';
import path from 'path';

dotenvFlow.config({ path: path.join(__dirname, '..') });

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
	entities: [
		'dist/server/src/entities/*.js',
		'dist/server/src/entities/generated/*.js',
	],
	entitiesTs: [
		path.join(__dirname, 'entities/*.ts'),
		path.join(__dirname, 'entities/generated/*.ts'),
	],
	metadataProvider: TsMorphMetadataProvider,
	metadataCache: { enabled: true, options: { cacheDir: path.join(__dirname, '../temp') } },
	discovery: { warnWhenNoEntities: false },
	extensions: [
		...(isDev
			? [
					require('@mikro-orm/entity-generator')
						.EntityGenerator,
				]
			: []),
	],
});

export default config;
