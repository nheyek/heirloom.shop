import { Flex, FlexProps, Heading } from '@chakra-ui/react';
import { SELECT_TRIGGER_HEIGHT } from '@client/constants';

type Props = FlexProps & {
	title?: string;
};

export const GridHeader = ({ title, children, ...props }: Props) => (
	<Flex
		minH={SELECT_TRIGGER_HEIGHT}
		justifyContent="space-between"
		alignItems="flex-end"
		{...props}
	>
		{title && (
			<Heading
				size="xl"
				minW={0}
				mb={-2.5}
			>
				{title}
			</Heading>
		)}
		{children}
	</Flex>
);
