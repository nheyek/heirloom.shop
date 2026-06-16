import { Button, Fieldset, HStack, Stack } from '@chakra-ui/react';
import { CategoryCombobox } from '@client/components/input/CategoryCombobox';
import {
	FormField,
	FormInput,
	FormTextarea,
} from '@client/components/input/FormField';
import { DescrSectionDialog } from '@client/components/listing/DescrSectionDialog';
import { DescrSectionList } from '@client/components/listing/DescrSectionList';
import { ListingImageUpload } from '@client/components/listing/ListingImageUpload';
import { MAX_DESCR_SECTIONS } from '@client/constants';
import {
	ListingDescrSection,
	ListingFormState,
} from '@client/hooks/useListingForm';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

type ListingFormFieldsProps = {
	form: ListingFormState;
	disabled?: boolean;
};

export const ListingFormFields = ({
	form,
	disabled,
}: ListingFormFieldsProps) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingIndex, setEditingIndex] = useState<number | null>(
		null,
	);

	const openAdd = () => {
		setEditingIndex(null);
		setDialogOpen(true);
	};

	const openEdit = (index: number) => {
		setEditingIndex(index);
		setDialogOpen(true);
	};

	const handleConfirm = (section: ListingDescrSection) => {
		if (editingIndex !== null) {
			form.updateDescrSection(editingIndex, section);
		} else {
			form.addDescrSection(section);
		}
	};

	const editingSection =
		editingIndex !== null
			? form.descrSections[editingIndex]
			: null;
	const existingTitles = form.descrSections
		.filter((_, i) => i !== editingIndex)
		.map((s) => s.title);

	return (
		<>
			<Fieldset.Root>
				<Stack gap={5}>
					<FormField
						label="Title"
						error={form.titleError}
					>
						<FormInput
							value={form.title}
							onChange={(e) =>
								form.setTitle(e.target.value)
							}
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
							onChange={(e) =>
								form.setSubtitle(e.target.value)
							}
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
							onReorder={form.reorderImageEntries}
							disabled={disabled}
						/>
					</FormField>
					<FormField label="Description">
						<Stack gap={3}>
							{form.descrSections.length > 0 && (
								<DescrSectionList
									sections={form.descrSections}
									ids={form.descrSectionIds}
									onEdit={openEdit}
									onDelete={
										form.removeDescrSection
									}
									onReorder={
										form.reorderDescrSections
									}
								/>
							)}
							{form.descrSections.length <
								MAX_DESCR_SECTIONS && (
								<HStack>
									<Button
										size="md"
										onClick={openAdd}
										disabled={disabled}
										fontSize={18}
										variant="subtle"
									>
										<FaPlus />
										Add Section
									</Button>
								</HStack>
							)}
						</Stack>
					</FormField>
				</Stack>
			</Fieldset.Root>

			<DescrSectionDialog
				open={dialogOpen}
				initial={editingSection}
				existingTitles={existingTitles}
				onClose={() => setDialogOpen(false)}
				onConfirm={handleConfirm}
			/>
		</>
	);
};
