import { Flex, Stack } from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { SortFilterDrawer } from '@client/components/input/SortFilterDrawer';
import { ListingView } from '@client/hooks/useListingView';
import { LISTING_SORT_LABELS } from '@client/domain/listingSort';
import { ComponentProps, ReactNode } from 'react';

type Props = Omit<ComponentProps<typeof ListingGrid>, 'listings'> & {
	view: ListingView;
	heading?: ReactNode;
};

export const SortableListingGrid = ({
	view,
	heading,
	...gridProps
}: Props) => {
	const showControls =
		gridProps.isLoading || view.listings.length > 0;

	return (
		<Stack
			gap={3}
			width="100%"
		>
			{(heading || showControls) && (
				<Flex
					justifyContent="space-between"
					alignItems="flex-end"
				>
					{heading}
					{showControls && (
						<SortFilterDrawer
							options={LISTING_SORT_LABELS}
							value={view.sort.value}
							onChange={view.sort.onChange}
							{...(view.price && { price: view.price })}
						/>
					)}
				</Flex>
			)}

			<ListingGrid
				{...gridProps}
				listings={view.listings}
				isLoading={gridProps.isLoading || view.isApplying}
			/>
		</Stack>
	);
};
