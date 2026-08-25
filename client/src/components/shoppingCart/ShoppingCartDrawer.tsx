import {
	Button,
	Drawer,
	HStack,
	Icon,
	IconButton,
	Skeleton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { ORDER_ITEM_THUMBNAIL_WIDTH } from '@client/components/itemDisplay/OrderItemCard';
import { ApplePayButton } from '@client/components/shoppingCart/ApplePayButton';
import { ShoppingCartCard } from '@client/components/shoppingCart/ShoppingCartCard';
import { ShoppingCartEmptyMessage } from '@client/components/shoppingCart/ShoppingCartEmptyMessage';
import { CLIENT_ROUTES } from '@client/constants';
import { useApplePayCheckout } from '@client/hooks/useApplePayCheckout';
import { useOrderItemCardLayout } from '@client/hooks/useOrderItemCardLayout';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { displayFontFamily } from '@client/theme';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { FaArrowCircleRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const ShoppingCartDrawer = (props: Props) => {
	const shoppingCart = useShoppingCart();
	const navigate = useNavigate();
	const { layout, isCompact, cardProps } = useOrderItemCardLayout(
		shoppingCart.items.length,
	);
	const applePay = useApplePayCheckout(props.onClose);

	const skeletonProps = isCompact
		? { flexShrink: 0, height: 340, width: 300 }
		: {
				flexShrink: 0,
				height: ORDER_ITEM_THUMBNAIL_WIDTH,
				width: '100%',
			};

	const isEmpty =
		!shoppingCart.cartLoading &&
		shoppingCart.itemQuantityTotal === 0;

	const items = shoppingCart.cartLoading
		? Array.from({ length: shoppingCart.pendingItemCount }).map(
				(_, i) => (
					<Skeleton
						key={i}
						borderRadius="md"
						{...skeletonProps}
					/>
				),
			)
		: shoppingCart.items
				.sort((itemA, itemB) => itemB.addedAt - itemA.addedAt)
				.map((item) => (
					<ShoppingCartCard
						key={`${item.listingData.id}-${JSON.stringify(item.selectedOptions)}`}
						item={item}
						onNavigate={props.onClose}
						layout={layout}
						cardProps={cardProps}
					/>
				));

	const listSection = isEmpty ? (
		<ShoppingCartEmptyMessage onClick={props.onClose} />
	) : isCompact ? (
		<HStack
			gap={5}
			overflowX="scroll"
			mx={-6}
			my={-5}
			px={6}
			py={5}
			alignItems="flex-start"
		>
			{items}
		</HStack>
	) : (
		<Stack gap={5}>{items}</Stack>
	);

	return (
		<Drawer.Root
			open={props.isOpen}
			onOpenChange={(e) => !e.open && props.onClose()}
			placement="end"
			size={shoppingCart.items.length > 0 ? 'lg' : 'sm'}
		>
			<Drawer.Backdrop />
			<Drawer.Positioner>
				<Drawer.Content>
					<Drawer.Header p={5}>
						<Drawer.Title
							fontSize={32}
							fontWeight={500}
							fontFamily={displayFontFamily}
						>
							Shopping Cart
						</Drawer.Title>
						<Drawer.CloseTrigger asChild>
							<IconButton
								variant="ghost"
								w={10}
								h={10}
							>
								<Icon
									h={7}
									w={7}
								>
									<MdClose />
								</Icon>
							</IconButton>
						</Drawer.CloseTrigger>
					</Drawer.Header>

					<Drawer.Body pb={5}>
						<Stack
							minH="100%"
							justifyContent={
								shoppingCart.items.length > 0
									? 'space-between'
									: 'center'
							}
							gap={5}
						>
							{listSection}

							{shoppingCart.items.length > 0 && (
								<Stack gap={1}>
									<HStack
										fontFamily={displayFontFamily}
									>
										<Text
											fontSize={24}

											paddingBottom={1}
										>
											Item total:
										</Text>
										<Text
											fontSize={28}
											fontWeight={600}
											paddingBottom={1}
										>
											{formatCentsAsDollars(
												shoppingCart.itemPriceTotal,
											)}
										</Text>
									</HStack>

									<HStack h={50}>
										{applePay.available &&
											applePay.paymentRequest && (
												<ApplePayButton
													paymentRequest={
														applePay.paymentRequest
													}
													pending={
														applePay.pending
													}
												/>
											)}
										<Button
											h="100%"
											fontSize={26}
											flex={1}
											onClick={() => {
												navigate(
													CLIENT_ROUTES.checkout,
												);
												props.onClose();
											}}
											alignSelf="flex-end"
										>
											Checkout
											<FaArrowCircleRight />
										</Button>
									</HStack>
								</Stack>
							)}
						</Stack>
					</Drawer.Body>
				</Drawer.Content>
			</Drawer.Positioner>
		</Drawer.Root>
	);
};
