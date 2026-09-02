import { OrderStatus } from '@heirloom/common/constants';
import {
	OrderItemDisplayData,
	OrderResponse,
	OrderTimelineEntry,
	Shipment,
} from '@heirloom/common/contract';
import { AppOrder } from '@server/entities/generated/AppOrder';

export const mapOrderToApiResponseData = (
	order: AppOrder,
): OrderResponse => ({
	shortId: order.shortId,
	createdAt: order.createdAt.toISOString(),
	orderStatus: order.orderStatus as OrderStatus,
	shippingAddress: order.shippingAddress,
	items: order.appOrderItemCollection
		.getItems()
		.map((item) => item.snapshot as OrderItemDisplayData),
	subtotalCents: order.subtotal,
	shippingCents: order.shippingPrice,
	taxCents: order.taxTotal,
	timeline: (Array.isArray(order.timeline)
		? order.timeline
		: []) as OrderTimelineEntry[],
	paymentDetails: order.paymentDetails ?? null,
	shipments: (Array.isArray(order.shipments)
		? order.shipments
		: []) as Shipment[],
});
