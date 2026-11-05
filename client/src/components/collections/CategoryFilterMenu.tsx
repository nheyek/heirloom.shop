import { Button, Icon, Menu, Portal, Span } from '@chakra-ui/react';
import {
	NavMenuContent,
	NavMenuItem,
} from '@client/components/misc/NavMenu';
import { FaCaretDown, FaCheck } from 'react-icons/fa6';

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

type CategoryMenuItemProps = {
	value: string;
	label: string;
	isSelected: boolean;
};

const CategoryMenuItem = (props: CategoryMenuItemProps) => (
	<NavMenuItem value={props.value}>
		<Span flex={1}>{props.label}</Span>
		{props.isSelected && <FaCheck size={16} />}
	</NavMenuItem>
);

export const CategoryFilterMenu = (props: Props) => {
	const selected = props.options.find(
		(option) => option.id === props.value,
	);

	return (
		<Menu.Root
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
					size="lg"
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
						<CategoryMenuItem
							value={ALL_ITEMS_VALUE}
							label={ALL_ITEMS_LABEL}
							isSelected={props.value === null}
						/>
						<Menu.Separator m={0} />
						{props.options.map((option) => (
							<CategoryMenuItem
								key={option.id}
								value={option.id}
								label={option.title}
								isSelected={option.id === props.value}
							/>
						))}
					</NavMenuContent>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};
