import { createRequire } from 'module';
import mikroConfig from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';

let orm: MikroORM;

// MikroORM's entity file discovery uses a native ESM import() even in CJS contexts,
// which bypasses ts-node's TypeScript resolver and fails on .ts files.
// Override with require() so ts-node (dev server) resolves .ts files correctly.
// The guard ensures this only runs in the CJS dev-server context:
//   - __filename is defined in real CJS but NOT in ESM (including Jest's ESM mode)
//   - NODE_ENV !== 'testing' ensures we don't interfere with the test runner
if (typeof __filename !== 'undefined' && process.env.NODE_ENV !== 'testing') {
	const _require = createRequire(__filename);
	(globalThis as any).dynamicImportProvider = (fileUrl: string) =>
		Promise.resolve(_require(new URL(fileUrl).pathname));
}

export const initORM = async () => {
	orm = await MikroORM.init(mikroConfig);
	return orm;
};

export const getORM = () => {
	if (!orm) throw new Error('ORM not initialized');
	return orm;
};

export const getEm = () => getORM().em.fork(); // use request-scoped EM
