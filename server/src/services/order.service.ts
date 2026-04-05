import { OrderStatus } from '@common/enums/OrderStatus';
import { OrderItemSnapshot } from '@common/types/OrderItemSnapshot';
import { ShippingAddress } from '@common/contract';
import { getEm } from '../db';
import { AppOrder } from '../entities/generated/AppOrder';
import { encodeId } from '../utils/hashids';

export const createOrder = async (
	snapshots: OrderItemSnapshot[],
	shippingAddress: ShippingAddress,
	subtotalCents: number,
	shippingCents: number,
	taxTotalCents: number,
	email: string,
): Promise<AppOrder> => {
	const em = getEm();

	const [{ nextval }] = await em
		.getConnection()
		.execute("SELECT nextval('app_order_id_seq')");
	const nextId = Number(nextval);

	const order = em.create(AppOrder, {
		id: nextId,
		shortId: encodeId(nextId),
		items: snapshots,
		shippingAddress,
		subtotal: subtotalCents,
		shippingPrice: shippingCents,
		taxTotal: taxTotalCents,
		email,
	});
	await em.persistAndFlush(order);
	return order;
};

export const updateOrderStatus = async (
	orderId: number,
	status: OrderStatus,
): Promise<void> => {
	const em = getEm();
	const order = await em.findOneOrFail(AppOrder, { id: orderId });
	order.orderStatus = status;
	await em.flush();
};

export const getOrderStatus = async (
	shortId: string,
): Promise<OrderStatus> => {
	const em = getEm();
	const order = await em.findOneOrFail(AppOrder, { shortId });
	return order.orderStatus as OrderStatus;
};

export const getOrderById = async (id: number): Promise<AppOrder> => {
	const em = getEm();
	const order = await em.findOneOrFail(AppOrder, { id });
	return order;
};

export const updateOrderPaymentIntent = async (
	orderId: number,
	paymentIntentId: string,
): Promise<void> => {
	const em = getEm();
	const order = await em.findOneOrFail(AppOrder, { id: orderId });
	order.paymentIntentId = paymentIntentId;
	await em.flush();
};
