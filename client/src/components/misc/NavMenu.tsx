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

export const NavMenuItem = (props: MenuItemProps) => (
	<Menu.Item
		fontSize={20}
		cursor="pointer"
		py={3}
		px={4}
		gap={4}
		width="100%"
		borderRadius={0}
		{...props}
	/>
);
