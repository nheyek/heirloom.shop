import {
	Button,
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
import { displayFontFamily } from '@client/theme';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { ReactNode, useEffect, useState } from 'react';
import { FaSliders } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';

const TITLE = 'Sort & Filter';

const DrawerHeading = (props: { children: ReactNode }) => (
	<Text
		fontSize={26}
		fontWeight={500}
		fontFamily={displayFontFamily}
	>
		{props.children}
	</Text>
);

type PriceFilter = {
	bounds: PriceRange;
	value: PriceRange;
	onChange: (value: PriceRange) => void;
};

const PriceRangeSlider = (props: PriceFilter) => {
	const [draft, setDraft] = useState(props.value);

	useEffect(() => setDraft(props.value), [props.value]);

	return (
		<Stack gap={2}>
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

			<HStack justifyContent="space-between">
				<Text
					fontSize={18}
					color="fg.muted"
				>
					{formatCentsAsDollars(props.bounds[0])}
				</Text>
				<Text
					fontSize={18}
					color="fg.muted"
				>
					{formatCentsAsDollars(props.bounds[1])}
				</Text>
			</HStack>
		</Stack>
	);
};

type Props<T extends string> = {
	options: Record<T, string>;
	value: T;
	onChange: (value: T) => void;
	price?: PriceFilter;
};

export const SortFilterDrawer = <T extends string>(
	props: Props<T>,
) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button
				size="sm"
				variant="subtle"
				borderRadius="md"
				fontSize={18}
				mb={1}
				onClick={() => setIsOpen(true)}
			>
				<FaSliders />
				{TITLE}
			</Button>
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
						<Drawer.Body p={5}>
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
										size="sm"
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

								{props.price &&
									props.price.bounds[0] <
										props.price.bounds[1] && (
										<Stack gap={2}>
											<DrawerHeading>
												Price
											</DrawerHeading>
											<PriceRangeSlider
												{...props.price}
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
