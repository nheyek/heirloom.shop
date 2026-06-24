import {
	Box,
	Fieldset,
	HStack,
	Stack,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import { CategoryCombobox } from '@client/components/input/CategoryCombobox';
import {
	FormField,
	FormInput,
	FormTextarea,
} from '@client/components/input/FormField';
import { PriceInput } from '@client/components/input/PriceInput';
import { ProcessingProfileSelect } from '@client/components/listingForm/ProcessingProfileSelect';
import { ShippingProfileSelect } from '@client/components/listingForm/ShippingProfileSelect';
import { ReturnProfileSelect } from '@client/components/listingForm/ReturnProfileSelect';
import { AddFieldButton } from '@client/components/listingForm/AddFieldButton';
import { DescrSectionDialog } from '@client/components/listingForm/DescrSectionDialog';
import { DescrSectionList } from '@client/components/listingForm/DescrSectionList';
import { ListingImageUpload } from '@client/components/listingForm/ListingImageUpload';
import { SortableFieldList } from '@client/components/listingForm/SortableFieldList';
import { VariationDialog } from '@client/components/listingForm/VariationDialog';
import {
	InputSize,
	MAX_DESCR_SECTIONS,
	THUMBNAIL_GAP,
	THUMBNAIL_WIDTH,
} from '@client/constants';
import {
	ListingDescrSection,
	ListingFormState,
} from '@client/hooks/useListingForm';
import { CHAKRA_SPACING_UNIT } from '@client/theme';
import { useState } from 'react';

const IMAGES_W =
	3 * THUMBNAIL_WIDTH + 2 * (CHAKRA_SPACING_UNIT * THUMBNAIL_GAP);

type ListingFormFieldsProps = {
	form: ListingFormState;
	disabled?: boolean;
};

export const ListingFormFields = ({
	form,
	disabled,
}: ListingFormFieldsProps) => {
	const [variationDialogOpen, setVariationDialogOpen] =
		useState(false);
	const [editingVariationId, setEditingVariationId] = useState<
		string | null
	>(null);

	const openAddVariation = () => {
		setEditingVariationId(null);
		setVariationDialogOpen(true);
	};

	const openEditVariation = (id: string) => {
		setEditingVariationId(id);
		setVariationDialogOpen(true);
	};

	const sortedVariations = Object.entries(form.variations).sort(
		(a, b) => a[1].order - b[1].order,
	);

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
					<Wrap
						columnGap={8}
						rowGap={5}
						align="start"
					>
						<WrapItem
							w={{ base: '100%', md: 500 }}
							flexShrink={0}
						>
							<Stack
								gap={5}
								w="full"
							>
								<FormField
									label="Title"
									error={form.titleError}
								>
									<FormInput
										value={form.title}
										onChange={(e) =>
											form.setTitle(
												e.target.value,
											)
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
											form.setSubtitle(
												e.target.value,
											)
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
											if (v)
												form.setCategoryError(
													null,
												);
										}}
										disabled={disabled}
									/>
								</FormField>
							</Stack>
						</WrapItem>

						<WrapItem
							minW={280}
							flex="1"
						>
							<FormField label="Description">
								<Stack gap={2}>
									{form.descrSections.length >
										0 && (
										<DescrSectionList
											sections={
												form.descrSections
											}
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
											<AddFieldButton
												onClick={openAdd}
												disabled={disabled}
											>
												Add Section
											</AddFieldButton>
										</HStack>
									)}
								</Stack>
							</FormField>
						</WrapItem>
					</Wrap>

					<FormField
						label="Images"
						error={form.imageError}
					>
						<Box w={{ base: '100%', md: IMAGES_W }}>
							<ListingImageUpload
								imageEntries={form.imageEntries}
								onAdd={form.addImageFiles}
								onRemove={form.removeImage}
								onReorder={form.reorderImageEntries}
								disabled={disabled}
							/>
						</Box>
					</FormField>

					{!sortedVariations.some(
						([, v]) => v.pricesVary,
					) && (
						<FormField label="Price">
							<PriceInput
								size={InputSize.Lg}
								value={form.priceCents}
								onChange={form.setPriceCents}
								disabled={disabled}
							/>
						</FormField>
					)}

					<Wrap
						gap={10}
						align="start"
					>
						{!sortedVariations.some(
							([, v]) => v.leadTimesVary,
						) && (
							<WrapItem>
								<FormField label="Processing">
									<ProcessingProfileSelect
										profiles={
											form.processingProfiles
										}
										onAddProfile={
											form.addProcessingProfile
										}
										value={
											form.processingProfileId
										}
										onChange={
											form.setProcessingProfileId
										}
										disabled={disabled}
										size={InputSize.Lg}
									/>
								</FormField>
							</WrapItem>
						)}
						<WrapItem>
							<FormField label="Shipping">
								<ShippingProfileSelect
									profiles={
										form.shippingProfiles
									}
									onAddProfile={
										form.addShippingProfile
									}
									value={form.shippingProfileId}
									onChange={
										form.setShippingProfileId
									}
									disabled={disabled}
									size={InputSize.Lg}
								/>
							</FormField>
						</WrapItem>
						<WrapItem>
							<FormField label="Returns">
								<ReturnProfileSelect
									profiles={form.returnProfiles}
									onAddProfile={
										form.addReturnProfile
									}
									value={form.returnProfileId}
									onChange={
										form.setReturnProfileId
									}
									disabled={disabled}
									size={InputSize.Lg}
								/>
							</FormField>
						</WrapItem>
					</Wrap>

					<FormField label="Variations">
						<Stack gap={2}>
							{sortedVariations.length > 0 && (
								<SortableFieldList
									items={sortedVariations.map(
										([id, v]) => ({
											id,
											label: v.name,
										}),
									)}
									onEdit={openEditVariation}
									onDelete={form.removeVariation}
									onReorder={form.reorderVariations}
								/>
							)}
							<HStack>
								<AddFieldButton
									onClick={openAddVariation}
									disabled={disabled}
								>
									Add Variation
								</AddFieldButton>
							</HStack>
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
			<VariationDialog
				open={variationDialogOpen}
				initial={
					editingVariationId
						? form.variations[editingVariationId]
						: null
				}
				existingNames={Object.entries(form.variations)
					.filter(([id]) => id !== editingVariationId)
					.map(([, v]) => v.name)}
				onClose={() => setVariationDialogOpen(false)}
				onConfirm={(variation) => {
					if (editingVariationId) {
						form.updateVariation(
							editingVariationId,
							variation,
						);
					} else {
						form.addVariation({
							...variation,
							order: Object.keys(form.variations)
								.length,
						});
					}
				}}
			/>
		</>
	);
};
