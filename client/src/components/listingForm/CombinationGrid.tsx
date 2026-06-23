import {
	Box,
	FileUpload,
	IconButton,
	Image,
	Table,
	Text,
} from '@chakra-ui/react';
import { PriceInput } from '@client/components/input/PriceInput';
import { ProcessingProfileSelect } from '@client/components/listingForm/ProcessingProfileSelect';
import {
	InputSize,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import {
	CombinationEntry,
	ProcessingProfile,
	Variation,
} from '@client/hooks/useListingForm';
import { COLOR_BRAND } from '@client/theme';
import { deriveCombinations } from '@client/utils/combinationUtils';
import { FaImage, FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

const THUMB_WIDTH = 100;

type Props = {
	variations: Record<string, Variation>;
	combinations: Record<string, CombinationEntry>;
	onUpdate: (key: string, patch: Partial<CombinationEntry>) => void;
	processingProfiles: ProcessingProfile[];
	onAddProcessingProfile: (profile: ProcessingProfile) => void;
	disabled?: boolean;
};

const DEFAULT_ENTRY: CombinationEntry = {
	imageUuid: null,
	priceCents: null,
	leadTimeProfileId: null,
	disabled: false,
};

export const CombinationGrid = ({
	variations,
	combinations,
	onUpdate,
	processingProfiles,
	onAddProcessingProfile,
	disabled,
}: Props) => {
	const sortedVariations = Object.entries(variations).sort(
		(a, b) => a[1].order - b[1].order,
	);
	const showPrice = sortedVariations.some(([, v]) => v.pricesVary);
	const showProcessingProfile = sortedVariations.some(
		([, v]) => v.leadTimesVary,
	);

	const combos = deriveCombinations(variations);
	if (combos.length === 0) return null;

	const optionName = (varId: string, optId: string) =>
		variations[varId]?.options[optId]?.name ?? '';

	return (
		<Box
			overflowX="auto"
			borderWidth={1}
			borderColor="gray.200"
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
						{showProcessingProfile && (
							<Table.ColumnHeader minW={100}>
								Processing
							</Table.ColumnHeader>
						)}
						<Table.ColumnHeader />
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{combos.map(({ key, optionIdsByVariationId }) => {
						const entry =
							combinations[key] ?? DEFAULT_ENTRY;
						const isDisabled = entry.disabled;

						return (
							<Table.Row
								key={key}
								opacity={isDisabled ? 0.6 : 1}
							>
								{/* Image */}
								<Table.Cell>
									<FileUpload.Root
										accept="image/*"
										maxFiles={1}
										disabled={
											disabled || isDisabled
										}
										onFileChange={(details) => {
											const file =
												details
													.acceptedFiles[0];
											if (file)
												onUpdate(key, {
													imageUuid:
														URL.createObjectURL(
															file,
														),
												});
										}}
									>
										<FileUpload.HiddenInput />
										<FileUpload.Trigger asChild>
											<Box
												as="button"
												width={THUMB_WIDTH}
												aspectRatio={
													STANDARD_IMAGE_ASPECT_RATIO
												}
												borderRadius="md"
												borderWidth={1}
												borderColor="gray.200"
												overflow="hidden"
												cursor="pointer"
												flexShrink={0}
												display="flex"
												alignItems="center"
												justifyContent="center"
												bg="gray.50"
											>
												{entry.imageUuid ? (
													<Image
														src={
															entry.imageUuid
														}
														width="100%"
														height="100%"
														objectFit="cover"
													/>
												) : (
													<FaImage
														color="gray"
														size={18}
													/>
												)}
											</Box>
										</FileUpload.Trigger>
									</FileUpload.Root>
								</Table.Cell>

								{/* Variation option labels */}
								{sortedVariations.map(([varId]) => (
									<Table.Cell key={varId}>
										<Text fontSize={18}>
											{optionName(
												varId,
												optionIdsByVariationId[
													varId
												],
											)}
										</Text>
									</Table.Cell>
								))}

								{/* Price */}
								{showPrice && (
									<Table.Cell>
										<PriceInput
											value={entry.priceCents}
											onChange={(cents) =>
												onUpdate(key, {
													priceCents: cents,
												})
											}
											disabled={
												disabled || isDisabled
											}
											size={InputSize.Md}
										/>
									</Table.Cell>
								)}

								{showProcessingProfile && (
									<Table.Cell>
										<ProcessingProfileSelect
											profiles={processingProfiles}
											onAddProfile={onAddProcessingProfile}
											value={
												entry.leadTimeProfileId
											}
											onChange={(v) =>
												onUpdate(key, {
													leadTimeProfileId:
														v,
												})
											}
											disabled={
												disabled || isDisabled
											}
											size={InputSize.Md}
										/>
									</Table.Cell>
								)}

								{/* Disable toggle */}
								<Table.Cell
									pl={0}
									pr={3}
									textAlign="center"
								>
									<IconButton
										size="sm"
										variant="ghost"
										color={COLOR_BRAND}
										disabled={disabled}
										onClick={() =>
											onUpdate(key, {
												disabled: !isDisabled,
											})
										}
									>
										{isDisabled ? (
											<FaPlusCircle />
										) : (
											<FaMinusCircle />
										)}
									</IconButton>
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table.Root>
		</Box>
	);
};
