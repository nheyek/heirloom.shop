import { CartListingData } from '@common/types/CartListingData';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { API_ROUTES } from '../../../common/constants';
import useApi from '../hooks/useApi';
import { usePersistedState } from '../hooks/usePersistedState';

export interface CartItem {
	listingId: string;
	quantity: number;
	listingData: CartListingData;
	selectedOptions: { [variationName: string]: string }; // variationName -> optionName
	addedAt: number;
}

export interface RemovedCartItem {
	listingData: CartListingData;
	selectedOptions: { [variationName: string]: string };
	reason: string;
}

interface CartContextType {
	cart: CartItem[];
	removedItems: RemovedCartItem[];
	isRefreshing: boolean;
	addToCart: (listingId: string, selectedOptions: { [variationName: string]: string }, listingData: CartListingData) => void;
	removeFromCart: (listingId: string, selectedOptions: { [variationName: string]: string }) => void;
	updateQuantity: (listingId: string, selectedOptions: { [variationName: string]: string }, quantity: number) => void;
	clearCart: () => void;
	clearRemovedItems: () => void;
	getCartItemKey: (listingId: string, selectedOptions: { [variationName: string]: string }) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getCartItemKey = (listingId: string, selectedOptions: { [variationName: string]: string }): string => {
	const optionsString = Object.keys(selectedOptions)
		.sort()
		.map(key => `${key}:${selectedOptions[key]}`)
		.join('|');
	return `${listingId}__${optionsString}`;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cart, setCart] = usePersistedState<CartItem[]>('shopping-cart', []);
	const [removedItems, setRemovedItems] = useState<RemovedCartItem[]>([]);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const { getPublicResource } = useApi();

	// Refresh cart data on mount
	useEffect(() => {
		const refreshCart = async () => {
			if (cart.length === 0) return;

			setIsRefreshing(true);

			try {
				// Get unique listing IDs
				const listingIds = [...new Set(cart.map(item => item.listingId))];

				// Fetch fresh listing data
				const { data, error } = await getPublicResource(
					`${API_ROUTES.cart.listings}?ids=${listingIds.join(',')}`
				);

				if (error || !data) {
					console.error('Error refreshing cart:', error);
					setIsRefreshing(false);
					return;
				}

				const freshListingsMap = new Map<string, CartListingData>();
				data.forEach((listing: CartListingData) => {
					freshListingsMap.set(listing.shortId, listing);
				});

				const validatedCart: CartItem[] = [];
				const removed: RemovedCartItem[] = [];

				// Validate each cart item
				cart.forEach(item => {
					const freshListing = freshListingsMap.get(item.listingId);

					if (!freshListing) {
						// Listing no longer exists
						removed.push({
							listingData: item.listingData,
							selectedOptions: item.selectedOptions,
							reason: 'This item is no longer available',
						});
						return;
					}

					// Validate selected options
					const isValid = validateSelectedOptions(item.selectedOptions, freshListing.variations);

					if (!isValid) {
						// Options are no longer valid
						removed.push({
							listingData: freshListing,
							selectedOptions: item.selectedOptions,
							reason: 'Selected options are no longer available',
						});
						return;
					}

					// Item is valid - update with fresh data
					validatedCart.push({
						...item,
						listingData: freshListing,
					});
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
	}, []); // Only run on mount

	const validateSelectedOptions = (
		selectedOptions: { [variationName: string]: string },
		variations: CartListingData['variations']
	): boolean => {
		// Check if all selected variations still exist
		for (const [variationName, optionName] of Object.entries(selectedOptions)) {
			const variation = variations.find(v => v.name === variationName);

			if (!variation) {
				// Variation no longer exists
				return false;
			}

			const option = variation.options.find(o => o.name === optionName);

			if (!option) {
				// Option no longer exists
				return false;
			}
		}

		return true;
	};

	const addToCart = (
		listingId: string,
		selectedOptions: { [variationName: string]: string },
		listingData: CartListingData
	) => {
		setCart(prev => {
			const key = getCartItemKey(listingId, selectedOptions);
			const existing = prev.find(item => getCartItemKey(item.listingId, item.selectedOptions) === key);

			if (existing) {
				// Increment quantity if already in cart
				return prev.map(item =>
					getCartItemKey(item.listingId, item.selectedOptions) === key
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}

			// Add new item
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

	const removeFromCart = (listingId: string, selectedOptions: { [variationName: string]: string }) => {
		const key = getCartItemKey(listingId, selectedOptions);
		setCart(prev => prev.filter(item => getCartItemKey(item.listingId, item.selectedOptions) !== key));
	};

	const updateQuantity = (
		listingId: string,
		selectedOptions: { [variationName: string]: string },
		quantity: number
	) => {
		if (quantity <= 0) {
			removeFromCart(listingId, selectedOptions);
			return;
		}

		const key = getCartItemKey(listingId, selectedOptions);
		setCart(prev =>
			prev.map(item =>
				getCartItemKey(item.listingId, item.selectedOptions) === key
					? { ...item, quantity }
					: item
			)
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
