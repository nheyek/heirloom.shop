import { ListingDataForCart } from '@common/types/ListingDataForCart';
import { ShippingAddress } from '@common/types/ShippingAddress';
import { ShoppingCartItem } from '@common/types/ShoppingCartItem';
import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { API_ROUTES } from '../../../common/constants';
import { calculateItemPrice } from '../../../common/domain/ShoppingCart';
import { StorageKey } from '../constants';
import useApi from '../hooks/useApi';
import { usePersistedState } from '../hooks/usePersistedState';
import { validateDeliverableAddress } from '../utils/googleMapsUtils';

type ShippingAddressErrors = {
	[K in keyof ShippingAddress]?: string;
};

type ShoppingCartContext = {
	isDrawerOpen: boolean;
	items: ShoppingCartItem[];
	itemQuantityTotal: number;
	itemPriceTotal: number;
	shippingTotal: number;
	taxTotal: number | null;
	taxCalcLoading: boolean;
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
	setShippingAddress: (address: ShippingAddress) => void;
	validateShippingAddress: () => Promise<boolean>;
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
	const [
		shippingAddressUndeliverable,
		setShippingAddressUndeliverable,
	] = useState(false);
	const [taxCalcLoading, setTaxCalcLoading] =
		useState<boolean>(false);
	const [taxTotal, setTaxTotal] = useState<number | null>(null);

	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

	const taxDebounceRef =
		useRef<ReturnType<typeof setTimeout>>(undefined);

	const { postPublicResource } = useApi();

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

	const getShippingAddressFieldErrors = () => {
		const errors: ShippingAddressErrors = {};

		if (!shippingAddress.email.trim()) {
			errors.email = 'Email is required.';
		} else if (
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingAddress.email)
		) {
			errors.email = 'Email format is invalid.';
		}

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

	const validateShippingAddress = async () => {
		const errors = getShippingAddressFieldErrors();
		setShippingAddressErrors(errors);

		if (Object.values(errors).some(Boolean)) {
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
		const errors = getShippingAddressFieldErrors();
		if (!Object.values(errors).some(Boolean)) {
			setTaxCalcLoading(true);

			const taxCalculationResponse = await postPublicResource(
				`${API_ROUTES.tax.base}/${API_ROUTES.tax.calculate}`,
				{
					items: items.map((item) => ({
						listingShortId: item.listingData.shortId,
						selectedOptions: item.selectedOptions,
						quantity: item.quantity,
					})),
					shippingAddress,
				},
			);

			if (taxCalculationResponse.error) {
				// TODO: Handle tax calculation error
			} else {
				setTaxTotal(taxCalculationResponse.data);
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
				shippingAddress,
				shippingAddressErrors,
				shippingAddressUndeliverable,
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
