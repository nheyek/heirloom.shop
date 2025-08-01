import express from 'express';
import 'dotenv/config';
import 'reflect-metadata';
import mikroConfig from './mikro-orm.config';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { AppUser } from './entities/AppUser';

const main = async () => {

    const app = express();
    
    const orm = await MikroORM.init(mikroConfig);

    app.use(express.json());
    app.use((req, _res, next) => RequestContext.create(orm.em, next));

    app.get('/', (req, res) => {
        res.status(200).send('Hello world');
    });

    app.use((req, res) => {
        res.status(404).send('Not found');
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