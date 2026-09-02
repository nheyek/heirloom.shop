import {
	OrderItemDisplayData,
	PaymentDetails,
	ShippingAddress,
} from '@heirloom/common/contract';
import { formatPaymentDetails } from '@heirloom/common/utils/paymentDisplay';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { formatShippingAddress } from '@heirloom/common/utils/shippingAddress';

export const APP_URL =
	process.env.NODE_ENV === 'development'
		? 'https://heirloom.test:8080'
		: 'https://dev.heirloom.shop';

const formatItem = (item: OrderItemDisplayData) => {
	const details = [
		...item.variations.map((v) => `${v.name}: ${v.value}`),
		...(item.personalizationText
			? [
					`${item.personalizationName ?? 'Personalization'}: ${item.personalizationText}`,
				]
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

export const formatOrderDetails = (params: {
	shippingAddress: ShippingAddress;
	items: OrderItemDisplayData[];
	subtotalCents: number;
	shippingCents: number;
	taxCents: number;
	paymentDetails: PaymentDetails | null;
}) => {
	const totalCents =
		params.subtotalCents + params.shippingCents + params.taxCents;

	return `${params.items.map(formatItem).join('\n\n')}

Subtotal: ${formatCentsAsDollars(params.subtotalCents)}
Shipping: ${formatCentsAsDollars(params.shippingCents)}
Tax: ${formatCentsAsDollars(params.taxCents)}
Total: ${formatCentsAsDollars(totalCents)}
${params.paymentDetails ? `Payment method: ${formatPaymentDetails(params.paymentDetails)}\n` : ''}
Shipping to:
${formatShippingAddress(params.shippingAddress)}`;
};
