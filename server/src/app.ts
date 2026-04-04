import { API_ROUTES } from '@common/constants';
import { categoryContract } from '@common/contract';
import { createExpressEndpoints } from '@ts-rest/express';
import dotenvFlow from 'dotenv-flow';
import express from 'express';
import path from 'path';
import 'reflect-metadata';
import { initORM } from './db';
import { categoryRouter } from './routes/category.routes';
import checkoutRouter from './routes/checkout.routes';
import listingRouter from './routes/listing.routes';
import currentUserRouter from './routes/me.routes';
import orderRouter from './routes/order.routes';
import searchRouter from './routes/search.routes';
import shopRouter from './routes/shop.routes';
import webhookRouter from './routes/webhook.routes';

dotenvFlow.config({ path: path.join(__dirname, '..') });

export const createApp = async () => {
	const app = express();

	await initORM();

	app.use(
		`/${API_ROUTES.webhooks.base}`,
		express.raw({ type: 'application/json' }),
		webhookRouter,
	);

	app.use(express.json());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use(
		`/${API_ROUTES.base}/${API_ROUTES.listings.base}`,
		listingRouter,
	);
	app.use(
		`/${API_ROUTES.base}/${API_ROUTES.currentUser.base}`,
		currentUserRouter,
	);
	app.use(
		`/${API_ROUTES.base}/${API_ROUTES.shops.base}`,
		shopRouter,
	);
	createExpressEndpoints(categoryContract, categoryRouter, app);
	app.use(
		`/${API_ROUTES.base}/${API_ROUTES.search.base}`,
		searchRouter,
	);
	app.use(
		`/${API_ROUTES.base}/${API_ROUTES.checkout.base}`,
		checkoutRouter,
	);
	app.use(
		`/${API_ROUTES.base}/${API_ROUTES.orders.base}`,
		orderRouter,
	);

	app.use((req, res, next) => {
		res.sendFile(path.join(__dirname, 'public/index.html'));
	});

	return app;
};

const main = async () => {
	const app = await createApp();
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
};

if (require.main === module) {
	main().catch((e) => {
		console.error(e);
		process.exit(1);
	});
}
