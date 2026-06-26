import { CheckoutItemData } from '@heirloom/common/contract';
import { CheckoutCartData } from '@server/types/CheckoutCartData';
import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';

export const loadCheckoutData = async (
	items: CheckoutItemData[],
): Promise<CheckoutCartData> => {
	const em = getEm();

	const shortIds = [...new Set(items.map((item) => item.listingShortId))];
	const listings = await em.find(
		Listing,
		{ shortId: { $in: shortIds } },
		{ populate: ['shippingProfile', 'processingProfile', 'shop'] },
	);

	return { listings };
};
