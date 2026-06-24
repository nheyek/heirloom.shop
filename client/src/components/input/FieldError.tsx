import { Text } from '@chakra-ui/react';
import { FIELD_ERROR_COLOR } from '@client/theme';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof Text>;

export const FieldError = ({ fontSize = 15, children, ...rest }: Props) => (
	<Text
		fontSize={fontSize}
		fontWeight={500}
		color={FIELD_ERROR_COLOR}
		{...rest}
	>
		{children}
	</Text>
);
