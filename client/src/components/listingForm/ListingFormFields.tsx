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
import { AddFieldButton } from '@client/components/listingForm/AddFieldButton';
import { DescrSectionDialog } from '@client/components/listingForm/DescrSectionDialog';
import { DescrSectionList } from '@client/components/listingForm/DescrSectionList';
import { ListingImageUpload } from '@client/components/listingForm/ListingImageUpload';
import { ProcessingProfileSelect } from '@client/components/listingForm/ProcessingProfileSelect';
import { ReturnProfileSelect } from '@client/components/listingForm/ReturnProfileSelect';
import { ShippingProfileSelect } from '@client/components/listingForm/ShippingProfileSelect';
import { SortableFieldList } from '@client/components/listingForm/SortableFieldList';
import { VariationDialog } from '@client/components/listingForm/VariationDialog';
import {
	InputSize,
	THUMBNAIL_GAP,
	THUMBNAIL_WIDTH,
} from '@client/constants';
import {
	ListingDescrSection,
	ListingFormState,
} from '@client/hooks/useListingForm';
import { CHAKRA_SPACING_UNIT } from '@client/theme';
import { LISTING_LIMITS } from '@heirloom/common/constants';
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
									required
								>
									<FormInput
										value={form.title}
										onChange={(e) => {
											form.setTitle(
												e.target.value,
											);
											if (form.titleError)
												form.setTitleError(
													null,
												);
										}}
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
										onChange={(e) => {
											form.setSubtitle(
												e.target.value,
											);
											if (form.subtitleError)
												form.setSubtitleError(
													null,
												);
										}}
										placeholder="e.g. Full-grain vegetable-tanned leather, made to last a lifetime"
										disabled={disabled}
									/>
								</FormField>
								<FormField
									label="Category"
									error={form.categoryError}
									required
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
										LISTING_LIMITS.maxDescrSections && (
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
						required
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

					<Wrap
						gap={5}
						align="start"
					>
						{!sortedVariations.some(
							([, v]) => v.pricesVary,
						) && (
							<WrapItem>
								<FormField
									label="Price"
									error={form.priceError}
									required
								>
									<PriceInput
										size={InputSize.Lg}
										value={form.priceCents}
										onChange={(v) => {
											form.setPriceCents(v);
											if (v && v > 0)
												form.setPriceError(
													null,
												);
										}}
										invalid={!!form.priceError}
										disabled={disabled}
									/>
								</FormField>
							</WrapItem>
						)}
					</Wrap>

					<Wrap
						justifyContent="space-between"
						align="start"
						maxW={650}
						gap={5}
					>
						<WrapItem>
							<FormField
								label="Processing"
								error={form.processingProfileError}
								required
							>
								<ProcessingProfileSelect
									profiles={form.processingProfiles}
									onAddProfile={
										form.addProcessingProfile
									}
									value={form.processingProfileId}
									onChange={(v) => {
										form.setProcessingProfileId(
											v,
										);
										if (v)
											form.setProcessingProfileError(
												null,
											);
									}}
									disabled={disabled}
								/>
							</FormField>
						</WrapItem>
						<WrapItem>
							<FormField
								label="Shipping"
								error={form.shippingProfileError}
								required
							>
								<ShippingProfileSelect
									profiles={form.shippingProfiles}
									onAddProfile={
										form.addShippingProfile
									}
									value={form.shippingProfileId}
									onChange={(v) => {
										form.setShippingProfileId(v);
										if (v)
											form.setShippingProfileError(
												null,
											);
									}}
									disabled={disabled}
								/>
							</FormField>
						</WrapItem>
						<WrapItem>
							<FormField
								label="Returns"
								error={form.returnProfileError}
								required
							>
								<ReturnProfileSelect
									profiles={form.returnProfiles}
									onAddProfile={
										form.addReturnProfile
									}
									value={form.returnProfileId}
									onChange={(v) => {
										form.setReturnProfileId(v);
										if (v)
											form.setReturnProfileError(
												null,
											);
									}}
									disabled={disabled}
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
							{sortedVariations.length <
								LISTING_LIMITS.maxVariations && (
								<HStack>
									<AddFieldButton
										onClick={openAddVariation}
										disabled={disabled}
									>
										Add Variation
									</AddFieldButton>
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
