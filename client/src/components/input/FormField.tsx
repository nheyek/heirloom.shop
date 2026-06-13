import { Field, Input, InputProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const FormField = ({
	label,
	error,
	children,
}: {
	label: string;
	error?: string | null;
	children: ReactNode;
}) => (
	<Field.Root invalid={!!error}>
		<Field.Label
			fontSize={18}
			fontWeight={500}
		>
			{label}
		</Field.Label>
		{children}
		{error && (
			<Field.ErrorText fontSize={15}>{error}</Field.ErrorText>
		)}
	</Field.Root>
);

export const FormInput = (props: InputProps) => (
	<Input
		size="xl"
		fontSize={18}
		padding={3}
		{...props}
	/>
);
