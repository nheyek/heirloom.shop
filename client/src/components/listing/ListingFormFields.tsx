import { Fieldset, Stack } from '@chakra-ui/react';
import { FormField, FormInput, FormTextarea } from '@client/components/input/FormField';
import { ListingFormState } from '@client/hooks/useListingForm';

type ListingFormFieldsProps = {
	form: ListingFormState;
	disabled?: boolean;
};

export const ListingFormFields = ({
	form,
	disabled,
}: ListingFormFieldsProps) => (
	<Fieldset.Root>
		<Stack gap={5}>
			<FormField
				label="Title"
				error={form.titleError}
			>
				<FormInput
					value={form.title}
					onChange={(e) => form.setTitle(e.target.value)}
					placeholder="e.g. Hand-stitched leather wallet"
					disabled={disabled}
				/>
			</FormField>
			<FormField
				label="Subtitle"
				error={form.subtitleError}
			>
				<FormTextarea
					value={form.subtitle}
					onChange={(e) => form.setSubtitle(e.target.value)}
					placeholder="e.g. Full-grain vegetable-tanned leather, made to last a lifetime"
					rows={2}
					disabled={disabled}
				/>
			</FormField>
		</Stack>
	</Fieldset.Root>
);
