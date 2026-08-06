import {
	Button,
	Drawer,
	Flex,
	Icon,
	IconButton,
	Skeleton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { ShoppingCartCard } from '@client/components/shoppingCart/ShoppingCartCard';
import { ShoppingCartEmptyMessage } from '@client/components/shoppingCart/ShoppingCartEmptyMessage';
import { CLIENT_ROUTES } from '@client/constants';
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

	return (
		<Drawer.Root
			open={props.isOpen}
			onOpenChange={(e) => !e.open && props.onClose()}
			placement="end"
			size="sm"
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
							justifyContent="space-between"
							gap={5}
						>
							<Stack gap={5}>
								{shoppingCart.cartLoading ? (
									<>
										{Array.from({
											length: shoppingCart.pendingItemCount,
										}).map((_, i) => (
											<Skeleton
												key={i}
												height={300}
												width="100%"
												borderRadius="md"
											/>
										))}
									</>
								) : shoppingCart.itemQuantityTotal ===
								  0 ? (
									<ShoppingCartEmptyMessage
										onClick={props.onClose}
									/>
								) : (
									<>
										{shoppingCart.items
											.sort(
												(itemA, itemB) =>
													itemB.addedAt -
													itemA.addedAt,
											)
											.map((item) => (
												<ShoppingCartCard
													key={`${item.listingData.id}-${JSON.stringify(item.selectedOptions)}`}
													item={item}
													onNavigate={
														props.onClose
													}
												/>
											))}
									</>
								)}
							</Stack>

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
