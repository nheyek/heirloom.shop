import {
	Button,
	Drawer,
	Flex,
	IconButton,
	SimpleGrid,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { FaCreditCard } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { RxDotFilled } from 'react-icons/rx';
import {
	CartItem,
	useCart,
} from '../../providers/CartProvider';
import { CartItemCard } from './CartItemCard';

type CartDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const CartDrawer = ({
	isOpen: open,
	onClose,
}: CartDrawerProps) => {
	const { cart, removeFromCart, updateQuantity } =
		useCart();
	const cartTotal = cart.reduce(
		(sum, item) => sum + calculateItemTotal(item),
		0,
	);

	const checkoutText = useBreakpointValue({
		base: 'Checkout',
		md: 'Proceed to Checkout',
	});
	let gridCols = useBreakpointValue({ base: 1, md: 2 });
	if (cart.length <= 1) {
		gridCols = 1;
	}

	return (
		<Drawer.Root
			open={open}
			onOpenChange={(e) => !e.open && onClose()}
			placement="end"
			size={cart.length <= 1 ? 'sm' : 'lg'}
		>
			<Drawer.Backdrop />
			<Drawer.Positioner>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title
							fontSize={30}
							fontWeight={600}
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
						{cart.length === 0 ? (
							<Flex
								height="100%"
								alignItems="center"
								justifyContent="center"
								flexDirection="column"
								gap={4}
							>
								<Text
									fontSize="lg"
									color="gray.500"
								>
									Your cart is empty
								</Text>
								<Button onClick={onClose}>
									Continue Shopping
								</Button>
							</Flex>
						) : (
							<SimpleGrid
								columns={gridCols}
								gap={4}
							>
								{cart.map((item) => (
									<CartItemCard
										key={`${item.listingId}-${JSON.stringify(item.selectedOptions)}`}
										item={item}
										onNavigate={onClose}
										onUpdateQuantity={(
											quantity,
										) =>
											updateQuantity(
												item.listingId,
												item.selectedOptions,
												quantity,
											)
										}
										onRemove={() =>
											removeFromCart(
												item.listingId,
												item.selectedOptions,
											)
										}
									/>
								))}
							</SimpleGrid>
						)}
					</Drawer.Body>

					{cart.length > 0 && (
						<Drawer.Footer>
							<Stack
								gap={3}
								width="100%"
							>
								<Button
									size="xl"
									fontSize={20}
									fontWeight={600}
								>
									<FaCreditCard />
									{checkoutText}
									<RxDotFilled />

									<Text
										height={7}
										fontSize={28}
										textStyle="ornamental"
									>
										{' '}
										$
										{cartTotal.toLocaleString()}
									</Text>
								</Button>
							</Stack>
						</Drawer.Footer>
					)}
				</Drawer.Content>
			</Drawer.Positioner>
		</Drawer.Root>
	);
};

const calculateItemTotal = (item: CartItem): number => {
	let total = item.listingData.priceDollars;

	Object.entries(item.selectedOptions).forEach(
		([varId, optId]) => {
			const variation =
				item.listingData.variations.find(
					(v) => v.id === Number(varId),
				);
			const option = variation?.options.find(
				(o) => o.id === optId,
			);
			if (option && variation?.pricesVary) {
				total += option.additionalPriceDollars;
			}
		},
	);

	return total * item.quantity;
};
