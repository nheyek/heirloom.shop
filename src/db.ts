import mikroConfig from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import 'reflect-metadata';

let orm: MikroORM;

export const initORM = async () => {
  orm = await MikroORM.init(mikroConfig);
  return orm;
};

export const getORM = () => {
  if (!orm) throw new Error('ORM not initialized');
  return orm;
};

export const getEm = () => getORM().em.fork(); // use request-scoped EM