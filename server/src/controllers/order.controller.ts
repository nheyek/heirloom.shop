import { Request, Response } from 'express';
import { getOrderStatus } from '../services/order.service';

export const fetchOrderStatus = async (
	request: Request<{ shortId: string }>,
	response: Response,
) => {
	const { shortId } = request.params;
	const orderStatus = await getOrderStatus(shortId);
	response.json({ orderStatus });
};
