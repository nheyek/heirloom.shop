import dotenvFlow from 'dotenv-flow';
import express from 'express';
import path from 'path';
import 'reflect-metadata';
import { initORM } from './db';
import categoryRouter from './routes/category.routes';
import listingRouter from './routes/listing.routes';
import currentUserRouter from './routes/me.routes';
import shopRouter from './routes/shop.routes';

dotenvFlow.config();

const main = async () => {
	const app = express();

	await initORM();

	app.use(express.json());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/api/listings', listingRouter);
	app.use('/api/me', currentUserRouter);
	app.use('/api/shops', shopRouter);
	app.use('/api/categories', categoryRouter);

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
