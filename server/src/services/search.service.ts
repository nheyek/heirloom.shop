import {
	SearchResult,
	SearchResultCollection,
} from '@heirloom/common/contract';
import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { Shop } from '@server/entities/generated/Shop';

const MAX_RESULTS_PER_TYPE = 5;

const escapeLikePattern = (query: string): string => {
	// Escape LIKE wildcards so they're treated as literal characters
	return query.replace(/[%_\\]/g, '\\$&');
};

export const search = async (
	query: string,
): Promise<SearchResultCollection> => {
	const em = getEm();
	const pattern = `%${escapeLikePattern(query)}%`;

	const [listings, shops] = await Promise.all([
		em.find(
			Listing,
			{ title: { $ilike: pattern } },
			{
				populate: ['shop'],
				limit: MAX_RESULTS_PER_TYPE,
			},
		),
		em.find(
			Shop,
			{ title: { $ilike: pattern } },
			{ limit: MAX_RESULTS_PER_TYPE },
		),
	]);

	return {
		listingResults: listings.map(
			(l): SearchResult => ({
				id: String(l.shortId),
				label: `${l.title} (${l.shop.title})`,
			}),
		),
		shopResults: shops.map(
			(s): SearchResult => ({
				id: String(s.shortId),
				label: s.title,
			}),
		),
	};
};
