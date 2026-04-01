import { createApp } from '../../../server/src/app';
import { getORM } from '../../../server/src/db';

/**
 * Registers beforeAll/afterAll to start the app and close the ORM.
 * Call at the top level of each integration test file and use the
 * returned getter to access the app instance inside tests.
 *
 * const getApp = useApp();
 * it('...', async () => { const res = await request(getApp()).get(...) });
 */
export function useApp() {
	let app: Awaited<ReturnType<typeof createApp>>;

	beforeAll(async () => {
		app = await createApp();
	});

	afterAll(async () => {
		await getORM().close();
	});

	return () => app;
}
