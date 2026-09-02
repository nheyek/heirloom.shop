import {
	OrderItemDisplayData,
	PaymentDetails,
	ShippingAddress,
} from '@heirloom/common/contract';
import {
	APP_URL,
	formatOrderDetails,
} from '@server/emailTemplates/orderDetails';

export const adminOrderConfirmation = (params: {
	orderId: string;
	shippingAddress: ShippingAddress;
	items: OrderItemDisplayData[];
	subtotalCents: number;
	shippingCents: number;
	taxCents: number;
	paymentDetails: PaymentDetails | null;
}) => {
	const orderUrl = `${APP_URL}/admin/orders/${params.orderId}`;

	return `A new order has been confirmed (${params.orderId}):

${formatOrderDetails(params)}

View in admin: ${orderUrl}`;
};
