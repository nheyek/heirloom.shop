import { AddressFields } from '../../../common/types/AddressFields';

type AddressComponent = {
	types: string[];
	longText?: string | null;
	shortText?: string | null;
};

export const extractAddressFields = (
	components: AddressComponent[],
): Partial<AddressFields> => {
	const fields: Partial<AddressFields> = {};

	let streetNumber = '';
	let route = '';

	for (const component of components) {
		const type = component.types[0];
		switch (type) {
			case 'street_number':
				streetNumber = component.longText || '';
				break;
			case 'route':
				route = component.longText || '';
				break;
			case 'locality':
				fields.city = component.longText || '';
				break;
			case 'administrative_area_level_1':
				fields.state = component.shortText || '';
				break;
			case 'postal_code':
				fields.zip = component.longText || '';
				break;
		}
	}

	if (streetNumber || route) {
		fields.address1 = `${streetNumber} ${route}`.trim();
	}

	return fields;
};
