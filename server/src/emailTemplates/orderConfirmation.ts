import {
	OrderItemDisplayData,
	PaymentDetails,
	ShippingAddress,
} from '@heirloom/common/contract';
import {
	APP_URL,
	formatOrderDetails,
} from '@server/emailTemplates/orderDetails';

export const orderConfirmation = (params: {
	name?: string;
	orderId: string;
	accessKey: string;
	shippingAddress: ShippingAddress;
	items: OrderItemDisplayData[];
	subtotalCents: number;
	shippingCents: number;
	taxCents: number;
	paymentDetails: PaymentDetails | null;
}) => {
	const orderUrl = `${APP_URL}/order/${params.orderId}?key=${params.accessKey}`;

	return `Dear ${params.name || 'Customer'},

We are writing to confirm your recent order #${params.orderId} from Heirloom:

${formatOrderDetails(params)}

View your order here: ${orderUrl}

We will let you know when your order has shipped.

Sincerely,
The Heirloom Team

P.S. You may reply to this email with any questions or concerns.`;
};
