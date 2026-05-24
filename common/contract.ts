import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { OrderStatus } from './enums/OrderStatus.js';

const c = initContract();

const CategoryTileDataSchema = z.object({
	id: z.string(),
	parentId: z.string().optional(),
	title: z.string(),
	imageUuid: z.string().optional(),
});

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
});

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
	selectedOptions: z.record(z.string(), z.number()),
	quantity: z.number(),
});

const TaxRequestSchema = z.object({
	items: z.array(CheckoutItemSchema),
	shippingAddress: ShippingAddressSchema,
});

const CheckoutBodySchema = TaxRequestSchema.extend({
	email: z.string(),
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

const ListingVariationOptionSchema = z.object({
	id: z.number(),
	name: z.string(),
	additionalPriceCents: z.number(),
});

const ListingVariationSchema = z.object({
	id: z.number(),
	name: z.string(),
	pricesVary: z.boolean(),
	options: z.array(ListingVariationOptionSchema),
});

const ListingPageDataSchema = ListingCardDataSchema.extend({
	fullDescr: z
		.array(z.object({ title: z.string(), richText: z.string() }))
		.optional(),
	leadTimeDaysMin: z.number(),
	leadTimeDaysMax: z.number(),
	originZip: z.string().optional(),
	shippingDetails: z
		.object({
			shipTimeDaysMin: z.number(),
			shipTimeDaysMax: z.number(),
			shippingRate: z.number(),
		})
		.optional(),
	returnExchangePolicy: z
		.object({
			returnsAccepted: z.boolean(),
			exchangesAccepted: z.boolean(),
			returnWindowDays: z.number(),
		})
		.optional(),
	variations: z.array(ListingVariationSchema),
});

const CartItemDataSchema = ListingCardDataSchema.extend({
	variations: z.array(ListingVariationSchema),
	shippingPrice: z.number(),
	deliveryEstimate: z.string().nullable().optional(),
});

const FavoriteResponseSchema = z.object({ favorited: z.boolean() });

const UserInfoSchema = z.object({
	id: z.number(),
	email: z.string(),
	isAdmin: z.boolean(),
	shopId: z.number().nullable(),
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
});

const ShopProfileSchema = z.object({
	title: z.string(),
	desc: z.string(),
	categoryId: z.string().optional(),
});

export const shopsContract = c.router({
	getAll: {
		method: 'GET',
		path: '/api/shops',
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
});

const SearchResultSchema = z.object({
	id: z.string(),
	label: z.string(),
});

const SearchResultCollectionSchema = z.object({
	listingResults: z.array(SearchResultSchema),
	shopResults: z.array(SearchResultSchema),
	categoryResults: z.array(SearchResultSchema),
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
	imageUuid: z.string().nullable(),
	unitPriceCents: z.number(),
	shippingPriceCents: z.number(),
	quantity: z.number(),
	estimatedDelivery: z.string().nullable(),
	variations: z.array(
		z.object({ name: z.string(), value: z.string() }),
	),
});

const OrderResponseSchema = z.object({
	shortId: z.string(),
	createdAt: z.string().nullable(),
	orderStatus: z.nativeEnum(OrderStatus),
	shippingAddress: ShippingAddressSchema,
	items: z.array(OrderItemDisplayDataSchema),
	subtotalCents: z.number(),
	shippingCents: z.number(),
	taxCents: z.number(),
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
	createdAt: z.string().nullable(),
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
			200: z.object({ uuid: z.string(), uploadUrl: z.string() }),
			401: ErrorSchema,
			403: ErrorSchema,
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
	listings: listingsContract,
	me: meContract,
	orders: ordersContract,
	search: searchContract,
	shops: shopsContract,
});

export type CategoryTileData = z.infer<typeof CategoryTileDataSchema>;
export type ListingCardData = z.infer<typeof ListingCardDataSchema>;
export type ListingVariationOptionData = z.infer<
	typeof ListingVariationOptionSchema
>;
export type ListingVariationData = z.infer<
	typeof ListingVariationSchema
>;
export type ListingPageData = z.infer<typeof ListingPageDataSchema>;
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
export type SearchResultCollection = z.infer<
	typeof SearchResultCollectionSchema
>;
export type AdminShopListItem = z.infer<typeof AdminShopListItemSchema>;
export type CreateShopBody = z.infer<typeof CreateShopBodySchema>;
