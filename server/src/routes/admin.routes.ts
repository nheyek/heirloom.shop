import { adminContract } from '@heirloom/common/contract';
import { isValidEmail } from '@heirloom/common/utils/validationUtils';
import { adminAuth } from '@server/middleware/auth0.middleware';
import { createShop, findShopsForAdmin } from '@server/services/shop.service';
import { generateShopImageUploadUrl } from '@server/services/storage.service';
import { initServer } from '@ts-rest/express';

const s = initServer();

export const adminRouter = s.router(adminContract, {
	getShops: {
		middleware: [adminAuth],
		handler: async () => ({
			status: 200 as const,
			body: await findShopsForAdmin(),
		}),
	},
	createShop: {
		middleware: [adminAuth],
		handler: async ({ body }) => {
			if (body.directFulfillment) {
				if (!body.ownerEmail?.trim()) {
					return {
						status: 400 as const,
						body: { error: 'Owner email is required.' },
					};
				}
				if (!isValidEmail(body.ownerEmail)) {
					return {
						status: 400 as const,
						body: { error: 'Email format is invalid.' },
					};
				}
			}
			const shop = await createShop(body);
			return { status: 201 as const, body: shop };
		},
	},
	getShopImageUploadUrl: {
		middleware: [adminAuth],
		handler: async ({ body }) => ({
			status: 200 as const,
			body: await generateShopImageUploadUrl(body.contentType),
		}),
	},
});
