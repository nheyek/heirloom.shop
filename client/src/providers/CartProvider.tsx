import { CartListingData } from '@common/types/CartListingData';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { API_ROUTES } from '../../../common/constants';
import useApi from '../hooks/useApi';
import { usePersistedState } from '../hooks/usePersistedState';

export interface CartItem {
	listingId: string;
	quantity: number;
	listingData: CartListingData;
	selectedOptions: { [variationId: number]: number }; // variationId -> optionId
	addedAt: number;
}

export interface RemovedCartItem {
	listingData: CartListingData;
	selectedOptions: { [variationId: number]: number };
	reason: string;
}

interface CartContextType {
	cart: CartItem[];
	cartCount: number;
	removedItems: RemovedCartItem[];
	isRefreshing: boolean;
	addToCart: (
		listingId: string,
		selectedOptions: { [variationId: number]: number },
		listingData: CartListingData,
	) => void;
	removeFromCart: (listingId: string, selectedOptions: { [variationId: number]: number }) => void;
	updateQuantity: (
		listingId: string,
		selectedOptions: { [variationId: number]: number },
		quantity: number,
	) => void;
	clearCart: () => void;
	clearRemovedItems: () => void;
	getCartItemKey: (
		listingId: string,
		selectedOptions: { [variationId: number]: number },
	) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getCartItemKey = (
	listingId: string,
	selectedOptions: { [variationId: number]: number },
): string => {
	const optionsString = Object.keys(selectedOptions)
		.sort((a, b) => Number(a) - Number(b))
		.map((varId) => `${varId}:${selectedOptions[Number(varId)]}`)
		.join('|');
	return `${listingId}__${optionsString}`;
};

const validateSelectedOptions = (
	selectedOptions: { [variationId: number]: number },
	variations: CartListingData['variations'],
): boolean => {
	for (const [variationId, optionId] of Object.entries(selectedOptions)) {
		const variation = variations.find((v) => v.id === Number(variationId));
		if (!variation) return false;

		const option = variation.options.find((o) => o.id === optionId);
		if (!option) return false;
	}
	return true;
};

const buildFreshListingsMap = (data: CartListingData[]): Map<string, CartListingData> => {
	const map = new Map<string, CartListingData>();
	data.forEach((listing) => {
		map.set(listing.shortId, listing);
	});
	return map;
};

const validateCartItem = (
	item: CartItem,
	freshListingsMap: Map<string, CartListingData>,
): { valid: boolean; updatedItem?: CartItem; removedItem?: RemovedCartItem } => {
	const freshListing = freshListingsMap.get(item.listingId);

	if (!freshListing) {
		return {
			valid: false,
			removedItem: {
				listingData: item.listingData,
				selectedOptions: item.selectedOptions,
				reason: 'This item is no longer available',
			},
		};
	}

	const optionsValid = validateSelectedOptions(item.selectedOptions, freshListing.variations);

	if (!optionsValid) {
		return {
			valid: false,
			removedItem: {
				listingData: freshListing,
				selectedOptions: item.selectedOptions,
				reason: 'Selected options are no longer available',
			},
		};
	}

	return {
		valid: true,
		updatedItem: {
			...item,
			listingData: freshListing,
		},
	};
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cart, setCart] = usePersistedState<CartItem[]>('shopping-cart', []);
	const cartCount = cart.map((listing) => listing.quantity).reduce((sum, num) => sum + num, 0);
	const [removedItems, setRemovedItems] = useState<RemovedCartItem[]>([]);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const { getPublicResource } = useApi();

	useEffect(() => {
		if (cart.length === 0) return;

		const refreshCart = async () => {
			setIsRefreshing(true);

			try {
				const listingIds = [...new Set(cart.map((item) => item.listingId))];
				const { data, error } = await getPublicResource(
					`${API_ROUTES.cart.listings}?ids=${listingIds.join(',')}`,
				);

				if (error || !data) {
					console.error('Error refreshing cart:', error);
					return;
				}

				const freshListingsMap = buildFreshListingsMap(data);
				const validatedCart: CartItem[] = [];
				const removed: RemovedCartItem[] = [];

				cart.forEach((item) => {
					const result = validateCartItem(item, freshListingsMap);

					if (result.valid && result.updatedItem) {
						validatedCart.push(result.updatedItem);
					} else if (result.removedItem) {
						removed.push(result.removedItem);
					}
				});

				setCart(validatedCart);
				setRemovedItems(removed);
			} catch (error) {
				console.error('Error refreshing cart:', error);
			} finally {
				setIsRefreshing(false);
			}
		};

		refreshCart();
	}, []);

	const addToCart = (
		listingId: string,
		selectedOptions: { [variationId: number]: number },
		listingData: CartListingData,
	) => {
		setCart((prev) => {
			const key = getCartItemKey(listingId, selectedOptions);
			const existing = prev.find(
				(item) => getCartItemKey(item.listingId, item.selectedOptions) === key,
			);

			if (existing) {
				return prev.map((item) =>
					getCartItemKey(item.listingId, item.selectedOptions) === key
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}

			return [
				...prev,
				{
					listingId,
					quantity: 1,
					listingData,
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
		const key = getCartItemKey(listingId, selectedOptions);
		setCart((prev) =>
			prev.filter((item) => getCartItemKey(item.listingId, item.selectedOptions) !== key),
		);
	};

	const updateQuantity = (
		listingId: string,
		selectedOptions: { [variationId: number]: number },
		quantity: number,
	) => {
		if (quantity <= 0) {
			removeFromCart(listingId, selectedOptions);
			return;
		}

		const key = getCartItemKey(listingId, selectedOptions);
		setCart((prev) =>
			prev.map((item) =>
				getCartItemKey(item.listingId, item.selectedOptions) === key
					? { ...item, quantity }
					: item,
			),
		);
	};

	const clearCart = () => {
		setCart([]);
	};

	const clearRemovedItems = () => {
		setRemovedItems([]);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				cartCount,
				removedItems,
				isRefreshing,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				clearRemovedItems,
				getCartItemKey,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within CartProvider');
	}
	return context;
};
