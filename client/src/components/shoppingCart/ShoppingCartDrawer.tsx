import {
	Box,
	Button,
	Drawer,
	Flex,
	Icon,
	IconButton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { FaArrowCircleRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { RxDotFilled } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { CLIENT_ROUTES } from '../../constants';
import { useShoppingCart } from '../../providers/ShoppingCartProvider';
import { FONT_DECORATIVE } from '../../theme';
import { ShoppingCartContents } from './ShoppingCartContents';
import { ShoppingCartEmptyMessage } from './ShoppingCartEmptyMessage';
import { ShoppingCartSummary } from './ShoppingCartSummary';

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
						{shoppingCart.itemQuantityTotal === 0 ? (
							<ShoppingCartEmptyMessage
								onClick={props.onClose}
							/>
						) : (
							<Stack gap={5}>
								<ShoppingCartContents
									onNavigate={props.onClose}
								/>
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
								pendingLineItemMessage="Calculated at checkout"
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
											$
											{shoppingCart.itemPriceTotal.toLocaleString()}
											.00
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
