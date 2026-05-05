import { Input, InputProps } from '@chakra-ui/react';
import { FIELD_ERROR_COLOR } from '@client/theme';

export const TextInput = ({
	invalid,
	...rest
}: InputProps & { invalid?: boolean }) => (
	<Input
		variant="subtle"
		fontSize={16}
		p={3}
		height={12}
		borderRadius={5}
		border={
			invalid ? `1px solid ${FIELD_ERROR_COLOR}` : undefined
		}
		{...rest}
	/>
);
