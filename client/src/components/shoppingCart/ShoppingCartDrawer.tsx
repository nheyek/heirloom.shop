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
import { STANDARD_THUMBNAIL_WIDTH } from '@client/components/itemDisplay/OrderItemCard';
import { ApplePayButton } from '@client/components/shoppingCart/ApplePayButton';
import { ShoppingCartCard } from '@client/components/shoppingCart/ShoppingCartCard';
import { ShoppingCartEmptyMessage } from '@client/components/shoppingCart/ShoppingCartEmptyMessage';
import { CLIENT_ROUTES } from '@client/constants';
import { useApplePayCheckout } from '@client/hooks/useApplePayCheckout';
import { useOrderItemCardLayout } from '@client/hooks/useOrderItemCardLayout';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { displayFontFamily } from '@client/theme';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { ReactNode } from 'react';
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
	// Called unconditionally (not just while the drawer is open) so Apple
	// Pay availability is detected in the background ahead of time instead
	// of the moment the drawer opens, and so a poll kicked off on payment
	// success isn't cancelled by the drawer (and this hook along with it)
	// unmounting when props.onClose() closes it.
	const applePay = useApplePayCheckout(props.onClose);

	const skeletonProps = isCompact
		? { flexShrink: 0, height: 340, width: 300 }
		: {
				flexShrink: 0,
				height: STANDARD_THUMBNAIL_WIDTH,
				width: '100%',
			};

	const renderCartContent = () => {
		if (shoppingCart.cartLoading) {
			return Array.from({
				length: shoppingCart.pendingItemCount,
			}).map((_, i) => (
				<Skeleton
					key={i}
					borderRadius="md"
					{...skeletonProps}
				/>
			));
		}

		if (shoppingCart.itemQuantityTotal === 0) {
			return (
				<ShoppingCartEmptyMessage onClick={props.onClose} />
			);
		}

		return shoppingCart.items
			.sort((itemA, itemB) => itemB.addedAt - itemA.addedAt)
			.map((item) => {
				const key = `${item.listingData.id}-${JSON.stringify(item.selectedOptions)}`;
				return (
					<ShoppingCartCard
						key={key}
						item={item}
						onNavigate={props.onClose}
						layout={layout}
						cardProps={cardProps}
					/>
				);
			});
	};

	const cartContent = renderCartContent();
	const isEmpty =
		!shoppingCart.cartLoading &&
		shoppingCart.itemQuantityTotal === 0;

	let listSection: ReactNode;
	if (isEmpty) {
		listSection = cartContent;
	} else if (isCompact) {
		listSection = (
			<HStack
				gap={5}
				overflowX="scroll"
				mx={-6}
				my={-5}
				px={6}
				py={5}
				alignItems="flex-start"
			>
				{cartContent}
			</HStack>
		);
	} else {
		listSection = <Stack gap={5}>{cartContent}</Stack>;
	}

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
								<Stack>
									<HStack
										fontFamily={displayFontFamily}
									>
										<Text
											fontSize={26}

											paddingBottom={1}
										>
											Item total:
										</Text>
										<Text
											fontSize={32}
											fontWeight={600}
											paddingBottom={1}
										>
											{formatCentsAsDollars(
												shoppingCart.itemPriceTotal,
											)}
										</Text>
									</HStack>

									<HStack>
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
											padding={26}
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
