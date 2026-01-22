import { useAuth0 } from '@auth0/auth0-react';
import {
	Box,
	Grid,
	GridItem,
	IconButton,
	Input,
	InputGroup,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

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

	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState<string[]>([]);
	const [showResults, setShowResults] = useState(false);
	const searchContainerRef = useRef<HTMLDivElement>(null);

	const search = (query: string) => {
		setSearchResults(['test search result', 'test search result 2']);
	};

	useEffect(() => {
		if (!searchQuery) {
			setSearchResults([]);
			return;
		}

		const timer = setTimeout(() => {
			search(searchQuery);
			setShowResults(true);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
				setShowResults(false);
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setShowResults(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

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
					maxW="450px"
					colSpan={{ base: 3, md: 1 }}
				>
					<Box ref={searchContainerRef} position="relative" width="100%">
						<InputGroup width="100%" startElement={<FaSearch />} py={1}>
							<Input
								fontSize={16}
								placeholder="Search..."
								bg="#FFF"
								style={{ borderRadius: 20 }}
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onFocus={() => searchResults.length > 0 && setShowResults(true)}
							/>
						</InputGroup>
						{showResults && searchResults.length > 0 && (
							<Box
								position="absolute"
								top="100%"
								left={0}
								right={0}
								mt={1}
								bg="white"
								borderRadius="md"
								boxShadow="md"
								overflow="hidden"
								zIndex="popover"
							>
								<Stack gap={0}>
									{searchResults.map((result, index) => (
										<Box
											key={index}
											py={3}
											px={4}
											cursor="pointer"
											_hover={{ bg: 'gray.100' }}
											onClick={() => {
												setSearchQuery('');
												setSearchResults([]);
												setShowResults(false);
											}}
										>
											<Text fontSize={16}>{result}</Text>
										</Box>
									))}
								</Stack>
							</Box>
						)}
					</Box>
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
