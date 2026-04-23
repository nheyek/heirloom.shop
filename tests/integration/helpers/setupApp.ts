/**
 * Registers beforeAll/afterAll to start the app and close the ORM.
 * Call at the top level of each integration test file and use the
 * returned getter to access the app instance inside tests.
 *
 * App is loaded lazily inside beforeAll so that jest.mock() /
 * jest.unstable_mockModule() calls in the test file take effect before
 * the module graph is resolved.
 *
 * const getApp = useApp();
 * it('...', async () => { const res = await request(getApp()).get(...) });
 */
export function useApp() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let app: any;

	beforeAll(async () => {
		const { createApp } = await import('../../../server/src/app');
		app = await createApp();
	});

	afterAll(async () => {
		const { getORM } = await import('../../../server/src/db');
		await getORM().close();
	});

	return () => app;
}
