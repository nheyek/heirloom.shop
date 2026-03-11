import { ListingDataForCart } from '@common/types/ListingDataForCart';
import { ShippingAddress } from '@common/types/ShippingAddress';
import { ShoppingCartItem } from '@common/types/ShoppingCartItem';
import { createContext, useContext, useState } from 'react';
import { calculateItemPrice } from '../../../common/domain/ShoppingCart';
import { StorageKey } from '../constants';
import { usePersistedState } from '../hooks/usePersistedState';

type ShippingAddressErrors = {
	[K in keyof ShippingAddress]?: string;
};

type ShoppingCartContext = {
	isDrawerOpen: boolean;
	items: ShoppingCartItem[];
	itemQuantityTotal: number;
	itemPriceTotal: number;
	shippingTotal: number;
	shippingAddress: ShippingAddress;
	shippingAddressErrors: ShippingAddressErrors;
	addToCart: (
		listing: ListingDataForCart,
		selectedOptions: { [variationId: number]: number },
	) => void;
	removeFromCart: (
		listingId: string,
		selectedOptions: { [variationId: number]: number },
	) => void;
	updateQuantity: (
		listingId: string,
		selectedOptions: { [variationId: number]: number },
		quantity: number,
	) => void;
	setShippingAddress: (address: ShippingAddress) => void;
	validateShippingAddress: () => boolean;
	clearShippingAddressError: (key: keyof ShippingAddress) => void;
	openDrawer: () => void;
	closeDrawer: () => void;
};

export const ShoppingCartContext = createContext<
	ShoppingCartContext | undefined
>(undefined);

export const ShoppingCartProvider = (props: {
	children: React.ReactNode;
}) => {
	const [items, setItems] = usePersistedState<ShoppingCartItem[]>(
		StorageKey.SHOPPING_CART,
		[],
	);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [shippingAddress, setShippingAddress] =
		useState<ShippingAddress>({
			email: '',
			firstName: '',
			lastName: '',
			line1: '',
			line2: '',
			city: '',
			state: '',
			zip: '',
		});
	const [shippingAddressErrors, setShippingAddressErrors] =
		useState({});

	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

	const itemQuantityTotal = items.reduce(
		(sum, item) => sum + item.quantity,
		0,
	);

	const itemPriceTotal = items.reduce(
		(sum, item) => sum + calculateItemPrice(item) * item.quantity,
		0,
	);

	const shippingTotal = items.reduce(
		(sum, item) => sum + (item.listingData.shippingPrice || 0),
		0,
	);

	const addToCart = (
		listingData: ListingDataForCart,
		selectedOptions: { [variationId: number]: number },
	) => {
		setItems((prevCart) => {
			const itemKey = getItemKey(
				listingData.shortId,
				selectedOptions,
			);
			const existingItem = prevCart.find(
				(item) =>
					getItemKey(
						item.listingData.shortId,
						item.selectedOptions,
					) === itemKey,
			);

			if (existingItem) {
				return prevCart.map((item) =>
					getItemKey(
						item.listingData.shortId,
						item.selectedOptions,
					) === itemKey
						? {
								...item,
								quantity: item.quantity + 1,
							}
						: item,
				);
			}

			return [
				...prevCart,
				{
					listingData: listingData,
					quantity: 1,
					selectedOptions,
					addedAt: Date.now(),
				},
			];
		});
	};

	const removeFromCart = (
		listingId: string,
		selectedOptions: { [variationId: number]: number },
	) => {
		const itemKey = getItemKey(listingId, selectedOptions);
		setItems((prevCart) =>
			prevCart.filter(
				(item) =>
					getItemKey(
						item.listingData.shortId,
						item.selectedOptions,
					) !== itemKey,
			),
		);
	};

	const updateQuantity = (
		listingId: string,
		selectedOptions: { [variationId: number]: number },
		quantity: number,
	) => {
		const itemKey = getItemKey(listingId, selectedOptions);

		if (quantity === 0) {
			removeFromCart(listingId, selectedOptions);
		} else {
			setItems((prevCart) =>
				prevCart.map((item) =>
					getItemKey(
						item.listingData.shortId,
						item.selectedOptions,
					) === itemKey
						? { ...item, quantity }
						: item,
				),
			);
		}
	};

	const validateShippingAddress = () => {
		const errors: ShippingAddressErrors = {};

		if (!shippingAddress.email) {
			errors.email = 'Email is required.';
		} else if (
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingAddress.email)
		) {
			errors.email = 'Email format is invalid.';
		}

		if (!shippingAddress.lastName) {
			errors.lastName = 'Last name is required.';
		}

		if (!shippingAddress.line1) {
			errors.line1 = 'Address is required.';
		}

		if (!shippingAddress.city) {
			errors.city = 'City is required.';
		}

		if (!shippingAddress.state) {
			errors.state = 'State is required.';
		}

		if (!shippingAddress.zip) {
			errors.zip = 'Zip code is required.';
		}

		setShippingAddressErrors(errors);

		if (Object.values(errors).some(Boolean)) {
			return false;
		}

		return true;
	};

	const clearShippingAddressError = (
		key: keyof ShippingAddress,
	) => {
		setShippingAddressErrors({
			...shippingAddressErrors,
			[key]: null,
		});
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				isDrawerOpen,
				items,
				itemQuantityTotal,
				itemPriceTotal,
				shippingTotal,
				shippingAddress,
				shippingAddressErrors,
				addToCart,
				removeFromCart,
				updateQuantity,
				setShippingAddress,
				validateShippingAddress,
				clearShippingAddressError,
				openDrawer,
				closeDrawer,
			}}
		>
			{props.children}
		</ShoppingCartContext.Provider>
	);
};

export const useShoppingCart = () => {
	const context = useContext(ShoppingCartContext);
	if (!context) {
		throw new Error(
			'useShoppingCart must be used within ShoppingCartProvider',
		);
	}
	return context;
};

const getItemKey = (
	listingId: string,
	selectedOptions: { [variationId: number]: number },
): string => {
	const optionsString = Object.keys(selectedOptions)
		.sort((optionA, optionB) => Number(optionA) - Number(optionB))
		.map(
			(variationId) =>
				`${variationId}:${selectedOptions[Number(variationId)]}`,
		)
		.join('|');
	return `${listingId}__${optionsString}`;
};
