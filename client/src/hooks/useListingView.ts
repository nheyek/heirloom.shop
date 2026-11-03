import { CategoryOption } from '@client/components/collections/CategoryFilterMenu';
import { PriceFilter } from '@client/components/input/SortFilterDrawer';
import {
	filterListingsByPrice,
	getPriceBounds,
	PriceRange,
} from '@client/domain/listingFilter';
import {
	ListingSort,
	sortListings,
} from '@client/domain/listingSort';
import { useCategories } from '@client/providers/CategoriesProvider';
import { ListingCardData } from '@heirloom/common/contract';
import { useEffect, useMemo, useRef, useState } from 'react';

const APPLY_DELAY_MS = 300;

export type ListingView = {
	listings: ListingCardData[];
	isApplying: boolean;
	sort: {
		value: ListingSort;
		onChange: (value: ListingSort) => void;
	};
	price: PriceFilter | null;
	category: {
		options: CategoryOption[];
		value: string | null;
		onChange: (categoryId: string | null) => void;
	};
};

export const useListingView = (
	listings: ListingCardData[],
): ListingView => {
	const { getCategory, getChildCategories } = useCategories();
	const [sort, setSort] = useState(ListingSort.DEFAULT);
	const [appliedSort, setAppliedSort] = useState(
		ListingSort.DEFAULT,
	);
	const [priceRange, setPriceRange] = useState<PriceRange | null>(
		null,
	);
	const [appliedPriceRange, setAppliedPriceRange] =
		useState<PriceRange | null>(null);
	const [categoryId, setCategoryId] = useState<string | null>(null);
	const [appliedCategoryId, setAppliedCategoryId] = useState<
		string | null
	>(null);
	const [isApplying, setIsApplying] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(timerRef.current), []);

	useEffect(() => {
		setPriceRange(null);
		setAppliedPriceRange(null);
		setCategoryId(null);
		setAppliedCategoryId(null);
	}, [listings]);

	const categoryOptions = useMemo<CategoryOption[]>(
		() =>
			[
				...new Set(
					listings.map((listing) => listing.categoryId),
				),
			]
				.filter((id) => getChildCategories(id).length === 0)
				.map((id) => ({
					id,
					title: getCategory(id)?.title ?? id,
				}))
				.sort((a, b) => a.title.localeCompare(b.title)),
		[listings, getCategory, getChildCategories],
	);

	const priceBounds = useMemo(
		() => getPriceBounds(listings),
		[listings],
	);

	const visibleListings = useMemo(
		() =>
			sortListings(
				filterListingsByPrice(
					appliedCategoryId
						? listings.filter(
								(listing) =>
									listing.categoryId ===
									appliedCategoryId,
							)
						: listings,
					appliedPriceRange,
				),
				appliedSort,
			),
		[listings, appliedCategoryId, appliedPriceRange, appliedSort],
	);

	const applyAfterDelay = (apply: () => void) => {
		clearTimeout(timerRef.current);
		if (listings.length === 0) {
			apply();
			setIsApplying(false);
			return;
		}

		setIsApplying(true);
		timerRef.current = setTimeout(() => {
			apply();
			setIsApplying(false);
		}, APPLY_DELAY_MS);
	};

	return {
		listings: visibleListings,
		isApplying,
		sort: {
			value: sort,
			onChange: (value) => {
				setSort(value);
				applyAfterDelay(() => setAppliedSort(value));
			},
		},
		price: priceBounds && {
			bounds: priceBounds,
			value: priceRange ?? priceBounds,
			onChange: (value) => {
				setPriceRange(value);
				applyAfterDelay(() => setAppliedPriceRange(value));
			},
		},
		category: {
			options: categoryOptions,
			value: categoryId,
			onChange: (value) => {
				setCategoryId(value);
				applyAfterDelay(() => setAppliedCategoryId(value));
			},
		},
	};
};
