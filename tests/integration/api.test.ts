import request from 'supertest';
import { createApp } from '../../server/src/app';
import { getORM } from '../../server/src/db';
import { TEST_USER_EMAIL } from '../../server/src/middleware/auth0.middleware';

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

describe('GET /api/me', () => {
	it('returns 401 without auth', async () => {
		const res = await request(app).get('/api/me');
		expect(res.status).toBe(401);
	});

	it('returns user info for the test user', async () => {
		const res = await request(app)
			.get('/api/me')
			.set('Authorization', 'Bearer test');
		expect(res.status).toBe(200);
		expect(res.body.email).toBe(TEST_USER_EMAIL);
		expect(typeof res.body.id).toBe('number');
	});

	it('auto-creates the user on first call', async () => {
		const res = await request(app)
			.get('/api/me')
			.set('Authorization', 'Bearer test');
		expect(res.status).toBe(200);
		expect(res.body.email).toBe(TEST_USER_EMAIL);
	});
});

describe('GET /api/me/favorites', () => {
	it('returns 401 without auth', async () => {
		const res = await request(app).get('/api/me/favorites');
		expect(res.status).toBe(401);
	});

	it('returns an empty array for a new user', async () => {
		const res = await request(app)
			.get('/api/me/favorites')
			.set('Authorization', 'Bearer test');
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body).toHaveLength(0);
	});
});
