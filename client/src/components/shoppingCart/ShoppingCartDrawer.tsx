import {
	Button,
	Drawer,
	Flex,
	HStack,
	Icon,
	IconButton,
	Skeleton,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { STANDARD_THUMBNAIL_WIDTH } from '@client/components/itemDisplay/OrderItemCard';
import { ShoppingCartCard } from '@client/components/shoppingCart/ShoppingCartCard';
import { ShoppingCartEmptyMessage } from '@client/components/shoppingCart/ShoppingCartEmptyMessage';
import { CLIENT_ROUTES, Layout } from '@client/constants';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { displayFontFamily } from '@client/theme';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { FaArrowCircleRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { RxDotFilled } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const ShoppingCartDrawer = (props: Props) => {
	const shoppingCart = useShoppingCart();
	const navigate = useNavigate();
	const layout = useBreakpointValue({
		base: Layout.COMPACT,
		md: Layout.STANDARD,
	});
	const isCompact = layout === Layout.COMPACT;

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
						{...(isCompact && {
							cardProps: {
								minW: 300,
							},
						})}
					/>
				);
			});
	};

	const cartContent = renderCartContent();

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
							height="100%"
							justifyContent={
								shoppingCart.items.length > 0
									? 'space-between'
									: 'center'
							}
							gap={5}
						>
							{isCompact ? (
								<HStack
									gap={5}
									overflowX="scroll"
									m={-5}
									p={5}
									alignItems="flex-start"
								>
									{cartContent}
								</HStack>
							) : (
								<Stack gap={5}>{cartContent}</Stack>
							)}

							{shoppingCart.items.length > 0 && (
								<Button
									padding={26}
									width="100%"
									fontSize={24}
									onClick={() => {
										navigate(
											CLIENT_ROUTES.checkout,
										);
										props.onClose();
									}}
									alignSelf="flex-end"
								>
									<Text
										fontSize={28}
										fontWeight={600}
										fontFamily={displayFontFamily}
										paddingBottom={1}
									>
										{formatCentsAsDollars(
											shoppingCart.itemPriceTotal,
										)}
									</Text>
									<RxDotFilled />
									<Flex
										gap={3}
										alignItems="center"
									>
										Checkout
										<FaArrowCircleRight />
									</Flex>
								</Button>
							)}
						</Stack>
					</Drawer.Body>
				</Drawer.Content>
			</Drawer.Positioner>
		</Drawer.Root>
	);
};
