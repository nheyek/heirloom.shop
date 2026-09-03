import { infoPagesContract } from '@heirloom/common/contract';
import { mapInfoPageToApiResponseData } from '@server/mappers/infoPage.mapper';
import { findAllInfoPages } from '@server/services/infoPage.service';
import { initServer } from '@ts-rest/express';

const s = initServer();

export const infoPageRouter = s.router(infoPagesContract, {
	getAll: {
		handler: async () => {
			const infoPages = await findAllInfoPages();
			return {
				status: 200 as const,
				body: infoPages.map(mapInfoPageToApiResponseData),
			};
		},
		middleware: [],
	},
});
