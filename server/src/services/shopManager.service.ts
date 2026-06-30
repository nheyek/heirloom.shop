import { ListingEditData, ListingFullDescr, ShopProfilesData } from '@heirloom/common/contract';
import { ReturnPolicyType } from '@heirloom/common/constants';
import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { ListingProcessingProfile } from '@server/entities/generated/ListingProcessingProfile';
import { ListingReturnProfile } from '@server/entities/generated/ListingReturnProfile';
import { ShippingProfile } from '@server/entities/generated/ShippingProfile';
import { CombinationsData, VariationsData } from '@heirloom/common/contract';

export const findAllListingsForShop = async (shopId: number): Promise<Listing[]> => {
	const em = getEm();
	return em.find(Listing, { shop: { id: shopId } }, { populate: ['shop', 'shop.country', 'category'] });
};

export const findShopProfiles = async (
	shopId: number,
	directFulfillment: boolean,
): Promise<ShopProfilesData> => {
	const em = getEm();

	const [processingProfiles, shippingProfiles, returnProfiles] = await Promise.all([
		em.find(ListingProcessingProfile, { shop: { id: shopId } }),
		em.find(ShippingProfile, { shop: { id: shopId } }),
		em.find(ListingReturnProfile, { shop: { id: shopId } }),
	]);

	return {
		directFulfillment,
		processingProfiles: processingProfiles.map((p) => ({
			id: p.id,
			name: p.name,
			minDays: p.minDays,
			maxDays: p.maxDays,
		})),
		shippingProfiles: shippingProfiles.map((p) => ({
			id: p.id,
			name: p.name,
			originZip: p.originZip,
			flatShippingRateCents: p.flatShippingRateCents ?? null,
			shippingDaysMin: p.shippingDaysMin,
			shippingDaysMax: p.shippingDaysMax,
		})),
		returnProfiles: returnProfiles.map((p) => ({
			id: p.id,
			name: p.name,
			policyType: p.policyType as ReturnPolicyType,
			returnWindowDays: p.returnWindowDays ?? null,
			policyDescrRichText: p.policyDescrRichText ?? null,
		})),
	};
};

export const findListingForEdit = async (
	shopId: number,
	listingShortId: string,
): Promise<ListingEditData | null> => {
	const em = getEm();
	const listing = await em.findOne(
		Listing,
		{ shortId: listingShortId, shop: { id: shopId } },
		{ populate: ['category', 'processingProfile', 'shippingProfile', 'returnProfile'] },
	);
	if (!listing) return null;

	return {
		shortId: listing.shortId,
		title: listing.title,
		subtitle: listing.subtitle ?? null,
		categoryId: listing.category.id,
		priceCents: listing.priceCents,
		imageUuids: listing.imageUuids,
		processingProfileId: listing.processingProfile?.id ?? null,
		shippingProfileId: listing.shippingProfile?.id ?? null,
		returnProfileId: listing.returnProfile?.id ?? null,
		fullDescr: (listing.fullDescr as ListingFullDescr) ?? null,
		variations: (listing.variations ?? {}) as VariationsData,
		combinations: (listing.combinations ?? {}) as CombinationsData,
	};
};

export const setListingAvailable = async (
	shopId: number,
	listingShortId: string,
	available: boolean,
): Promise<boolean | null> => {
	const em = getEm();
	const listing = await em.findOne(Listing, { shortId: listingShortId, shop: { id: shopId } });
	if (!listing) return null;
	listing.available = available;
	await em.flush();
	return listing.available;
};

export const deleteListing = async (
	shopId: number,
	listingShortId: string,
): Promise<boolean> => {
	const em = getEm();
	const listing = await em.findOne(Listing, { shortId: listingShortId, shop: { id: shopId } });
	if (!listing) return false;
	await em.remove(listing).flush();
	return true;
};
