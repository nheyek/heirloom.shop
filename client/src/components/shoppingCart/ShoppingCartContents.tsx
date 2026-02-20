import { useShoppingCart } from '../../providers/ShoppingCartProvider';
import { ShoppingCartCard } from './ShoppingCartCard';

type Props = {
	onNavigate?: () => void;
};

export const ShoppingCartContents = (props: Props) => {
	const shoppingCart = useShoppingCart();

	return shoppingCart.items
		.sort((itemA, itemB) => itemB.addedAt - itemA.addedAt)
		.map((item) => (
			<ShoppingCartCard
				key={`${item.listingData.shopId}-${JSON.stringify(item.selectedOptions)}`}
				item={item}
				onNavigate={props.onNavigate}
			/>
		));
};
