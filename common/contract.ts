import { initContract } from '@ts-rest/core';
import { z } from 'zod';

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

const NotFoundSchema = z.object({ error: z.string() });

export const categoryContract = c.router({
	getAll: {
		method: 'GET',
		path: '/api/categories',
		responses: { 200: z.array(CategoryTileDataSchema) },
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
			404: NotFoundSchema,
		},
	},
	getChildren: {
		method: 'GET',
		path: '/api/categories/:id/children',
		pathParams: z.object({ id: z.string() }),
		responses: {
			200: z.array(CategoryTileDataSchema),
			404: NotFoundSchema,
		},
	},
	getListings: {
		method: 'GET',
		path: '/api/categories/:id/listings',
		pathParams: z.object({ id: z.string() }),
		responses: {
			200: z.array(ListingCardDataSchema),
			404: NotFoundSchema,
		},
	},
});
