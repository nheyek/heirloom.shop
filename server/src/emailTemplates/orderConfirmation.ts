import { OrderItemSnapshot } from '@common/types/OrderItemSnapshot';
import { formatCentsAsDollars } from '@common/utils/priceDisplay';

const formatItem = (item: OrderItemSnapshot) => {
	const quantityPrefix = item.quantity > 1 ? `${item.quantity}x ` : '';
	const variations =
		item.variations.length > 0
			? ` (${item.variations.map((v) => `${v.name}: ${v.value}`).join(', ')})`
			: '';
	const lines = [
		`${quantityPrefix}${item.title}${variations}`,
		item.shopName,
		formatCentsAsDollars(item.unitPriceCents),
	];
	if (item.estimatedDelivery) {
		lines.push(`Estimated delivery: ${item.estimatedDelivery}`);
	}
	return lines.join('\n');
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

We will let you know when each item has shipped.

Sincerely,
The Heirloom Team

P.S. You may reply to this email with any questions or concerns.`;
};
