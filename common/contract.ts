import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
	InfoPageKey,
	OrderStatus,
	ReturnPolicyType,
	ShippingProvider,
} from './constants.js';

const c = initContract();

const ImageUploadUrlsSchema = z.object({
	full: z.string(),
	small: z.string(),
});

const CategoryTileDataSchema = z.object({
	id: z.string(),
	parentId: z.string().optional(),
	title: z.string(),
	imageUuid: z.string().optional(),
});

const VariationOptionSchema = z.object({
	name: z.string(),
	order: z.number(),
	priceCents: z.number().nullable(),
	imageUuid: z.string().nullable(),
});

const VariationSchema = z.object({
	name: z.string(),
	pricesVary: z.boolean(),
	imagesVary: z.boolean().default(false),
	options: z.record(z.string(), VariationOptionSchema),
	order: z.number(),
});

const VariationsSchema = z.record(z.string(), VariationSchema);

const CombinationSchema = z.object({
	priceCents: z.number().nullable(),
	imageUuid: z.string().nullable(),
	disabled: z.boolean(),
	inventory: z.number().nullable().optional(),
});

const CombinationsSchema = z.record(z.string(), CombinationSchema);

const ListingCardDataSchema = z.object({
	id: z.number(),
	shortId: z.string(),
	title: z.string(),
	subtitle: z.string(),
	categoryId: z.string(),
	priceCents: z.number(),
	countryCode: z.string().optional(),
	shopId: z.number(),
	shopShortId: z.string(),
	shopTitle: z.string(),
	imageUuids: z.array(z.string()),
	available: z.boolean(),
	variations: VariationsSchema,
	combinations: CombinationsSchema,
});

// Adds shop-owner-only inventory fields on top of the public listing card
// shape — used solely by the shop manager's own listings endpoint, never by
// the public-facing listing/shop/category/favorites endpoints that reuse
// ListingCardDataSchema, so stock counts aren't exposed to customers.
const ShopManagerListingCardDataSchema = ListingCardDataSchema.extend(
	{
		inventory: z.number().nullable().optional(),
		trackInventory: z.boolean(),
	},
);

const ErrorSchema = z.object({ error: z.string() });

const ShippingAddressSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	line1: z.string(),
	line2: z.string(),
	city: z.string(),
	state: z.string(),
	zip: z.string(),
});

const CheckoutItemSchema = z.object({
	listingShortId: z.string(),
	selectedOptions: z.record(z.string(), z.string()),
	quantity: z.number(),
	personalizationText: z.string().nullable().optional(),
});

const TaxRequestSchema = z.object({
	items: z.array(CheckoutItemSchema),
	shippingAddress: ShippingAddressSchema,
});

const CheckoutBodySchema = TaxRequestSchema.extend({
	email: z.string(),
	totalCents: z.number(),
});

const TaxResponseSchema = z.object({ TaxTotalCents: z.number() });

const PaymentIntentResponseSchema = z.object({
	clientSecret: z.string(),
	orderShortId: z.string(),
	accessKey: z.string(),
});

export const checkoutContract = c.router({
	calculateTax: {
		method: 'POST',
		path: '/api/checkout/calculateTax',
		body: TaxRequestSchema,
		responses: {
			200: TaxResponseSchema,
			400: ErrorSchema,
			500: ErrorSchema,
		},
	},
	submitOrder: {
		method: 'POST',
		path: '/api/checkout/submitOrder',
		body: CheckoutBodySchema,
		responses: {
			200: PaymentIntentResponseSchema,
			400: ErrorSchema,
			409: ErrorSchema,
			500: ErrorSchema,
		},
	},
});

export const categoryContract = c.router({
	getAll: {
		method: 'GET',
		path: '/api/categories',
		responses: {
			200: z.array(CategoryTileDataSchema),
			500: ErrorSchema,
		},
	},
	getTopLevel: {
		method: 'GET',
		path: '/api/categories/topLevel',
		responses: { 200: z.array(CategoryTileDataSchema) },
	},
	getById: {
		method: 'GET',
		path: '/api/categories/:id',
		pathParams: z.object({ id: z.string() }),
		responses: {
			200: CategoryTileDataSchema,
			404: ErrorSchema,
		},
	},
	getChildren: {
		method: 'GET',
		path: '/api/categories/:id/children',
		pathParams: z.object({ id: z.string() }),
		responses: {
			200: z.array(CategoryTileDataSchema),
			404: ErrorSchema,
		},
	},
	getListings: {
		method: 'GET',
		path: '/api/categories/:id/listings',
		pathParams: z.object({ id: z.string() }),
		responses: {
			200: z.array(ListingCardDataSchema),
			404: ErrorSchema,
		},
	},
});

const InfoPageDataSchema = z.object({
	key: z.nativeEnum(InfoPageKey),
	contentHtml: z.string(),
});

export type InfoPageData = z.infer<typeof InfoPageDataSchema>;

export const infoPagesContract = c.router({
	getAll: {
		method: 'GET',
		path: '/api/infoPages',
		responses: {
			200: z.array(InfoPageDataSchema),
			500: ErrorSchema,
		},
	},
});

const ListingDescrSectionSchema = z.object({
	title: z.string(),
	richText: z.string(),
});

const ListingFulfillmentProfilesSchema = z.object({
	processing: z
		.object({ minDays: z.number(), maxDays: z.number() })
		.optional(),
	shipping: z
		.object({
			originZip: z.string(),
			shippingDaysMin: z.number(),
			shippingDaysMax: z.number(),
			shippingRate: z.number(),
		})
		.optional(),
	returns: z
		.object({
			policyType: z.string(),
			returnWindowDays: z.number().optional(),
			policyDescrRichText: z.string().nullable().optional(),
		})
		.optional(),
	personalization: z
		.object({
			name: z.string(),
			costCents: z.number(),
			helperText: z.string().nullable(),
		})
		.optional(),
});

const ListingPageDataSchema = ListingCardDataSchema.extend({
	directFulfillment: z.boolean(),
	fullDescr: z.array(ListingDescrSectionSchema).optional(),
	profiles: ListingFulfillmentProfilesSchema.nullable(),
	outOfStock: z.boolean(),
	trackInventory: z.boolean(),
});

const CartItemDataSchema = ListingCardDataSchema.extend({
	shippingPrice: z.number(),
	deliveryEstimate: z.string().nullable().optional(),
	personalizationCostCents: z.number().nullable(),
	personalizationName: z.string().nullable(),
	trackInventory: z.boolean(),
});

const FavoriteResponseSchema = z.object({ favorited: z.boolean() });

const UserInfoSchema = z.object({
	id: z.number(),
	email: z.string(),
	isAdmin: z.boolean(),
	shopShortId: z.string().nullable(),
});

export const listingsContract = c.router({
	getAll: {
		method: 'GET',
		path: '/api/listings',
		responses: { 200: z.array(ListingCardDataSchema) },
	},
	getById: {
		method: 'GET',
		path: '/api/listings/:id',
		pathParams: z.object({ id: z.string() }),
		responses: {
			200: ListingPageDataSchema,
			404: ErrorSchema,
		},
	},
	getCartData: {
		method: 'POST',
		path: '/api/listings/cartData',
		body: z.object({ items: z.array(CheckoutItemSchema) }),
		responses: {
			200: z.array(CartItemDataSchema),
		},
	},
	favorite: {
		method: 'POST',
		path: '/api/listings/:id/favorite',
		pathParams: z.object({ id: z.string() }),
		body: z.object({}),
		responses: {
			200: FavoriteResponseSchema,
			401: ErrorSchema,
			404: ErrorSchema,
		},
	},
	unfavorite: {
		method: 'DELETE',
		path: '/api/listings/:id/favorite',
		pathParams: z.object({ id: z.string() }),
		body: z.object({}),
		responses: {
			200: FavoriteResponseSchema,
			401: ErrorSchema,
			404: ErrorSchema,
		},
	},
});

const ShopCardDataSchema = z.object({
	id: z.number(),
	shortId: z.string(),
	title: z.string(),
	location: z.string().nullish(),
	classification: z.string().nullish(),
	profileImageUuid: z.string().nullish(),
	countryCode: z.string().nullable(),
	profileRichText: z.string().nullish(),
});

const ShopProfileSchema = z.object({
	title: z.string(),
	desc: z.string(),
	categoryId: z.string().optional(),
});

const UpdateShopBodySchema = z.object({
	title: z.string().min(1),
	classification: z.string().min(1),
	location: z.string().min(1),
	countryCode: z.string(),
	profileImageUuid: z.string().uuid().optional().nullable(),
	profileRichText: z.string().optional().nullable(),
});

export const shopsContract = c.router({
	getAll: {
		method: 'GET',
		path: '/api/shops',
		responses: { 200: z.array(ShopCardDataSchema) },
	},
	// Must stay registered before getById — Express matches routes in
	// registration order, and getById's `/api/shops/:id` would otherwise
	// swallow `/api/shops/featured` (see the same ordering in shop.routes.ts).
	getFeatured: {
		method: 'GET',
		path: '/api/shops/featured',
		responses: { 200: z.array(ShopCardDataSchema) },
	},
	getById: {
		method: 'GET',
		path: '/api/shops/:id',
		pathParams: z.object({ id: z.string() }),
		responses: {
			200: ShopCardDataSchema,
			404: ErrorSchema,
		},
	},
	updateById: {
		method: 'PATCH',
		path: '/api/shops/:id',
		pathParams: z.object({ id: z.string() }),
		body: UpdateShopBodySchema,
		responses: {
			200: ShopCardDataSchema,
			400: ErrorSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
			409: ErrorSchema,
		},
	},
	getListings: {
		method: 'GET',
		path: '/api/shops/:id/listings',
		pathParams: z.object({ id: z.string() }),
		responses: {
			200: z.array(ListingCardDataSchema),
			404: ErrorSchema,
		},
	},
	addListing: {
		method: 'POST',
		path: '/api/shops/:id/listings',
		pathParams: z.object({ id: z.string() }),
		body: ShopProfileSchema,
		responses: {
			201: z.object({ id: z.number() }),
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
	favorite: {
		method: 'POST',
		path: '/api/shops/:id/favorite',
		pathParams: z.object({ id: z.string() }),
		body: z.object({}),
		responses: {
			200: FavoriteResponseSchema,
			401: ErrorSchema,
			404: ErrorSchema,
		},
	},
	unfavorite: {
		method: 'DELETE',
		path: '/api/shops/:id/favorite',
		pathParams: z.object({ id: z.string() }),
		body: z.object({}),
		responses: {
			200: FavoriteResponseSchema,
			401: ErrorSchema,
			404: ErrorSchema,
		},
	},
	getImageUploadUrl: {
		method: 'POST',
		path: '/api/shops/:id/image-upload-url',
		pathParams: z.object({ id: z.string() }),
		body: z.object({ contentType: z.string() }),
		responses: {
			200: z.object({
				uuid: z.string(),
				uploadUrls: ImageUploadUrlsSchema,
			}),
			400: ErrorSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
	getListingImageUploadUrl: {
		method: 'POST',
		path: '/api/shops/:id/listing-image-upload-url',
		pathParams: z.object({ id: z.string() }),
		body: z.object({ contentType: z.string() }),
		responses: {
			200: z.object({
				uuid: z.string(),
				uploadUrls: ImageUploadUrlsSchema,
			}),
			400: ErrorSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
});

const ShopManagerProcessingProfileSchema = z.object({
	id: z.number(),
	name: z.string(),
	minDays: z.number(),
	maxDays: z.number(),
});

const ShopManagerShippingProfileSchema = z.object({
	id: z.number(),
	name: z.string(),
	originZip: z.string(),
	flatShippingRateCents: z.number().nullable(),
	shippingDaysMin: z.number(),
	shippingDaysMax: z.number(),
});

const ShopManagerReturnProfileSchema = z.object({
	id: z.number(),
	name: z.string(),
	policyType: z.nativeEnum(ReturnPolicyType),
	returnWindowDays: z.number().nullable(),
	policyDescrRichText: z.string().nullable(),
});

const ShopManagerPersonalizationProfileSchema = z.object({
	id: z.number(),
	name: z.string(),
	costCents: z.number(),
	helperText: z.string().nullable(),
});

const ShopProfilesDataSchema = z.object({
	directFulfillment: z.boolean(),
	processingProfiles: z.array(ShopManagerProcessingProfileSchema),
	shippingProfiles: z.array(ShopManagerShippingProfileSchema),
	returnProfiles: z.array(ShopManagerReturnProfileSchema),
	personalizationProfiles: z.array(
		ShopManagerPersonalizationProfileSchema,
	),
});

const ListingEditDataSchema = z.object({
	shortId: z.string(),
	title: z.string(),
	subtitle: z.string().nullable(),
	categoryId: z.string(),
	priceCents: z.number(),
	imageUuids: z.array(z.string()),
	processingProfileId: z.number().nullable(),
	shippingProfileId: z.number().nullable(),
	returnProfileId: z.number().nullable(),
	personalizationProfileId: z.number().nullable(),
	fullDescr: z.array(ListingDescrSectionSchema).nullable(),
	variations: VariationsSchema,
	combinations: CombinationsSchema,
	inventory: z.number().nullable().optional(),
	trackInventory: z.boolean().default(false),
});

// Create and update take an identical body; the only difference between
// the two operations is the URL. Also reused as the canonical shape for
// listing validation, so the two aren't declared independently.
const ListingWriteBodySchema = ListingEditDataSchema.omit({
	shortId: true,
});

const CreateProcessingProfileBodySchema = z.object({
	name: z.string(),
	minDays: z.number(),
	maxDays: z.number(),
});

const CreateShippingProfileBodySchema = z.object({
	name: z.string(),
	originZip: z.string(),
	flatShippingRateCents: z.number().nullable(),
	shippingDaysMin: z.number(),
	shippingDaysMax: z.number(),
});

const CreateReturnProfileBodySchema = z.object({
	name: z.string(),
	policyType: z.nativeEnum(ReturnPolicyType),
	returnWindowDays: z.number().nullable(),
	policyDescrRichText: z.string().nullable(),
});

const CreatePersonalizationProfileBodySchema = z.object({
	name: z.string(),
	costCents: z.number(),
	helperText: z.string().nullable(),
});

export const shopManagerContract = c.router({
	getListings: {
		method: 'GET',
		path: '/api/shops/:shopId/manager/listings',
		pathParams: z.object({ shopId: z.string() }),
		responses: {
			200: z.array(ShopManagerListingCardDataSchema),
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
	getProfiles: {
		method: 'GET',
		path: '/api/shops/:shopId/manager/profiles',
		pathParams: z.object({ shopId: z.string() }),
		responses: {
			200: ShopProfilesDataSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
	createProcessingProfile: {
		method: 'POST',
		path: '/api/shops/:shopId/manager/profiles/processing',
		pathParams: z.object({ shopId: z.string() }),
		body: CreateProcessingProfileBodySchema,
		responses: {
			200: ShopManagerProcessingProfileSchema,
			400: ErrorSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
			409: ErrorSchema,
		},
	},
	createShippingProfile: {
		method: 'POST',
		path: '/api/shops/:shopId/manager/profiles/shipping',
		pathParams: z.object({ shopId: z.string() }),
		body: CreateShippingProfileBodySchema,
		responses: {
			200: ShopManagerShippingProfileSchema,
			400: ErrorSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
			409: ErrorSchema,
		},
	},
	createReturnProfile: {
		method: 'POST',
		path: '/api/shops/:shopId/manager/profiles/returns',
		pathParams: z.object({ shopId: z.string() }),
		body: CreateReturnProfileBodySchema,
		responses: {
			200: ShopManagerReturnProfileSchema,
			400: ErrorSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
			409: ErrorSchema,
		},
	},
	createPersonalizationProfile: {
		method: 'POST',
		path: '/api/shops/:shopId/manager/profiles/personalization',
		pathParams: z.object({ shopId: z.string() }),
		body: CreatePersonalizationProfileBodySchema,
		responses: {
			200: ShopManagerPersonalizationProfileSchema,
			400: ErrorSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
			409: ErrorSchema,
		},
	},
	getListing: {
		method: 'GET',
		path: '/api/shops/:shopId/manager/listings/:listingShortId',
		pathParams: z.object({
			shopId: z.string(),
			listingShortId: z.string(),
		}),
		responses: {
			200: ListingEditDataSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
	setListingAvailable: {
		method: 'PUT',
		path: '/api/shops/:shopId/manager/listings/:listingShortId/available',
		pathParams: z.object({
			shopId: z.string(),
			listingShortId: z.string(),
		}),
		body: z.object({ available: z.boolean() }),
		responses: {
			200: z.object({ available: z.boolean() }),
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
	createListing: {
		method: 'POST',
		path: '/api/shops/:shopId/manager/listings',
		pathParams: z.object({ shopId: z.string() }),
		body: ListingWriteBodySchema,
		responses: {
			200: ListingEditDataSchema,
			400: ErrorSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
	updateListing: {
		method: 'PUT',
		path: '/api/shops/:shopId/manager/listings/:listingShortId',
		pathParams: z.object({
			shopId: z.string(),
			listingShortId: z.string(),
		}),
		body: ListingWriteBodySchema,
		responses: {
			200: ListingEditDataSchema,
			400: ErrorSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
	deleteListing: {
		method: 'DELETE',
		path: '/api/shops/:shopId/manager/listings/:listingShortId',
		pathParams: z.object({
			shopId: z.string(),
			listingShortId: z.string(),
		}),
		body: z.object({}),
		responses: {
			200: z.object({ deleted: z.boolean() }),
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
});

export type ShopManagerProcessingProfile = z.infer<
	typeof ShopManagerProcessingProfileSchema
>;
export type ShopManagerShippingProfile = z.infer<
	typeof ShopManagerShippingProfileSchema
>;
export type ShopManagerReturnProfile = z.infer<
	typeof ShopManagerReturnProfileSchema
>;
export type ShopManagerPersonalizationProfile = z.infer<
	typeof ShopManagerPersonalizationProfileSchema
>;
export type ShopProfilesData = z.infer<typeof ShopProfilesDataSchema>;
export type ListingEditData = z.infer<typeof ListingEditDataSchema>;
export type ListingWriteBody = z.infer<typeof ListingWriteBodySchema>;
export type CreateProcessingProfileBody = z.infer<
	typeof CreateProcessingProfileBodySchema
>;
export type CreateShippingProfileBody = z.infer<
	typeof CreateShippingProfileBodySchema
>;
export type CreateReturnProfileBody = z.infer<
	typeof CreateReturnProfileBodySchema
>;
export type CreatePersonalizationProfileBody = z.infer<
	typeof CreatePersonalizationProfileBodySchema
>;

const SearchResultSchema = z.object({
	id: z.string(),
	label: z.string(),
});

const SearchResultCollectionSchema = z.object({
	listingResults: z.array(SearchResultSchema),
	shopResults: z.array(SearchResultSchema),
});

export const searchContract = c.router({
	search: {
		method: 'GET',
		path: '/api/search',
		query: z.object({ q: z.string().optional() }),
		responses: {
			200: SearchResultCollectionSchema,
			400: ErrorSchema,
		},
	},
});

export const OrderItemDisplayDataSchema = z.object({
	title: z.string(),
	shopName: z.string(),
	shopShortId: z.string(),
	imageUuid: z.string().nullable(),
	unitPriceCents: z.number(),
	shippingPriceCents: z.number(),
	quantity: z.number(),
	estimatedDelivery: z.string().nullable(),
	variations: z.array(
		z.object({ name: z.string(), value: z.string() }),
	),
	personalizationText: z.string().nullable().optional(),
	personalizationName: z.string().nullable().optional(),
});

export const OrderTimelineEntrySchema = z.object({
	status: z.nativeEnum(OrderStatus),
	timestamp: z.string(),
	info: z.string(),
});

export const PaymentDetailsSchema = z.object({
	cardBrand: z.string(),
	cardLast4: z.string(),
	walletType: z.string().nullable(),
	receiptUrl: z.string().nullable(),
});

export type PaymentDetails = z.infer<typeof PaymentDetailsSchema>;

export const ShipmentSchema = z.object({
	provider: z.nativeEnum(ShippingProvider),
	tracking: z.string().min(1),
});

export type Shipment = z.infer<typeof ShipmentSchema>;

const OrderResponseSchema = z.object({
	shortId: z.string(),
	createdAt: z.string(),
	orderStatus: z.nativeEnum(OrderStatus),
	shippingAddress: ShippingAddressSchema,
	items: z.array(OrderItemDisplayDataSchema),
	subtotalCents: z.number(),
	shippingCents: z.number(),
	taxCents: z.number(),
	timeline: z.array(OrderTimelineEntrySchema),
	paymentDetails: PaymentDetailsSchema.nullable(),
	shipments: z.array(ShipmentSchema),
});

export const ordersContract = c.router({
	getStatus: {
		method: 'GET',
		path: '/api/orders/:shortId/status',
		pathParams: z.object({ shortId: z.string() }),
		responses: {
			200: z.object({ orderStatus: z.nativeEnum(OrderStatus) }),
			404: ErrorSchema,
		},
	},
	getByShortId: {
		method: 'GET',
		path: '/api/orders/:shortId',
		pathParams: z.object({ shortId: z.string() }),
		query: z.object({ key: z.string().optional() }),
		responses: {
			200: OrderResponseSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
});

const AdminShopListItemSchema = z.object({
	id: z.number(),
	shortId: z.string(),
	title: z.string(),
	createdAt: z.string(),
	listingCount: z.number(),
	directFulfillment: z.boolean(),
});

const CreateShopBodySchema = z.object({
	title: z.string().min(1),
	classification: z.string().min(1),
	location: z.string().min(1),
	countryCode: z.string(),
	directFulfillment: z.boolean(),
	ownerEmail: z.string().optional(),
	profileImageUuid: z.string().uuid().optional(),
});

const ShopFulfillmentSchema = z.object({
	directFulfillment: z.boolean(),
	ownerEmail: z.string().nullable(),
});

const UpdateShopFulfillmentBodySchema = z.object({
	directFulfillment: z.boolean(),
	ownerEmail: z.string().optional(),
});

export const adminContract = c.router({
	getShops: {
		method: 'GET',
		path: '/api/admin/shops',
		responses: {
			200: z.array(AdminShopListItemSchema),
			401: ErrorSchema,
			403: ErrorSchema,
		},
	},
	createShop: {
		method: 'POST',
		path: '/api/admin/shops',
		body: CreateShopBodySchema,
		responses: {
			201: AdminShopListItemSchema,
			400: ErrorSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			409: ErrorSchema,
		},
	},
	getShopImageUploadUrl: {
		method: 'POST',
		path: '/api/admin/shop-image-upload-url',
		body: z.object({ contentType: z.string() }),
		responses: {
			200: z.object({
				uuid: z.string(),
				uploadUrls: ImageUploadUrlsSchema,
			}),
			400: ErrorSchema,
			401: ErrorSchema,
			403: ErrorSchema,
		},
	},
	getShopFulfillment: {
		method: 'GET',
		path: '/api/admin/shops/:shopId/fulfillment',
		pathParams: z.object({ shopId: z.string() }),
		responses: {
			200: ShopFulfillmentSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
	updateShopFulfillment: {
		method: 'PUT',
		path: '/api/admin/shops/:shopId/fulfillment',
		pathParams: z.object({ shopId: z.string() }),
		body: UpdateShopFulfillmentBodySchema,
		responses: {
			200: ShopFulfillmentSchema,
			400: ErrorSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
	getOrders: {
		method: 'GET',
		path: '/api/admin/orders',
		responses: {
			200: z.array(OrderResponseSchema),
			401: ErrorSchema,
			403: ErrorSchema,
		},
	},
	getOrder: {
		method: 'GET',
		path: '/api/admin/orders/:shortId',
		pathParams: z.object({ shortId: z.string() }),
		responses: {
			200: OrderResponseSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
	updateOrderShipments: {
		method: 'PUT',
		path: '/api/admin/orders/:shortId/shipments',
		pathParams: z.object({ shortId: z.string() }),
		body: z.object({ shipments: z.array(ShipmentSchema) }),
		responses: {
			200: OrderResponseSchema,
			400: ErrorSchema,
			401: ErrorSchema,
			403: ErrorSchema,
			404: ErrorSchema,
		},
	},
});

export const meContract = c.router({
	getMe: {
		method: 'GET',
		path: '/api/me',
		responses: {
			200: UserInfoSchema,
			401: ErrorSchema,
			500: ErrorSchema,
		},
	},
	getFavorites: {
		method: 'GET',
		path: '/api/me/favorites',
		responses: {
			200: z.array(ListingCardDataSchema),
			401: ErrorSchema,
			404: ErrorSchema,
		},
	},
	getFavoriteShops: {
		method: 'GET',
		path: '/api/me/favorite-shops',
		responses: {
			200: z.array(ShopCardDataSchema),
			401: ErrorSchema,
			404: ErrorSchema,
		},
	},
	getOrders: {
		method: 'GET',
		path: '/api/me/orders',
		responses: {
			200: z.array(OrderResponseSchema),
			401: ErrorSchema,
		},
	},
});

export const appContract = c.router({
	admin: adminContract,
	categories: categoryContract,
	checkout: checkoutContract,
	infoPages: infoPagesContract,
	listings: listingsContract,
	me: meContract,
	orders: ordersContract,
	search: searchContract,
	shopManager: shopManagerContract,
	shops: shopsContract,
});

export type VariationOptionData = z.infer<
	typeof VariationOptionSchema
>;
export type VariationData = z.infer<typeof VariationSchema>;
export type VariationsData = z.infer<typeof VariationsSchema>;
export type CombinationData = z.infer<typeof CombinationSchema>;
export type CombinationsData = z.infer<typeof CombinationsSchema>;

export type CategoryTileData = z.infer<typeof CategoryTileDataSchema>;
export type ListingCardData = z.infer<typeof ListingCardDataSchema>;
export type ShopManagerListingCardData = z.infer<
	typeof ShopManagerListingCardDataSchema
>;
export type ListingDescrSection = z.infer<
	typeof ListingDescrSectionSchema
>;
export type ListingFullDescr = ListingDescrSection[];
export type ListingPageData = z.infer<typeof ListingPageDataSchema>;
export type ListingFulfillmentProfiles = z.infer<
	typeof ListingFulfillmentProfilesSchema
>;
export type CheckoutItemData = z.infer<typeof CheckoutItemSchema>;
export type CheckoutRequest = z.infer<typeof CheckoutBodySchema>;
export type CartItemData = z.infer<typeof CartItemDataSchema>;
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;
export type PaymentIntentResponse = z.infer<
	typeof PaymentIntentResponseSchema
>;
export type TaxCalculationResponse = z.infer<
	typeof TaxResponseSchema
>;
export type ShopCardData = z.infer<typeof ShopCardDataSchema>;
export type UserInfo = z.infer<typeof UserInfoSchema>;
export type SearchResult = z.infer<typeof SearchResultSchema>;
export type OrderItemDisplayData = z.infer<
	typeof OrderItemDisplayDataSchema
>;
export type OrderResponse = z.infer<typeof OrderResponseSchema>;
export type OrderTimelineEntry = z.infer<
	typeof OrderTimelineEntrySchema
>;
export type SearchResultCollection = z.infer<
	typeof SearchResultCollectionSchema
>;
export type AdminShopListItem = z.infer<
	typeof AdminShopListItemSchema
>;
export type CreateShopBody = z.infer<typeof CreateShopBodySchema>;
export type UpdateShopBody = z.infer<typeof UpdateShopBodySchema>;
export type ShopFulfillment = z.infer<typeof ShopFulfillmentSchema>;
export type UpdateShopFulfillmentBody = z.infer<
	typeof UpdateShopFulfillmentBodySchema
>;
