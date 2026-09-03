import { ShippingProvider } from '../constants.js';
import { Shipment } from '../contract.js';

const TRACKING_URL_BUILDERS: Record<
	ShippingProvider,
	(tracking: string) => string
> = {
	[ShippingProvider.UPS]: (tracking) =>
		`https://www.ups.com/track?tracknum=${encodeURIComponent(tracking)}`,
	[ShippingProvider.FEDEX]: (tracking) =>
		`https://www.fedex.com/apps/fedextrack/?tracknumbers=${encodeURIComponent(tracking)}`,
	[ShippingProvider.USPS]: (tracking) =>
		`https://tools.usps.com/go/TrackConfirmAction?tLabels=${encodeURIComponent(tracking)}`,
	[ShippingProvider.DHL]: (tracking) =>
		`https://www.dhl.com/us-en/home/tracking.html?tracking-id=${encodeURIComponent(tracking)}`,
};

export const getShipmentTrackingUrl = (shipment: Shipment): string =>
	TRACKING_URL_BUILDERS[shipment.provider](shipment.tracking);
