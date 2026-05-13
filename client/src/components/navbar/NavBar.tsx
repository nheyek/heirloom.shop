import { useAuth0 } from '@auth0/auth0-react';
import {
	Box,
	Flex,
	Grid,
	GridItem,
	HStack,
	IconButton,
	Text,
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
import { FaCrown } from 'react-icons/fa6';

import { Link, useLocation } from 'react-router-dom';

enum gridTemplateAreas {
	LOGO = 'LOGO',
	SEARCH = 'SEARCH',
	BUTTONS = 'LOGIN',
}

export const Navbar = () => {
	const { isAuthenticated, isLoading: authIsLoading } = useAuth0();
	const { user } = useUserInfo();
	const { pathname } = useLocation();
	const isAdminPage = pathname.startsWith(
		`/${CLIENT_ROUTES.admin}`,
	);

	const shoppingCart = useShoppingCart();

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
					sm: `". ${gridTemplateAreas.LOGO} ${gridTemplateAreas.BUTTONS}" ". ${gridTemplateAreas.SEARCH} ."`,
					md: `"${gridTemplateAreas.LOGO} ${gridTemplateAreas.SEARCH} ${gridTemplateAreas.BUTTONS}"`,
				}}
				templateColumns="250px 1fr 150px"
				alignItems="center"
				gapX={5}
				gapY={1}
			>
				<GridItem
					area={gridTemplateAreas.LOGO}
					justifySelf={{
						base: 'start',
						sm: 'center',
						md: 'start',
					}}
				>
					<HStack
						gap={3}
						alignItems="flex-end"
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
						{isAdminPage && (
							<Text
								color="white"
								fontFamily={FONT_DISPLAY_SANS}
								fontSize={24}
							>
								Admin
							</Text>
						)}
					</HStack>
				</GridItem>
				<GridItem
					area={gridTemplateAreas.SEARCH}
					justifySelf="center"
					justifyContent="center"
					w="100%"
					maxW={550}
					colSpan={{ base: 3, md: 1 }}
				>
					<NavbarSearch />
				</GridItem>
				<GridItem
					area={gridTemplateAreas.BUTTONS}
					justifySelf="end"
				>
					<HStack gap={2}>
						{user?.isAdmin && (
							<Link
								to={[
									CLIENT_ROUTES.admin,
									CLIENT_ROUTES.shops,
								].join('/')}
							>
								<IconButton color="white">
									<FaCrown />
								</IconButton>
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
									<IconButton
										color="#FFF"
										onClick={
											shoppingCart.openDrawer
										}
									>
										<FaShoppingCart />
									</IconButton>
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
