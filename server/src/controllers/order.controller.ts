import { NotFoundError } from '@mikro-orm/core';
import { Request, Response } from 'express';
import { getOrderStatus } from '../services/order.service';

export const fetchOrderStatus = async (
	request: Request<{ shortId: string }>,
	response: Response,
) => {
	const { shortId } = request.params;
	try {
		const orderStatus = await getOrderStatus(shortId);
		response.json({ orderStatus });
	} catch (err) {
		if (err instanceof NotFoundError) {
			response.status(404).json({ message: 'Order not found' });
		} else {
			throw err;
		}
	}
};
