import {
	Button,
	HStack,
	Icon,
	IconButton,
	IconProps,
	Menu,
	Portal,
	Span,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { FaArrowRightArrowLeft, FaCaretDown } from 'react-icons/fa6';

const MENU_MIN_WIDTH = 185;

const SortIcon = (props: IconProps) => (
	<Icon
		as={FaArrowRightArrowLeft}
		transform="rotate(90deg)"
		{...props}
	/>
);

type Props<T extends string> = {
	label: string;
	options: Record<T, string>;
	value: T;
	onChange: (value: T) => void;
};

export const SortSelect = <T extends string>(props: Props<T>) => {
	const isCompact = useBreakpointValue({ base: true, sm: false });

	return (
		<Menu.Root
			onSelect={(details) => props.onChange(details.value as T)}
			positioning={{ placement: 'bottom-end' }}
		>
			<Menu.Trigger asChild>
				{isCompact ? (
					<IconButton
						size="lg"
						variant="subtle"
					>
						<SortIcon />
					</IconButton>
				) : (
					<Button
						size="lg"
						variant="subtle"
						px={4}
						fontSize={18}
						justifyContent="space-between"
						width={MENU_MIN_WIDTH}
					>
						<HStack gap={3}>
							<SortIcon
								h={4}
								w={4}
							/>
							<Span fontWeight={400}>
								{props.options[props.value]}
							</Span>
						</HStack>
						<Icon
							as={FaCaretDown}
							h={4}
							w={4}
						/>
					</Button>
				)}
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content minW={MENU_MIN_WIDTH}>
						{(Object.keys(props.options) as T[]).map(
							(option) => (
								<Menu.Item
									key={option}
									value={option}
									cursor="pointer"
									fontSize={18}
									p={2}
								>
									<Text>
										{props.options[option]}
									</Text>
								</Menu.Item>
							),
						)}
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};
