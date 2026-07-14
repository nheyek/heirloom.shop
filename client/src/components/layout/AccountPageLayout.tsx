import { CLIENT_ROUTES } from '@client/constants';
import { FaHeart } from 'react-icons/fa';
import { FaScroll } from 'react-icons/fa6';
import {
	NavigationEquippedPageLayout,
	SidebarNavItem,
} from './NavigationEquippedPageLayout';

const NAV_ITEMS: SidebarNavItem[] = [
	{
		label: 'Orders',
		title: 'Your Orders',
		icon: FaScroll,
		route: CLIENT_ROUTES.orders,
	},
	{
		label: 'Favorites',
		title: 'Your Favorites',
		icon: FaHeart,
		route: CLIENT_ROUTES.favorites,
	},
];

export const AccountPageLayout = () => (
	<NavigationEquippedPageLayout navItems={NAV_ITEMS} />
);
