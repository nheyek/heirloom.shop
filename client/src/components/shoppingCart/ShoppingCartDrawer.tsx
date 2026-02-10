import {
	Button,
	Center,
	Drawer,
	Flex,
	IconButton,
	SimpleGrid,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { calculateItemPrice } from '@common/domain/ShoppingCart';
import { FaArrowCircleRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { RxDotFilled } from 'react-icons/rx';
import { useShoppingCart } from '../../providers/ShoppingCartProvider';
import { CartItemCard } from './ShoppingCartItem';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const ShoppingCardDrawer = (props: Props) => {
	const shoppingCart = useShoppingCart();

	const cartTotal = shoppingCart.items.reduce(
		(sum, item) => sum + calculateItemPrice(item),
		0,
	);

	let gridCols = useBreakpointValue({ base: 1, md: 2 });
	if (shoppingCart.items.length <= 1) {
		gridCols = 1;
	}

	return (
		<Drawer.Root
			open={props.isOpen}
			onOpenChange={(e) => !e.open && props.onClose()}
			placement="end"
			size={shoppingCart.items.length <= 1 ? 'sm' : 'lg'}
		>
			<Drawer.Backdrop />
			<Drawer.Positioner>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title
							fontSize={30}
							fontWeight={500}
						>
							Shopping Cart
						</Drawer.Title>
						<Drawer.CloseTrigger asChild>
							<IconButton
								size="md"
								variant="ghost"
							>
								<MdClose />
							</IconButton>
						</Drawer.CloseTrigger>
					</Drawer.Header>

					<Drawer.Body>
						{shoppingCart.items.length === 0 ? (
							<Center
								height="100%"
								gap={5}
								flexDir="column"
							>
								<Text
									fontSize={30}
									fontWeight={300}
								>
									Your cart is empty
								</Text>
								<Button
									onClick={props.onClose}
									size="md"
									fontSize={18}
								>
									keep looking
								</Button>
							</Center>
						) : (
							<SimpleGrid
								columns={gridCols}
								gap={4}
							>
								{shoppingCart.items.map((item) => (
									<CartItemCard
										key={`${item.listingData.shopId}-${JSON.stringify(item.selectedOptions)}`}
										item={item}
										onNavigate={props.onClose}
										onUpdateQuantity={(
											quantity,
										) =>
											shoppingCart.updateQuantity(
												item.listingData
													.shortId,
												item.selectedOptions,
												quantity,
											)
										}
										onRemove={() =>
											shoppingCart.removeFromCart(
												item.listingData
													.shortId,
												item.selectedOptions,
											)
										}
									/>
								))}
							</SimpleGrid>
						)}
					</Drawer.Body>

					{shoppingCart.items.length > 0 && (
						<Drawer.Footer>
							<Button
								size="xl"
								width="100%"
								fontSize={22}
							>
								<Text
									fontSize={28}
									height="28px"
									fontWeight={600}
									textStyle="ornamental"
								>
									{' '}
									${cartTotal.toLocaleString()}
								</Text>
								<RxDotFilled />

								<Flex
									gap={3}
									alignItems="center"
								>
									checkout
									<FaArrowCircleRight />
								</Flex>
							</Button>
						</Drawer.Footer>
					)}
				</Drawer.Content>
			</Drawer.Positioner>
		</Drawer.Root>
	);
};
