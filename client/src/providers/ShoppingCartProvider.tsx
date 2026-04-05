import { ListingDataForCart } from '@common/types/ListingDataForCart';
import { ShippingAddress } from '@common/contract';
import { ShippingAddressErrors } from '@common/types/ShippingAddress';
import { ShoppingCartItem } from '@common/types/ShoppingCartItem';
import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { StorageKey } from '../constants';
import {
	getEmailFieldError,
	getShippingAddressFieldErrors,
	getSimpleCartItems,
} from '../domain/checkout';
import { calculateItemPrice } from '../domain/shoppingCart';
import { useApiClient } from '../hooks/useApiClient';
import { usePersistedState } from '../hooks/usePersistedState';
import { callApi } from '../utils/apiUtils';
import { validateDeliverableAddress } from '../utils/googleMapsUtils';

type ShoppingCartContext = {
	isDrawerOpen: boolean;
	items: ShoppingCartItem[];
	itemQuantityTotal: number;
	itemPriceTotal: number;
	shippingTotal: number;
	taxTotal: number | null;
	taxCalcLoading: boolean;
	checkoutEmail: string;
	checkoutEmailError: string | null;
	shippingAddress: ShippingAddress;
	shippingAddressErrors: ShippingAddressErrors;
	shippingAddressUndeliverable: boolean;
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
	setCheckoutEmail: (email: string) => void;
	setShippingAddress: (address: ShippingAddress) => void;
	validateCheckoutFields: () => Promise<boolean>;
	clearShippingAddressError: (key: keyof ShippingAddress) => void;
	clearEmailError: () => void;
	clearCart: () => void;
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
	const [checkoutEmail, setCheckoutEmail] = useState('');
	const [checkoutEmailError, setCheckoutEmailError] = useState<
		string | null
	>(null);
	const [shippingAddress, _setShippingAddress] =
		useState<ShippingAddress>({
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
	const [
		shippingAddressUndeliverable,
		setShippingAddressUndeliverable,
	] = useState(false);

	const setShippingAddress = (address: ShippingAddress) => {
		_setShippingAddress(address);
		setShippingAddressUndeliverable(false);
	};
	const [taxCalcLoading, setTaxCalcLoading] =
		useState<boolean>(false);
	const [taxTotal, setTaxTotal] = useState<number | null>(null);

	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

	const taxDebounceRef =
		useRef<ReturnType<typeof setTimeout>>(undefined);

	const apiClient = useApiClient();

	useEffect(() => {
		if (taxDebounceRef.current)
			clearTimeout(taxDebounceRef.current);
		taxDebounceRef.current = setTimeout(calculateTax, 300);
		return () => clearTimeout(taxDebounceRef.current);
	}, [shippingAddress]);

	const itemQuantityTotal = items.reduce(
		(sum, item) => sum + item.quantity,
		0,
	);

	const itemPriceTotal = items.reduce(
		(sum, item) => sum + calculateItemPrice(item) * item.quantity,
		0,
	);

	const shippingTotal = items.reduce(
		(sum, item) =>
			sum +
			(item.listingData.shippingPrice || 0) * item.quantity,
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

	const validateCheckoutFields = async () => {
		const errors = getShippingAddressFieldErrors(shippingAddress);
		const emailError = getEmailFieldError(checkoutEmail);

		setShippingAddressErrors(errors);
		setCheckoutEmailError(emailError);

		if (emailError || Object.values(errors).some(Boolean)) {
			return false;
		}

		const isDeliverable =
			await validateDeliverableAddress(shippingAddress);

		if (!isDeliverable) {
			setShippingAddressUndeliverable(true);
			return false;
		}

		return true;
	};

	const calculateTax = async () => {
		setTaxTotal(null);
		const errors = getShippingAddressFieldErrors(shippingAddress);

		if (!Object.values(errors).some(Boolean)) {
			setTaxCalcLoading(true);

			const result = await callApi(
				apiClient.checkout.calculateTax({
					body: {
						items: getSimpleCartItems(items),
						shippingAddress,
					},
				}),
			);

			if (result.error !== null) {
				// TODO: Handle tax calculation error
			} else {
				setTaxTotal(result.data.TaxTotalCents);
			}

			setTaxCalcLoading(false);
		}
	};

	const clearShippingAddressError = (
		key: keyof ShippingAddress,
	) => {
		setShippingAddressErrors({
			...shippingAddressErrors,
			[key]: null,
		});
		setShippingAddressUndeliverable(false);
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				isDrawerOpen,
				items,
				itemQuantityTotal,
				itemPriceTotal,
				shippingTotal,
				taxTotal,
				taxCalcLoading,
				checkoutEmail,
				checkoutEmailError,
				shippingAddress,
				shippingAddressErrors,
				shippingAddressUndeliverable,
				addToCart,
				removeFromCart,
				updateQuantity,
				setCheckoutEmail,
				setShippingAddress,
				validateCheckoutFields,
				clearShippingAddressError,
				clearEmailError: () => setCheckoutEmailError(null),
				clearCart: () => setItems([]),
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
