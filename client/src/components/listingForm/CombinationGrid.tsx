import {
	Box,
	FileUpload,
	Image,
	Stack,
	Switch,
	Table,
	Text,
} from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
import { PriceInput } from '@client/components/input/PriceInput';
import {
	InputSize,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { Combination, Variation } from '@client/hooks/useListingForm';
import { FIELD_ERROR_COLOR } from '@client/theme';
import { listingImageUrl } from '@client/utils/imageUtils';
import {
	deriveCombinationsList,
	resolveEffectiveCombinationImage,
	resolveEffectiveCombinationPrice,
} from '@heirloom/common/domain/listing';
import { useState } from 'react';
import { FaImage } from 'react-icons/fa';

const THUMB_WIDTH = 100;

type Props = {
	variations: Record<string, Variation>;
	combinations: Record<string, Combination>;
	onUpdate: (key: string, patch: Partial<Combination>) => void;
	combinationPriceErrors?: Record<string, boolean>;
	invalid?: boolean;
	disabled?: boolean;
	uploadImage: (file: File) => Promise<string | null>;
	shopShortId: string;
};

const DEFAULT_ENTRY: Combination = {
	imageUuid: null,
	priceCents: null,
	disabled: false,
};

export const CombinationGrid = ({
	variations,
	combinations,
	onUpdate,
	combinationPriceErrors = {},
	invalid,
	disabled,
	uploadImage,
	shopShortId,
}: Props) => {
	const [uploadingKeys, setUploadingKeys] = useState<Set<string>>(new Set());
	const sortedVariations = Object.entries(variations).sort(
		(a, b) => a[1].order - b[1].order,
	);
	const showPrice = sortedVariations.some(([, v]) => v.pricesVary);

	const combos = deriveCombinationsList(variations);
	if (combos.length === 0) return null;

	const optionName = (varId: string, optId: string) =>
		variations[varId]?.options[optId]?.name ?? '';

	return (
		<Box
			overflowX="auto"
			borderWidth={1}
			borderColor={invalid ? FIELD_ERROR_COLOR : 'gray.200'}
			borderRadius="md"
			display="inline-block"
			maxW="100%"
			alignSelf="flex-start"
		>
			<Table.Root
				variant="outline"
				size="md"
				width="fit-content"
			>
				<Table.Header fontSize={16}>
					<Table.Row>
						<Table.ColumnHeader w={100}>
							Image
						</Table.ColumnHeader>
						{sortedVariations.map(([varId, v]) => (
							<Table.ColumnHeader
								key={varId}
								minW={100}
							>
								{v.name}
							</Table.ColumnHeader>
						))}
						{showPrice && (
							<Table.ColumnHeader>
								Price
							</Table.ColumnHeader>
						)}
						<Table.ColumnHeader textAlign="center">
							Active
						</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{combos.map(({ key, optionMap }) => {
						const entry =
							combinations[key] ?? DEFAULT_ENTRY;
						const isDisabled = entry.disabled;
						const effectiveImage =
							resolveEffectiveCombinationImage(
								optionMap,
								combinations,
								variations,
							);
						const effectivePrice =
							resolveEffectiveCombinationPrice(
								optionMap,
								combinations,
								variations,
								null,
							);
						const imageIsInherited =
							!entry.imageUuid && !!effectiveImage;
						const priceIsInherited =
							entry.priceCents == null &&
							effectivePrice != null;

						return (
							<Table.Row key={key}>
								{/* Image */}
								<Table.Cell
									p={0}
									opacity={isDisabled ? 0.5 : 1}
								>
									<FileUpload.Root
										accept="image/*"
										maxFiles={1}
										disabled={
											disabled || isDisabled
										}
										onFileChange={async (details) => {
											const file = details.acceptedFiles[0];
											if (!file) return;
											setUploadingKeys((prev) => new Set(prev).add(key));
											const uuid = await uploadImage(file);
											setUploadingKeys((prev) => {
												const next = new Set(prev);
												next.delete(key);
												return next;
											});
											if (uuid) onUpdate(key, { imageUuid: uuid });
										}}
										pr={2}
									>
										<FileUpload.HiddenInput />
										<FileUpload.Trigger asChild>
											<Box
												as="button"
												width={THUMB_WIDTH}
												aspectRatio={
													STANDARD_IMAGE_ASPECT_RATIO
												}
												overflow="hidden"
												cursor="pointer"
												flexShrink={0}
												display="flex"
												alignItems="center"
												justifyContent="center"
												bg="gray.50"
											>
												{effectiveImage ? (
													<Image
														src={listingImageUrl(shopShortId, effectiveImage)}
														width="100%"
														height="100%"
														objectFit="cover"
														opacity={
															uploadingKeys.has(key)
																? 0.5
																: imageIsInherited
																	? 0.5
																	: 1
														}
													/>
												) : uploadingKeys.has(key) ? (
													<FaImage
														color="gray"
														size={20}
														opacity={0.4}
													/>
												) : (
													<FaImage
														color="gray"
														size={20}
													/>
												)}
											</Box>
										</FileUpload.Trigger>
									</FileUpload.Root>
								</Table.Cell>

								{/* Variation option labels */}
								{sortedVariations.map(([varId]) => (
									<Table.Cell
										key={varId}
										opacity={isDisabled ? 0.5 : 1}
									>
										<Text fontSize={18}>
											{optionName(
												varId,
												optionMap[varId],
											)}
										</Text>
									</Table.Cell>
								))}

								{/* Price */}
								{showPrice && (
									<Table.Cell
										opacity={isDisabled ? 0.5 : 1}
									>
										<Stack gap={1.5}>
											<PriceInput
												value={
													entry.priceCents ??
													effectivePrice
												}
												onChange={(cents) =>
													onUpdate(key, {
														priceCents:
															cents,
													})
												}
												invalid={
													!!combinationPriceErrors[
														key
													]
												}
												disabled={
													disabled ||
													isDisabled
												}
												size={InputSize.Md}
												inherited={
													priceIsInherited
												}
											/>
											{combinationPriceErrors[
												key
											] && (
												<FieldError
													fontSize={14}
												>
													Price is required.
												</FieldError>
											)}
										</Stack>
									</Table.Cell>
								)}

								{/* Active toggle */}
								<Table.Cell textAlign="center">
									<Switch.Root
										checked={!isDisabled}
										onCheckedChange={({
											checked,
										}) =>
											onUpdate(key, {
												disabled: !checked,
											})
										}
										disabled={disabled}
									>
										<Switch.HiddenInput />
										<Switch.Control />
									</Switch.Root>
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table.Root>
		</Box>
	);
};
