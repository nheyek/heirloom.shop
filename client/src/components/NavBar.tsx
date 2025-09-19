import {
	Box,
	Flex,
	Input,
	Button,
	Text,
	InputGroup,
	chakra,
	Grid,
	GridItem,
	IconButton,
} from '@chakra-ui/react';
import { LoginButton } from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { SignupButton } from './SignupButton';
import { LogoutButton } from './LogoutButton';
import { Logo } from './Logo';
import { FaSearch } from 'react-icons/fa';
import { useUserInfo } from '../providers/UserProvider';
import { FaShop } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
	const { isAuthenticated } = useAuth0();
	const { user } = useUserInfo();
	const navigate = useNavigate();

	return (
		<Box bg="brand" px={4} py={2} boxShadow="0 2px 4px rgba(0, 0, 0, 0.35)">
			<Grid
				gridTemplateAreas={{
					base: `". logo login" ". search ."`,
					md: `"logo search login"`,
				}}
				templateColumns={{
					base: '1fr 2fr 1fr',
				}}
				alignItems="center"
				gap={{ base: 2, md: 6 }}
			>
				<GridItem area="logo" justifySelf={{ base: 'center', md: 'start' }}>
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
					maxW="500px"
					colSpan={{ base: 3, md: 1 }}
				>
					<InputGroup width="100%" startElement={<FaSearch />}>
						<Input placeholder="Search..." bg="#FFF" style={{ borderRadius: 20 }} />
					</InputGroup>
				</GridItem>
				<GridItem area="login" justifySelf="end">
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
				</GridItem>
			</Grid>
		</Box>
	);
}
