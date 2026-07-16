import { StorageKey } from '@client/constants';
import {
	getEmailFieldError,
	getShippingAddressFieldErrors,
	ShippingAddressErrors,
	simplifyCartItems,
} from '@client/domain/checkout';
import {
	calculateItemPrice,
	isCartItemValid,
	ShoppingCartItem,
} from '@client/domain/shoppingCart';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { usePersistedState } from '@client/hooks/usePersistedState';
import { callApi } from '@client/utils/apiUtils';
import { validateDeliverableAddress } from '@client/utils/googleMapsUtils';
import {
	CartItemData,
	CheckoutItemData,
	ShippingAddress,
} from '@heirloom/common/contract';
import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

type PersistedCartItem = CheckoutItemData & {
	addedAt: number;
};

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
		selectedOptions: Record<string, string>,
		personalizationText?: string,
	) => void;
	removeFromCart: (
		listingId: string,
		selectedOptions: Record<string, string>,
		personalizationText?: string,
	) => void;
	updateQuantity: (
		listingId: string,
		selectedOptions: Record<string, string>,
		quantity: number,
		personalizationText?: string,
	) => void;
	setCheckoutEmail: (email: string) => void;
	setShippingAddress: (address: ShippingAddress) => void;
	// Synchronous, local-only checks (required fields, email format) — safe
	// to run before entering a loading state.
	validateLocalCheckoutFields: () => boolean;
	// Everything that requires a network round-trip (address deliverability).
	// Callers should already be in a loading state before calling this.
	validateAddressDeliverable: () => Promise<boolean>;
	hydrateCart: () => Promise<void>;
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
	// Source of truth for cart contents (what's in the cart, how many, which options)
	const [persistedItems, setPersistedItems] = usePersistedState<
		PersistedCartItem[]
	>(StorageKey.SHOPPING_CART, []);

	// Current listing data fetched from the server, keyed by shortId
	const [cartListingData, setCartListingData] = useState<
		Record<string, CartItemData>
	>({});

	const [rawCartLoading, setCartLoading] = useState(false);
	const cartLoading = useMinDuration(rawCartLoading);
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
	const [rawTaxCalcLoading, setTaxCalcLoading] =
		useState<boolean>(false);
	const taxCalcLoading = useMinDuration(rawTaxCalcLoading);
	const [taxTotal, setTaxTotal] = useState<number | null>(null);

	const taxDebounceRef = useRef<NodeJS.Timeout | null>(null);
	const apiClient = useApiClient();

	// Derive the full cart item list from the two sources — no duplication of
	// quantity / selectedOptions between them
	const items: ShoppingCartItem[] = persistedItems
		.map((p) => {
			const listingData = cartListingData[p.listingShortId];
			if (!listingData) return null;
			const item: ShoppingCartItem = {
				listingData,
				selectedOptions: p.selectedOptions,
				quantity: p.quantity,
				addedAt: p.addedAt,
			};
			if (p.personalizationText != null)
				item.personalizationText = p.personalizationText;
			return item;
		})
		.filter((item): item is ShoppingCartItem => item !== null);

	const itemQuantityTotal = persistedItems.reduce(
		(sum, item) => sum + item.quantity,
		0,
	);

	const itemPriceTotal = persistedItems.reduce((sum, p) => {
		const listingData = cartListingData[p.listingShortId];
		if (!listingData) return sum;
		return (
			sum +
			calculateItemPrice(
				listingData,
				p.selectedOptions,
				p.personalizationText ?? undefined,
			) *
				p.quantity
		);
	}, 0);

	const shippingTotal = persistedItems.reduce((sum, p) => {
		const listingData = cartListingData[p.listingShortId];
		if (!listingData) return sum;
		return sum + (listingData.shippingPrice || 0) * p.quantity;
	}, 0);

	const hydrateCart = async () => {
		if (persistedItems.length === 0) return;

		setCartLoading(true);

		const result = await callApi(
			apiClient.listings.getCartData({
				body: {
					items: persistedItems.map(
						({ addedAt: _, ...rest }) => rest,
					),
				},
			}),
		);

		if (result.error !== null) {
			setCartLoading(false);
			return;
		}

		const listingMap: Record<string, CartItemData> = {};
		for (const listing of result.data) {
			listingMap[listing.shortId] = listing;
		}
		setCartListingData(listingMap);

		setPersistedItems((prev) =>
			prev.filter((p) =>
				isCartItemValid(
					p.selectedOptions,
					listingMap[p.listingShortId],
					p.personalizationText,
				),
			),
		);

		setCartLoading(false);
	};

	useEffect(() => {
		hydrateCart();
	}, []);

	useEffect(() => {
		if (taxDebounceRef.current)
			clearTimeout(taxDebounceRef.current);
		taxDebounceRef.current = setTimeout(calculateTax, 300);
		return () => {
			taxDebounceRef.current &&
				clearTimeout(taxDebounceRef.current);
		};
	}, [shippingAddress]);

	const setShippingAddress = (address: ShippingAddress) => {
		_setShippingAddress(address);
		setShippingAddressUndeliverable(false);
	};

	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

	const addToCart = (
		listing: CartItemData,
		selectedOptions: Record<string, string>,
		personalizationText?: string,
	) => {
		const itemKey = getItemKey(
			listing.shortId,
			selectedOptions,
			personalizationText,
		);

		setPersistedItems((prev) => {
			const existing = prev.find(
				(item) =>
					getItemKey(
						item.listingShortId,
						item.selectedOptions,
						item.personalizationText,
					) === itemKey,
			);
			if (existing) {
				return prev.map((item) =>
					getItemKey(
						item.listingShortId,
						item.selectedOptions,
						item.personalizationText,
					) === itemKey
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}
			return [
				...prev,
				{
					listingShortId: listing.shortId,
					selectedOptions,
					quantity: 1,
					addedAt: Date.now(),
					personalizationText,
				},
			];
		});

		setCartListingData((prev) => ({
			...prev,
			[listing.shortId]: listing,
		}));
	};

	const removeFromCart = (
		listingId: string,
		selectedOptions: Record<string, string>,
		personalizationText?: string,
	) => {
		const itemKey = getItemKey(
			listingId,
			selectedOptions,
			personalizationText,
		);
		setPersistedItems((prev) =>
			prev.filter(
				(item) =>
					getItemKey(
						item.listingShortId,
						item.selectedOptions,
						item.personalizationText,
					) !== itemKey,
			),
		);
	};

	const updateQuantity = (
		listingId: string,
		selectedOptions: Record<string, string>,
		quantity: number,
		personalizationText?: string,
	) => {
		if (quantity === 0) {
			removeFromCart(
				listingId,
				selectedOptions,
				personalizationText,
			);
			return;
		}
		const itemKey = getItemKey(
			listingId,
			selectedOptions,
			personalizationText,
		);
		setPersistedItems((prev) =>
			prev.map((item) =>
				getItemKey(
					item.listingShortId,
					item.selectedOptions,
					item.personalizationText,
				) === itemKey
					? { ...item, quantity }
					: item,
			),
		);
	};

	const validateLocalCheckoutFields = () => {
		const errors = getShippingAddressFieldErrors(shippingAddress);
		const emailError = getEmailFieldError(checkoutEmail);

		setShippingAddressErrors(errors);
		setCheckoutEmailError(emailError);

		return !emailError && !Object.values(errors).some(Boolean);
	};

	const validateAddressDeliverable = async () => {
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
				validateLocalCheckoutFields,
				validateAddressDeliverable,
				hydrateCart,
				clearShippingAddressError,
				clearEmailError: () => setCheckoutEmailError(null),
				clearCart: () => {
					setPersistedItems([]);
					setCartListingData({});
					setTaxTotal(null);
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
	selectedOptions: Record<string, string>,
	personalizationText?: string | null,
): string => {
	const optionsString = Object.keys(selectedOptions)
		.sort()
		.map((variationId) => `${variationId}:${selectedOptions[variationId]}`)
		.join('|');
	// Distinct personalization text makes for a distinct line item — each is
	// effectively its own custom-made unit, so they shouldn't merge quantities.
	return `${listingId}__${optionsString}__${personalizationText ?? ''}`;
};
