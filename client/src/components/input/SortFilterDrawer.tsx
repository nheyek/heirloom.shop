import {
	CloseButton,
	createListCollection,
	Drawer,
	HStack,
	IconButton,
	Portal,
	Select,
	Slider,
	Span,
	Stack,
} from '@chakra-ui/react';
import { SubHeading } from '@client/components/textDisplay/SubHeading';
import {
	PRICE_STEP_CENTS,
	PriceRange,
} from '@client/domain/listingFilter';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { useEffect, useMemo, useState } from 'react';
import { FaSliders } from 'react-icons/fa6';

export type PriceFilter = {
	bounds: PriceRange;
	value: PriceRange;
	onChange: (value: PriceRange) => void;
};

const PriceRangeSlider = (props: PriceFilter) => {
	const [draft, setDraft] = useState(props.value);

	useEffect(() => setDraft(props.value), [props.value]);

	return (
		<>
			<Slider.Root
				min={props.bounds[0]}
				max={props.bounds[1]}
				step={PRICE_STEP_CENTS}
				value={draft}
				onValueChange={(details) =>
					setDraft(details.value as PriceRange)
				}
				onValueChangeEnd={(details) =>
					props.onChange(details.value as PriceRange)
				}
			>
				<Slider.Control>
					<Slider.Track>
						<Slider.Range />
					</Slider.Track>
					{draft.map((_, index) => (
						<Slider.Thumb
							key={index}
							index={index}
						>
							<Slider.HiddenInput />
						</Slider.Thumb>
					))}
				</Slider.Control>
			</Slider.Root>
			<HStack>
				<Span fontSize={20}>
					{formatCentsAsDollars(draft[0])} -{' '}
					{formatCentsAsDollars(draft[1])}
				</Span>
			</HStack>
		</>
	);
};

type Props<T extends string> = {
	options: Record<T, string>;
	value: T;
	onChange: (value: T) => void;
	priceFilter?: PriceFilter | null;
};

export const SortFilterDrawer = <T extends string>(
	props: Props<T>,
) => {
	const [isOpen, setIsOpen] = useState(false);
	const sortCollection = useMemo(
		() =>
			createListCollection({
				items: (Object.keys(props.options) as T[]).map(
					(value) => ({
						value,
						label: props.options[value],
					}),
				),
			}),
		[props.options],
	);

	return (
		<>
			<IconButton
				variant="subtle"
				onClick={() => setIsOpen(true)}
				size="xl"
			>
				<FaSliders />
			</IconButton>
			<Drawer.Root
				open={isOpen}
				onOpenChange={(e) => setIsOpen(e.open)}
				placement="end"
				size="xs"
			>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content>
						<Drawer.Header pb={0}>
							<Drawer.Title>Filter & Sort</Drawer.Title>
							<Drawer.CloseTrigger asChild>
								<CloseButton />
							</Drawer.CloseTrigger>
						</Drawer.Header>
						<Drawer.Body p={5}>
							<Stack gap={5}>
								<Stack>
									<SubHeading size="sm">
										Order By
									</SubHeading>
									<Select.Root
										collection={sortCollection}
										size="md"
										value={[props.value]}
										onValueChange={(e) =>
											props.onChange(
												e.value[0] as T,
											)
										}
									>
										<Select.HiddenSelect />
										<Select.Control>
											<Select.Trigger cursor="button">
												<Select.ValueText />
											</Select.Trigger>
											<Select.IndicatorGroup>
												<Select.Indicator />
											</Select.IndicatorGroup>
										</Select.Control>
										<Portal>
											<Select.Positioner>
												<Select.Content>
													{sortCollection.items.map(
														(option) => (
															<Select.Item
																item={
																	option
																}
																key={
																	option.value
																}
															>
																{
																	option.label
																}
																<Select.ItemIndicator />
															</Select.Item>
														),
													)}
												</Select.Content>
											</Select.Positioner>
										</Portal>
									</Select.Root>
								</Stack>

								{props.priceFilter && (
									<Stack>
										<SubHeading size="sm">
											Price
										</SubHeading>
										<PriceRangeSlider
											{...props.priceFilter}
										/>
									</Stack>
								)}
							</Stack>
						</Drawer.Body>
					</Drawer.Content>
				</Drawer.Positioner>
			</Drawer.Root>
		</>
	);
};
