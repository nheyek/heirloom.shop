import request from 'supertest';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

describe('GET /api/categories', () => {
	it('returns 200 with an array', async () => {
		const res = await request(getApp()).get('/api/categories');
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
	});
});
