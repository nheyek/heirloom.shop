import {
	Field,
	FieldRootProps,
	HStack,
	Input,
	InputProps,
	Textarea,
	TextareaProps,
} from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
import { ListingFormFieldLabel } from '@client/components/listingForm/ListingFormFieldLabel';
import { FORM_LABEL_GAP, SANS_FONT_FAMILY } from '@client/constants';
import { ReactNode } from 'react';

export const FormField = ({
	label,
	labelEnd,
	error,
	children,
	...rest
}: FieldRootProps & {
	label: ReactNode;
	labelEnd?: ReactNode;
	error?: string | null;
	children: ReactNode;
}) => (
	<Field.Root
		gap={FORM_LABEL_GAP}
		invalid={!!error}
		{...rest}
	>
		<HStack
			w="100%"
			justify="space-between"
		>
			<Field.Label asChild>
				<ListingFormFieldLabel as="label">
					{label}
					<Field.RequiredIndicator
						fontFamily={SANS_FONT_FAMILY}
					/>
				</ListingFormFieldLabel>
			</Field.Label>
			{labelEnd}
		</HStack>
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
