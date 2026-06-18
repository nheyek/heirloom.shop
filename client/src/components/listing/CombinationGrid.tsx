import {
	Box,
	Grid,
	GridItem,
	HStack,
	IconButton,
	Image,
	InputGroup,
	NativeSelect,
	NumberInput,
	Text,
} from '@chakra-ui/react';
import { ImageDropzone } from '@client/components/input/ImageDropzone';
import { STANDARD_IMAGE_ASPECT_RATIO } from '@client/constants';
import {
	CombinationEntry,
	Variation,
} from '@client/hooks/useListingForm';
import { COLOR_BRAND } from '@client/theme';
import { deriveCombinations } from '@client/utils/combinationUtils';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa6';

const THUMB_HEIGHT = 60;
const THUMB_WIDTH = THUMB_HEIGHT * STANDARD_IMAGE_ASPECT_RATIO;

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
		<Box overflowX="auto">
			<Grid
				width="fit-content"
				gapX={2}
				gapY={5}
				templateColumns={[
					'100px',
					...sortedVariations.map(() => 'minmax(100px, 1fr)'),
					...(showPrice ? ['125px'] : []),
					...(showLeadTime ? ['minmax(100px, 1fr)'] : []),
					'36px',
				].join(' ')}
			>
				{/* Header */}
				<Text
					fontSize={16}
					fontWeight={500}
					color="gray.500"
					px={1}
				>
					Image
				</Text>
				{sortedVariations.map(([varId, v]) => (
					<GridItem
						key={varId}
						display="flex"
						alignItems="flex-end"
					>
						<Text
							fontSize={16}
							fontWeight={500}
							color="gray.500"
							px={1}
						>
							{v.name}
						</Text>
					</GridItem>
				))}
				{showPrice && (
					<GridItem
						display="flex"
						alignItems="flex-end"
					>
						<Text
							fontSize={16}
							fontWeight={500}
							color="gray.500"
						>
							Price
						</Text>
					</GridItem>
				)}
				{showLeadTime && (
					<GridItem
						display="flex"
						alignItems="flex-end"
					>
						<Text
							fontSize={16}
							fontWeight={500}
							color="gray.500"
						>
							Lead Time
						</Text>
					</GridItem>
				)}
				<GridItem />
				{/* Rows */}
				{combos.map(({ key, optionIdsByVariationId }) => {
					const entry = combinations[key] ?? DEFAULT_ENTRY;
					const isDisabled = entry.disabled;

					return (
						<>
							{/* Image — first column */}
							<GridItem
								display="flex"
								alignItems="center"
								opacity={isDisabled ? 0.4 : 1}
								w={100}
							>
								<ImageDropzone
									onAdd={([file]) => {
										onUpdate(key, {
											imageUuid:
												URL.createObjectURL(
													file,
												),
										});
									}}
									maxFiles={1}
									disabled={disabled || isDisabled}
									trigger={
										entry.imageUuid ? (
											<Box
												as="button"
												width={`${THUMB_WIDTH}px`}
												height={`${THUMB_HEIGHT}px`}
												borderRadius="md"
												overflow="hidden"
												borderWidth={1}
												borderColor="gray.200"
												cursor="pointer"
												flexShrink={0}
											>
												<Image
													src={
														entry.imageUuid
													}
													width="100%"
													height="100%"
													objectFit="cover"
												/>
											</Box>
										) : (
											<Box
												as="button"
												width={`${THUMB_WIDTH}px`}
												height={`${THUMB_HEIGHT}px`}
												borderRadius="md"
												bg="gray.100"
												borderWidth={1}
												borderColor="gray.200"
												cursor="pointer"
												flexShrink={0}
											/>
										)
									}
								/>
							</GridItem>

							{/* Variation option labels */}
							{sortedVariations.map(([varId]) => (
								<GridItem
									key={varId}
									display="flex"
									alignItems="center"
									opacity={isDisabled ? 0.4 : 1}
								>
									<Text
										fontSize={16}
										px={1}
										truncate
									>
										{optionName(
											varId,
											optionIdsByVariationId[
												varId
											],
										)}
									</Text>
								</GridItem>
							))}

							{/* Price */}
							{showPrice && (
								<GridItem
									display="flex"
									alignItems="center"
									opacity={isDisabled ? 0.4 : 1}
									w={125}
								>
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
															) * 100;
												onUpdate(key, {
													priceCents: isNaN(
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
												disabled || isDisabled
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
													fieldSizing="content"
													minW={100}
													maxW={125}
												/>
											</InputGroup>
										</NumberInput.Root>
									</HStack>
								</GridItem>
							)}

							{/* Lead time (placeholder) */}
							{showLeadTime && (
								<GridItem
									display="flex"
									alignItems="center"
									opacity={isDisabled ? 0.4 : 1}
								>
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
								</GridItem>
							)}

							{/* Disable toggle */}
							<GridItem
								display="flex"
								alignItems="center"
							>
								<IconButton
									aria-label={
										isDisabled
											? 'Enable combination'
											: 'Disable combination'
									}
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
							</GridItem>
						</>
					);
				})}
			</Grid>
		</Box>
	);
};
