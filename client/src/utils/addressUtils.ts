import { ShippingAddress } from '../../../common/types/ShippingAddress';

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
