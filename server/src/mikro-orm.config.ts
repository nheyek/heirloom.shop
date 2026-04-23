import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import dotenvFlow from 'dotenv-flow';
import path from 'path';

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
		// The generator emits `p.type(string[])` for text-array columns, which is
		// invalid TypeScript. Rewrite those properties so they generate `p.array()`.
		onProcessedMetadata: (metadata) => {
			for (const meta of metadata) {
				for (const prop of Object.values(meta.properties)) {
					if (typeof prop.type === 'string' && prop.type.endsWith('[]')) {
						prop.type = 'array';
					}
				}
			}
		},
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
	entities: [path.join(__dirname, '../../dist/server/src/entities/generated') + '/*.js'],
	entitiesTs: [path.join(__dirname, 'entities/generated') + '/*.ts'],
	metadataProvider: TsMorphMetadataProvider,
	discovery: { warnWhenNoEntities: false },
	// EntityGenerator is only needed when running the MikroORM CLI to regenerate
	// entities — not during tests or the app server.
	extensions: isDev && process.env.NODE_ENV !== 'testing'
		? [_require('@mikro-orm/entity-generator').EntityGenerator]
		: [],
});

export default config;
