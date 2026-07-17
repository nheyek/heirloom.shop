import { getEm } from '@server/db';
import { AppUser } from '@server/entities/generated/AppUser';
import { Shop } from '@server/entities/generated/Shop';
import { ShopUserRole } from '@server/entities/generated/ShopUserRole';
import { TEST_USER_EMAIL } from '@server/middleware/auth0.middleware';
import { findOrCreateUser } from '@server/services/user.service';
import request from 'supertest';
import { useApp } from '../helpers/setupApp';

// This suite intentionally does NOT mock @server/services/storage.service so
// that the real content-type allow-list validation runs. Rejected requests
// never reach S3 — getSignedUrl only computes a signature locally — so no
// network access or real credentials are needed.

const getApp = useApp();

const AUTH = { Authorization: 'Bearer test' };

/**
 * Seed data (ids are DB-generated, not hardcoded, to avoid collisions with
 * other test files sharing the same database):
 *
 * Shop "Content Type Test Shop"  shortId="cty_shop80"  — test user is owner
 */
beforeAll(async () => {
	const em = getEm();

	await request(getApp()).get('/api/me').set(AUTH);
	const testUser = await findOrCreateUser(TEST_USER_EMAIL);

	const shop = em.create(Shop, {
		title: 'Content Type Test Shop',
		shortId: 'cty_shop80',
	});

	const ownerRole = em.create(ShopUserRole, {
		shop,
		user: testUser,
		shopRole: 'owner',
	});

	await em.persist([shop, ownerRole]).flush();
});

describe('image upload content-type validation', () => {
	it('rejects a non-image content type for POST /api/shops/:id/image-upload-url', async () => {
		const res = await request(getApp())
			.post('/api/shops/cty_shop80/image-upload-url')
			.set(AUTH)
			.send({ contentType: 'text/html' });
		expect(res.status).toBe(400);
	});

	it('rejects a non-image content type for POST /api/shops/:id/listing-image-upload-url', async () => {
		const res = await request(getApp())
			.post('/api/shops/cty_shop80/listing-image-upload-url')
			.set(AUTH)
			.send({ contentType: 'image/svg+xml' });
		expect(res.status).toBe(400);
	});

	it('rejects a non-image content type for POST /api/admin/shop-image-upload-url', async () => {
		const em = getEm();
		const user = await em.findOneOrFail(AppUser, { email: TEST_USER_EMAIL });
		user.isAdmin = true;
		await em.flush();

		const res = await request(getApp())
			.post('/api/admin/shop-image-upload-url')
			.set(AUTH)
			.send({ contentType: 'text/html' });
		expect(res.status).toBe(400);

		user.isAdmin = false;
		await em.flush();
	});
});
