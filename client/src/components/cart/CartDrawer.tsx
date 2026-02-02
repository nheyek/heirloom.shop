import {
	Badge,
	Box,
	Button,
	Drawer,
	Flex,
	Heading,
	IconButton,
	Image,
	Stack,
	Text,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '../../constants';
import { CartItem, useCart } from '../../providers/CartProvider';

interface CartDrawerProps {
	open: boolean;
	onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
	const { cart, removeFromCart, updateQuantity } = useCart();
	const navigate = useNavigate();

	const calculateItemTotal = (item: CartItem): number => {
		let total = item.listingData.priceDollars;

		Object.entries(item.selectedOptions).forEach(([varId, optId]) => {
			const variation = item.listingData.variations.find((v) => v.id === Number(varId));
			const option = variation?.options.find((o) => o.id === optId);
			if (option && variation?.pricesVary) {
				total += option.additionalPriceDollars;
			}
		});

		return total * item.quantity;
	};

	const cartTotal = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);

	return (
		<Drawer.Root
			open={open}
			onOpenChange={(e) => !e.open && onClose()}
			placement="end"
			size="md"
		>
			<Drawer.Backdrop />
			<Drawer.Positioner>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title fontSize={22}>Shopping Cart</Drawer.Title>
						<Drawer.CloseTrigger asChild>
							<IconButton size="md" variant="ghost" borderRadius="full">
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
								<Text fontSize="lg" color="gray.500">
									Your cart is empty
								</Text>
								<Button onClick={onClose}>Continue Shopping</Button>
							</Flex>
						) : (
							<Stack gap={4}>
								{cart.map((item) => {
									const imageUrl = item.listingData.imageUuids[0]
										? `${process.env.LISTING_IMAGES_URL}/${item.listingData.imageUuids[0]}.jpg`
										: '';

									return (
										<Box
											key={`${item.listingId}-${JSON.stringify(item.selectedOptions)}`}
											p={3}
											borderWidth="1px"
											borderRadius="md"
										>
											<Flex gap={3}>
												<Image
													src={imageUrl}
													alt={item.listingData.title}
													width="80px"
													height="80px"
													objectFit="cover"
													borderRadius="md"
													cursor="pointer"
													onClick={() => {
														navigate(
															`/${CLIENT_ROUTES.listing}/${item.listingId}`,
														);
														onClose();
													}}
												/>
												<Stack flex="1" gap={1}>
													<Text
														fontWeight="bold"
														cursor="pointer"
														onClick={() => {
															navigate(
																`/${CLIENT_ROUTES.listing}/${item.listingId}`,
															);
															onClose();
														}}
														_hover={{ textDecoration: 'underline' }}
													>
														{item.listingData.title}
													</Text>

													<Text fontSize="sm" color="gray.600">
														{item.listingData.shopTitle}
													</Text>

													{Object.keys(item.selectedOptions).length >
														0 && (
														<Flex gap={2} flexWrap="wrap">
															{Object.entries(
																item.selectedOptions,
															).map(([varId, optId]) => {
																const variation =
																	item.listingData.variations.find(
																		(v) =>
																			v.id === Number(varId),
																	);
																const option =
																	variation?.options.find(
																		(o) => o.id === optId,
																	);

																if (!variation || !option)
																	return null;

																return (
																	<Badge
																		key={varId}
																		size="sm"
																		colorPalette="gray"
																	>
																		{variation.name}:{' '}
																		{option.name}
																	</Badge>
																);
															})}
														</Flex>
													)}

													<Flex alignItems="center" gap={3} mt={1}>
														<Flex alignItems="center" gap={2}>
															<Button
																size="sm"
																variant="outline"
																onClick={() =>
																	updateQuantity(
																		item.listingId,
																		item.selectedOptions,
																		item.quantity - 1,
																	)
																}
															>
																-
															</Button>
															<Text>{item.quantity}</Text>
															<Button
																size="sm"
																variant="outline"
																onClick={() =>
																	updateQuantity(
																		item.listingId,
																		item.selectedOptions,
																		item.quantity + 1,
																	)
																}
															>
																+
															</Button>
														</Flex>

														<Text fontWeight="bold" ml="auto">
															$
															{calculateItemTotal(
																item,
															).toLocaleString()}
														</Text>

														<IconButton
															size="sm"
															variant="ghost"
															colorPalette="red"
															onClick={() =>
																removeFromCart(
																	item.listingId,
																	item.selectedOptions,
																)
															}
														>
															<FaTrash />
														</IconButton>
													</Flex>
												</Stack>
											</Flex>
										</Box>
									);
								})}
							</Stack>
						)}
					</Drawer.Body>

					{cart.length > 0 && (
						<Drawer.Footer>
							<Stack gap={3} width="100%">
								<Flex justifyContent="space-between" alignItems="center">
									<Heading size="lg">Total</Heading>
									<Heading size="lg">${cartTotal.toLocaleString()}</Heading>
								</Flex>
								<Button size="xl" width="100%" colorPalette="brand">
									Proceed to Checkout
								</Button>
							</Stack>
						</Drawer.Footer>
					)}
				</Drawer.Content>
			</Drawer.Positioner>
		</Drawer.Root>
	);
};
