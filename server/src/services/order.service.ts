import { randomBytes } from 'crypto';
import { OrderStatus } from '@common/enums/OrderStatus';
import { OrderItemSnapshot } from '@common/types/OrderItemSnapshot';
import { ShippingAddress } from '@common/contract';
import { getEm } from '@server/db';
import { AppOrder } from '@server/entities/generated/AppOrder';
import { AppOrderItem } from '@server/entities/generated/AppOrderItem';
import { encodeId } from '@server/utils/hashids';

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
		accessKey: randomBytes(16).toString('hex'),
		shippingAddress,
		subtotal: subtotalCents,
		shippingPrice: shippingCents,
		taxTotal: taxTotalCents,
		email,
	});
	await em.persistAndFlush(order);

	for (const snapshot of snapshots) {
		em.persist(em.create(AppOrderItem, { order, snapshot, fulfillment: {} }));
	}
	await em.flush();

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

export const getOrderByShortId = async (shortId: string): Promise<AppOrder> => {
	const em = getEm();
	return em.findOneOrFail(AppOrder, { shortId }, { populate: ['appOrderItemCollection'] });
};

export const getOrderById = async (id: number): Promise<AppOrder> => {
	const em = getEm();
	return em.findOneOrFail(AppOrder, { id }, { populate: ['appOrderItemCollection'] });
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
