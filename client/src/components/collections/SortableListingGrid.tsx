import { Flex, Stack } from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { SortSelect } from '@client/components/input/SortSelect';
import { SectionTitle } from '@client/components/textDisplay/SectionTitle';
import {
	LISTING_SORT_LABELS,
	ListingSort,
	sortListings,
} from '@client/domain/listingSort';
import {
	ComponentProps,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

const SORT_LOADING_MS = 300;

type Props = ComponentProps<typeof ListingGrid> & {
	title?: string;
};

export const SortableListingGrid = ({ title, ...props }: Props) => {
	const [sort, setSort] = useState(ListingSort.DEFAULT);
	const [appliedSort, setAppliedSort] = useState(
		ListingSort.DEFAULT,
	);
	const [isSorting, setIsSorting] = useState(false);
	const sortTimerRef =
		useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(sortTimerRef.current), []);

	const sortedListings = useMemo(
		() => sortListings(props.listings, appliedSort),
		[props.listings, appliedSort],
	);

	const onSortChange = (value: ListingSort) => {
		setSort(value);
		clearTimeout(sortTimerRef.current);
		if (props.listings.length === 0) {
			setAppliedSort(value);
			setIsSorting(false);
			return;
		}

		setIsSorting(true);
		sortTimerRef.current = setTimeout(() => {
			setAppliedSort(value);
			setIsSorting(false);
		}, SORT_LOADING_MS);
	};

	const showControls = props.isLoading || props.listings.length > 0;

	return (
		<Stack
			gap={2}
			width="100%"
		>
			{(title || showControls) && (
				<Flex
					justifyContent="space-between"
					alignItems="flex-end"
					gap={3}
				>
					{title ? (
						<SectionTitle>{title}</SectionTitle>
					) : (
						<span />
					)}
					{showControls && (
						<SortSelect
							label="Order"
							options={LISTING_SORT_LABELS}
							value={sort}
							onChange={onSortChange}
						/>
					)}
				</Flex>
			)}

			<ListingGrid
				{...props}
				listings={sortedListings}
				isLoading={props.isLoading || isSorting}
			/>
		</Stack>
	);
};
