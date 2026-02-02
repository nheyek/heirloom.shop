import { API_ROUTES } from '@common/constants';
import dotenvFlow from 'dotenv-flow';
import express from 'express';
import path from 'path';
import 'reflect-metadata';
import { initORM } from './db';
import cartRouter from './routes/cart.routes';
import categoryRouter from './routes/category.routes';
import listingRouter from './routes/listing.routes';
import currentUserRouter from './routes/me.routes';
import searchRouter from './routes/search.routes';
import shopRouter from './routes/shop.routes';

dotenvFlow.config();

const main = async () => {
	const app = express();

	await initORM();

	app.use(express.json());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use(`/api/${API_ROUTES.listings}`, listingRouter);
	app.use(`/api/${API_ROUTES.currentUser}`, currentUserRouter);
	app.use(`/api/${API_ROUTES.shops.base}`, shopRouter);
	app.use(`/api/${API_ROUTES.categories.base}`, categoryRouter);
	app.use(`/api/${API_ROUTES.search.base}`, searchRouter);
	app.use('/api/cart', cartRouter);

	app.use((req, res, next) => {
		res.sendFile(path.join(__dirname, 'public/index.html'));
	});

	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
};

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
