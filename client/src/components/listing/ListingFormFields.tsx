import { Fieldset, Stack } from '@chakra-ui/react';
import { CategoryCombobox } from '@client/components/input/CategoryCombobox';
import { FormField, FormInput, FormTextarea } from '@client/components/input/FormField';
import { ListingImageUpload } from '@client/components/listing/ListingImageUpload';
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
			<FormField
				label="Category"
				error={form.categoryError}
			>
				<CategoryCombobox
					value={form.categoryId}
					onChange={(v) => {
						form.setCategoryId(v);
						if (v) form.setCategoryError(null);
					}}
					disabled={disabled}
				/>
			</FormField>
			<FormField
				label="Images"
				error={form.imageError}
			>
				<ListingImageUpload
					imageEntries={form.imageEntries}
					onAdd={form.addImageFiles}
					onRemove={form.removeImage}
					disabled={disabled}
				/>
			</FormField>
		</Stack>
	</Fieldset.Root>
);
