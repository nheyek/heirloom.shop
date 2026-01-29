import { Flex } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

type Props = {
	icon: IconType;
	children: React.ReactNode;
};

export const IconText = (props: Props) => (
	<Flex alignItems="center" gap={2}>
		{<props.icon />}

		<Flex gap={1.5}>{props.children}</Flex>
	</Flex>
);
