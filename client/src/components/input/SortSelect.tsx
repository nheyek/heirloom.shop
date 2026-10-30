import { Button, Menu, Portal, Text } from '@chakra-ui/react';
import { FaSliders } from 'react-icons/fa6';

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
					size="sm"
					variant="subtle"
					borderRadius="md"
					fontSize={18}
					mb={1}
				>
					<FaSliders />
					Filter & Sort
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
