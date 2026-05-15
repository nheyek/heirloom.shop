import { adminContract } from '@heirloom/common/contract';
import { adminAuth } from '@server/middleware/auth0.middleware';
import { findShopsForAdmin } from '@server/services/shop.service';
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
});
