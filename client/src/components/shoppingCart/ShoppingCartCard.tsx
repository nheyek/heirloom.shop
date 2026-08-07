import {
	CardRootProps,
	Group,
	IconButton,
	Text,
} from '@chakra-ui/react';
import { OrderItemCard } from '@client/components/itemDisplay/OrderItemCard';
import { Layout } from '@client/constants';
import {
	getOrderItemDisplayData,
	ShoppingCartItem,
} from '@client/domain/shoppingCart';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { FaTrashAlt } from 'react-icons/fa';
import { TiMinus, TiPlus } from 'react-icons/ti';

type Props = {
	item: ShoppingCartItem;
	onNavigate?: () => void;
	cardProps?: CardRootProps;
	layout?: Layout;
};

export const ShoppingCartCard = (props: Props) => {
	const shoppingCart = useShoppingCart();
	const displayData = getOrderItemDisplayData(props.item);
	const isStandard = props.layout === Layout.STANDARD;

	const deleteButton = (
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
					props.item.personalizationText,
				)
			}
			cursor="button"
		>
			<FaTrashAlt />
		</IconButton>
	);

	const quantityControl = (
		<Group
			p={0.5}
			gap={1}
			attached
			bg="gray.100"
			borderRadius="full"
			position="absolute"
			bottom={3}
			left={isStandard ? undefined : 3}
			right={isStandard ? 3 : undefined}
		>
			<IconButton
				size="xs"
				variant="ghost"
				onClick={() =>
					shoppingCart.updateQuantity(
						props.item.listingData.shortId,
						props.item.selectedOptions,
						props.item.quantity - 1,
						props.item.personalizationText,
					)
				}
			>
				<TiMinus />
			</IconButton>
			<Text
				textAlign="center"
				minWidth={5}
				fontSize={20}
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
						props.item.personalizationText,
					)
				}
			>
				<TiPlus />
			</IconButton>
		</Group>
	);

	return (
		<OrderItemCard
			item={displayData}
			cardProps={props.cardProps}
			layout={props.layout}
			imageActionElements={
				isStandard ? undefined : (
					<>
						{deleteButton}
						{quantityControl}
					</>
				)
			}
			bodyActionElements={
				isStandard ? (
					<>
						{deleteButton}
						{quantityControl}
					</>
				) : undefined
			}
		/>
	);
};
