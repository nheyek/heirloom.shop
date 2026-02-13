import {
	Button,
	Center,
	DataList,
	Drawer,
	Flex,
	IconButton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { calculateItemPrice } from '@common/domain/ShoppingCart';
import { FaArrowCircleRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { RxDotFilled } from 'react-icons/rx';
import { useShoppingCart } from '../../providers/ShoppingCartProvider';
import { ShoppingCartItemCard } from './ShoppingCartItemCard';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const ShoppingCardDrawer = (props: Props) => {
	const shoppingCart = useShoppingCart();

	const cartTotal = shoppingCart.items.reduce(
		(sum, item) => sum + calculateItemPrice(item) * item.quantity,
		0,
	);

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
							fontWeight={600}
							textStyle="ornamental"
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

					<Drawer.Body
						display="flex"
						flexDir="column"
						py={5}
					>
						{shoppingCart.items.length === 0 ? (
							<Center
								flexDir="column"
								height="100%"
								gap={5}
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
							<Stack gap={5}>
								{shoppingCart.items.map((item) => (
									<ShoppingCartItemCard
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
							</Stack>
						)}
					</Drawer.Body>

					{shoppingCart.items.length > 0 && (
						<Drawer.Footer
							flexDir="column"
							alignItems="start"
							mt={0.5}
							p={5}
							gap={4}
							background="brand"
						>
							<DataList.Root
								marginTop="auto"
								orientation="horizontal"
								gap={1}
							>
								{[
									{
										label: 'Item total',
										value: `$${cartTotal.toLocaleString()}.00`,
									},
									{
										label: 'Shipping',
										value: 'Free',
									},
									{
										label: 'Tax',
										value: 'Determined at checkout',
									},
								].map(({ label, value }) => (
									<DataList.Item
										key={label}
										fontSize={15}
									>
										<DataList.ItemLabel
											color="white"
											minWidth={75}
											fontWeight={700}
										>
											{label}
										</DataList.ItemLabel>
										<DataList.ItemValue
											color="white"
											fontWeight={500}
										>
											{value}
										</DataList.ItemValue>
									</DataList.Item>
								))}
							</DataList.Root>
							<Button
								variant="outline"
								size="lg"
								width="100%"
								fontSize={22}
								borderColor="white"
								color="white"
								_hover={{ background: 'gray.800' }}
							>
								<Text
									fontSize={26}
									height="26px"
									fontWeight={500}
								>
									${cartTotal.toLocaleString()}.00
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
