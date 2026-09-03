import {
	adminContract,
	categoryContract,
	checkoutContract,
	infoPagesContract,
	listingsContract,
	meContract,
	ordersContract,
	searchContract,
	shopManagerContract,
	shopsContract,
} from '@heirloom/common/contract';
import {
	createExpressEndpoints,
	RequestValidationError,
} from '@ts-rest/express';
import dotenvFlow from 'dotenv-flow';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { initORM } from './db.js';
import { adminRouter } from './routes/admin.routes.js';
import { categoryRouter } from './routes/category.routes.js';
import { checkoutRouter } from './routes/checkout.routes.js';
import { infoPageRouter } from './routes/infoPage.routes.js';
import { listingRouter } from './routes/listing.routes.js';
import { meRouter } from './routes/me.routes.js';
import { orderRouter } from './routes/order.routes.js';
import { searchRouter } from './routes/search.routes.js';
import { shopRouter } from './routes/shop.routes.js';
import { shopManagerRouter } from './routes/shopManager.routes.js';
import webhookRouter from './routes/webhook.routes.js';
import { logError } from './services/log.service.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

dotenvFlow.config({ path: path.join(__dirname, '..') });

// Formats a malformed request (wrong type, missing field, etc. caught by the
// ts-rest/zod body schema) as `{ error: string }` with 400, matching the
// error shape used by every handler-thrown error elsewhere in the app,
// instead of ts-rest's default raw zod-issue dump.
// `req` is intentionally untyped: this handler is shared across every
// contract's createExpressEndpoints call, each of which expects a
// differently-shaped, contract-specific request type that this handler
// never needs to inspect.
const requestValidationErrorHandler = (
	err: RequestValidationError,
	_req: unknown,
	res: Response,
	next: NextFunction,
) => {
	if (!(err instanceof RequestValidationError)) {
		next(err);
		return;
	}
	const zodError =
		err.pathParams ?? err.headers ?? err.query ?? err.body;
	const message =
		zodError && zodError.issues.length > 0
			? zodError.issues.map((issue) => issue.message).join('; ')
			: 'Invalid request';
	res.status(400).json({ error: message });
};

export const createApp = async () => {
	const app = express();

	await initORM();

	app.use(
		`/webhooks`,
		express.raw({ type: 'application/json' }),
		webhookRouter,
	);

	app.use(express.json());

	app.use(express.static(path.join(__dirname, 'public')));

	// Log unexpected error responses. 401/403 are expected auth failures and are
	// not logged. The finish event fires after the response is sent, so req.body
	// is fully populated. The errorLogged flag prevents double-logging when the
	// exception handler below already handled the request.
	app.use((req: Request, res: Response, next: NextFunction) => {
		res.on('finish', () => {
			const isAuthError =
				res.statusCode === 401 || res.statusCode === 403;
			if (
				res.statusCode >= 400 &&
				!isAuthError &&
				!res.locals.errorLogged
			) {
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
					userEmail: req.userClaims?.email,
					ipAddress:
						(req.headers['x-forwarded-for'] as string)
							?.split(',')[0]
							.trim() ?? req.ip,
					userAgent: req.headers['user-agent'],
				});
			}
		});
		next();
	});

	const endpointOptions = { requestValidationErrorHandler };
	createExpressEndpoints(
		adminContract,
		adminRouter,
		app,
		endpointOptions,
	);
	createExpressEndpoints(
		listingsContract,
		listingRouter,
		app,
		endpointOptions,
	);
	createExpressEndpoints(
		meContract,
		meRouter,
		app,
		endpointOptions,
	);
	createExpressEndpoints(
		shopsContract,
		shopRouter,
		app,
		endpointOptions,
	);
	createExpressEndpoints(
		categoryContract,
		categoryRouter,
		app,
		endpointOptions,
	);
	createExpressEndpoints(
		checkoutContract,
		checkoutRouter,
		app,
		endpointOptions,
	);
	createExpressEndpoints(
		infoPagesContract,
		infoPageRouter,
		app,
		endpointOptions,
	);
	createExpressEndpoints(
		searchContract,
		searchRouter,
		app,
		endpointOptions,
	);
	createExpressEndpoints(
		shopManagerContract,
		shopManagerRouter,
		app,
		endpointOptions,
	);
	createExpressEndpoints(
		ordersContract,
		orderRouter,
		app,
		endpointOptions,
	);

	app.use((_req, res) => {
		res.sendFile(path.join(__dirname, 'public/index.html'));
	});

	// Catch unhandled exceptions from route handlers. Express 5 forwards async
	// errors automatically. Sets errorLogged so the finish listener above does
	// not double-log this request.
	app.use(
		(
			err: Error,
			req: Request,
			res: Response,
			_next: NextFunction,
		) => {
			res.locals.errorLogged = true;
			logError({
				statusCode: 500,
				method: req.method,
				path: req.path,
				message: err.message,
				stack: err.stack,
				requestBody:
					typeof req.body === 'object' &&
					!Buffer.isBuffer(req.body)
						? req.body
						: undefined,
				requestQuery: req.query,
				userEmail: req.userClaims?.email,
				ipAddress:
					(req.headers['x-forwarded-for'] as string)
						?.split(',')[0]
						.trim() ?? req.ip,
				userAgent: req.headers['user-agent'],
			});
			res.status(500).json({ error: 'Internal server error' });
		},
	);

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
