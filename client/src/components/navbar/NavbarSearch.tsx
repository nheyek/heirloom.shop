import {
	Box,
	BoxProps,
	Flex,
	Input,
	InputGroup,
	Skeleton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { JSX, useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdCancel, MdCategory } from 'react-icons/md';
import { RiStackFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

import {
	API_ROUTES,
	SEARCH_QUERY_LIMITS,
} from '@common/constants';
import {
	SearchResult,
	SearchResultCollection,
} from '@common/types/SearchResultCollection';
import { FaShop } from 'react-icons/fa6';
import { CLIENT_ROUTES } from '../../constants';
import useApi from '../../hooks/useApi';

const MotionBox = motion.create(Box);
const Animate = (
	props: Omit<
		BoxProps,
		| 'onAnimationStart'
		| 'onDragStart'
		| 'onDragEnd'
		| 'onDrag'
	>,
) => (
	<MotionBox
		{...props}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		transition={{ duration: 0.15 }}
	/>
);

export const NavbarSearch = () => {
	const navigate = useNavigate();
	const { getPublicResource } = useApi();

	const searchContainerRef = useRef<HTMLDivElement>(null);

	const [searchQuery, setSearchQuery] = useState('');
	const [
		searchResultCollection,
		setSearchResultCollection,
	] = useState<SearchResultCollection | null>(null);
	const [searchResultsLoading, setSearchResultsLoading] =
		useState<boolean>(false);
	const [searchError, setSearchError] =
		useState<boolean>(false);
	const [showSearchPopover, setShowSearchPopover] =
		useState(false);

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
		if (
			searchQuery?.length <
			SEARCH_QUERY_LIMITS.minChars
		) {
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
				!searchContainerRef.current.contains(
					e.target as Node,
				)
			) {
				setShowSearchPopover(false);
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setShowSearchPopover(false);
			}
		};

		document.addEventListener(
			'mousedown',
			handleClickOutside,
		);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener(
				'mousedown',
				handleClickOutside,
			);
			document.removeEventListener(
				'keydown',
				handleKeyDown,
			);
		};
	}, []);

	const renderSearchResultGroupLabel = (
		icon: JSX.Element,
		label: string,
	) => (
		<Flex
			mx={3}
			my={1}
			alignItems="center"
			gap={2}
		>
			{icon}
			<Text
				fontSize={18}
				fontWeight="bold"
			>
				{label}
			</Text>
		</Flex>
	);

	const renderSearchResults = (
		results: SearchResult[],
		path: string,
	) =>
		results.map((result) => (
			<Link
				to={`/${path}/${result.id}`}
				key={result.id}
			>
				<Box
					p={1}
					pl={9}
					cursor="pointer"
					_hover={{ bg: 'gray.100' }}
					onClick={() => {
						setSearchQuery('');
						setSearchResultCollection(null);
						setShowSearchPopover(false);
					}}
				>
					<Text
						fontSize={16}
						fontWeight={500}
					>
						{result.label}
					</Text>
				</Box>
			</Link>
		));

	const renderSearchException = (message: string) => (
		<Text
			fontStyle="italic"
			p={2}
			pl={4}
			color="gray.500"
			fontSize={18}
		>
			{message}
		</Text>
	);

	return (
		<Box
			ref={searchContainerRef}
			position="relative"
			width="100%"
		>
			<InputGroup
				width="100%"
				startElement={<FaSearch size={16} />}
				endElement={
					<AnimatePresence>
						{searchQuery && (
							<Animate
								style={{
									display: 'flex',
									cursor: 'pointer',
								}}
								onClick={() =>
									setSearchQuery('')
								}
							>
								<MdCancel size={16} />
							</Animate>
						)}
					</AnimatePresence>
				}
				py={1}
			>
				<Input
					maxLength={SEARCH_QUERY_LIMITS.maxChars}
					fontSize={18}
					fontWeight={500}
					placeholder="search..."
					bg="#FFF"
					style={{ borderRadius: 20 }}
					value={searchQuery}
					onChange={(e) =>
						setSearchQuery(e.target.value)
					}
					onFocus={() =>
						searchResultCollection &&
						setShowSearchPopover(true)
					}
				/>
			</InputGroup>
			<AnimatePresence>
				{showSearchPopover && searchQuery && (
					<Animate
						position="absolute"
						width="100%"
						mt={1.5}
						bg="#FFF"
						borderRadius="md"
						boxShadow="md"
						overflow="hidden"
						zIndex="popover"
					>
						<Stack
							gap={0}
							my={2}
						>
							{searchResultsLoading && (
								<Stack
									gap={2}
									px={2}
								>
									<Skeleton
										width="55%"
										height={6}
									></Skeleton>
									<Skeleton
										width="70%"
										height={6}
									></Skeleton>
									<Skeleton
										width="35%"
										height={6}
									></Skeleton>
								</Stack>
							)}
							{searchError &&
								renderSearchException(
									'An error occurred',
								)}
							{searchResultCollection && (
								<>
									{[
										searchResultCollection.categoryResults,
										searchResultCollection.listingResults,
										searchResultCollection.shopResults,
									].every(
										(resultList) =>
											resultList.length ===
											0,
									) &&
										renderSearchException(
											'No results found',
										)}

									{searchResultCollection
										.categoryResults
										.length > 0 &&
										renderSearchResultGroupLabel(
											<MdCategory />,
											'Categories',
										)}
									{renderSearchResults(
										searchResultCollection.categoryResults,
										CLIENT_ROUTES.category,
									)}

									{searchResultCollection
										.shopResults
										.length > 0 &&
										renderSearchResultGroupLabel(
											<FaShop />,
											'Makers',
										)}
									{renderSearchResults(
										searchResultCollection.shopResults,
										CLIENT_ROUTES.shop,
									)}

									{searchResultCollection
										.listingResults
										.length > 0 &&
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
					</Animate>
				)}
			</AnimatePresence>
		</Box>
	);
};
