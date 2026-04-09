import { CheckoutItemData } from '@common/contract';
import { CheckoutCartData } from '@server/types/CheckoutCartData';
import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { ListingVariationOption } from '@server/entities/generated/ListingVariationOption';

export const loadCheckoutData = async (
	items: CheckoutItemData[],
): Promise<CheckoutCartData> => {
	const em = getEm();

	const shortIds = items.map(
		(item) => item.listingShortId,
	);
	const optionIds = items.flatMap((item) =>
		Object.values(item.selectedOptions),
	);

	const listings = await em.find(
		Listing,
		{ shortId: { $in: shortIds } },
		{ populate: ['shippingProfile', 'shop'] },
	);
	const variationOptions =
		optionIds.length > 0
			? await em.find(
					ListingVariationOption,
					{ id: { $in: optionIds } },
					{ populate: ['listingVariation'] },
				)
			: [];

	return { listings, variationOptions };
};
