import { CombinationsData, ListingEditData, ListingFullDescr, ShopProfilesData, VariationsData } from '@heirloom/common/contract';
import { ReturnPolicyType } from '@heirloom/common/constants';
import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { ListingCategory } from '@server/entities/generated/ListingCategory';
import { Shop } from '@server/entities/generated/Shop';
import { encodeShortId } from '@server/utils/hashids';
import { ListingProcessingProfile } from '@server/entities/generated/ListingProcessingProfile';
import { ListingReturnProfile } from '@server/entities/generated/ListingReturnProfile';
import { ListingShippingProfile } from '@server/entities/generated/ListingShippingProfile';

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
		em.find(ListingShippingProfile, { shop: { id: shopId } }),
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

export const createListing = async (
	shopId: number,
	data: {
		title: string;
		subtitle: string | null;
		categoryId: string;
		priceCents: number;
		imageUuids: string[];
		processingProfileId: number | null;
		shippingProfileId: number | null;
		returnProfileId: number | null;
		fullDescr: ListingFullDescr | null;
		variations: VariationsData;
		combinations: CombinationsData;
		available: boolean;
	},
): Promise<ListingEditData> => {
	const em = getEm();

	const [{ nextval }] = await em.getConnection().execute("SELECT nextval('listing_id_seq')");
	const nextId = Number(nextval);

	const [category, processingProfile, shippingProfile, returnProfile] = await Promise.all([
		em.findOne(ListingCategory, { id: data.categoryId }),
		data.processingProfileId != null
			? em.findOne(ListingProcessingProfile, { id: data.processingProfileId, shop: { id: shopId } })
			: null,
		data.shippingProfileId != null
			? em.findOne(ListingShippingProfile, { id: data.shippingProfileId, shop: { id: shopId } })
			: null,
		data.returnProfileId != null
			? em.findOne(ListingReturnProfile, { id: data.returnProfileId, shop: { id: shopId } })
			: null,
	]);

	const listing = em.create(Listing, {
		id: nextId,
		shortId: encodeShortId(nextId),
		title: data.title,
		subtitle: data.subtitle ?? undefined,
		category: category!,
		shop: em.getReference(Shop, shopId),
		priceCents: data.priceCents,
		imageUuids: data.imageUuids,
		processingProfile: processingProfile ?? undefined,
		shippingProfile: shippingProfile ?? undefined,
		returnProfile: returnProfile ?? undefined,
		fullDescr: data.fullDescr,
		variations: data.variations,
		combinations: data.combinations,
		available: data.available,
	});

	await em.persist(listing).flush();

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

export const updateListing = async (
	shopId: number,
	listingShortId: string,
	data: {
		title: string;
		subtitle: string | null;
		categoryId: string;
		priceCents: number;
		imageUuids: string[];
		processingProfileId: number | null;
		shippingProfileId: number | null;
		returnProfileId: number | null;
		fullDescr: ListingFullDescr | null;
		variations: VariationsData;
		combinations: CombinationsData;
	},
): Promise<ListingEditData | null> => {
	const em = getEm();
	const listing = await em.findOne(
		Listing,
		{ shortId: listingShortId, shop: { id: shopId } },
		{ populate: ['category', 'processingProfile', 'shippingProfile', 'returnProfile'] },
	);
	if (!listing) return null;

	const [category, processingProfile, shippingProfile, returnProfile] = await Promise.all([
		em.findOne(ListingCategory, { id: data.categoryId }),
		data.processingProfileId != null
			? em.findOne(ListingProcessingProfile, { id: data.processingProfileId, shop: { id: shopId } })
			: null,
		data.shippingProfileId != null
			? em.findOne(ListingShippingProfile, { id: data.shippingProfileId, shop: { id: shopId } })
			: null,
		data.returnProfileId != null
			? em.findOne(ListingReturnProfile, { id: data.returnProfileId, shop: { id: shopId } })
			: null,
	]);

	listing.title = data.title;
	listing.subtitle = data.subtitle ?? undefined;
	listing.category = category!;
	listing.priceCents = data.priceCents;
	listing.imageUuids = data.imageUuids;
	listing.processingProfile = processingProfile ?? undefined;
	listing.shippingProfile = shippingProfile ?? undefined;
	listing.returnProfile = returnProfile ?? undefined;
	listing.fullDescr = data.fullDescr;
	listing.variations = data.variations;
	listing.combinations = data.combinations;

	await em.flush();

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

export const createProcessingProfile = async (
	shopId: number,
	data: { name: string; minDays: number; maxDays: number },
) => {
	const em = getEm();
	const profile = em.create(ListingProcessingProfile, {
		shop: em.getReference(Shop, shopId),
		name: data.name,
		minDays: data.minDays,
		maxDays: data.maxDays,
	});
	await em.persist(profile).flush();
	return { id: profile.id, name: profile.name, minDays: profile.minDays, maxDays: profile.maxDays };
};

export const createShippingProfile = async (
	shopId: number,
	data: { name: string; originZip: string; flatShippingRateCents: number | null; shippingDaysMin: number; shippingDaysMax: number },
) => {
	const em = getEm();
	const profile = em.create(ListingShippingProfile, {
		shop: em.getReference(Shop, shopId),
		name: data.name,
		originZip: data.originZip,
		flatShippingRateCents: data.flatShippingRateCents ?? undefined,
		shippingDaysMin: data.shippingDaysMin,
		shippingDaysMax: data.shippingDaysMax,
	});
	await em.persist(profile).flush();
	return {
		id: profile.id,
		name: profile.name,
		originZip: profile.originZip,
		flatShippingRateCents: profile.flatShippingRateCents ?? null,
		shippingDaysMin: profile.shippingDaysMin,
		shippingDaysMax: profile.shippingDaysMax,
	};
};

export const createReturnProfile = async (
	shopId: number,
	data: { name: string; policyType: ReturnPolicyType; returnWindowDays: number | null; policyDescrRichText: string | null },
) => {
	const em = getEm();
	const profile = em.create(ListingReturnProfile, {
		shop: em.getReference(Shop, shopId),
		name: data.name,
		policyType: data.policyType,
		returnWindowDays: data.returnWindowDays ?? undefined,
		policyDescrRichText: data.policyDescrRichText ?? undefined,
	});
	await em.persist(profile).flush();
	return {
		id: profile.id,
		name: profile.name,
		policyType: profile.policyType as ReturnPolicyType,
		returnWindowDays: profile.returnWindowDays ?? null,
		policyDescrRichText: profile.policyDescrRichText ?? null,
	};
};
