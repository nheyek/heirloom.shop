import { categoryContract } from '@heirloom/common/contract';
import { initServer } from '@ts-rest/express';
import { ERROR_MESSAGES } from '@server/constants';
import { mapCategoryToApiResponseData } from '@server/mappers/category.mapper';
import { mapListingToApiResponseData } from '@server/mappers/listing.mapper';
import {
	findAllCategories,
	findCategoryById,
	findChildCategories,
	findTopLevelCategories,
} from '@server/services/category.service';
import * as listingService from '@server/services/listing.service';

const s = initServer();

export const categoryRouter = s.router(categoryContract, {
	getAll: {
		handler: async () => {
			const categories = await findAllCategories();
			return {
				status: 200 as const,
				body: categories.map(mapCategoryToApiResponseData),
			};
		},
		middleware: [],
	},

	getTopLevel: async () => {
		const categories = await findTopLevelCategories();
		return {
			status: 200 as const,
			body: categories.map(mapCategoryToApiResponseData),
		};
	},

	getById: async ({ params: { id } }) => {
		const category = await findCategoryById(id.toUpperCase());
		if (!category) {
			return {
				status: 404 as const,
				body: { error: ERROR_MESSAGES.category.notFound },
			};
		}
		return {
			status: 200 as const,
			body: mapCategoryToApiResponseData(category),
		};
	},

	getChildren: async ({ params: { id } }) => {
		const upperId = id.toUpperCase();
		const category = await findCategoryById(upperId);
		if (!category) {
			return {
				status: 404 as const,
				body: { error: ERROR_MESSAGES.category.notFound },
			};
		}
		const children = await findChildCategories(upperId);
		return {
			status: 200 as const,
			body: children.map(mapCategoryToApiResponseData),
		};
	},

	getListings: async ({ params: { id } }) => {
		const upperId = id.toUpperCase();
		const category = await findCategoryById(upperId);
		if (!category) {
			return {
				status: 404 as const,
				body: { error: ERROR_MESSAGES.category.notFound },
			};
		}
		const listings =
			await listingService.findListingsByCategory(upperId);
		return {
			status: 200 as const,
			body: listings.map(mapListingToApiResponseData),
		};
	},
});
