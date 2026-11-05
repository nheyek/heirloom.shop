import { useAuth0 } from '@auth0/auth0-react';
import {
	Box,
	Flex,
	HStack,
	IconButton,
	IconButtonProps,
} from '@chakra-ui/react';
import { Logo } from '@client/components/branding/Logo';
import { CategoryMenu } from '@client/components/navbar/CategoryMenu';
import { LoginButton } from '@client/components/navbar/LoginButton';
import { NavbarMenu } from '@client/components/navbar/NavbarMenu';
import { ShoppingCartDrawer } from '@client/components/shoppingCart/ShoppingCartDrawer';
import { NAVBAR_HEIGHT, SANS_FONT_FAMILY } from '@client/constants';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const NavbarButton = (props: IconButtonProps) => (
	<IconButton
		color="white"
		variant="ghost"
		_hover={{ bg: 'whiteAlpha.200' }}
		_expanded={{ bg: 'whiteAlpha.200' }}
		_icon={{ height: 6, width: 6 }}
		{...props}
	>
		{props.children}
	</IconButton>
);

export const Navbar = () => {
	const { isAuthenticated, isLoading: authIsLoading } = useAuth0();

	const shoppingCart = useShoppingCart();

	return (
		<>
			<Box h={NAVBAR_HEIGHT} />
			<Box
				bg="brand"
				top={0}
				left={0}
				right={0}
				position="fixed"
				zIndex="docked"
			>
				<HStack
					px={{ base: 2, md: 4 }}
					h={NAVBAR_HEIGHT}
					alignItems="center"
					justifyContent="space-between"
					gap={0}
				>
					<HStack
						gap={{ base: 2, sm: 3 }}
						flexDirection={{
							base: 'row-reverse',
							md: 'row',
						}}
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
										fontFamily={SANS_FONT_FAMILY}
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
			</Box>
		</>
	);
};
