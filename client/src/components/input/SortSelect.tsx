import {
	Button,
	HStack,
	Icon,
	IconButton,
	Menu,
	Portal,
	Span,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { FaArrowDownWideShort, FaCaretDown } from 'react-icons/fa6';

const MENU_MIN_WIDTH = 180;

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
						aria-label={props.label}
					>
						<FaArrowDownWideShort />
					</IconButton>
				) : (
					<Button
						size="lg"
						variant="subtle"
						px={4}
						fontSize={18}
						fontWeight={400}
						justifyContent="space-between"
					>
						<HStack gap={1}>
							<Text>{props.label}:</Text>
							<Span fontWeight={500}>
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
