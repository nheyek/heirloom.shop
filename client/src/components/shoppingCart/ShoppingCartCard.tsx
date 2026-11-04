import {
	Box,
	CardRootProps,
	Group,
	IconButton,
	Text,
} from '@chakra-ui/react';
import { OrderItemCard } from '@client/components/cards/OrderItemCard';
import { Layout } from '@client/constants';
import {
	getOrderItemDisplayData,
	ShoppingCartItem,
} from '@client/domain/shoppingCart';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { FaMinus, FaPlus, FaTrashCan } from 'react-icons/fa6';

type Props = {
	item: ShoppingCartItem;
	onNavigate?: () => void;
	cardProps?: CardRootProps;
	layout?: Layout;
};

export const ShoppingCartCard = (props: Props) => {
	const shoppingCart = useShoppingCart();
	const displayData = getOrderItemDisplayData(props.item);
	const isStandard = props.layout === Layout.DESKTOP;

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
			<FaTrashCan />
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
			right={3}
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
				<FaMinus />
			</IconButton>
			<Text
				textAlign="center"
				minWidth={5}
				fontSize={21}
				fontWeight={600}
				mb={0.5}
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
				<FaPlus />
			</IconButton>
		</Group>
	);

	return isStandard ? (
		<Box position="relative">
			<OrderItemCard
				item={displayData}
				cardProps={props.cardProps}
				layout={props.layout}
			/>
			{deleteButton}
			{quantityControl}
		</Box>
	) : (
		<OrderItemCard
			item={displayData}
			cardProps={props.cardProps}
			layout={props.layout}
			imageOverlayElements={
				<>
					{deleteButton}
					{quantityControl}
				</>
			}
		/>
	);
};
