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

export const createProduct = async (
	profileApiRequest: { title: string; desc: string },
	shopId: number,
) => {
	const em = getEm();
	const product = em.create(Product, {
		title: profileApiRequest.title,
		descriptionText: profileApiRequest.desc,
	});
	await em.persistAndFlush(product);
	return product.id;
};
