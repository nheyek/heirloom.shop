import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import dotenvFlow from 'dotenv-flow';
import path from 'path';

// __dirname is a CJS module variable (undefined in ESM/test context).
// Only reference it inside the guard below — it is dead code in test mode.
if (process.env.NODE_ENV !== 'testing') {
	dotenvFlow.config({ path: path.join(__dirname, '..') });
}

const isDev = process.env.NODE_ENV !== 'production';

const config = defineConfig({
	dbName: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	entityGenerator: {
		bidirectionalRelations: true,
		identifiedReferences: false,
		esmImport: true,
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
	// In CJS/tsx (CLI/dev) context __dirname is available — use it for absolute paths
	// so the config works regardless of cwd. In ESM (tests, cwd=repo root) fall back
	// to repo-root-relative globs.
	entities: process.env.NODE_ENV !== 'testing'
		? [path.join(__dirname, '../../dist/server/src/entities/generated') + '/*.js']
		: ['dist/server/src/entities/generated/*.js'],
	entitiesTs: process.env.NODE_ENV !== 'testing'
		? [path.join(__dirname, 'entities/generated') + '/*.ts']
		: ['server/src/entities/generated/*.ts'],
	metadataProvider: TsMorphMetadataProvider,
	discovery: { warnWhenNoEntities: false },
	// require() is only available in CJS (dev/CLI) context, not in ESM (tests)
	extensions:
		typeof require !== 'undefined' && isDev
			? [require('@mikro-orm/entity-generator').EntityGenerator]
			: [],
});

export default config;
