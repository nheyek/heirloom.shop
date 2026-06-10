import request from 'supertest';
import { TEST_USER_EMAIL } from '@server/middleware/auth0.middleware';
import { getEm } from '@server/db';
import { AppUser } from '@server/entities/generated/AppUser';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

describe('GET /api/admin/shops', () => {
	it('returns 401 without auth', async () => {
		const res = await request(getApp()).get('/api/admin/shops');
		expect(res.status).toBe(401);
	});

	it('returns 403 for a non-admin authenticated user', async () => {
		// Ensure the test user exists in the DB (is_admin defaults to false)
		await request(getApp())
			.get('/api/me')
			.set('Authorization', 'Bearer test');

		const res = await request(getApp())
			.get('/api/admin/shops')
			.set('Authorization', 'Bearer test');
		expect(res.status).toBe(403);
	});

	it('returns 200 for an admin user', async () => {
		// Promote the test user to admin
		const em = getEm();
		const user = await em.findOneOrFail(AppUser, { email: TEST_USER_EMAIL });
		user.isAdmin = true;
		await em.flush();

		const res = await request(getApp())
			.get('/api/admin/shops')
			.set('Authorization', 'Bearer test');
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);

		// Reset so other tests are not affected
		user.isAdmin = false;
		await em.flush();
	});
});
