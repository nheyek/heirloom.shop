import { useAuth0 } from '@auth0/auth0-react';
import {
	Box,
	Flex,
	Grid,
	GridItem,
	HStack,
	IconButton,
	IconButtonProps,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { Logo } from '@client/components/branding/Logo';
import { LoginButton } from '@client/components/navbar/LoginButton';
import { NavbarMenu } from '@client/components/navbar/NavbarMenu';
import { NavbarSearch } from '@client/components/navbar/NavbarSearch';
import { ShoppingCartDrawer } from '@client/components/shoppingCart/ShoppingCartDrawer';
import { CLIENT_ROUTES } from '@client/constants';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { useUserInfo } from '@client/providers/UserProvider';
import { NAVBAR_HEIGHT } from '@client/theme';
import { FaShoppingCart } from 'react-icons/fa';
import { FaCrown, FaShop } from 'react-icons/fa6';

import { Link, useLocation } from 'react-router-dom';

enum gridTemplateAreas {
	LOGO = 'LOGO',
	SEARCH = 'SEARCH',
	BUTTONS = 'LOGIN',
}

export const NavbarButton = (props: IconButtonProps) => (
	<IconButton
		size="lg"
		color="white"
		variant="ghost"
		_hover={{ bg: 'whiteAlpha.200' }}
		_expanded={{ bg: 'whiteAlpha.200' }}
		_icon={{ height: 22, width: 22 }}
		{...props}
	>
		{props.children}
	</IconButton>
);

export const Navbar = () => {
	const { isAuthenticated, isLoading: authIsLoading } = useAuth0();
	const { user } = useUserInfo();
	const { pathname } = useLocation();
	const isAdminPage = pathname.startsWith(
		`/${CLIENT_ROUTES.admin}`,
	);
	const isShopManagerPage = new RegExp(
		`/${CLIENT_ROUTES.shop}/[^/]+/${CLIENT_ROUTES.manage}`,
	).test(pathname);

	const shoppingCart = useShoppingCart();

	const isMobile = useBreakpointValue({ base: true, md: false });

	return (
		<Flex
			bg="brand"
			px={4}
			h={{
				base: NAVBAR_HEIGHT.MOBILE,
				md: NAVBAR_HEIGHT.DESKTOP,
			}}
			top={0}
			left={0}
			right={0}
			position="fixed"
			zIndex="docked"
		>
			<Grid
				gridTemplateAreas={{
					base: `"${gridTemplateAreas.LOGO} . ${gridTemplateAreas.BUTTONS}" ". ${gridTemplateAreas.SEARCH} ."`,
					md: `"${gridTemplateAreas.LOGO} ${gridTemplateAreas.SEARCH} ${gridTemplateAreas.BUTTONS}"`,
				}}
				templateColumns={{
					base: '150px 1fr 150px',
					md: '250px 1fr 250px',
				}}
				alignItems="center"
				gapX={5}
				gapY={0}
				w="100%"
				py={2}
			>
				<GridItem area={gridTemplateAreas.LOGO}>
					<HStack
						gap={3}
						alignItems="center"
					>
						<Link to="/">
							<Box
								flexShrink={0}
								width={150}
								mt={1}
								cursor="button"
							>
								<Logo />
							</Box>
						</Link>
						{(isAdminPage || isShopManagerPage) &&
							!isMobile && (
								<Text
									color="white"
									fontSize={24}
									paddingTop={1}
								>
									{isShopManagerPage
										? 'Manager'
										: 'Admin'}
								</Text>
							)}
					</HStack>
				</GridItem>
				<GridItem
					area={gridTemplateAreas.SEARCH}
					justifySelf="center"
					justifyContent="center"
					w="100%"
					maxW={500}
					colSpan={{ base: 3, md: 1 }}
				>
					<NavbarSearch />
				</GridItem>
				<GridItem
					area={gridTemplateAreas.BUTTONS}
					justifySelf="end"
					flexShrink={0}
					opacity={authIsLoading ? 0 : 1}
					transition="opacity 0.25s ease-in-out"
				>
					<HStack>
						{user?.isAdmin && (
							<Link
								to={[
									CLIENT_ROUTES.admin,
									CLIENT_ROUTES.shops,
								].join('/')}
							>
								<NavbarButton>
									<FaCrown />
								</NavbarButton>
							</Link>
						)}
						{!user?.isAdmin && user?.shopShortId && (
							<Link
								to={[
									CLIENT_ROUTES.shop,
									user.shopShortId,
									CLIENT_ROUTES.manage,
									CLIENT_ROUTES.info,
								].join('/')}
							>
								<NavbarButton>
									<FaShop />
								</NavbarButton>
							</Link>
						)}

						{!authIsLoading && (
							<Flex alignItems="center">
								{!isAuthenticated && <LoginButton />}
								{isAuthenticated && <NavbarMenu />}
								<Box position="relative">
									<NavbarButton
										onClick={
											shoppingCart.openDrawer
										}
									>
										<FaShoppingCart />
									</NavbarButton>
									{shoppingCart.itemQuantityTotal >
										0 && (
										<Flex
											alignItems="center"
											background="#FFF"
											border="2px solid #000"
											position="absolute"
											width="fit-content"
											h={6}
											overflow="hidden"
											top={-1}
											right={-1}
											p={1.5}
											borderRadius="full"
											fontSize={16}
											fontWeight={700}
										>
											{
												shoppingCart.itemQuantityTotal
											}
										</Flex>
									)}
								</Box>
							</Flex>
						)}

						<ShoppingCartDrawer
							isOpen={shoppingCart.isDrawerOpen}
							onClose={shoppingCart.closeDrawer}
						/>
					</HStack>
				</GridItem>
			</Grid>
		</Flex>
	);
};
