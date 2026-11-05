import { useBreakpointValue } from '@chakra-ui/react';
import { Layout } from '@client/constants';

export const useOrderItemCardLayout = () => {
	const layout = useBreakpointValue({
		base: Layout.MOBILE,
		md: Layout.DESKTOP,
	});
	const isCompact = layout === Layout.MOBILE;

	return { layout, isCompact };
};
