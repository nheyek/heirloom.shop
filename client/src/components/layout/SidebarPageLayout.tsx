import {
	Box,
	Heading,
	HStack,
	Link,
	Span,
	Stack,
	Text,
} from '@chakra-ui/react';
import {
	ACCOUNT_PAGE_PADDING_SPACING_UNITS,
	FONT_DECORATIVE,
	FONT_DISPLAY_SANS,
	NAVBAR_HEIGHT_SPACING_UNITS,
	SIDEBAR_WIDTH_PX,
} from '@client/theme';
import { IconType } from 'react-icons';
import {
	Outlet,
	Link as RouterLink,
	useLocation,
} from 'react-router-dom';

export type SidebarNavItem = {
	label: string;
	title: string;
	icon: IconType;
	route: string;
};

type SidebarProps = {
	navItems: SidebarNavItem[];
};

const Sidebar = ({ navItems }: SidebarProps) => {
	const { pathname } = useLocation();

	return (
		<Stack
			gap={2}
			p={3}
			w={SIDEBAR_WIDTH_PX}
			display={{ base: 'none', md: 'flex' }}
			position="sticky"
			alignSelf="flex-start"
			top={NAVBAR_HEIGHT_SPACING_UNITS}
			overflowY="auto"
		>
			{navItems.map(({ label, icon: Icon, route }) => {
				const isActive = pathname.startsWith(`/${route}`);
				return (
					<RouterLink
						to={`/${route}`}
						style={{ display: 'block' }}
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
							fontSize={20}
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
					</RouterLink>
				);
			})}
		</Stack>
	);
};

type PageHeadingProps = {
	navItems: SidebarNavItem[];
};

const PageHeading = ({ navItems }: PageHeadingProps) => {
	const { pathname } = useLocation();

	const exactMatch = navItems.find(
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

	const parentMatch = navItems.find(({ route }) =>
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
				<Span
					fontWeight={400}
					mx={2}
				>
					/
				</Span>
				<Span fontWeight={500}>{subId}</Span>
			</Heading>
		);
	}

	return null;
};

type SidebarPageLayoutProps = {
	navItems: SidebarNavItem[];
};

export const SidebarPageLayout = ({
	navItems,
}: SidebarPageLayoutProps) => (
	<HStack
		alignItems="stretch"
		gap={0}
		minHeight="100%"
	>
		<Sidebar navItems={navItems} />
		<Box
			flex={1}
			minW={0}
			py={{ base: 5, md: 8 }}
		>
			<Stack
				px={ACCOUNT_PAGE_PADDING_SPACING_UNITS}
				w="100%"
				maxW={1100}
				gap={5}
				fontFamily={FONT_DISPLAY_SANS}
			>
				<PageHeading navItems={navItems} />
				<Outlet />
			</Stack>
		</Box>
	</HStack>
);
