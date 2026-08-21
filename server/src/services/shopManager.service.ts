import { ReturnPolicyType } from '@heirloom/common/constants';
import {
	CombinationsData,
	ListingEditData,
	ListingFullDescr,
	ListingWriteBody,
	ShopProfilesData,
	VariationsData,
} from '@heirloom/common/contract';
import { validateListingFields } from '@heirloom/common/validation/listing';
import {
	validatePersonalizationProfileFields,
	validateProcessingProfileFields,
	validateReturnProfileFields,
	validateShippingProfileFields,
} from '@heirloom/common/validation/profiles';
import {
	FieldError,
	ValidationField,
	ValidationFieldKey,
} from '@heirloom/common/validation/shared';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { ListingCategory } from '@server/entities/generated/ListingCategory';
import { ListingPersonalizationProfile } from '@server/entities/generated/ListingPersonalizationProfile';
import { ListingProcessingProfile } from '@server/entities/generated/ListingProcessingProfile';
import { ListingReturnProfile } from '@server/entities/generated/ListingReturnProfile';
import { ListingShippingProfile } from '@server/entities/generated/ListingShippingProfile';
import { Shop } from '@server/entities/generated/Shop';
import { encodeShortId, ShortIdEntityType } from '@server/utils/hashids';

export class ListingValidationError extends Error {
	constructor(public readonly fieldErrors: FieldError[]) {
		super(fieldErrors.map((e) => e.message).join('; '));
	}
}

export class DuplicateProfileNameError extends Error {}

const hasFieldError = (
	fieldErrors: FieldError[],
	field: ValidationFieldKey,
) => fieldErrors.some((e) => e.field === field);

export const findAllListingsForShop = async (
	shopId: number,
): Promise<Listing[]> => {
	const em = getEm();
	return em.find(
		Listing,
		{ shop: { id: shopId } },
		{ populate: ['shop', 'shop.country', 'category'] },
	);
};

export const findShopProfiles = async (
	shopId: number,
	directFulfillment: boolean,
): Promise<ShopProfilesData> => {
	const em = getEm();

	const [
		processingProfiles,
		shippingProfiles,
		returnProfiles,
		personalizationProfiles,
	] = await Promise.all([
		em.find(ListingProcessingProfile, { shop: { id: shopId } }),
		em.find(ListingShippingProfile, { shop: { id: shopId } }),
		em.find(ListingReturnProfile, { shop: { id: shopId } }),
		em.find(ListingPersonalizationProfile, {
			shop: { id: shopId },
		}),
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
		personalizationProfiles: personalizationProfiles.map((p) => ({
			id: p.id,
			name: p.name,
			costCents: p.costCents,
			helperText: p.helperText ?? null,
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
		{
			populate: [
				'category',
				'processingProfile',
				'shippingProfile',
				'returnProfile',
				'personalizationProfile',
			],
		},
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
		personalizationProfileId:
			listing.personalizationProfile?.id ?? null,
		fullDescr: (listing.fullDescr as ListingFullDescr) ?? null,
		variations: (listing.variations ?? {}) as VariationsData,
		combinations: (listing.combinations ??
			{}) as CombinationsData,
		inventory: listing.inventory ?? null,
	};
};

export const createListing = async (
	shopId: number,
	directFulfillment: boolean,
	data: ListingWriteBody,
): Promise<ListingEditData> => {
	const em = getEm();

	const fieldErrors = validateListingFields(data, {
		directFulfillment,
	});

	const [
		category,
		processingProfile,
		shippingProfile,
		returnProfile,
		personalizationProfile,
	] = await Promise.all([
		em.findOne(ListingCategory, { id: data.categoryId }),
		data.processingProfileId != null
			? em.findOne(ListingProcessingProfile, {
					id: data.processingProfileId,
					shop: { id: shopId },
				})
			: null,
		data.shippingProfileId != null
			? em.findOne(ListingShippingProfile, {
					id: data.shippingProfileId,
					shop: { id: shopId },
				})
			: null,
		data.returnProfileId != null
			? em.findOne(ListingReturnProfile, {
					id: data.returnProfileId,
					shop: { id: shopId },
				})
			: null,
		data.personalizationProfileId != null
			? em.findOne(ListingPersonalizationProfile, {
					id: data.personalizationProfileId,
					shop: { id: shopId },
				})
			: null,
	]);

	if (
		!category &&
		!hasFieldError(fieldErrors, ValidationField.Category)
	) {
		fieldErrors.push({
			field: ValidationField.Category,
			message: 'Category not found.',
		});
	}
	if (data.processingProfileId != null && !processingProfile) {
		fieldErrors.push({
			field: ValidationField.ProcessingProfile,
			message: 'Processing profile not found.',
		});
	}
	if (data.shippingProfileId != null && !shippingProfile) {
		fieldErrors.push({
			field: ValidationField.ShippingProfile,
			message: 'Shipping profile not found.',
		});
	}
	if (data.returnProfileId != null && !returnProfile) {
		fieldErrors.push({
			field: ValidationField.ReturnProfile,
			message: 'Return profile not found.',
		});
	}
	if (
		data.personalizationProfileId != null &&
		!personalizationProfile
	) {
		fieldErrors.push({
			field: ValidationField.PersonalizationProfile,
			message: 'Personalization profile not found.',
		});
	}

	if (fieldErrors.length > 0)
		throw new ListingValidationError(fieldErrors);

	const [{ nextval }] = await em
		.getConnection()
		.execute("SELECT nextval('listing_id_seq')");
	const nextId = Number(nextval);

	const listing = em.create(Listing, {
		id: nextId,
		shortId: encodeShortId(nextId, ShortIdEntityType.Listing),
		title: data.title,
		subtitle: data.subtitle ?? undefined,
		category: category!,
		shop: em.getReference(Shop, shopId),
		priceCents: data.priceCents,
		imageUuids: data.imageUuids,
		processingProfile: processingProfile ?? undefined,
		shippingProfile: shippingProfile ?? undefined,
		returnProfile: returnProfile ?? undefined,
		personalizationProfile: personalizationProfile ?? undefined,
		fullDescr: data.fullDescr,
		variations: data.variations,
		combinations: data.combinations,
		available: true,
		inventory: data.inventory ?? undefined,
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
		personalizationProfileId:
			listing.personalizationProfile?.id ?? null,
		fullDescr: (listing.fullDescr as ListingFullDescr) ?? null,
		variations: (listing.variations ?? {}) as VariationsData,
		combinations: (listing.combinations ??
			{}) as CombinationsData,
		inventory: listing.inventory ?? null,
	};
};

export const updateListing = async (
	shopId: number,
	directFulfillment: boolean,
	listingShortId: string,
	data: ListingWriteBody,
): Promise<ListingEditData | null> => {
	const em = getEm();
	const listing = await em.findOne(
		Listing,
		{ shortId: listingShortId, shop: { id: shopId } },
		{
			populate: [
				'category',
				'processingProfile',
				'shippingProfile',
				'returnProfile',
				'personalizationProfile',
			],
		},
	);
	if (!listing) return null;

	const fieldErrors = validateListingFields(data, {
		directFulfillment,
	});

	const [
		category,
		processingProfile,
		shippingProfile,
		returnProfile,
		personalizationProfile,
	] = await Promise.all([
		em.findOne(ListingCategory, { id: data.categoryId }),
		data.processingProfileId != null
			? em.findOne(ListingProcessingProfile, {
					id: data.processingProfileId,
					shop: { id: shopId },
				})
			: null,
		data.shippingProfileId != null
			? em.findOne(ListingShippingProfile, {
					id: data.shippingProfileId,
					shop: { id: shopId },
				})
			: null,
		data.returnProfileId != null
			? em.findOne(ListingReturnProfile, {
					id: data.returnProfileId,
					shop: { id: shopId },
				})
			: null,
		data.personalizationProfileId != null
			? em.findOne(ListingPersonalizationProfile, {
					id: data.personalizationProfileId,
					shop: { id: shopId },
				})
			: null,
	]);

	if (
		!category &&
		!hasFieldError(fieldErrors, ValidationField.Category)
	) {
		fieldErrors.push({
			field: ValidationField.Category,
			message: 'Category not found.',
		});
	}
	if (data.processingProfileId != null && !processingProfile) {
		fieldErrors.push({
			field: ValidationField.ProcessingProfile,
			message: 'Processing profile not found.',
		});
	}
	if (data.shippingProfileId != null && !shippingProfile) {
		fieldErrors.push({
			field: ValidationField.ShippingProfile,
			message: 'Shipping profile not found.',
		});
	}
	if (data.returnProfileId != null && !returnProfile) {
		fieldErrors.push({
			field: ValidationField.ReturnProfile,
			message: 'Return profile not found.',
		});
	}
	if (
		data.personalizationProfileId != null &&
		!personalizationProfile
	) {
		fieldErrors.push({
			field: ValidationField.PersonalizationProfile,
			message: 'Personalization profile not found.',
		});
	}

	if (fieldErrors.length > 0)
		throw new ListingValidationError(fieldErrors);

	listing.title = data.title;
	listing.subtitle = data.subtitle ?? undefined;
	listing.category = category!;
	listing.priceCents = data.priceCents;
	listing.imageUuids = data.imageUuids;
	listing.processingProfile = processingProfile ?? undefined;
	listing.shippingProfile = shippingProfile ?? undefined;
	listing.returnProfile = returnProfile ?? undefined;
	listing.personalizationProfile =
		personalizationProfile ?? undefined;
	listing.fullDescr = data.fullDescr;
	listing.variations = data.variations;
	listing.combinations = data.combinations;
	listing.inventory = data.inventory ?? undefined;

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
		personalizationProfileId:
			listing.personalizationProfile?.id ?? null,
		fullDescr: (listing.fullDescr as ListingFullDescr) ?? null,
		variations: (listing.variations ?? {}) as VariationsData,
		combinations: (listing.combinations ??
			{}) as CombinationsData,
		inventory: listing.inventory ?? null,
	};
};

export const setListingAvailable = async (
	shopId: number,
	listingShortId: string,
	available: boolean,
): Promise<boolean | null> => {
	const em = getEm();
	const listing = await em.findOne(Listing, {
		shortId: listingShortId,
		shop: { id: shopId },
	});
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
	const listing = await em.findOne(Listing, {
		shortId: listingShortId,
		shop: { id: shopId },
	});
	if (!listing) return false;
	await em.remove(listing).flush();
	return true;
};

const persistProfileOrThrow = async (
	em: ReturnType<typeof getEm>,
	profile: object,
): Promise<void> => {
	try {
		await em.persist(profile).flush();
	} catch (e) {
		if (e instanceof UniqueConstraintViolationException) {
			throw new DuplicateProfileNameError();
		}
		throw e;
	}
};

export const createProcessingProfile = async (
	shopId: number,
	data: { name: string; minDays: number; maxDays: number },
) => {
	const em = getEm();
	// Duplicate names are a DB-level conflict (409, via the unique
	// constraint caught below), not a 400 field-validation error, so this
	// calls the fields-only inner validator (no existingNames/uniqueness
	// check) rather than the client-facing wrapper.
	const fieldErrors = validateProcessingProfileFields(data);
	if (fieldErrors.length > 0)
		throw new ListingValidationError(fieldErrors);

	const profile = em.create(ListingProcessingProfile, {
		shop: em.getReference(Shop, shopId),
		name: data.name,
		minDays: data.minDays,
		maxDays: data.maxDays,
	});
	await persistProfileOrThrow(em, profile);
	return {
		id: profile.id,
		name: profile.name,
		minDays: profile.minDays,
		maxDays: profile.maxDays,
	};
};

export const createShippingProfile = async (
	shopId: number,
	data: {
		name: string;
		originZip: string;
		flatShippingRateCents: number | null;
		shippingDaysMin: number;
		shippingDaysMax: number;
	},
) => {
	const em = getEm();
	// Duplicate names are a DB-level conflict (409, via the unique
	// constraint caught below), not a 400 field-validation error, so this
	// calls the fields-only inner validator (no existingNames/uniqueness
	// check) rather than the client-facing wrapper.
	const fieldErrors = validateShippingProfileFields({
		...data,
		isFlatRate: data.flatShippingRateCents != null,
	});
	if (fieldErrors.length > 0)
		throw new ListingValidationError(fieldErrors);

	const profile = em.create(ListingShippingProfile, {
		shop: em.getReference(Shop, shopId),
		name: data.name,
		originZip: data.originZip,
		flatShippingRateCents:
			data.flatShippingRateCents ?? undefined,
		shippingDaysMin: data.shippingDaysMin,
		shippingDaysMax: data.shippingDaysMax,
	});
	await persistProfileOrThrow(em, profile);
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
	data: {
		name: string;
		policyType: ReturnPolicyType;
		returnWindowDays: number | null;
		policyDescrRichText: string | null;
	},
) => {
	const em = getEm();
	// Duplicate names are a DB-level conflict (409, via the unique
	// constraint caught below), not a 400 field-validation error, so this
	// calls the fields-only inner validator (no existingNames/uniqueness
	// check) rather than the client-facing wrapper.
	const fieldErrors = validateReturnProfileFields(data);
	if (fieldErrors.length > 0)
		throw new ListingValidationError(fieldErrors);

	const profile = em.create(ListingReturnProfile, {
		shop: em.getReference(Shop, shopId),
		name: data.name,
		policyType: data.policyType,
		returnWindowDays: data.returnWindowDays ?? undefined,
		policyDescrRichText: data.policyDescrRichText ?? undefined,
	});
	await persistProfileOrThrow(em, profile);
	return {
		id: profile.id,
		name: profile.name,
		policyType: profile.policyType as ReturnPolicyType,
		returnWindowDays: profile.returnWindowDays ?? null,
		policyDescrRichText: profile.policyDescrRichText ?? null,
	};
};

export const createPersonalizationProfile = async (
	shopId: number,
	data: {
		name: string;
		costCents: number;
		helperText: string | null;
	},
) => {
	const em = getEm();
	// Duplicate names are a DB-level conflict (409, via the unique
	// constraint caught below), not a 400 field-validation error, so this
	// calls the fields-only inner validator (no existingNames/uniqueness
	// check) rather than the client-facing wrapper.
	const fieldErrors = validatePersonalizationProfileFields(data);
	if (fieldErrors.length > 0)
		throw new ListingValidationError(fieldErrors);

	const profile = em.create(ListingPersonalizationProfile, {
		shop: em.getReference(Shop, shopId),
		name: data.name,
		costCents: data.costCents,
		helperText: data.helperText ?? undefined,
	});
	await persistProfileOrThrow(em, profile);
	return {
		id: profile.id,
		name: profile.name,
		costCents: profile.costCents,
		helperText: profile.helperText ?? null,
	};
};
