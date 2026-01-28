import { useAuth0 } from '@auth0/auth0-react';
import {
	Box,
	Flex,
	Grid,
	GridItem,
	IconButton,
	Input,
	InputGroup,
	Skeleton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { JSX, useEffect, useRef, useState } from 'react';

import { API_ROUTES, SEARCH_QUERY_LIMITS } from '@common/constants';
import { SearchResult, SearchResultCollection } from '@common/types/SearchResultCollection';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { MdCategory } from 'react-icons/md';
import { RiStackFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '../../constants';
import useApi from '../../hooks/useApi';
import { useUserInfo } from '../../providers/UserProvider';
import { Logo } from '../misc/Logo';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

export const Navbar = () => {
	const { isAuthenticated } = useAuth0();
	const { user } = useUserInfo();
	const navigate = useNavigate();
	const { getPublicResource } = useApi();

	const searchContainerRef = useRef<HTMLDivElement>(null);

	const [searchQuery, setSearchQuery] = useState('');
	const [searchResultCollection, setSearchResultCollection] =
		useState<SearchResultCollection | null>(null);
	const [searchResultsLoading, setSearchResultsLoading] = useState<boolean>(false);
	const [searchError, setSearchError] = useState<boolean>(false);
	const [showSearchPopover, setShowSearchPopover] = useState(false);

	const search = async (query: string) => {
		const { data, error } = await getPublicResource(
			`${API_ROUTES.search.base}?${API_ROUTES.search.queryParam}=${encodeURIComponent(query)}`,
		);
		if (data) {
			setSearchResultCollection(data);
		}
		if (error) {
			setSearchResultCollection(null);
			setSearchError(true);
		}

		setSearchResultsLoading(false);
	};

	useEffect(() => {
		setShowSearchPopover(false);

		setSearchResultCollection(null);
		if (searchQuery?.length < SEARCH_QUERY_LIMITS.minChars) {
			return;
		}

		setShowSearchPopover(true);
		setSearchError(false);
		setSearchResultsLoading(true);

		const timer = setTimeout(() => {
			search(searchQuery);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				searchContainerRef.current &&
				!searchContainerRef.current.contains(e.target as Node)
			) {
				setShowSearchPopover(false);
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setShowSearchPopover(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const renderSearchResultGroupLabel = (icon: JSX.Element, label: string) => (
		<Flex mx={3} my={1} alignItems="center" gap={2}>
			{icon}
			<Text fontSize={13} fontWeight="bold">
				{label}
			</Text>
		</Flex>
	);

	const renderSearchResults = (results: SearchResult[], path: string) =>
		results.map((result) => (
			<Box
				key={result.id}
				p={1}
				pl={9}
				cursor="pointer"
				_hover={{ bg: 'gray.100' }}
				onClick={() => {
					setSearchQuery('');
					setSearchResultCollection(null);
					setShowSearchPopover(false);
					navigate(`/${path}/${result.id.toLocaleLowerCase()}`);
				}}
			>
				<Text fontSize={16}>{result.label}</Text>
			</Box>
		));

	const renderSearchException = (message: string) => (
		<Text fontStyle="italic" p={2} pl={4} color="gray.500" fontSize={16}>
			{message}
		</Text>
	);

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
								maxLength={SEARCH_QUERY_LIMITS.maxChars}
								fontSize={16}
								placeholder="Search..."
								bg="#FFF"
								style={{ borderRadius: 20 }}
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onFocus={() => searchResultCollection && setShowSearchPopover(true)}
							/>
						</InputGroup>
						{showSearchPopover && searchQuery && (
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
								<Stack gap={0} my={2}>
									{searchResultsLoading && (
										<Stack gap={2} px={2}>
											<Skeleton width="55%" height={6}></Skeleton>
											<Skeleton width="70%" height={6}></Skeleton>
											<Skeleton width="35%" height={6}></Skeleton>
										</Stack>
									)}
									{searchError && renderSearchException('An error occurred')}
									{searchResultCollection && (
										<>
											{[
												searchResultCollection.categoryResults,
												searchResultCollection.listingResults,
												searchResultCollection.shopResults,
											].every((resultList) => resultList.length === 0) &&
												renderSearchException('No results found')}

											{searchResultCollection.categoryResults.length > 0 &&
												renderSearchResultGroupLabel(
													<MdCategory />,
													'Categories',
												)}
											{renderSearchResults(
												searchResultCollection.categoryResults,
												CLIENT_ROUTES.category,
											)}

											{searchResultCollection.shopResults.length > 0 &&
												renderSearchResultGroupLabel(<FaShop />, 'Makers')}
											{renderSearchResults(
												searchResultCollection.shopResults,
												CLIENT_ROUTES.shop,
											)}

											{searchResultCollection.listingResults.length > 0 &&
												renderSearchResultGroupLabel(
													<RiStackFill />,
													'Listings',
												)}
											{renderSearchResults(
												searchResultCollection.listingResults,
												CLIENT_ROUTES.listing,
											)}
										</>
									)}
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
								onClick={() => navigate(CLIENT_ROUTES.shopManager)}
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
};
