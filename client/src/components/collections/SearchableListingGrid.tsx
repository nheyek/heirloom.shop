import { Stack, Text } from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { SearchInput } from '@client/components/input/SearchInput';
import { ListingCardData } from '@heirloom/common/contract';
import { ComponentProps, useMemo, useState } from 'react';

const SEARCH_MAX_WIDTH = 400;
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

	const filteredListings = useMemo(
		() =>
			appliedQuery
				? props.listings.filter((listing) =>
						matchesQuery(
							listing,
							appliedQuery,
							!!props.includeShopTitle,
						),
					)
				: props.listings,
		[props.listings, appliedQuery, props.includeShopTitle],
	);

	const showSearch = props.isLoading || props.listings.length > 0;
	const showNoResults =
		!props.isLoading &&
		!isSearching &&
		props.listings.length > 0 &&
		filteredListings.length === 0;

	return (
		<Stack
			gap={5}
			width="100%"
		>
			{showSearch && (
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
			)}

			{showNoResults ? (
				<Text fontSize={20}>
					No listings match &ldquo;{appliedQuery}&rdquo;
				</Text>
			) : (
				<ListingGrid
					{...props}
					listings={filteredListings}
					isLoading={props.isLoading || isSearching}
				/>
			)}
		</Stack>
	);
};
