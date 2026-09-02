import { deriveOrderStatus } from '@heirloom/common/domain/order';
import {
	OrderItemDisplayData,
	OrderResponse,
	Shipment,
} from '@heirloom/common/contract';
import { AppOrder } from '@server/entities/generated/AppOrder';
import { getOrderTimeline } from '@server/services/order.service';

export const mapOrderToApiResponseData = (
	order: AppOrder,
): OrderResponse => {
	const timeline = getOrderTimeline(order);
	return {
		shortId: order.shortId,
		createdAt: order.createdAt.toISOString(),
		orderStatus: deriveOrderStatus(timeline),
		shippingAddress: order.shippingAddress,
		items: order.appOrderItemCollection
			.getItems()
			.map((item) => item.snapshot as OrderItemDisplayData),
		subtotalCents: order.subtotal,
		shippingCents: order.shippingPrice,
		taxCents: order.taxTotal,
		timeline,
		paymentDetails: order.paymentDetails ?? null,
		shipments: (Array.isArray(order.shipments)
			? order.shipments
			: []) as Shipment[],
	};
};
