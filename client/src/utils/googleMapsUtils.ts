import { ShippingAddress } from '@common/contract';

type AddressComponent = {
	types: string[];
	longText?: string | null;
	shortText?: string | null;
};

export const extractAddressFields = (
	components: AddressComponent[],
): Partial<ShippingAddress> => {
	const fields: Partial<ShippingAddress> = {};

	let streetNumber = '';
	let route = '';

	for (const component of components) {
		const type = component.types[0];
		switch (type) {
			case 'street_number':
				streetNumber = component.shortText || '';
				break;
			case 'route':
				route = component.shortText || '';
				break;
			case 'locality':
				fields.city = component.shortText || '';
				break;
			case 'administrative_area_level_1':
				fields.state = component.shortText || '';
				break;
			case 'postal_code':
				fields.zip = component.shortText || '';
				break;
		}
	}

	if (streetNumber || route) {
		fields.line1 = `${streetNumber} ${route}`.trim();
	}

	return fields;
};

export const validateDeliverableAddress = async (
	address: ShippingAddress,
): Promise<boolean> => {
	const addressLines = [
		address.line1,
		address.line2,
		`${address.city}, ${address.state} ${address.zip}`,
	].filter(Boolean);

	const response = await fetch(
		`https://addressvalidation.googleapis.com/v1:validateAddress?key=${process.env.GOOGLE_MAPS_API_KEY}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				address: {
					regionCode: 'US',
					addressLines,
				},
			}),
		},
	);

	if (!response.ok) return false;

	const responseData = await response.json();
	const uspsData = responseData.result?.uspsData;

	return uspsData?.dpvConfirmation === 'Y';
};
