import { SearchResult, SearchResultCollection } from '@common/types/SearchResultCollection';
import { getEm } from '../db';
import { Listing } from '../entities/generated/Listing';
import { ListingCategory } from '../entities/generated/ListingCategory';
import { Shop } from '../entities/generated/Shop';

const MAX_RESULTS_PER_TYPE = 5;

const escapeLikePattern = (query: string): string => {
	// Escape LIKE wildcards so they're treated as literal characters
	return query.replace(/[%_\\]/g, '\\$&');
};

export const search = async (query: string): Promise<SearchResultCollection> => {
	const em = getEm();
	const pattern = `%${escapeLikePattern(query)}%`;

	const [listings, shops, categories] = await Promise.all([
		em.find(
			Listing,
			{ title: { $ilike: pattern } },
			{ limit: MAX_RESULTS_PER_TYPE },
		),
		em.find(
			Shop,
			{ title: { $ilike: pattern } },
			{ limit: MAX_RESULTS_PER_TYPE },
		),
		em.find(
			ListingCategory,
			{ title: { $ilike: pattern } },
			{ limit: MAX_RESULTS_PER_TYPE },
		),
	]);

	return {
		listingResults: listings.map((l): SearchResult => ({
			id: String(l.id),
			label: l.title,
		})),
		shopResults: shops.map((s): SearchResult => ({
			id: String(s.id),
			label: s.title,
		})),
		categoryResults: categories.map((c): SearchResult => ({
			id: c.id,
			label: c.title,
		})),
	};
};
