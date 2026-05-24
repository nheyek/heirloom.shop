import { useAuth0 } from '@auth0/auth0-react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { CLIENT_ROUTES } from '@client/constants';
import { FaEnvelope, FaGear, FaTag } from 'react-icons/fa6';
import { IoReceipt } from 'react-icons/io5';
import { Navigate, useParams } from 'react-router-dom';
import {
	SidebarNavItem,
	SidebarPageLayout,
} from './SidebarPageLayout';

const getNavItems = (shortId: string): SidebarNavItem[] => [
	{
		label: 'Settings',
		title: 'Settings',
		icon: FaGear,
		route: `${CLIENT_ROUTES.shop}/${shortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.settings}`,
	},
	{
		label: 'Listings',
		title: 'Listings',
		icon: FaTag,
		route: `${CLIENT_ROUTES.shop}/${shortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.listings}`,
	},
	{
		label: 'Orders',
		title: 'Orders',
		icon: IoReceipt,
		route: `${CLIENT_ROUTES.shop}/${shortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.orders}`,
	},
	{
		label: 'Messages',
		title: 'Messages',
		icon: FaEnvelope,
		route: `${CLIENT_ROUTES.shop}/${shortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.messages}`,
	},
];

export const ShopManagerPageLayout = () => {
	const { shortId } = useParams<{ shortId: string }>();
	const { isAuthenticated, isLoading: authIsLoading } = useAuth0();

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

	if (!isAuthenticated || !shortId) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	return <SidebarPageLayout navItems={getNavItems(shortId)} />;
};
