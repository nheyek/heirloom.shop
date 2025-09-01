import { getEm } from '../db';
import { Product } from '../entities/Product';

export const findAllProducts = async () => {
	const em = getEm();
	return em.find(Product, {});
};

export const findProductById = async (id: number) => {
	const em = getEm();
	return em.findOne(Product, { id });
};
