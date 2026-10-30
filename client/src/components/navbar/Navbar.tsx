import { useAuth0 } from '@auth0/auth0-react';
import {
	Box,
	Flex,
	HStack,
	IconButton,
	IconButtonProps,
	useBreakpointValue,
} from '@chakra-ui/react';
import { Logo } from '@client/components/branding/Logo';
import { CategoryMenu } from '@client/components/navbar/CategoryMenu';
import { LoginButton } from '@client/components/navbar/LoginButton';
import { NavbarMenu } from '@client/components/navbar/NavbarMenu';
import { ShoppingCartDrawer } from '@client/components/shoppingCart/ShoppingCartDrawer';
import { CLIENT_ROUTES } from '@client/constants';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { navbarHeight, sansFontFamily } from '@client/theme';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

export const NavbarButton = (props: IconButtonProps) => (
	<IconButton
		size="md"
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
			top={0}
			position="sticky"
			zIndex="docked"
		>
			<HStack
				px={{ base: 2, md: 4 }}
				h={navbarHeight}
				alignItems="center"
				justifyContent="space-between"
				gap={0}
			>
				<HStack
					gap={2}
					flexDirection={{ base: 'row-reverse', md: 'row' }}
					alignItems="center"
				>
					<Link to="/">
						<Box
							flexShrink={0}
							width={130}
							mt={1}
							cursor="button"
						>
							<Logo />
						</Box>
					</Link>

					<CategoryMenu />
				</HStack>

				<HStack gap={0}>
					{!authIsLoading && (
						<HStack gap={0}>
							{!isAuthenticated && <LoginButton />}
							{isAuthenticated && <NavbarMenu />}
							<Box position="relative">
								<NavbarButton
									onClick={shoppingCart.openDrawer}
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
										fontSize={13}
										fontWeight={700}
										fontFamily={sansFontFamily}
									>
										{
											shoppingCart.itemQuantityTotal
										}
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
		</Box>
	);
};
