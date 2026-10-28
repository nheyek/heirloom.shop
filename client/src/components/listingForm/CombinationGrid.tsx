import { Switch, Table, Text } from '@chakra-ui/react';
import { InventoryInput } from '@client/components/input/InventoryInput';
import { PriceInput } from '@client/components/input/PriceInput';
import {
	Combination,
	Variation,
} from '@client/components/listingForm/useListingForm';
import { InputSize } from '@client/constants';
import { fieldErrorColor } from '@client/theme';
import {
	deriveCombinationsList,
	resolveEffectiveCombinationPrice,
	sortByOrder,
} from '@heirloom/common/domain/listing';

type Props = {
	variations: Record<string, Variation>;
	combinations: Record<string, Combination>;
	onUpdate: (key: string, patch: Partial<Combination>) => void;
	invalid?: boolean;
	invalidKeys?: Set<string>;
	disabled?: boolean;
	trackInventory?: boolean;
};

const ROW_VERTICAL_PADDING = 2;

const DEFAULT_ENTRY: Combination = {
	priceCents: null,
	disabled: false,
	inventory: 0,
};

export const CombinationGrid = ({
	variations,
	combinations,
	onUpdate,
	invalid,
	invalidKeys,
	disabled,
	trackInventory,
}: Props) => {
	const sortedVariations = sortByOrder(variations);
	const showPrice = sortedVariations.some(([, v]) => v.pricesVary);
	const showInventory = !!trackInventory;

	const combinationsList = deriveCombinationsList(variations);
	if (combinationsList.length === 0) return null;

	const optionName = (varId: string, optId: string) =>
		variations[varId]?.options[optId]?.name ?? '';

	return (
		<Table.ScrollArea
			borderWidth={1}
			borderColor={invalid ? fieldErrorColor : 'gray.200'}
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
						{...(invalidKeys?.has(
							combinationsList[0].key,
						) && {
							borderBottomColor: fieldErrorColor,
						})}
					>
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
						{showInventory && (
							<Table.ColumnHeader>
								Inventory
							</Table.ColumnHeader>
						)}
						<Table.ColumnHeader textAlign="center">
							Active
						</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>
				<Table.Body css={{ '& td': { py: ROW_VERTICAL_PADDING } }}>
					{combinationsList.map(({ key, optionMap }, i) => {
						const entry =
							combinations[key] ?? DEFAULT_ENTRY;
						const isDisabled = entry.disabled;
						const effectivePrice =
							resolveEffectiveCombinationPrice(
								optionMap,
								combinations,
								variations,
								null,
							);
						const priceIsInherited =
							entry.priceCents == null &&
							effectivePrice != null;

						const errorBottomBorder =
							invalidKeys?.has(key) ||
							(i < combinationsList.length - 1 &&
								invalidKeys?.has(
									combinationsList[i + 1].key,
								));

						return (
							<Table.Row
								key={key}
								{...(invalidKeys?.has(key) && {
									bg: 'red.50',
								})}
								{...(errorBottomBorder && {
									borderBottomColor:
										fieldErrorColor,
								})}
							>
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
										<PriceInput
											value={
												entry.priceCents ??
												effectivePrice
											}
											onChange={(cents) =>
												onUpdate(key, {
													priceCents: cents,
												})
											}
											disabled={
												disabled || isDisabled
											}
											size={InputSize.Md}
											inherited={
												priceIsInherited
											}
											invalid={invalidKeys?.has(
												key,
											)}
											enclosed
										/>
									</Table.Cell>
								)}

								{/* Inventory */}
								{showInventory && (
									<Table.Cell
										opacity={isDisabled ? 0.5 : 1}
									>
										<InventoryInput
											size={InputSize.Md}
											value={String(
												entry.inventory ?? 0,
											)}
											onChange={(v) =>
												onUpdate(key, {
													inventory:
														v === ''
															? 0
															: Number(v),
												})
											}
											disabled={
												disabled || isDisabled
											}
										/>
									</Table.Cell>
								)}

								{/* Active toggle */}
								<Table.Cell textAlign="center">
									<Switch.Root
										size="sm"
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
		</Table.ScrollArea>
	);
};
