import { fileURLToPath } from 'url';
import { API_ROUTES } from '@heirloom/common/constants';
import {
	categoryContract,
	checkoutContract,
	listingsContract,
	meContract,
	ordersContract,
	searchContract,
	shopsContract,
} from '@heirloom/common/contract';
import { createExpressEndpoints } from '@ts-rest/express';
import dotenvFlow from 'dotenv-flow';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { initORM } from './db.js';
import { logError } from './services/error-log.service.js';
import { categoryRouter } from './routes/category.routes.js';
import { checkoutRouter } from './routes/checkout.routes.js';
import { listingRouter } from './routes/listing.routes.js';
import { meRouter } from './routes/me.routes.js';
import { orderRouter } from './routes/order.routes.js';
import { searchRouter } from './routes/search.routes.js';
import { shopRouter } from './routes/shop.routes.js';
import webhookRouter from './routes/webhook.routes.js';

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

	// Log all non-2XX responses. The finish event fires after the response is
	// sent, so req.body is fully populated. The errorLogged flag prevents
	// double-logging when the exception handler below already handled the request.
	app.use((req: Request, res: Response, next: NextFunction) => {
		res.on('finish', () => {
			if (res.statusCode >= 400 && !res.locals.errorLogged) {
				logError({
					statusCode: res.statusCode,
					method: req.method,
					path: req.path,
					message: `${res.statusCode} ${req.method} ${req.path}`,
					requestBody:
						typeof req.body === 'object' &&
						!Buffer.isBuffer(req.body)
							? req.body
							: undefined,
					requestQuery: req.query,
				});
			}
		});
		next();
	});

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

	// Catch unhandled exceptions from route handlers. Express 5 forwards async
	// errors automatically. Sets errorLogged so the finish listener above does
	// not double-log this request.
	app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
		res.locals.errorLogged = true;
		logError({
			statusCode: 500,
			method: req.method,
			path: req.path,
			message: err.message,
			stack: err.stack,
			requestBody:
				typeof req.body === 'object' && !Buffer.isBuffer(req.body)
					? req.body
					: undefined,
			requestQuery: req.query,
		});
		res.status(500).json({ error: 'Internal server error' });
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
