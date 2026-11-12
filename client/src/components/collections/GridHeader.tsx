import { Flex, FlexProps } from '@chakra-ui/react';
import { SELECT_TRIGGER_HEIGHT } from '@client/constants';

export const GridHeader = (props: FlexProps) => (
	<Flex
		minH={SELECT_TRIGGER_HEIGHT}
		justifyContent="space-between"
		alignItems="flex-end"
		{...props}
	/>
);
