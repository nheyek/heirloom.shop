import {
	Box,
	Heading,
	HStack,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { CLIENT_ROUTES } from '@client/constants';
import {
	ACCOUNT_PAGE_PADDING,
	FONT_DECORATIVE,
	FONT_DISPLAY_SANS,
	SIDEBAR_WIDTH_PX,
} from '@client/theme';
import { FaHeart } from 'react-icons/fa';
import { IoReceipt } from 'react-icons/io5';
import {
	Outlet,
	Link as RouterLink,
	useLocation,
} from 'react-router-dom';

const NAV_ITEMS = [
	{
		label: 'Orders',
		title: 'Your Orders',
		icon: IoReceipt,
		route: CLIENT_ROUTES.orders,
	},
	{
		label: 'Favorites',
		title: 'Your Favorites',
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
			p={3}
			w={SIDEBAR_WIDTH_PX}
			display={{ base: 'none', md: 'flex' }}
			position="sticky"
			top={0}
			height="100%"
			overflowY="auto"
		>
			{NAV_ITEMS.map(({ label, icon: Icon, route }) => {
				const isActive = pathname.startsWith(`/${route}`);
				return (
					<Link
						key={route}
						asChild
					>
						<RouterLink
							to={`/${route}`}
							style={{ display: 'block' }}
						>
							<HStack
								gap={3}
								px={3}
								py={2}
								borderRadius="md"
								bg={
									isActive
										? 'gray.100'
										: 'transparent'
								}
								_hover={{
									bg: isActive
										? 'gray.100'
										: 'gray.50',
								}}
								transition="background 0.15s"
								fontFamily={FONT_DISPLAY_SANS}
								fontSize={22}
								fontWeight={isActive ? 500 : 400}
								color={
									isActive ? 'black' : 'gray.700'
								}
							>
								<Box
									fontSize={20}
									flexShrink={0}
								>
									<Icon />
								</Box>
								<Text>{label}</Text>
							</HStack>
						</RouterLink>
					</Link>
				);
			})}
		</Stack>
	);
};

const PageHeading = () => {
	const { pathname } = useLocation();

	const exactMatch = NAV_ITEMS.find(
		({ route }) => pathname === `/${route}`,
	);
	if (exactMatch) {
		return (
			<Heading
				fontSize={36}
				fontWeight={500}
				fontFamily={FONT_DECORATIVE}
			>
				{exactMatch.title}
			</Heading>
		);
	}

	const parentMatch = NAV_ITEMS.find(({ route }) =>
		pathname.startsWith(`/${route}/`),
	);
	if (parentMatch) {
		const subId = pathname.slice(`/${parentMatch.route}/`.length);
		return (
			<Heading
				fontSize={36}
				fontFamily={FONT_DECORATIVE}
			>
				<Link
					asChild
					fontWeight={400}
				>
					<RouterLink to={`/${parentMatch.route}`}>
						{parentMatch.label}
					</RouterLink>
				</Link>
				<Box
					as="span"
					fontWeight={400}
					mx={2}
				>
					/
				</Box>
				<Box
					as="span"
					fontWeight={500}
				>
					{subId}
				</Box>
			</Heading>
		);
	}

	return null;
};

export const AccountPageLayout = () => (
	<HStack
		alignItems="stretch"
		gap={0}
		minHeight="100%"
	>
		<Sidebar />
		<Box
			flex={1}
			minW={0}
			py={{ base: 5, md: 8 }}
		>
			<Stack
				px={ACCOUNT_PAGE_PADDING}
				w="100%"
				maxW={1100}
				gap={5}
				fontFamily={FONT_DISPLAY_SANS}
			>
				<PageHeading />
				<Outlet />
			</Stack>
		</Box>
	</HStack>
);
