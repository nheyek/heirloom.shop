import { CartItemData, CheckoutItemData, ShippingAddress } from '@common/contract';
import { ShippingAddressErrors } from '@common/types/ShippingAddress';
import { ShoppingCartItem } from '@common/types/ShoppingCartItem';
import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { StorageKey } from '@client/constants';
import {
	getEmailFieldError,
	getShippingAddressFieldErrors,
	simplifyCartItems,
} from '@client/domain/checkout';
import { calculateItemPrice } from '@client/domain/shoppingCart';
import { useApiClient } from '@client/hooks/useApiClient';
import { usePersistedState } from '@client/hooks/usePersistedState';
import { callApi } from '@client/utils/apiUtils';
import { validateDeliverableAddress } from '@client/utils/googleMapsUtils';

type PersistedCartItem = CheckoutItemData & { addedAt: number };

type ShoppingCartContext = {
	isDrawerOpen: boolean;
	items: ShoppingCartItem[];
	cartLoading: boolean;
	pendingItemCount: number;
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
		listing: CartItemData,
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
	const [persistedItems, setPersistedItems] = usePersistedState<PersistedCartItem[]>(
		StorageKey.SHOPPING_CART,
		[],
	);
	const [items, setItems] = useState<ShoppingCartItem[]>([]);
	const [cartLoading, setCartLoading] = useState(false);
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

	// Hydrate full cart items from server on mount
	useEffect(() => {
		if (persistedItems.length === 0) return;

		setCartLoading(true);

		callApi(
			apiClient.listings.getCartData({
				body: { items: persistedItems.map(({ addedAt: _, ...rest }) => rest) },
			}),
		).then((result) => {
			if (result.error !== null) {
				setCartLoading(false);
				return;
			}

			const cartData = result.data;
			const hydrated: ShoppingCartItem[] = persistedItems
				.map((persisted) => {
					const listingData = cartData.find(
						(d) => d.shortId === persisted.listingShortId,
					);
					if (!listingData) return null;
					return {
						listingData,
						selectedOptions: persisted.selectedOptions,
						quantity: persisted.quantity,
						addedAt: persisted.addedAt,
					};
				})
				.filter((item) => item !== null);

			// Remove any persisted items whose listing was not found
			const foundShortIds = new Set(cartData.map((d) => d.shortId));
			setPersistedItems((prev) =>
				prev.filter((p) => foundShortIds.has(p.listingShortId)),
			);

			setItems(hydrated);
			setCartLoading(false);
		});
	}, []);

	useEffect(() => {
		if (taxDebounceRef.current)
			clearTimeout(taxDebounceRef.current);
		taxDebounceRef.current = setTimeout(calculateTax, 300);
		return () => clearTimeout(taxDebounceRef.current);
	}, [shippingAddress]);

	const itemQuantityTotal = persistedItems.reduce(
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
		listingData: CartItemData,
		selectedOptions: { [variationId: number]: number },
	) => {
		const itemKey = getItemKey(listingData.shortId, selectedOptions);

		setPersistedItems((prev) => {
			const existing = prev.find(
				(item) =>
					getItemKey(item.listingShortId, item.selectedOptions) ===
					itemKey,
			);
			if (existing) {
				return prev.map((item) =>
					getItemKey(item.listingShortId, item.selectedOptions) ===
					itemKey
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}
			return [
				...prev,
				{
					listingShortId: listingData.shortId,
					selectedOptions,
					quantity: 1,
					addedAt: Date.now(),
				},
			];
		});

		setItems((prev) => {
			const existing = prev.find(
				(item) =>
					getItemKey(
						item.listingData.shortId,
						item.selectedOptions,
					) === itemKey,
			);
			if (existing) {
				return prev.map((item) =>
					getItemKey(
						item.listingData.shortId,
						item.selectedOptions,
					) === itemKey
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}
			return [
				...prev,
				{
					listingData,
					selectedOptions,
					quantity: 1,
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
		setPersistedItems((prev) =>
			prev.filter(
				(item) =>
					getItemKey(item.listingShortId, item.selectedOptions) !==
					itemKey,
			),
		);
		setItems((prev) =>
			prev.filter(
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
		if (quantity === 0) {
			removeFromCart(listingId, selectedOptions);
			return;
		}

		const itemKey = getItemKey(listingId, selectedOptions);

		setPersistedItems((prev) =>
			prev.map((item) =>
				getItemKey(item.listingShortId, item.selectedOptions) ===
				itemKey
					? { ...item, quantity }
					: item,
			),
		);
		setItems((prev) =>
			prev.map((item) =>
				getItemKey(
					item.listingData.shortId,
					item.selectedOptions,
				) === itemKey
					? { ...item, quantity }
					: item,
			),
		);
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
						items: simplifyCartItems(items),
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
				cartLoading,
				pendingItemCount: persistedItems.length,
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
				clearCart: () => {
					setPersistedItems([]);
					setItems([]);
				},
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
