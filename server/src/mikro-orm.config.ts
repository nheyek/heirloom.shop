import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import dotenvFlow from 'dotenv-flow';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

dotenvFlow.config({ path: path.join(__dirname, '..') });

const isDev = process.env.NODE_ENV !== 'production';

// Use createRequire so we can conditionally load the EntityGenerator devDependency
// without a dynamic async import (defineConfig must be synchronous).
const _require = createRequire(import.meta.url);

const config = defineConfig({
	dbName: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	entityGenerator: {
		bidirectionalRelations: true,
		identifiedReferences: false,
		entityDefinition: 'decorators',
		decorators: 'es',
		esmImport: false,
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
	entities: [path.join(__dirname, 'entities/generated') + '/*.js'],
	entitiesTs: [
		path.join(__dirname, 'entities/generated') + '/*.ts',
	],
	metadataProvider: TsMorphMetadataProvider,
	discovery: { warnWhenNoEntities: false },
	// EntityGenerator is only needed when running the MikroORM CLI to regenerate
	// entities — not during tests or the app server.
	extensions:
		isDev && process.env.NODE_ENV !== 'testing'
			? [
					_require('@mikro-orm/entity-generator')
						.EntityGenerator,
				]
			: [],
});

export default config;
