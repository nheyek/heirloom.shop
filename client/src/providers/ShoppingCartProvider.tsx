import { ListingDataForCart } from '@common/types/ListingDataForCart';
import { ShoppingCartItem } from '@common/types/ShoppingCartItem';
import { createContext, useContext } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';

const BROWSER_STORAGE_KEY = 'shopping-cart';

type ShoppingCartContext = {
	items: ShoppingCartItem[];
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
};

export const ShoppingCartContext = createContext<
	ShoppingCartContext | undefined
>(undefined);

export const ShoppingCartProvider = (props: {
	children: React.ReactNode;
}) => {
	const [items, setItems] = usePersistedState<ShoppingCartItem[]>(
		BROWSER_STORAGE_KEY,
		[],
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

	return (
		<ShoppingCartContext.Provider
			value={{
				items,
				addToCart,
				removeFromCart,
				updateQuantity,
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
