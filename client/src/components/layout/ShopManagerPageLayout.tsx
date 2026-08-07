import { useAuth0 } from '@auth0/auth0-react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { CLIENT_ROUTES } from '@client/constants';
import { useUserInfo } from '@client/providers/UserProvider';
import { IoGrid } from 'react-icons/io5';
import { Navigate, useParams } from 'react-router-dom';

import { ShopManagerProvider } from '@client/providers/ShopManagerProvider';
import { FaShop } from 'react-icons/fa6';
import {
	NavigationEquippedPageLayout,
	SidebarNavItem,
} from './NavigationEquippedPageLayout';

const getNavItems = (shortId: string): SidebarNavItem[] => [
	{
		label: 'Information',
		title: 'Information',
		icon: FaShop,
		route: `${CLIENT_ROUTES.shop}/${shortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.info}`,
	},
	{
		label: 'Listings',
		title: 'Listings',
		icon: IoGrid,
		route: `${CLIENT_ROUTES.shop}/${shortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.listings}`,
		children: [
			{ path: CLIENT_ROUTES.new, label: 'New Listing' },
			{ path: ':shortId', label: 'Edit Listing' },
		],
	},
];

export const ShopManagerPageLayout = () => {
	const { shortId } = useParams<{ shortId: string }>();
	const { isAuthenticated, isLoading: authIsLoading } = useAuth0();
	const { user } = useUserInfo();

	if (authIsLoading || (isAuthenticated && user === null)) {
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

	const isAuthorized =
		isAuthenticated &&
		!!shortId &&
		!!user &&
		(user.isAdmin || user.shopShortId === shortId);

	if (!isAuthorized) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	return (
		<ShopManagerProvider>
			<NavigationEquippedPageLayout
				navItems={getNavItems(shortId)}
			/>
		</ShopManagerProvider>
	);
};
