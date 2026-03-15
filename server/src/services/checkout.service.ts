import { CheckoutData } from '@common/types/CheckoutData';
import { getEm } from '../db';
import { Listing } from '../entities/generated/Listing';
import { ListingVariationOption } from '../entities/generated/ListingVariationOption';

export const calculateCheckoutTotals = async (
	checkoutData: CheckoutData,
): Promise<number> => {
	const em = getEm();

	const shortIds = checkoutData.items.map(
		(item) => item.listingShortId,
	);
	const optionIds = checkoutData.items.flatMap((item) =>
		Object.values(item.selectedOptions),
	);

	const listings = await em.find(
		Listing,
		{ shortId: { $in: shortIds } },
		{ populate: ['shippingProfile'] },
	);
	const variationOptions =
		optionIds.length > 0
			? await em.find(ListingVariationOption, {
					id: { $in: optionIds },
				})
			: [];

	const listingByShortId = new Map(
		listings.map((l) => [l.shortId, l]),
	);
	const optionById = new Map(
		variationOptions.map((o) => [o.id, o]),
	);

	let subtotalDollars = 0;
	let shippingDollars = 0;

	for (const item of checkoutData.items) {
		const listing = listingByShortId.get(item.listingShortId);
		if (!listing) continue;

		let itemPriceDollars = listing.priceDollars;
		for (const optionId of Object.values(item.selectedOptions)) {
			const option = optionById.get(optionId);
			if (option) {
				itemPriceDollars += Number(
					option.additionalPriceUsDollars,
				);
			}
		}

		subtotalDollars += itemPriceDollars * item.quantity;
		shippingDollars +=
			Number(
				listing.shippingProfile?.flatShippingRateUsDollars ??
					0,
			) * item.quantity;
	}

	return subtotalDollars + shippingDollars;
};
