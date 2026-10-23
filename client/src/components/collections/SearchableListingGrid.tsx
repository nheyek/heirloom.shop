import { Flex, Skeleton, Stack, Text } from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { SearchInput } from '@client/components/input/SearchInput';
import { SortSelect } from '@client/components/input/SortSelect';
import {
	LISTING_SORT_LABELS,
	ListingSort,
	sortListings,
} from '@client/domain/listingSort';
import { ListingCardData } from '@heirloom/common/contract';
import {
	ComponentProps,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

const SEARCH_MAX_WIDTH = 400;
const CONTROL_SKELETON_HEIGHT = 11;
const SORT_SKELETON_WIDTH = { base: 11, sm: 180 };
const SEARCH_MIN_CHARS = 3;
const SEARCH_LOADING_MS = 300;

const matchesQuery = (
	listing: ListingCardData,
	query: string,
	includeShopTitle: boolean,
) =>
	[
		listing.title,
		...(includeShopTitle ? [listing.shopTitle] : []),
	].some((field) => field.toLowerCase().includes(query));

type Props = ComponentProps<typeof ListingGrid>;

export const SearchableListingGrid = (props: Props) => {
	const [appliedQuery, setAppliedQuery] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const [sort, setSort] = useState(ListingSort.DEFAULT);
	const [appliedSort, setAppliedSort] = useState(
		ListingSort.DEFAULT,
	);
	const [isSorting, setIsSorting] = useState(false);
	const sortTimerRef =
		useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(sortTimerRef.current), []);

	const visibleListings = useMemo(
		() =>
			sortListings(
				appliedQuery
					? props.listings.filter((listing) =>
							matchesQuery(
								listing,
								appliedQuery,
								!!props.includeShopTitle,
							),
						)
					: props.listings,
				appliedSort,
			),
		[
			props.listings,
			appliedQuery,
			appliedSort,
			props.includeShopTitle,
		],
	);

	const onSortChange = (value: ListingSort) => {
		setSort(value);
		clearTimeout(sortTimerRef.current);
		if (visibleListings.length === 0) {
			setAppliedSort(value);
			setIsSorting(false);
			return;
		}

		setIsSorting(true);
		sortTimerRef.current = setTimeout(() => {
			setAppliedSort(value);
			setIsSorting(false);
		}, SEARCH_LOADING_MS);
	};

	const showSearch = props.isLoading || props.listings.length > 0;
	const showNoResults =
		!props.isLoading &&
		!isSearching &&
		!isSorting &&
		props.listings.length > 0 &&
		visibleListings.length === 0;

	return (
		<Stack
			gap={5}
			width="100%"
		>
			{showSearch && (
				<Flex
					justifyContent="space-between"
					alignItems="center"
					gap={3}
				>
					{props.isLoading ? (
						<>
							<Skeleton
								flex={1}
								maxW={SEARCH_MAX_WIDTH}
								h={CONTROL_SKELETON_HEIGHT}
								borderRadius="full"
							/>
							<Skeleton
								w={SORT_SKELETON_WIDTH}
								h={CONTROL_SKELETON_HEIGHT}
								borderRadius="full"
							/>
						</>
					) : (
						<>
							<SearchInput
								placeholder={
									props.includeShopTitle
										? 'Search by title or maker'
										: 'Search listings by title'
								}
								minChars={SEARCH_MIN_CHARS}
								delayMs={SEARCH_LOADING_MS}
								maxWidth={SEARCH_MAX_WIDTH}
								onSearching={setIsSearching}
								onSearch={setAppliedQuery}
							/>
							<SortSelect
								label="Order"
								options={LISTING_SORT_LABELS}
								value={sort}
								onChange={onSortChange}
							/>
						</>
					)}
				</Flex>
			)}

			{showNoResults ? (
				<Text fontSize={20}>
					No listings match &ldquo;{appliedQuery}&rdquo;
				</Text>
			) : (
				<ListingGrid
					{...props}
					listings={visibleListings}
					isLoading={
						props.isLoading || isSearching || isSorting
					}
				/>
			)}
		</Stack>
	);
};
