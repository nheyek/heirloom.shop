import { OrderStatus } from '@heirloom/common/constants';
import {
	OrderItemDisplayData,
	OrderTimelineEntry,
	PaymentDetails,
	Shipment,
	ShippingAddress,
} from '@heirloom/common/contract';
import { getEm } from '@server/db';
import { AppOrder } from '@server/entities/generated/AppOrder';
import { AppOrderItem } from '@server/entities/generated/AppOrderItem';
import { AppUser } from '@server/entities/generated/AppUser';
import { encodeShortId, ShortIdEntityType } from '@server/utils/hashids';
import { randomBytes } from 'crypto';

export const createOrder = async (
	snapshots: OrderItemDisplayData[],
	shippingAddress: ShippingAddress,
	subtotalCents: number,
	shippingCents: number,
	taxTotalCents: number,
	email: string,
	user?: AppUser,
): Promise<AppOrder> => {
	const em = getEm();

	const [{ nextval }] = await em
		.getConnection()
		.execute("SELECT nextval('app_order_id_seq')");
	const nextId = Number(nextval);

	const order = em.create(AppOrder, {
		id: nextId,
		shortId: encodeShortId(nextId, ShortIdEntityType.Order),
		accessKey: randomBytes(16).toString('hex'),
		shippingAddress,
		subtotal: subtotalCents,
		shippingPrice: shippingCents,
		taxTotal: taxTotalCents,
		orderStatus: OrderStatus.PENDING,
		timeline: [],
		shipments: [],
		email,
		...(user && { user }),
	});
	await em.persist(order).flush();

	for (const snapshot of snapshots) {
		em.persist(
			em.create(AppOrderItem, {
				order,
				snapshot,
				fulfillment: {},
			}),
		);
	}
	await em.flush();

	return order;
};

export const updateOrderStatus = async (
	orderId: number,
	status: OrderStatus,
	info: string = '',
): Promise<void> => {
	const em = getEm();
	const order = await em.findOneOrFail(AppOrder, { id: orderId });
	order.orderStatus = status;
	const timeline = (
		Array.isArray(order.timeline) ? order.timeline : []
	) as OrderTimelineEntry[];
	order.timeline = [
		...timeline,
		{ status, timestamp: new Date().toISOString(), info },
	];
	await em.flush();
};

export const getOrderStatus = async (
	shortId: string,
): Promise<OrderStatus> => {
	const em = getEm();
	const order = await em.findOneOrFail(AppOrder, { shortId });
	return order.orderStatus as OrderStatus;
};

export const getOrderByShortId = async (
	shortId: string,
): Promise<AppOrder> => {
	const em = getEm();
	return em.findOneOrFail(
		AppOrder,
		{ shortId },
		{ populate: ['appOrderItemCollection', 'user'] },
	);
};

export const getOrderById = async (id: number): Promise<AppOrder> => {
	const em = getEm();
	return em.findOneOrFail(
		AppOrder,
		{ id },
		{ populate: ['appOrderItemCollection'] },
	);
};

export const getOrders = async (
	userId: number | null,
): Promise<AppOrder[]> => {
	const em = getEm();
	return em.find(
		AppOrder,
		{
			...(userId !== null && { user: { id: userId } }),
			orderStatus: { $ne: OrderStatus.PENDING },
		},
		{
			populate: ['appOrderItemCollection'],
			orderBy: { createdAt: 'DESC' },
		},
	);
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

export const updateOrderPaymentDetails = async (
	orderId: number,
	paymentDetails: PaymentDetails,
): Promise<void> => {
	const em = getEm();
	const order = await em.findOneOrFail(AppOrder, { id: orderId });
	order.paymentDetails = paymentDetails;
	await em.flush();
};

export const updateOrderShipments = async (
	orderId: number,
	shipments: Shipment[],
): Promise<void> => {
	const em = getEm();
	const order = await em.findOneOrFail(AppOrder, { id: orderId });
	order.shipments = shipments;
	await em.flush();
};
