import { Text } from '@chakra-ui/react';
import { FIELD_ERROR_COLOR } from '@client/theme';

type Props = {
	error: string;
};

export const FieldError = ({ error }: Props) => (
	<Text
		fontSize={15}
		fontWeight={500}
		color={FIELD_ERROR_COLOR}
	>
		{error}
	</Text>
);
