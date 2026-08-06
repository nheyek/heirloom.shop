import {
	CardRootProps,
	Group,
	HStack,
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
			{...(!isStandard && {
				position: 'absolute' as const,
				top: 3,
				right: 3,
			})}
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
			{...(!isStandard && {
				position: 'absolute' as const,
				bottom: 3,
				right: 3,
			})}
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
			actionElements={
				isStandard ? (
					<HStack
						justifyContent="space-between"
						width="100%"
					>
						{quantityControl}
						{deleteButton}
					</HStack>
				) : (
					<>
						{deleteButton}
						{quantityControl}
					</>
				)
			}
		/>
	);
};
