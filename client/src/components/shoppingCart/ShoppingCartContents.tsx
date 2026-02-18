import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { TbSquaresFilled } from 'react-icons/tb';
import { useShoppingCart } from '../../providers/ShoppingCartProvider';
import { ShoppingCartCard } from './ShoppingCartCard';

type Props = {
	truncated?: boolean;
	onNavigate?: () => void;
};

export const ShoppingCartContents = (props: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const shoppingCart = useShoppingCart();

	if (props.truncated && !isExpanded) {
		return (
			<Button
				size="xs"
				variant="outline"
				fontSize={18}
				gap={2}
				onClick={() => setIsExpanded(true)}
			>
				<TbSquaresFilled />
				show contents
			</Button>
		);
	}

	return shoppingCart.items.map((item) => (
		<ShoppingCartCard
			key={`${item.listingData.shopId}-${JSON.stringify(item.selectedOptions)}`}
			item={item}
			minWidth={props.truncated ? 300 : undefined}
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
