import {
	Drawer,
	HStack,
	Icon,
	IconButton,
	RadioGroup,
	Slider,
	Stack,
	Text,
} from '@chakra-ui/react';
import {
	PRICE_STEP_CENTS,
	PriceRange,
} from '@client/domain/listingFilter';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { ReactNode, useEffect, useState } from 'react';
import { FaSliders } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';

const DrawerHeading = (props: { children: ReactNode }) => (
	<Text
		fontSize={24}
		fontWeight={500}
	>
		{props.children}
	</Text>
);

export type PriceFilter = {
	bounds: PriceRange;
	value: PriceRange;
	onChange: (value: PriceRange) => void;
};

const PriceRangeSlider = (props: PriceFilter) => {
	const [draft, setDraft] = useState(props.value);

	useEffect(() => setDraft(props.value), [props.value]);

	return (
		<Stack gap={3}>
			<HStack>
				<Text fontSize={22}>
					{formatCentsAsDollars(draft[0])} -{' '}
					{formatCentsAsDollars(draft[1])}
				</Text>
			</HStack>
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
		</Stack>
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
						<Drawer.CloseTrigger
							asChild
							position="absolute"
							top={4}
							right={4}
						>
							<IconButton
								variant="ghost"
								w={10}
								h={10}
							>
								<Icon
									h={7}
									w={7}
								>
									<MdClose />
								</Icon>
							</IconButton>
						</Drawer.CloseTrigger>
						<Drawer.Body p={6}>
							<Stack gap={8}>
								<Stack gap={4}>
									<DrawerHeading>
										Sort By
									</DrawerHeading>
									<RadioGroup.Root
										value={props.value}
										onValueChange={(details) =>
											props.onChange(
												details.value as T,
											)
										}
										size="md"
									>
										<Stack gap={4}>
											{(
												Object.keys(
													props.options,
												) as T[]
											).map((option) => (
												<RadioGroup.Item
													key={option}
													value={option}
													gap={3}
												>
													<RadioGroup.ItemHiddenInput />
													<RadioGroup.ItemIndicator />
													<RadioGroup.ItemText
														fontSize={20}
														fontWeight={
															400
														}
													>
														{
															props
																.options[
																option
															]
														}
													</RadioGroup.ItemText>
												</RadioGroup.Item>
											))}
										</Stack>
									</RadioGroup.Root>
								</Stack>

								{props.priceFilter &&
									props.priceFilter.bounds[0] <
										props.priceFilter
											.bounds[1] && (
										<Stack gap={1}>
											<DrawerHeading>
												Price
											</DrawerHeading>
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
