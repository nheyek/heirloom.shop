import { useAuth0 } from '@auth0/auth0-react';
import { Box, Grid, GridItem, IconButton, Input, InputGroup } from '@chakra-ui/react';

import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../providers/UserProvider';
import { Logo } from '../misc/Logo';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

export default function Navbar() {
	const { isAuthenticated } = useAuth0();
	const { user } = useUserInfo();
	const navigate = useNavigate();

	return (
		<Box bg="brand" px={4} py={2} boxShadow="0 2px 4px rgba(0, 0, 0, 0.35)">
			<Grid
				gridTemplateAreas={{
					base: `"logo . login" ". search ."`,
					sm: `". logo login" ". search ."`,
					md: `"logo search login"`,
				}}
				templateColumns={{
					base: '3fr 4fr 3fr',
					md: '1fr 2fr 1fr',
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
					maxW="450px"
					colSpan={{ base: 3, md: 1 }}
				>
					<InputGroup width="100%" startElement={<FaSearch />} py="5px">
						<Input placeholder="Search..." bg="#FFF" style={{ borderRadius: 20 }} />
					</InputGroup>
				</GridItem>
				<GridItem area="login" justifySelf="end">
					<Box display="flex" alignItems="center">
						{user?.shopId && (
							<IconButton
								variant="plain"
								style={{ color: 'white' }}
								onClick={() => navigate('shop-manager')}
							>
								<FaShop />
							</IconButton>
						)}
						{!isAuthenticated && <LoginButton />}
						{isAuthenticated && (
							<>
								<LogoutButton />
							</>
						)}
						<IconButton variant="plain" style={{ color: 'white' }}>
							<FaShoppingCart />
						</IconButton>
					</Box>
				</GridItem>
			</Grid>
		</Box>
	);
}
