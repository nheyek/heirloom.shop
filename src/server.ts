import express from 'express';
import 'dotenv/config';
import 'reflect-metadata';
import { initORM } from './db';
import productRouter from './routes/product.routes';
import dotenv from 'dotenv';

dotenv.config();

const main = async () => {

    const app = express();

    await initORM();

    app.use(express.json());
    app.use('/api/products', productRouter);

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});