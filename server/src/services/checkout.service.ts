import { CheckoutItemData } from '@heirloom/common/contract';
import { isListingOutOfStock } from '@heirloom/common/domain/listing';
import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { CheckoutCartData } from '@server/types/CheckoutCartData';

export const loadCheckoutData = async (
	items: CheckoutItemData[],
): Promise<CheckoutCartData> => {
	const em = getEm();

	const shortIds = [
		...new Set(items.map((item) => item.listingShortId)),
	];
	const listings = await em.find(
		Listing,
		{ shortId: { $in: shortIds }, available: true },
		{
			populate: [
				'shippingProfile',
				'processingProfile',
				'personalizationProfile',
				'shop',
			],
		},
	);

	return {
		listings: listings.filter(
			(listing) =>
				!isListingOutOfStock(
					listing.trackInventory,
					listing.inventory,
				),
		),
	};
};
