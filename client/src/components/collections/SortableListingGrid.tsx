import { Flex, FlexProps } from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { SortFilterDrawer } from '@client/components/input/SortFilterDrawer';
import { ListingView } from '@client/hooks/useListingView';
import { LISTING_SORT_LABELS } from '@client/domain/listingSort';
import { ComponentProps, ReactNode } from 'react';

type Props = Omit<ComponentProps<typeof ListingGrid>, 'listings'> & {
	view: ListingView;
	heading?: ReactNode;
	headerProps?: FlexProps;
};

export const SortableListingGrid = ({
	view,
	heading,
	headerProps,
	...gridProps
}: Props) => {
	const showControls =
		gridProps.isLoading || view.listings.length > 0;

	return (
		<ListingGrid
			{...gridProps}
			listings={view.listings}
			isLoading={gridProps.isLoading || view.isApplying}
			header={
				(heading || showControls) && (
					<Flex
						justifyContent="space-between"
						alignItems="flex-end"
						{...headerProps}
					>
						{heading}
						{showControls && (
							<SortFilterDrawer
								options={LISTING_SORT_LABELS}
								value={view.sort.value}
								onChange={view.sort.onChange}
								{...(view.price && {
									price: view.price,
								})}
							/>
						)}
					</Flex>
				)
			}
		/>
	);
};
