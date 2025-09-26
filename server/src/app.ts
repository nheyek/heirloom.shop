import express from 'express';
import 'reflect-metadata';
import { initORM } from './db';
import productRouter from './routes/product.routes';
import currentUserRouter from './routes/me.routes';
import shopRouter from './routes/shop.routes';
import dotenvFlow from 'dotenv-flow';
import path from 'path';

dotenvFlow.config();

const main = async () => {
	const app = express();

	await initORM();

	app.use(express.json());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/api/products', productRouter);
	app.use('/api/me', currentUserRouter);
	app.use('/api/shops', shopRouter);

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
