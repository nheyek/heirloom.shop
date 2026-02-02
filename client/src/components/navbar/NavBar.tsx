import { useAuth0 } from '@auth0/auth0-react';
import { Box, Flex, Grid, GridItem, IconButton } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '../../constants';
import { useCart } from '../../providers/CartProvider';
import { useUserInfo } from '../../providers/UserProvider';
import { Logo } from '../brand/Logo';
import { CartDrawer } from '../cart/CartDrawer';
import { LoginButton } from './LoginButton';
import { NavbarMenu } from './NavbarMenu';
import { NavbarSearch } from './NavbarSearch';

const MotionBox = motion.create(Box);

export const Navbar = () => {
	const { isAuthenticated, isLoading: authIsLoading } = useAuth0();
	const { user } = useUserInfo();
	const { cartCount } = useCart();
	const navigate = useNavigate();
	const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

	return (
		<Box bg="brand" px={4} py={2} boxShadow="md">
			<Grid
				gridTemplateAreas={{
					base: `"logo . login" ". search ."`,
					sm: `". logo login" ". search ."`,
					md: `"logo search login"`,
				}}
				templateColumns={{
					base: '150px 1fr 150px',
					md: '150px 2fr 150px',
				}}
				alignItems="center"
				gap={{ base: 2, md: 6 }}
			>
				<GridItem area="logo" justifySelf={{ base: 'start', sm: 'center', md: 'start' }}>
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
				<GridItem area="login" justifySelf="end">
					<Box display="flex" alignItems="center" gap={2}>
						<AnimatePresence>
							{!authIsLoading && (
								<MotionBox
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.15 }}
									display="flex"
									alignItems="center"
									gap={2}
								>
									{user?.shopId && (
										<IconButton
											variant="plain"
											style={{ color: 'white' }}
											onClick={() => navigate(CLIENT_ROUTES.shopManager)}
										>
											<FaShop />
										</IconButton>
									)}
									{!isAuthenticated && <LoginButton />}
									{isAuthenticated && <NavbarMenu />}
									<Box position="relative">
										<IconButton
											variant="plain"
											style={{ color: 'white' }}
											onClick={() => setCartDrawerOpen(true)}
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
												fontSize={12}
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
							open={cartDrawerOpen}
							onClose={() => setCartDrawerOpen(false)}
						/>
					</Box>
				</GridItem>
			</Grid>
		</Box>
	);
};
