import {
	OrderItemDisplayData,
	PaymentDetails,
	ShippingAddress,
} from '@heirloom/common/contract';
import {
	APP_URL,
	formatOrderDetails,
} from '@server/emailTemplates/orderDetails';

export const newOrderAlert = (params: {
	orderId: string;
	customerEmail: string;
	shippingAddress: ShippingAddress;
	items: OrderItemDisplayData[];
	subtotalCents: number;
	shippingCents: number;
	taxCents: number;
	paymentDetails: PaymentDetails | null;
}) => {
	const orderUrl = `${APP_URL}/admin/orders/${params.orderId}`;

	return `${formatOrderDetails(params)}

Customer email: ${params.customerEmail}

View: ${orderUrl}`;
};
