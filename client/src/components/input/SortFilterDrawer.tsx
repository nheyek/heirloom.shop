import {
	Button,
	Drawer,
	Icon,
	IconButton,
	RadioGroup,
	Stack,
	Text,
} from '@chakra-ui/react';
import { displayFontFamily } from '@client/theme';
import { ReactNode, useState } from 'react';
import { FaSliders } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';

const TITLE = 'Sort & Filter';

const DrawerHeading = (props: { children: ReactNode }) => (
	<Text
		fontSize={24}
		fontWeight={500}
		fontFamily={displayFontFamily}
	>
		{props.children}
	</Text>
);

type Props<T extends string> = {
	options: Record<T, string>;
	value: T;
	onChange: (value: T) => void;
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

								<DrawerHeading>Filters</DrawerHeading>
							</Stack>
						</Drawer.Body>
					</Drawer.Content>
				</Drawer.Positioner>
			</Drawer.Root>
		</>
	);
};
