import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import { CLIENT_ROUTES } from '@client/constants';
import { FONT_DISPLAY_SANS } from '@client/theme';
import { FaHeart } from 'react-icons/fa';
import { IoReceipt } from 'react-icons/io5';
import { Link, Outlet, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
	{
		label: 'Orders',
		icon: IoReceipt,
		route: CLIENT_ROUTES.orders,
	},
	{
		label: 'Favorites',
		icon: FaHeart,
		route: CLIENT_ROUTES.favorites,
	},
];

const Sidebar = () => {
	const { pathname } = useLocation();

	return (
		<Stack
			as="nav"
			gap={2}
			p={4}
			w={300}
			display={{ base: 'none', md: 'flex' }}
		>
			{NAV_ITEMS.map(({ label, icon: Icon, route }) => {
				const isActive = pathname === `/${route}`;
				return (
					<Link
						key={route}
						to={`/${route}`}
					>
						<HStack
							gap={3}
							px={3}
							py={2}
							borderRadius="md"
							bg={isActive ? 'gray.100' : 'transparent'}
							_hover={{
								bg: isActive ? 'gray.100' : 'gray.50',
							}}
							transition="background 0.15s"
							fontFamily={FONT_DISPLAY_SANS}
							fontSize={22}
							fontWeight={isActive ? 500 : 400}
							color={isActive ? 'black' : 'gray.700'}
						>
							<Box
								fontSize={20}
								flexShrink={0}
							>
								<Icon />
							</Box>
							<Text>{label}</Text>
						</HStack>
					</Link>
				);
			})}
		</Stack>
	);
};

export const AccountLayout = () => (
	<HStack
		alignItems="stretch"
		gap={0}
		minHeight="100%"
	>
		<Sidebar />
		<Box flex={1}>
			<Outlet />
		</Box>
	</HStack>
);
