import { Flex, FlexProps, IconButtonProps } from '@chakra-ui/react';
import { SortFilterDrawer } from '@client/components/input/SortFilterDrawer';
import { LISTING_SORT_LABELS } from '@client/domain/listingSort';
import { ListingView } from '@client/hooks/useListingView';
import { ReactNode } from 'react';

type Props = FlexProps & {
	view: ListingView;
	isLoading: boolean;
	sortButtonProps?: IconButtonProps;
	children?: ReactNode;
};

export const ListingViewHeader = ({
	view,
	isLoading,
	sortButtonProps,
	children,
	...flexProps
}: Props) => {
	const showControls = isLoading || view.listings.length > 0;

	if (!children && !showControls) return null;

	return (
		<Flex
			justifyContent="space-between"
			alignItems="flex-end"
			{...flexProps}
		>
			{children}
			{showControls && (
				<SortFilterDrawer
					options={LISTING_SORT_LABELS}
					value={view.sort.value}
					onChange={view.sort.onChange}
					buttonProps={sortButtonProps}
					price={view.price}
				/>
			)}
		</Flex>
	);
};
