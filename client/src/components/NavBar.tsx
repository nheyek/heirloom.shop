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
} from '@chakra-ui/react';
import { LoginButton } from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { SignupButton } from './SignupButton';
import { LogoutButton } from './LogoutButton';
import { Logo } from './Logo';
import { FaSearch } from 'react-icons/fa';

export default function Navbar() {
	const { isAuthenticated } = useAuth0();

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
					<Box width="150px" flexShrink={0} mt={1}>
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
					{!isAuthenticated && <LoginButton />}
					{isAuthenticated && (
						<>
							<LogoutButton />
						</>
					)}
				</GridItem>
			</Grid>
		</Box>
	);
}
