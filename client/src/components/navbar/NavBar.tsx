import { useAuth0 } from '@auth0/auth0-react';
import { Box, Grid, GridItem, IconButton, Skeleton } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '../../constants';
import { useUserInfo } from '../../providers/UserProvider';
import { Logo } from '../brand/Logo';
import { LoginButton } from './LoginButton';
import { NavbarMenu } from './NavbarMenu';
import { NavbarSearch } from './NavbarSearch';

export const Navbar = () => {
	const { isAuthenticated, isLoading: authIsLoading } = useAuth0();
	const { user } = useUserInfo();
	const navigate = useNavigate();

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
						{authIsLoading && (
							<>
								<Skeleton width={40} height={40} borderRadius="full" />
								<Skeleton width={40} height={40} borderRadius="full" />
							</>
						)}
						{!authIsLoading && (
							<>
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
								<IconButton variant="plain" style={{ color: 'white' }}>
									<FaShoppingCart />
								</IconButton>
							</>
						)}
					</Box>
				</GridItem>
			</Grid>
		</Box>
	);
};
