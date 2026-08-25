import { ShippingAddress } from '@heirloom/common/contract';
import { ShoppingCartItem } from '@client/domain/shoppingCart';

export type ShippingAddressErrors = { [K in keyof ShippingAddress]?: string };
import { isValidEmail } from '@heirloom/common/utils/validationUtils';
import { isValidUsState } from '@heirloom/common/validation/shippingAddress';

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
	} else if (!isValidUsState(shippingAddress.state)) {
		errors.state =
			'We can only ship to the contiguous US states and DC.';
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
		personalizationText: item.personalizationText,
	}));
