import { useAuth0 } from '@auth0/auth0-react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { CLIENT_ROUTES } from '@client/constants';
import { useUserInfo } from '@client/providers/UserProvider';
import { FaChartSimple, FaScroll, FaShop } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import {
	NavigationEquippedPageLayout,
	SidebarNavItem,
} from './NavigationEquippedPageLayout';

const NAV_ITEMS: SidebarNavItem[] = [
	{
		label: 'Shops',
		title: 'Shops',
		icon: FaShop,
		route: `${CLIENT_ROUTES.admin}/${CLIENT_ROUTES.shops}`,
	},
	{
		label: 'Orders',
		title: 'Orders',
		icon: FaScroll,
		route: `${CLIENT_ROUTES.admin}/${CLIENT_ROUTES.orders}`,
	},
	{
		label: 'Analytics',
		title: 'Analytics',
		icon: FaChartSimple,
		route: `${CLIENT_ROUTES.admin}/${CLIENT_ROUTES.analytics}`,
	},
];

export const AdminPageLayout = () => {
	const { user } = useUserInfo();
	const { isAuthenticated, isLoading: authIsLoading } = useAuth0();

	const navigate = useNavigate();

	const unauthenticated = !isAuthenticated && !authIsLoading;
	const authenticatedNonAdmin = user && !user.isAdmin;
	if (unauthenticated || authenticatedNonAdmin) {
		navigate('/');
	}

	if (authIsLoading) {
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
						height={100}
						width={100}
						borderWidth={5}
					/>
				</Center>
			</Box>
		);
	}

	return <NavigationEquippedPageLayout navItems={NAV_ITEMS} />;
};
