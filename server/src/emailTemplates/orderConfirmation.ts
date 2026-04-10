import { OrderItemSnapshot } from '@common/types/OrderItemSnapshot';
import { formatCentsAsDollars } from '@common/utils/priceDisplay';

const formatItem = (item: OrderItemSnapshot) => {
	const quantity = item.quantity > 1 ? `${item.quantity}x ` : '';
	const variations =
		item.variations.length > 0
			? ` (${item.variations.map((v) => `${v.name}: ${v.value}`).join(', ')})`
			: '';
	return [
		`${quantity}${item.title}${variations}`,
		item.shopName,
		formatCentsAsDollars(item.unitPriceCents),
	].join('\n');
};

const APP_URL = process.env.APP_URL || 'https://heirloom.shop';

export const orderConfirmation = (params: {
	name?: string;
	orderId: string;
	accessKey: string;
	items: OrderItemSnapshot[];
}) => {
	const orderUrl = `${APP_URL}/order/${params.orderId}?key=${params.accessKey}`;
	return `Dear ${params.name || 'Customer'},

We are writing to confirm your recent order (${params.orderId}) from Heirloom:

${params.items.map(formatItem).join('\n\n')}

View your order here: ${orderUrl}

We will let you know when your order has shipped.

Sincerely,
The Heirloom Team

P.S. You may reply to this email with any questions or concerns.
`;
};
