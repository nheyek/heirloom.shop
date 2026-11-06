import { Flex, FlexProps } from '@chakra-ui/react';

const GRID_HEADER_MIN_HEIGHT = 12;

export const GridHeader = (props: FlexProps) => (
	<Flex
		minH={GRID_HEADER_MIN_HEIGHT}
		justifyContent="space-between"
		alignItems="flex-end"
		{...props}
	/>
);
