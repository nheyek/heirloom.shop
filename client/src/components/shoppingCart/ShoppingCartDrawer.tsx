import {
	Box,
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
import { ShoppingCartSummary } from '@client/components/shoppingCart/ShoppingCartSummary';
import { CLIENT_ROUTES } from '@client/constants';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { FONT_DECORATIVE } from '@client/theme';
import { formatCentsAsDollars } from '@common/utils/priceDisplay';
import { FaArrowCircleRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { RxDotFilled } from 'react-icons/rx';
import { Link } from 'react-router-dom';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const ShoppingCartDrawer = (props: Props) => {
	const shoppingCart = useShoppingCart();

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
							fontFamily={FONT_DECORATIVE}
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

					<Drawer.Body
						display="flex"
						flexDir="column"
						pb={5}
					>
						{shoppingCart.cartLoading ? (
							<Stack gap={5}>
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
							</Stack>
						) : shoppingCart.itemQuantityTotal === 0 ? (
							<ShoppingCartEmptyMessage
								onClick={props.onClose}
							/>
						) : (
							<Stack gap={5}>
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
											onNavigate={props.onClose}
										/>
									))}
							</Stack>
						)}
					</Drawer.Body>

					{shoppingCart.items.length > 0 && (
						<Drawer.Footer
							flexDir="column"
							alignItems="start"
							p={4}
							gap={4}
							background="brand"
						>
							<ShoppingCartSummary
								pendingMessage="Calculated at checkout"
								textColor="white"
							/>

							<Box width="100%">
								<Link to={CLIENT_ROUTES.checkout}>
									<Button
										variant="outline"
										color="white"
										borderColor="white"
										_hover={{
											background: 'gray.800',
										}}
										size="xl"
										width="100%"
										fontSize={22}
										onClick={props.onClose}
									>
										<Text
											fontSize={26}
											fontWeight={600}
											fontFamily={
												FONT_DECORATIVE
											}
											paddingBottom={1}
										>
											{' '}
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
								</Link>
							</Box>
						</Drawer.Footer>
					)}
				</Drawer.Content>
			</Drawer.Positioner>
		</Drawer.Root>
	);
};
