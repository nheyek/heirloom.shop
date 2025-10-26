import { getEm } from '../db';
import { Listing } from '../entities/Listing';
import { Shop } from '../entities/Shop';

export const findAllProducts = async () => {
	const em = getEm();
	return em.find(Listing, {});
};

export const findProductById = async (id: number) => {
	const em = getEm();
	return em.findOne(Listing, { id });
};

export const createProduct = async (
	profileApiRequest: { title: string; desc: string },
	shopId: number,
) => {
	const em = getEm();
	const product = em.create(Listing, {
		title: profileApiRequest.title,
		descrRichText: profileApiRequest.desc,
		shop: { id: shopId } as Shop,
	});
	await em.persistAndFlush(product);
	return product.id;
};
