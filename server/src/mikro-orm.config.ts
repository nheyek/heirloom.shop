import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { defineConfig } from '@mikro-orm/postgresql';
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

export default defineConfig({
	dbName: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	entities: ['src/entities/**/*.js'],
	entitiesTs: ['src/entities/**/*.ts'],
	metadataProvider: TsMorphMetadataProvider,
	discovery: { warnWhenNoEntities: false },
	extensions: [EntityGenerator],
});
