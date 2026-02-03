import { useAuth0 } from '@auth0/auth0-react';
import {
	Box,
	Flex,
	Grid,
	GridItem,
	IconButton,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../providers/CartProvider';
import { useUserInfo } from '../../providers/UserProvider';
import { Logo } from '../brand/Logo';
import { CartDrawer } from '../cart/CartDrawer';
import { LoginButton } from './LoginButton';
import { NavbarMenu } from './NavbarMenu';
import { NavbarSearch } from './NavbarSearch';

const MotionBox = motion.create(Box);

export const Navbar = () => {
	const { isAuthenticated, isLoading: authIsLoading } =
		useAuth0();
	const { user } = useUserInfo();
	const {
		cartCount,
		isOpen: cartIsOpen,
		openCart,
		closeCart,
	} = useCart();
	const navigate = useNavigate();

	return (
		<Box
			bg="brand"
			px={4}
			py={2}
			boxShadow="md"
		>
			<Grid
				gridTemplateAreas={{
					base: `"logo . login" ". search ."`,
					sm: `". logo login" ". search ."`,
					md: `"logo search login"`,
				}}
				templateColumns="150px 1fr 150px"
				alignItems="center"
				gap={{ base: 2, md: 6 }}
			>
				<GridItem
					area="logo"
					justifySelf={{
						base: 'start',
						sm: 'center',
						md: 'start',
					}}
				>
					<Box
						width="150px"
						flexShrink={0}
						mt={1}
						cursor="pointer"
						onClick={() => navigate('/')}
					>
						<Logo />
					</Box>
				</GridItem>
				<GridItem
					area="search"
					justifySelf="center"
					justifyContent="center"
					w="full"
					maxW="550px"
					colSpan={{ base: 3, md: 1 }}
				>
					<NavbarSearch />
				</GridItem>
				<GridItem
					area="login"
					justifySelf="end"
				>
					<Box
						display="flex"
						alignItems="center"
						gap={2}
					>
						<AnimatePresence>
							{!authIsLoading && (
								<MotionBox
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{
										duration: 0.15,
									}}
									display="flex"
									alignItems="center"
									gap={2}
								>
									{!isAuthenticated && (
										<LoginButton />
									)}
									{isAuthenticated && (
										<NavbarMenu />
									)}
									<Box position="relative">
										<IconButton
											variant="plain"
											color="#FFF"
											onClick={
												openCart
											}
										>
											<FaShoppingCart />
										</IconButton>
										{cartCount > 0 && (
											<Flex
												background="#FFF"
												border="2px solid #000"
												position="absolute"
												top={-1}
												right={-1}
												borderRadius="full"
												fontSize={
													12
												}
												w={'22px'}
												h={'22px'}
												alignItems="center"
												justifyContent="center"
												fontWeight="bold"
											>
												{cartCount}
											</Flex>
										)}
									</Box>
								</MotionBox>
							)}
						</AnimatePresence>
						<CartDrawer
							isOpen={cartIsOpen}
							onClose={closeCart}
						/>
					</Box>
				</GridItem>
			</Grid>
		</Box>
	);
};
