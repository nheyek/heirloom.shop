import request from 'supertest';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

beforeAll(async () => {
	// Ensure the test user exists before running favorites tests
	await request(getApp()).get('/api/me').set('Authorization', 'Bearer test');
});

describe('GET /api/me/favorites', () => {
	it('returns 401 without auth', async () => {
		const res = await request(getApp()).get('/api/me/favorites');
		expect(res.status).toBe(401);
	});

	it('returns an empty array for a new user', async () => {
		const res = await request(getApp())
			.get('/api/me/favorites')
			.set('Authorization', 'Bearer test');
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body).toHaveLength(0);
	});
});
