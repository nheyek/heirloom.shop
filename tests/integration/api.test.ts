import request from 'supertest';
import { createApp } from '../../server/src/app';
import { getORM } from '../../server/src/db';

let app: Awaited<ReturnType<typeof createApp>>;

beforeAll(async () => {
	app = await createApp();
});

afterAll(async () => {
	await getORM().close();
});

describe('GET /api/categories', () => {
	it('returns 200 with an array', async () => {
		const res = await request(app).get('/api/categories');
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
	});
});
