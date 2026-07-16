import {
	Field,
	FieldRootProps,
	Input,
	InputProps,
	Textarea,
	TextareaProps,
} from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
import { sansFontFamily, TEXT_STYLES } from '@client/theme';
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
		<Field.Label textStyle={TEXT_STYLES.fieldLabel}>
			{label}
			<Field.RequiredIndicator fontFamily={sansFontFamily} />
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
