import express from 'express';
import 'dotenv/config';
import 'reflect-metadata';
import { initORM } from './db';
import productRouter from './routes/product.routes';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const main = async () => {

    const app = express();

    await initORM();

    app.use(express.json());
    app.use('/api/products', productRouter);

    app.use(express.static(path.join(__dirname, 'public')));
	app.get('/', (req, res) => {
    	res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});