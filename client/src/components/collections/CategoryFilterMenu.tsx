import { Button, Icon, Menu, Portal } from '@chakra-ui/react';
import {
	NavMenuContent,
	NavMenuItem,
} from '@client/components/misc/NavMenu';
import { FaCaretDown } from 'react-icons/fa6';

const ALL_ITEMS_LABEL = 'All Items';
const ALL_ITEMS_VALUE = 'ALL';

export type CategoryOption = {
	id: string;
	title: string;
};

type Props = {
	options: CategoryOption[];
	value: string | null;
	onChange: (categoryId: string | null) => void;
};

export const CategoryFilterMenu = (props: Props) => {
	const selected = props.options.find(
		(option) => option.id === props.value,
	);

	return (
		<Menu.Root
			size="md"
			onSelect={(details) =>
				props.onChange(
					details.value === ALL_ITEMS_VALUE
						? null
						: details.value,
				)
			}
		>
			<Menu.Trigger
				asChild
				focusRing="none"
			>
				<Button
					variant="subtle"
					borderRadius="md"
				>
					{selected?.title ?? ALL_ITEMS_LABEL}
					<Icon
						as={FaCaretDown}
						h={18}
						w={18}
					/>
				</Button>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<NavMenuContent minWidth={220}>
						<NavMenuItem value={ALL_ITEMS_VALUE}>
							{ALL_ITEMS_LABEL}
						</NavMenuItem>
						<Menu.Separator m={0} />
						{props.options.map((option) => (
							<NavMenuItem
								key={option.id}
								value={option.id}
							>
								{option.title}
							</NavMenuItem>
						))}
					</NavMenuContent>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};
