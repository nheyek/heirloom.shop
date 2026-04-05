import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { OrderStatus } from './enums/OrderStatus';

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

const FavoriteResponseSchema = z.object({ favorited: z.boolean() });

const UserInfoSchema = z.object({
	id: z.number(),
	email: z.string(),
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
});

export const appContract = c.router({
	categories: categoryContract,
	checkout: checkoutContract,
	listings: listingsContract,
	me: meContract,
	orders: ordersContract,
});
