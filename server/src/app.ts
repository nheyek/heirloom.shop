import { API_ROUTES } from '@common/constants';
import {
	categoryContract,
	checkoutContract,
	listingsContract,
	meContract,
	ordersContract,
	searchContract,
	shopsContract,
} from '@common/contract';
import { createExpressEndpoints } from '@ts-rest/express';
import dotenvFlow from 'dotenv-flow';
import express from 'express';
import path from 'path';
import 'reflect-metadata';
import { initORM } from './db';
import { categoryRouter } from './routes/category.routes';
import { checkoutRouter } from './routes/checkout.routes';
import { listingRouter } from './routes/listing.routes';
import { meRouter } from './routes/me.routes';
import { orderRouter } from './routes/order.routes';
import { searchRouter } from './routes/search.routes';
import { shopRouter } from './routes/shop.routes';
import webhookRouter from './routes/webhook.routes';

// __dirname is a CJS module variable. Guard all usages so they are dead code
// when the file is loaded as ESM by ts-jest (test environment).
if (process.env.NODE_ENV !== 'testing') {
	dotenvFlow.config({ path: path.join(__dirname, '..') });
}

export const createApp = async () => {
	const app = express();

	await initORM();

	app.use(
		`/${API_ROUTES.webhooks.base}`,
		express.raw({ type: 'application/json' }),
		webhookRouter,
	);

	app.use(express.json());

	if (process.env.NODE_ENV !== 'testing') {
		// Static file serving only needed in production; __dirname valid in CJS only.
		app.use(express.static(path.join(__dirname, 'public')));
	}

	createExpressEndpoints(listingsContract, listingRouter, app);
	createExpressEndpoints(meContract, meRouter, app);
	createExpressEndpoints(shopsContract, shopRouter, app);
	createExpressEndpoints(categoryContract, categoryRouter, app);
	createExpressEndpoints(checkoutContract, checkoutRouter, app);
	createExpressEndpoints(searchContract, searchRouter, app);
	createExpressEndpoints(ordersContract, orderRouter, app);

	if (process.env.NODE_ENV !== 'testing') {
		app.use((req, res, next) => {
			res.sendFile(path.join(__dirname, 'public/index.html'));
		});
	}

	return app;
};

const main = async () => {
	const app = await createApp();
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
};

// require.main is CJS-only; guard so ESM (test) context doesn't break.
if (typeof require !== 'undefined' && require.main === module) {
	main().catch((e) => {
		console.error(e);
		process.exit(1);
	});
}
