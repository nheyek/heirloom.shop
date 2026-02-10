import { useAuth0 } from '@auth0/auth0-react';
import {
	Box,
	Flex,
	Grid,
	GridItem,
	IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../../providers/ShoppingCartProvider';
import { Logo } from '../branding/Logo';
import { AnimatedBox } from '../misc/AnimatedBox';
import { ShoppingCardDrawer } from '../shoppingCart/ShoppingCartDrawer';
import { LoginButton } from './LoginButton';
import { NavbarMenu } from './NavbarMenu';
import { NavbarSearch } from './NavbarSearch';

enum gridTemplateAreas {
	LOGO = 'LOGO',
	SEARCH = 'SEARCH',
	LOGIN = 'LOGIN',
}

export const Navbar = () => {
	const { isAuthenticated, isLoading: authIsLoading } = useAuth0();

	const [shoppingCartIsOpen, setShoppingCartIsOpen] =
		useState(false);

	const shoppingCart = useShoppingCart();

	return (
		<Box
			bg="brand"
			px={4}
			py={2}
			boxShadow="md"
		>
			<Grid
				gridTemplateAreas={{
					base: `"${gridTemplateAreas.LOGO} . ${gridTemplateAreas.LOGIN}" ". ${gridTemplateAreas.SEARCH} ."`,
					sm: `". ${gridTemplateAreas.LOGO} ${gridTemplateAreas.LOGIN}" ". ${gridTemplateAreas.SEARCH} ."`,
					md: `"${gridTemplateAreas.LOGO} ${gridTemplateAreas.SEARCH} ${gridTemplateAreas.LOGIN}"`,
				}}
				templateColumns="150px 1fr 150px"
				alignItems="center"
				gap={5}
			>
				<GridItem
					area={gridTemplateAreas.LOGO}
					justifySelf={{
						base: 'start',
						sm: 'center',
						md: 'start',
					}}
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
					area={gridTemplateAreas.LOGIN}
					justifySelf="end"
				>
					<Flex
						alignItems="center"
						gap={2}
					>
						{!authIsLoading && (
							<AnimatedBox
								display="flex"
								alignItems="center"
								gap={2}
							>
								{!isAuthenticated && <LoginButton />}
								{isAuthenticated && <NavbarMenu />}
								<Box position="relative">
									<IconButton
										variant="plain"
										color="#FFF"
										onClick={() =>
											setShoppingCartIsOpen(
												true,
											)
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
							</AnimatedBox>
						)}
						<ShoppingCardDrawer
							isOpen={shoppingCartIsOpen}
							onClose={() =>
								setShoppingCartIsOpen(false)
							}
						/>
					</Flex>
				</GridItem>
			</Grid>
		</Box>
	);
};
