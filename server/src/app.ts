import express from 'express';
import 'dotenv/config';
import 'reflect-metadata';
import { initORM } from './db';
import productRouter from './routes/product.routes';
import currentUserRouter from './routes/me.routes';
import shopRouter from './routes/shop.routes';
import dotenv from 'dotenv';
import path from 'path';
import { auth } from 'express-oauth2-jwt-bearer';

dotenv.config();

const main = async () => {
	const app = express();

	await initORM();

	app.use(express.json());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/api/products', productRouter);
	app.use('/api/me', currentUserRouter);
	app.use('/api/shops', shopRouter);

	const PORT = 3000;
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
};

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
