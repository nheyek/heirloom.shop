import { getEm } from '@server/db';
import { ListingCategory } from '@server/entities/generated/ListingCategory';

/**
 * Upserts the shared category hierarchy used across test files.
 * Safe to call from multiple test files in parallel.
 *
 * CLOTHING       (top-level, has imageUuid)
 *   MENS         (child of CLOTHING)
 *     MENS_SHIRTS  (grandchild)
 *   WOMENS       (child of CLOTHING)
 *
 * JEWELRY        (top-level)
 *   JEWELRY_VINTAGE  (child of JEWELRY)
 *
 * FURNITURE      (top-level, no children, has imageUuid)
 */
export async function seedCategories(em: ReturnType<typeof getEm>) {
	await em.upsert(ListingCategory, {
		id: 'CLOTHING',
		title: 'Clothing',
		imageUuid: 'aaaaaaaa-0000-0000-0000-000000000001',
	});
	await em.upsert(ListingCategory, {
		id: 'MENS',
		title: "Men's",
		parent: 'CLOTHING',
	});
	await em.upsert(ListingCategory, {
		id: 'MENS_SHIRTS',
		title: "Men's Shirts",
		parent: 'MENS',
	});
	await em.upsert(ListingCategory, {
		id: 'WOMENS',
		title: "Women's",
		parent: 'CLOTHING',
	});
	await em.upsert(ListingCategory, {
		id: 'JEWELRY',
		title: 'Jewelry',
	});
	await em.upsert(ListingCategory, {
		id: 'JEWELRY_VINTAGE',
		title: 'Vintage Jewelry',
		parent: 'JEWELRY',
	});
	await em.upsert(ListingCategory, {
		id: 'FURNITURE',
		title: 'Furniture',
		imageUuid: 'aaaaaaaa-0000-0000-0000-000000000002',
	});
}
