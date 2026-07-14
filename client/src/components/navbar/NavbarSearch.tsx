import {
	Box,
	Flex,
	Input,
	InputGroup,
	Skeleton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { JSX, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { callApi } from '@client/utils/apiUtils';
import { SEARCH_QUERY_LIMITS } from '@heirloom/common/constants';
import {
	SearchResult,
	SearchResultCollection,
} from '@heirloom/common/contract';
import { FaSearch } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { IoMdCloseCircle } from 'react-icons/io';
import { TbCategoryFilled, TbSquaresFilled } from 'react-icons/tb';

export const NavbarSearch = () => {
	const apiClient = useApiClient();

	const containerRef = useRef<HTMLDivElement>(null);

	const [query, setQuery] = useState('');
	const [results, setResults] =
		useState<SearchResultCollection | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [showPopover, setShowPopover] = useState(false);

	const search = async (query: string) => {
		const result = await callApi(
			apiClient.search.search({ query: { q: query } }),
		);
		if (result.error !== null) {
			setResults(null);
			setError(true);
		} else {
			setResults(result.data);
		}
		setIsLoading(false);
	};

	const onMount = () => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setShowPopover(false);
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setShowPopover(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener(
				'mousedown',
				handleClickOutside,
			);
			document.removeEventListener('keydown', handleKeyDown);
		};
	};

	const onQueryChange = () => {
		setResults(null);

		if (query?.length < SEARCH_QUERY_LIMITS.minChars) {
			setShowPopover(false);
			return;
		}

		setShowPopover(true);
		setError(false);
		setIsLoading(true);

		const timer = setTimeout(() => {
			search(query);
		}, 500);

		return () => clearTimeout(timer);
	};

	useEffect(onQueryChange, [query]);
	useEffect(onMount, []);

	const onResultClick = () => {
		setQuery('');
		setResults(null);
		setShowPopover(false);
	};

	return (
		<Box
			ref={containerRef}
			position="relative"
			width="100%"
		>
			<InputGroup
				width="100%"
				py={1}
				startElement={<FaSearch size={20} />}
				endElement={
					<Flex
						cursor="pointer"
						onClick={() => setQuery('')}
						opacity={query ? 1 : 0}
						transition="opacity 0.15s ease-in-out"
					>
						{query && <IoMdCloseCircle size={24} />}
					</Flex>
				}
			>
				<Input
					size="lg"
					maxLength={SEARCH_QUERY_LIMITS.maxChars}
					fontSize={20}
					placeholder="Search..."
					bg="#FFF"
					borderRadius="full"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => results && setShowPopover(true)}
				/>
			</InputGroup>
			{showPopover && query && (
				<Box
					position="absolute"
					width="100%"
					mt={1.5}
					bg="#FFF"
					borderRadius="md"
					boxShadow="md"
					overflow="hidden"
					zIndex="popover"
					animation="slide-from-top 0.25s ease-out"
				>
					<Stack
						gap={0}
						my={2}
					>
						{isLoading && (
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
						{error &&
							renderSearchException(
								'An error occurred',
							)}
						{results && (
							<>
								{[
									results.categoryResults,
									results.listingResults,
									results.shopResults,
								].every(
									(resultList) =>
										resultList.length === 0,
								) &&
									renderSearchException(
										'No results found',
									)}

								{results.categoryResults.length > 0 &&
									renderSearchResultGroupLabel(
										<TbCategoryFilled />,
										'Categories',
									)}
								{renderSearchResults(
									results.categoryResults,
									CLIENT_ROUTES.category,
									onResultClick,
								)}

								{results.shopResults.length > 0 &&
									renderSearchResultGroupLabel(
										<FaShop />,
										'Makers',
									)}
								{renderSearchResults(
									results.shopResults,
									CLIENT_ROUTES.shop,
									onResultClick,
								)}

								{results.listingResults.length > 0 &&
									renderSearchResultGroupLabel(
										<TbSquaresFilled />,
										'Listings',
									)}
								{renderSearchResults(
									results.listingResults,
									CLIENT_ROUTES.listing,
									onResultClick,
								)}
							</>
						)}
					</Stack>
				</Box>
			)}
		</Box>
	);
};

const renderSearchResults = (
	results: SearchResult[],
	path: string,
	onClick: () => void,
) =>
	results.map((result) => (
		<Link
			to={`/${path}/${result.id}`}
			key={result.id}
		>
			<Text
				fontSize={18}
				p={1}
				pl={10}
				cursor="pointer"
				_hover={{ bg: 'gray.100' }}
				onClick={onClick}
			>
				{result.label}
			</Text>
		</Link>
	));

const renderSearchResultGroupLabel = (
	icon: JSX.Element,
	label: string,
) => (
	<Flex
		alignItems="center"
		py={1}
	>
		<Flex
			w={10}
			justifyContent="center"
		>
			{icon}
		</Flex>
		<Text
			fontSize={18}
			fontWeight={500}
		>
			{label}
		</Text>
	</Flex>
);

const renderSearchException = (message: string) => (
	<Text
		p={1}
		pl={4}
		color="fg.muted"
		fontSize={18}
	>
		{message}
	</Text>
);
