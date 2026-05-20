import { ShippingAddress } from '@heirloom/common/contract';
import { ShippingAddressErrors } from '@heirloom/common/types/ShippingAddressErrors';
import { ShoppingCartItem } from '@heirloom/common/types/ShoppingCartItemData';
import { isValidEmail } from '@client/utils/validationUtils';

export const getEmailFieldError = (email: string): string | null => {
	if (!email.trim()) return 'Email is required.';
	if (!isValidEmail(email)) return 'Email format is invalid.';
	return null;
};

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


export const simplifyCartItems = (items: ShoppingCartItem[]) =>
	items.map((item) => ({
		listingShortId: item.listingData.shortId,
		selectedOptions: item.selectedOptions,
		quantity: item.quantity,
	}));
