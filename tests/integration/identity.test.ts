import request from 'supertest';
import { TEST_USER_EMAIL } from '../../server/src/middleware/auth0.middleware';
import { getEm } from '../../server/src/db';
import { AppUser } from '../../server/src/entities/generated/AppUser';
import { findUserByEmail } from '../../server/src/services/user.service';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

describe('GET /api/me', () => {
	it('returns 401 without auth', async () => {
		const res = await request(getApp()).get('/api/me');
		expect(res.status).toBe(401);
	});

	it('returns user info for the test user', async () => {
		const res = await request(getApp())
			.get('/api/me')
			.set('Authorization', 'Bearer test');
		expect(res.status).toBe(200);
		expect(res.body.email).toBe(TEST_USER_EMAIL);
		expect(typeof res.body.id).toBe('number');
	});

	it('creates a user record in the database on first call', async () => {
		const res = await request(getApp())
			.get('/api/me')
			.set('Authorization', 'Bearer test');
		const user = await findUserByEmail(TEST_USER_EMAIL);
		expect(user).not.toBeNull();
		expect(user!.email).toBe(TEST_USER_EMAIL);
		expect(user!.id).toBe(res.body.id);
	});

	it('does not create a duplicate record on subsequent calls', async () => {
		const first = await request(getApp())
			.get('/api/me')
			.set('Authorization', 'Bearer test');
		const second = await request(getApp())
			.get('/api/me')
			.set('Authorization', 'Bearer test');
		const count = await getEm().count(AppUser, { email: TEST_USER_EMAIL });
		expect(count).toBe(1);
		expect(second.body.id).toBe(first.body.id);
	});
});
