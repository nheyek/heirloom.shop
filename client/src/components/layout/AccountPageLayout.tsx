import { CLIENT_ROUTES } from '@client/constants';
import { FaHeart } from 'react-icons/fa';
import { FaScroll } from 'react-icons/fa6';
import {
	SidebarNavItem,
	SidebarPageLayout,
} from './SidebarPageLayout';

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
	<SidebarPageLayout navItems={NAV_ITEMS} />
);
