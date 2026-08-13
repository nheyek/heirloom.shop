import { CardRootProps, useBreakpointValue } from '@chakra-ui/react';
import { Layout } from '@client/constants';

// Shared between the shopping cart drawer and the order page so both render
// item cards the same way: horizontal rows stacked vertically on desktop,
// a horizontally scrolling row of compact cards on mobile (full width
// instead of a fixed min width when there's only one item).
export const useOrderItemCardLayout = (itemCount: number) => {
	const layout = useBreakpointValue({
		base: Layout.MOBILE,
		md: Layout.DESKTOP,
	});
	const isCompact = layout === Layout.MOBILE;

	const cardProps: CardRootProps | undefined = isCompact
		? {
				minW: 300,
				...(itemCount === 1 && { width: '100%' }),
			}
		: undefined;

	return { layout, isCompact, cardProps };
};
