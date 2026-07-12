import {
	OrderItemDisplayData,
	ShippingAddress,
} from '@heirloom/common/contract';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { formatShippingAddress } from '@heirloom/common/utils/shippingAddress';

const formatItem = (item: OrderItemDisplayData) => {
	const details = [
		...item.variations.map((v) => `${v.name}: ${v.value}`),
		...(item.personalizationText
			? [`${item.personalizationName ?? 'Personalization'}: ${item.personalizationText}`]
			: []),
	];
	const detailsText = details.length > 0 ? ` (${details.join(', ')})` : '';
	const unitPrice = `${formatCentsAsDollars(item.unitPriceCents)}${item.quantity > 1 ? ` (${item.quantity})` : ''}`;
	const lines = [
		`${item.title}${detailsText}`,
		item.shopName,
		unitPrice,
	];
	if (item.estimatedDelivery) {
		lines.push(`Estimated delivery: ${item.estimatedDelivery}`);
	}
	return lines.join('\n');
};

const APP_URL =
	process.env.NODE_ENV === 'development'
		? 'https://heirloom.test:8080'
		: 'https://dev.heirloom.shop';

export const orderConfirmation = (params: {
	name?: string;
	orderId: string;
	accessKey: string;
	shippingAddress: ShippingAddress;
	items: OrderItemDisplayData[];
	subtotalCents: number;
	shippingCents: number;
	taxCents: number;
}) => {
	const orderUrl = `${APP_URL}/order/${params.orderId}?key=${params.accessKey}`;
	const totalCents =
		params.subtotalCents + params.shippingCents + params.taxCents;

	return `Dear ${params.name || 'Customer'},

We are writing to confirm your recent order (${params.orderId}) from Heirloom:

${params.items.map(formatItem).join('\n\n')}

Subtotal: ${formatCentsAsDollars(params.subtotalCents)}
Shipping: ${formatCentsAsDollars(params.shippingCents)}
Tax: ${formatCentsAsDollars(params.taxCents)}
Total: ${formatCentsAsDollars(totalCents)}

Shipping to:
${formatShippingAddress(params.shippingAddress)}

View your order here: ${orderUrl}

We will let you know when your order has shipped.

Sincerely,
The Heirloom Team

P.S. You may reply to this email with any questions or concerns.`;
};
