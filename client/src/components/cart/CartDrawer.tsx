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
import { FaArrowCircleRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { PiBookOpenTextFill } from 'react-icons/pi';
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
							<Center
								height="100%"
								gap={5}
								flexDir="column"
							>
								<Text
									fontSize={30}
									color="gray.500"
								>
									Your cart is empty
								</Text>
								<Button
									onClick={onClose}
									size="md"
								>
									<PiBookOpenTextFill />
									Keep Looking
								</Button>
							</Center>
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
							<Button
								size="xl"
								width="100%"
								fontSize={24}
							>
								<Text
									fontSize={28}
									height="28px"
									fontWeight={600}
									textStyle="ornamental"
								>
									{' '}
									$
									{cartTotal.toLocaleString()}
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
