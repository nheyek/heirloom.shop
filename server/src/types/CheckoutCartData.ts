import { Listing } from '@server/entities/generated/Listing';
import { ListingVariationOption } from '@server/entities/generated/ListingVariationOption';

export type CheckoutCartData = {
	listings: Listing[];
	variationOptions: ListingVariationOption[];
};
