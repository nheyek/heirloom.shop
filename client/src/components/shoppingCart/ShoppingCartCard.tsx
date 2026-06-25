import {
	CardRootProps,
	Group,
	IconButton,
	Text,
} from '@chakra-ui/react';
import { OrderItemCard } from '@client/components/itemDisplay/OrderItemCard';
import { getOrderItemDisplayData } from '@client/domain/shoppingCart';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { ShoppingCartItem } from '@client/domain/shoppingCart';
import { FaTrashAlt } from 'react-icons/fa';
import { TiMinus, TiPlus } from 'react-icons/ti';

type Props = {
	item: ShoppingCartItem;
	onNavigate?: () => void;
	cardProps?: CardRootProps;
};

export const ShoppingCartCard = (props: Props) => {
	const shoppingCart = useShoppingCart();
	const displayData = getOrderItemDisplayData(props.item);

	return (
		<OrderItemCard
			item={displayData}
			cardProps={props.cardProps}
			actionElements={
				<>
					<IconButton
						size="sm"
						variant="ghost"
						bg="gray.100"
						position="absolute"
						top={3}
						right={3}
						onClick={() =>
							shoppingCart.removeFromCart(
								props.item.listingData.shortId,
								props.item.selectedOptions,
							)
						}
						cursor="button"
					>
						<FaTrashAlt />
					</IconButton>
					<Group
						p={0.5}
						gap={1}
						attached
						position="absolute"
						bottom={3}
						right={3}
						bg="gray.100"
						borderRadius="full"
					>
						<IconButton
							size="xs"
							variant="ghost"
							onClick={() =>
								shoppingCart.updateQuantity(
									props.item.listingData.shortId,
									props.item.selectedOptions,
									props.item.quantity - 1,
								)
							}
						>
							<TiMinus />
						</IconButton>
						<Text
							textAlign="center"
							minWidth={5}
							fontSize={16}
							fontWeight={700}
						>
							{props.item.quantity}
						</Text>
						<IconButton
							size="xs"
							variant="ghost"
							onClick={() =>
								shoppingCart.updateQuantity(
									props.item.listingData.shortId,
									props.item.selectedOptions,
									props.item.quantity + 1,
								)
							}
						>
							<TiPlus />
						</IconButton>
					</Group>
				</>
			}
		/>
	);
};
