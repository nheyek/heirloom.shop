import { useAuth0 } from '@auth0/auth0-react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { CLIENT_ROUTES } from '@client/constants';
import { useUserInfo } from '@client/providers/UserProvider';
import { FaGavel } from 'react-icons/fa';
import { FaChartSimple } from 'react-icons/fa6';
import { IoReceipt } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
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
		route: `${CLIENT_ROUTES.admin}/${CLIENT_ROUTES.numbers}`,
	},
];

export const AdminPageLayout = () => {
	const { user, isLoading: userIsLoading } = useUserInfo();
	const { isAuthenticated, isLoading: authIsLoading } = useAuth0();
	const isLoading = authIsLoading || userIsLoading;

	const navigate = useNavigate();

	if (!isLoading && !user?.isAdmin) {
		navigate('/');
	}

	if (isLoading) {
		return (
			<Box
				position="absolute"
				top={0}
				bottom={0}
				left={0}
				right={0}
			>
				<Center height="100%">
					<Spinner
						size="xl"
						borderWidth={3}
					/>
				</Center>
			</Box>
		);
	}

	return <SidebarPageLayout navItems={NAV_ITEMS} />;
};
