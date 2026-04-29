import { adminContract } from '@heirloom/common/contract';
import { adminAuth } from '@server/middleware/auth0.middleware';
import { initServer } from '@ts-rest/express';

const s = initServer();

export const adminRouter = s.router(adminContract, {
	getPageData: {
		middleware: [adminAuth],
		handler: async () => ({
			status: 200 as const,
			body: { message: 'Welcome to the admin page.' },
		}),
	},
});
