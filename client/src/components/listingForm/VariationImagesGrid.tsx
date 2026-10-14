import { Table, Text } from '@chakra-ui/react';
import { FormSection } from '@client/components/input/FormSection';
import { ImageUploadCell } from '@client/components/listingForm/ImageUploadCell';
import {
	Variation,
	VariationImages,
} from '@client/components/listingForm/useListingForm';
import {
	deriveCombinationsList,
	getImageVaryingVariations,
	hasVariationImages,
} from '@heirloom/common/domain/listing';

type Props = {
	variations: Record<string, Variation>;
	variationImages: VariationImages | null;
	onUpdate: (key: string, imageUuid: string | null) => void;
	disabled?: boolean;
	uploadImage: (file: File) => Promise<string | null>;
	shopShortId: string;
};

export const VariationImagesGrid = ({
	variations,
	variationImages,
	onUpdate,
	disabled,
	uploadImage,
	shopShortId,
}: Props) => {
	if (!hasVariationImages(variationImages)) return null;

	const imageVaryingVariations =
		getImageVaryingVariations(variations);
	const sortedVariations = Object.entries(
		imageVaryingVariations,
	).sort((a, b) => a[1].order - b[1].order);

	return (
		<FormSection label="Variation Images">
			<Table.ScrollArea
				borderWidth={1}
				borderColor="gray.200"
				borderRadius="md"
				alignSelf="flex-start"
				maxH={500}
				position="relative"
				overscrollBehavior="none"
			>
				<Table.Root
					variant="outline"
					size="md"
					width="fit-content"
					stickyHeader
					css={{ '& th': { border: 'none' } }}
				>
					<Table.Header fontSize={16}>
						<Table.Row
							bg="bg.subtle"
							borderBottom="1px solid"
							borderBottomColor="gray.200"
						>
							<Table.ColumnHeader w={100}>
								Image
							</Table.ColumnHeader>
							{sortedVariations.map(
								([varId, variation]) => (
									<Table.ColumnHeader
										key={varId}
										minW={100}
									>
										{variation.name}
									</Table.ColumnHeader>
								),
							)}
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{deriveCombinationsList(
							imageVaryingVariations,
						).map(({ key, optionMap }) => (
							<Table.Row key={key}>
								<Table.Cell p={0}>
									<ImageUploadCell
										imageUuid={
											variationImages[key] ??
											null
										}
										disabled={disabled}
										shopShortId={shopShortId}
										uploadImage={uploadImage}
										onUpload={(uuid) =>
											onUpdate(key, uuid)
										}
									/>
								</Table.Cell>
								{sortedVariations.map(([varId]) => (
									<Table.Cell key={varId}>
										<Text fontSize={18}>
											{variations[varId]
												?.options[
												optionMap[varId]
											]?.name ?? ''}
										</Text>
									</Table.Cell>
								))}
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</Table.ScrollArea>
		</FormSection>
	);
};
