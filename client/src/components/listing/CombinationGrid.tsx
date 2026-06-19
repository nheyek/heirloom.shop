import {
	Box,
	FileUpload,
	HStack,
	IconButton,
	Image,
	InputGroup,
	NativeSelect,
	NumberInput,
	Table,
	Text,
} from '@chakra-ui/react';
import { STANDARD_IMAGE_ASPECT_RATIO } from '@client/constants';
import {
	CombinationEntry,
	Variation,
} from '@client/hooks/useListingForm';
import { COLOR_BRAND } from '@client/theme';
import { deriveCombinations } from '@client/utils/combinationUtils';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { FaDollarSign, FaUpload } from 'react-icons/fa6';

const THUMB_WIDTH = 100;

type Props = {
	variations: Record<string, Variation>;
	combinations: Record<string, CombinationEntry>;
	onUpdate: (key: string, patch: Partial<CombinationEntry>) => void;
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
	disabled,
}: Props) => {
	const sortedVariations = Object.entries(variations).sort(
		(a, b) => a[1].order - b[1].order,
	);
	const showPrice = sortedVariations.some(([, v]) => v.pricesVary);
	const showLeadTime = sortedVariations.some(
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
		>
			<Table.Root
				variant="outline"
				size="md"
				fontSize={16}
				minWidth="max-content"
			>
				<Table.Header fontSize={15}>
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
						{showLeadTime && (
							<Table.ColumnHeader minW={100}>
								Lead Time
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
													<FaUpload
														color="gray"
														size={14}
													/>
												)}
											</Box>
										</FileUpload.Trigger>
									</FileUpload.Root>
								</Table.Cell>

								{/* Variation option labels */}
								{sortedVariations.map(([varId]) => (
									<Table.Cell key={varId}>
										<Text
											fontSize={16}
											maxW={150}
										>
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
										<HStack gap={1}>
											<NumberInput.Root
												value={
													entry.priceCents
														? (
																entry.priceCents /
																100
															).toLocaleString()
														: ''
												}
												onValueChange={(
													details,
												) => {
													const val =
														details.value ===
														''
															? null
															: parseFloat(
																	details.value.replace(
																		/[^0-9.-]/g,
																		'',
																	),
																) *
																100;
													onUpdate(key, {
														priceCents:
															isNaN(
																val as number,
															)
																? null
																: val,
													});
												}}
												min={0}
												step={0.01}
												formatOptions={{
													minimumFractionDigits: 0,
													maximumFractionDigits: 2,
												}}
												disabled={
													disabled ||
													isDisabled
												}
											>
												<InputGroup
													startElement={
														<FaDollarSign />
													}
												>
													<NumberInput.Input
														fontSize={18}
														placeholder="00.00"
														w={115}
													/>
												</InputGroup>
											</NumberInput.Root>
										</HStack>
									</Table.Cell>
								)}

								{/* Lead time (placeholder) */}
								{showLeadTime && (
									<Table.Cell>
										<NativeSelect.Root
											size="sm"
											width="120px"
											disabled={
												disabled || isDisabled
											}
										>
											<NativeSelect.Field
												fontSize={15}
												value={
													entry.leadTimeProfileId ??
													''
												}
												onChange={(e) =>
													onUpdate(key, {
														leadTimeProfileId:
															e.target
																.value ||
															null,
													})
												}
											>
												<option value="">
													Default
												</option>
											</NativeSelect.Field>
											<NativeSelect.Indicator />
										</NativeSelect.Root>
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
