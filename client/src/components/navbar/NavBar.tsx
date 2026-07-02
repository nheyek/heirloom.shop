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
import { FadeInBox } from '@client/components/util/FadeInBox';
import { CLIENT_ROUTES } from '@client/constants';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { useUserInfo } from '@client/providers/UserProvider';
import {
	FONT_DISPLAY_SANS,
	NAVBAR_HEIGHT_SPACING_UNITS,
} from '@client/theme';
import { FaShoppingCart } from 'react-icons/fa';
import { FaCrown, FaShop } from 'react-icons/fa6';

import { Link, useLocation } from 'react-router-dom';

enum gridTemplateAreas {
	LOGO = 'LOGO',
	SEARCH = 'SEARCH',
	BUTTONS = 'LOGIN',
}

export const NavBarIconButton = (props: IconButtonProps) => (
	<IconButton
		color="white"
		variant="ghost"
		_hover={{ bg: 'whiteAlpha.200' }}
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
		<Box
			bg="brand"
			px={4}
			py={2}
			h={{ md: NAVBAR_HEIGHT_SPACING_UNITS }}
			boxShadow="md"
			position="sticky"
			top={0}
			zIndex="docked"
		>
			<Grid
				gridTemplateAreas={{
					base: `"${gridTemplateAreas.LOGO} . ${gridTemplateAreas.BUTTONS}" ". ${gridTemplateAreas.SEARCH} ."`,
					md: `"${gridTemplateAreas.LOGO} ${gridTemplateAreas.SEARCH} ${gridTemplateAreas.BUTTONS}"`,
				}}
				templateColumns={{
					base: '150px 1fr 150px',
					md: '250px 1fr 150px',
				}}
				alignItems="center"
				gapX={5}
				gapY={1}
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
									fontFamily={FONT_DISPLAY_SANS}
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
				>
					<HStack gap={1}>
						{user?.isAdmin && (
							<Link
								to={[
									CLIENT_ROUTES.admin,
									CLIENT_ROUTES.shops,
								].join('/')}
							>
								<NavBarIconButton>
									<FaCrown />
								</NavBarIconButton>
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
								<NavBarIconButton>
									<FaShop />
								</NavBarIconButton>
							</Link>
						)}
						{!authIsLoading && (
							<FadeInBox
								display="flex"
								alignItems="center"
							>
								{!isAuthenticated && <LoginButton />}
								{isAuthenticated && <NavbarMenu />}
								<Box position="relative">
									<NavBarIconButton
										onClick={
											shoppingCart.openDrawer
										}
									>
										<FaShoppingCart />
									</NavBarIconButton>
									{shoppingCart.items.length >
										0 && (
										<Flex
											background="#FFF"
											border="2px solid #000"
											position="absolute"
											top={-1}
											right={-1}
											w="22px"
											h="22px"
											borderRadius="full"
											fontSize={12}
											alignItems="center"
											justifyContent="center"
											fontWeight={700}
										>
											{
												shoppingCart.items
													.length
											}
										</Flex>
									)}
								</Box>
							</FadeInBox>
						)}
						<ShoppingCartDrawer
							isOpen={shoppingCart.isDrawerOpen}
							onClose={shoppingCart.closeDrawer}
						/>
					</HStack>
				</GridItem>
			</Grid>
		</Box>
	);
};
