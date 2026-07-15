import { jest } from '@jest/globals';

jest.unstable_mockModule('@server/services/storage.service', () => ({
	generateShopImageUploadUrl: jest
		.fn<() => Promise<{ uuid: string; uploadUrl: string }>>()
		.mockResolvedValue({
			uuid: 'img-test-uuid',
			uploadUrl: 'https://example.com/shop-upload',
		}),
	generateListingImageUploadUrl: jest
		.fn<() => Promise<{ uuid: string; uploadUrl: string }>>()
		.mockResolvedValue({
			uuid: 'listing-img-test-uuid',
			uploadUrl: 'https://example.com/listing-upload',
		}),
}));

import { getEm } from '@server/db';
import { Shop } from '@server/entities/generated/Shop';
import { ShopUserRole } from '@server/entities/generated/ShopUserRole';
import { TEST_USER_EMAIL } from '@server/middleware/auth0.middleware';
import { findOrCreateUser } from '@server/services/user.service';
import request from 'supertest';
import { useApp } from '../helpers/setupApp';

const getApp = useApp();

const AUTH = { Authorization: 'Bearer test' };

/**
 * Seed data (ids are DB-generated, not hardcoded, to avoid collisions with
 * other test files sharing the same database):
 *
 * Shop "Image Upload Test Shop"  shortId="img_shop70"  — test user is owner
 * Shop "Image Upload Test Shop 2" shortId="img_shop71"  — no role for test user
 */
beforeAll(async () => {
	const em = getEm();

	await request(getApp()).get('/api/me').set(AUTH);
	const testUser = await findOrCreateUser(TEST_USER_EMAIL);

	const shop70 = em.create(Shop, {
		title: 'Image Upload Test Shop',
		shortId: 'img_shop70',
	});
	const shop71 = em.create(Shop, {
		title: 'Image Upload Test Shop 2',
		shortId: 'img_shop71',
	});

	const ownerRole = em.create(ShopUserRole, {
		shop: shop70,
		user: testUser,
		shopRole: 'owner',
	});

	await em.persist([shop70, shop71, ownerRole]).flush();
});

describe('POST /api/shops/:id/image-upload-url', () => {
	it('returns 401 without auth', async () => {
		const res = await request(getApp())
			.post('/api/shops/img_shop70/image-upload-url')
			.send({ contentType: 'image/jpeg' });
		expect(res.status).toBe(401);
	});

	it('returns 404 for an unknown shop', async () => {
		const res = await request(getApp())
			.post('/api/shops/unknown_shop/image-upload-url')
			.set(AUTH)
			.send({ contentType: 'image/jpeg' });
		expect(res.status).toBe(404);
	});

	it('returns 403 for a user who does not own the shop', async () => {
		const res = await request(getApp())
			.post('/api/shops/img_shop71/image-upload-url')
			.set(AUTH)
			.send({ contentType: 'image/jpeg' });
		expect(res.status).toBe(403);
	});

	it('returns 200 with uuid and uploadUrl for the shop owner', async () => {
		const res = await request(getApp())
			.post('/api/shops/img_shop70/image-upload-url')
			.set(AUTH)
			.send({ contentType: 'image/jpeg' });
		expect(res.status).toBe(200);
		expect(res.body).toMatchObject({
			uuid: 'img-test-uuid',
			uploadUrl: 'https://example.com/shop-upload',
		});
	});
});
