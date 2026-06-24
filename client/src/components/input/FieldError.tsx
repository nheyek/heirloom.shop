import { Text } from '@chakra-ui/react';

type Props = {
	error: string;
};

export const FieldError = ({ error }: Props) => (
	<Text
		fontSize={15}
		fontWeight={500}
		color="red.500"
	>
		{error}
	</Text>
);
