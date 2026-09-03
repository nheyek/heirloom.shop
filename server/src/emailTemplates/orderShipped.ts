import { Shipment } from '@heirloom/common/contract';
import { getShipmentTrackingUrl } from '@heirloom/common/utils/shippingTracking';
import { APP_URL } from '@server/emailTemplates/orderDetails';

const formatShipment = (shipment: Shipment) =>
	`${shipment.provider}: ${shipment.tracking}
${getShipmentTrackingUrl(shipment)}`;

export const orderShipped = (params: {
	name?: string;
	orderId: string;
	accessKey: string;
	shipments: Shipment[];
}) => {
	const orderUrl = `${APP_URL}/order/${params.orderId}?key=${params.accessKey}`;

	return `Dear ${params.name || 'Customer'},

Your order (#${params.orderId}) from Heirloom is on its way!

${params.shipments.map(formatShipment).join('\n\n')}

View your order here: ${orderUrl}

Sincerely,
The Heirloom Team

P.S. You may reply to this email with any questions or concerns.`;
};
