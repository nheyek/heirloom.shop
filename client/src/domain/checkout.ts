import {
	ShippingAddress,
	ShippingAddressErrors,
} from '../../../common/types/ShippingAddress';
import { ShoppingCartItem } from '../../../common/types/ShoppingCartItem';

export const getShippingAddressFieldErrors = (
	shippingAddress: ShippingAddress,
) => {
	const errors: ShippingAddressErrors = {};

	if (!shippingAddress.lastName.trim()) {
		errors.lastName = 'Last name is required.';
	}

	if (!shippingAddress.line1.trim()) {
		errors.line1 = 'Address is required.';
	}

	if (!shippingAddress.city) {
		errors.city = 'City is required.';
	}

	if (!shippingAddress.state.trim()) {
		errors.state = 'State is required.';
	}

	if (!shippingAddress.zip.trim()) {
		errors.zip = 'Zip code is required.';
	} else if (!/^\d{5}(-\d{4})?$/.test(shippingAddress.zip)) {
		errors.zip = 'Invalid zip code.';
	}

	return errors;
};

export const getEmailFieldError = (email: string) => {
	if (!email.trim()) {
		return 'Email is required.';
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return 'Email format is invalid.';
	}

	return null;
};

export const getSimpleCartItems = (items: ShoppingCartItem[]) =>
	items.map((item) => ({
		listingShortId: item.listingData.shortId,
		selectedOptions: item.selectedOptions,
		quantity: item.quantity,
	}));
