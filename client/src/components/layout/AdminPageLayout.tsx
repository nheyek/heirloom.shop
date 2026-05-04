import { CLIENT_ROUTES } from '@client/constants';
import { FaGavel } from 'react-icons/fa';
import { FaChartSimple } from 'react-icons/fa6';
import { IoReceipt } from 'react-icons/io5';
import {
	SidebarNavItem,
	SidebarPageLayout,
} from './SidebarPageLayout';

const NAV_ITEMS: SidebarNavItem[] = [
	{
		label: 'Admin',
		title: 'Administration',
		icon: FaGavel,
		route: CLIENT_ROUTES.admin,
	},
	{
		label: 'Orders',
		title: 'Orders',
		icon: IoReceipt,
		route: `${CLIENT_ROUTES.admin}/${CLIENT_ROUTES.orders}`,
	},
	{
		label: 'Numbers',
		title: 'Numbers',
		icon: FaChartSimple,
		route: `${CLIENT_ROUTES.admin}/${CLIENT_ROUTES.analytics}`,
	},
];

export const AdminPageLayout = () => (
	<SidebarPageLayout navItems={NAV_ITEMS} />
);
