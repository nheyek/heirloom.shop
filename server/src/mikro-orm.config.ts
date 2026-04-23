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
	// Paths resolved from process.cwd() — works in both CJS (dev) and ESM (tests)
	entities: ['dist/server/src/entities/generated/*.js'],
	entitiesTs: ['server/src/entities/generated/*.ts'],
	metadataProvider: TsMorphMetadataProvider,
	discovery: { warnWhenNoEntities: false },
	// require() is only available in CJS (dev/CLI) context, not in ESM (tests)
	extensions:
		typeof require !== 'undefined' && isDev
			? [require('@mikro-orm/entity-generator').EntityGenerator]
			: [],
});

export default config;
