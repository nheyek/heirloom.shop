import {
	Field,
	FieldRootProps,
	Input,
	InputProps,
	Textarea,
	TextareaProps,
} from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
import { FONT_SANS } from '@client/theme';
import { ReactNode } from 'react';

export const FormField = ({
	label,
	error,
	children,
	...rest
}: FieldRootProps & {
	label: string;
	error?: string | null;
	children: ReactNode;
}) => (
	<Field.Root
		invalid={!!error}
		{...rest}
	>
		<Field.Label
			fontSize={18}
			fontWeight={500}
		>
			{label}
			<Field.RequiredIndicator fontFamily={FONT_SANS} />
		</Field.Label>
		{children}
		{error && <FieldError>{error}</FieldError>}
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

export const FormTextarea = (props: TextareaProps) => (
	<Textarea
		size="xl"
		fontSize={18}
		padding={3}
		resize="none"
		rows={3}
		{...props}
	/>
);
