import { fileURLToPath } from 'url';
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
import { initORM } from './db';
import { categoryRouter } from './routes/category.routes';
import { checkoutRouter } from './routes/checkout.routes';
import { listingRouter } from './routes/listing.routes';
import { meRouter } from './routes/me.routes';
import { orderRouter } from './routes/order.routes';
import { searchRouter } from './routes/search.routes';
import { shopRouter } from './routes/shop.routes';
import webhookRouter from './routes/webhook.routes';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

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

	createExpressEndpoints(listingsContract, listingRouter, app);
	createExpressEndpoints(meContract, meRouter, app);
	createExpressEndpoints(shopsContract, shopRouter, app);
	createExpressEndpoints(categoryContract, categoryRouter, app);
	createExpressEndpoints(checkoutContract, checkoutRouter, app);
	createExpressEndpoints(searchContract, searchRouter, app);
	createExpressEndpoints(ordersContract, orderRouter, app);

	app.use((_req, res) => {
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

// Only start the server when this file is run directly, not when imported by tests.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
	main().catch((e) => {
		console.error(e);
		process.exit(1);
	});
}
