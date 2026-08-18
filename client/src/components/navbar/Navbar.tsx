import { useAuth0 } from '@auth0/auth0-react';
import {
	Box,
	Flex,
	HStack,
	IconButton,
	IconButtonProps,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { Logo } from '@client/components/branding/Logo';
import { LoginButton } from '@client/components/navbar/LoginButton';
import { NavbarMenu } from '@client/components/navbar/NavbarMenu';
import { ShoppingCartDrawer } from '@client/components/shoppingCart/ShoppingCartDrawer';
import { CLIENT_ROUTES } from '@client/constants';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { useUserInfo } from '@client/providers/UserProvider';
import { navbarHeight, sansFontFamily } from '@client/theme';
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
		<HStack
			bg="brand"
			px={4}
			h={navbarHeight.DESKTOP}
			top={0}
			left={0}
			right={0}
			position="fixed"
			zIndex="docked"
			alignItems="center"
			justifyContent="space-between"
		>
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
				{(isAdminPage || isShopManagerPage) && !isMobile && (
					<Text
						color="white"
						fontSize={24}
						paddingTop={1}
					>
						{isShopManagerPage ? 'Manager' : 'Admin'}
					</Text>
				)}
			</HStack>

			<HStack gap={2}>
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
					<HStack gap={1}>
						{!isAuthenticated && <LoginButton />}
						{isAuthenticated && <NavbarMenu />}
						<Box position="relative">
							<NavbarButton
								onClick={shoppingCart.openDrawer}
							>
								<FaShoppingCart />
							</NavbarButton>
							{shoppingCart.itemQuantityTotal > 0 && (
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
									fontSize={13}
									fontWeight={700}
									fontFamily={sansFontFamily}
								>
									{shoppingCart.itemQuantityTotal}
								</Flex>
							)}
						</Box>
					</HStack>
				)}

				<ShoppingCartDrawer
					isOpen={shoppingCart.isDrawerOpen}
					onClose={shoppingCart.closeDrawer}
				/>
			</HStack>
		</HStack>
	);
};
