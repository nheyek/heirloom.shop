import { useShoppingCart } from '../../providers/ShoppingCartProvider';
import { ShoppingCartCard } from './ShoppingCartCard';

type Props = {
	onNavigate?: () => void;
};

export const ShoppingCartContents = (props: Props) => {
	const shoppingCart = useShoppingCart();

	return shoppingCart.items.map((item) => (
		<ShoppingCartCard
			key={`${item.listingData.shopId}-${JSON.stringify(item.selectedOptions)}`}
			item={item}
			minWidth={300}
			onNavigate={props.onNavigate}
			onUpdateQuantity={(quantity) =>
				shoppingCart.updateQuantity(
					item.listingData.shortId,
					item.selectedOptions,
					quantity,
				)
			}
			onRemove={() =>
				shoppingCart.removeFromCart(
					item.listingData.shortId,
					item.selectedOptions,
				)
			}
		/>
	));
};
