import { Flex, Stack } from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { SortFilterDrawer } from '@client/components/input/SortFilterDrawer';
import { SectionTitle } from '@client/components/textDisplay/SectionTitle';
import {
	filterListingsByPrice,
	getPriceBounds,
	PriceRange,
} from '@client/domain/listingFilter';
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
	const [priceRange, setPriceRange] = useState<PriceRange | null>(
		null,
	);
	const [appliedPriceRange, setAppliedPriceRange] =
		useState<PriceRange | null>(null);
	const [isSorting, setIsSorting] = useState(false);
	const sortTimerRef =
		useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(sortTimerRef.current), []);

	useEffect(() => {
		setPriceRange(null);
		setAppliedPriceRange(null);
	}, [props.listings]);

	const priceBounds = useMemo(
		() => getPriceBounds(props.listings),
		[props.listings],
	);

	const visibleListings = useMemo(
		() =>
			sortListings(
				filterListingsByPrice(
					props.listings,
					appliedPriceRange,
				),
				appliedSort,
			),
		[props.listings, appliedPriceRange, appliedSort],
	);

	const applyAfterDelay = (apply: () => void) => {
		clearTimeout(sortTimerRef.current);
		if (props.listings.length === 0) {
			apply();
			setIsSorting(false);
			return;
		}

		setIsSorting(true);
		sortTimerRef.current = setTimeout(() => {
			apply();
			setIsSorting(false);
		}, SORT_LOADING_MS);
	};

	const onSortChange = (value: ListingSort) => {
		setSort(value);
		applyAfterDelay(() => setAppliedSort(value));
	};

	const onPriceRangeChange = (value: PriceRange) => {
		setPriceRange(value);
		applyAfterDelay(() => setAppliedPriceRange(value));
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
				>
					{title && <SectionTitle>{title}</SectionTitle>}
					{showControls && (
						<SortFilterDrawer
							options={LISTING_SORT_LABELS}
							value={sort}
							onChange={onSortChange}
							{...(priceBounds && {
								price: {
									bounds: priceBounds,
									value: priceRange ?? priceBounds,
									onChange: onPriceRangeChange,
								},
							})}
						/>
					)}
				</Flex>
			)}

			<ListingGrid
				{...props}
				listings={visibleListings}
				isLoading={props.isLoading || isSorting}
			/>
		</Stack>
	);
};
