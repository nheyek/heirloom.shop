import {
	Menu,
	MenuContentProps,
	MenuItemProps,
} from '@chakra-ui/react';

type NavMenuContentProps = MenuContentProps;

export const NavMenuContent = (props: NavMenuContentProps) => (
	<Menu.Content
		p={0}
		_open={{
			animation: 'slide-from-top 0.25s ease-out',
		}}
		{...props}
	/>
);

type NavMenuItemProps = MenuItemProps & {
	// Suppresses the top border separator for the first item in the list
	isFirst?: boolean;
};

export const NavMenuItem = ({
	isFirst,
	...props
}: NavMenuItemProps) => (
	<Menu.Item
		fontSize={20}
		cursor="pointer"
		py={3}
		px={4}
		gap={4}
		width="100%"
		borderRadius={0}
		{...(!isFirst && { borderTopWidth: 1 })}
		{...props}
	/>
);
