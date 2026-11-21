import { Text } from '@chakra-ui/react';
import { ERROR_COLOR } from '@client/constants';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof Text>;

export const FieldError = ({
	fontSize = 15,
	children,
	...rest
}: Props) => (
	<Text
		fontSize={fontSize}
		fontWeight={500}
		color={ERROR_COLOR}
		{...rest}
	>
		{children}
	</Text>
);
