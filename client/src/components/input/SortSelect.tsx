import {
	Button,
	HStack,
	Icon,
	IconProps,
	Menu,
	Portal,
	Span,
	Text,
} from '@chakra-ui/react';
import { FaArrowRightArrowLeft, FaCaretDown } from 'react-icons/fa6';

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
	return (
		<Menu.Root
			onSelect={(details) => props.onChange(details.value as T)}
			positioning={{ placement: 'bottom-end' }}
		>
			<Menu.Trigger asChild>
				<Button
					size="md"
					variant="ghost"
					fontSize={17}
					gap={3}
				>
					<HStack gap={3}>
						<SortIcon
							h={15}
							w={15}
						/>
						<Span fontWeight={400}>
							{props.options[props.value]}
						</Span>
					</HStack>
					<Icon
						as={FaCaretDown}
						h={15}
						w={15}
					/>
				</Button>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content>
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
