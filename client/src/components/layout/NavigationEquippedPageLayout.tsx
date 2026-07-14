import {
	Box,
	Button,
	Heading,
	HStack,
	Link,
	Menu,
	Portal,
	Span,
	Stack,
	Text,
} from '@chakra-ui/react';
import { FONT_DECORATIVE, SIDEBAR_WIDTH_PX } from '@client/theme';
import { IconType } from 'react-icons';
import { FaCaretDown } from 'react-icons/fa6';
import {
	Outlet,
	Link as RouterLink,
	useLocation,
	useNavigate,
} from 'react-router-dom';

export type SidebarNavChild = {
	path: string;
	label: string;
};

export type SidebarNavItem = {
	label: string;
	title: string;
	icon: IconType;
	route: string;
	children?: SidebarNavChild[];
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
			top={0}
			overflowY="auto"
		>
			{navItems.map(({ label, icon: Icon, route }) => {
				const isActive = pathname.startsWith(`/${route}`);
				return (
					<RouterLink
						to={`/${route}`}
						style={{ display: 'block' }}
						key={route}
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

type ActiveNavMatch = {
	navItem: SidebarNavItem;
	subLabel: string | null;
};

// Resolves which nav item is active for the current path, and — when on a
// child route (e.g. editing a specific listing) — the sub-label to show
// alongside it (a matched child's label, or the raw id/path segment as a
// fallback). Shared by the desktop breadcrumb heading and the mobile
// dropdown trigger so they stay in sync.
const getActiveNavMatch = (
	navItems: SidebarNavItem[],
	pathname: string,
): ActiveNavMatch | null => {
	const exactMatch = navItems.find(
		({ route }) => pathname === `/${route}`,
	);
	if (exactMatch) return { navItem: exactMatch, subLabel: null };

	const parentMatch = navItems.find(({ route }) =>
		pathname.startsWith(`/${route}/`),
	);
	if (parentMatch) {
		const subId = pathname.slice(`/${parentMatch.route}/`.length);
		const subLabel =
			parentMatch.children?.find(({ path }) =>
				path.startsWith(':') ? true : path === subId,
			)?.label ?? subId;
		return { navItem: parentMatch, subLabel };
	}

	return null;
};

type MobileNavProps = {
	navItems: SidebarNavItem[];
};

const MobileNav = ({ navItems }: MobileNavProps) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const match = getActiveNavMatch(navItems, pathname);

	return (
		<Box display={{ base: 'block', md: 'none' }}>
			<Menu.Root
				onSelect={(details) => navigate(`/${details.value}`)}
				positioning={{ sameWidth: true }}
			>
				<Menu.Trigger asChild>
					<Button
						size="xl"
						variant="subtle"
						borderRadius="md"
						justifyContent="space-between"
						fontSize={20}
						w="100%"
					>
						<HStack gap={3}>
							{match && (
								<Box
									fontSize={20}
									flexShrink={0}
								>
									<match.navItem.icon />
								</Box>
							)}

							<Text>{match?.navItem.label}</Text>

							{match?.subLabel != null && (
								<>
									{'/'}
									<Text fontWeight={400}>
										{match.subLabel}
									</Text>
								</>
							)}
						</HStack>
						<FaCaretDown />
					</Button>
				</Menu.Trigger>
				<Portal>
					<Menu.Positioner>
						<Menu.Content>
							{navItems.map(
								({ label, icon: Icon, route }) => (
									<Menu.Item
										key={route}
										value={route}
										cursor="pointer"
										fontSize={20}
										p={3}
										width="100%"
									>
										<HStack gap={3}>
											<Box
												fontSize={20}
												flexShrink={0}
											>
												<Icon />
											</Box>
											<Text>{label}</Text>
										</HStack>
									</Menu.Item>
								),
							)}
						</Menu.Content>
					</Menu.Positioner>
				</Portal>
			</Menu.Root>
		</Box>
	);
};

type PageHeadingProps = {
	navItems: SidebarNavItem[];
};

const PageHeading = ({ navItems }: PageHeadingProps) => {
	const { pathname } = useLocation();

	const match = getActiveNavMatch(navItems, pathname);
	if (!match) return null;

	if (match.subLabel === null) {
		return (
			<Heading
				fontSize={36}
				fontWeight={500}
				fontFamily={FONT_DECORATIVE}
			>
				{match.navItem.title}
			</Heading>
		);
	}

	return (
		<Heading
			fontSize={32}
			fontFamily={FONT_DECORATIVE}
		>
			<Link
				asChild
				fontWeight={400}
			>
				<RouterLink to={`/${match.navItem.route}`}>
					{match.navItem.label}
				</RouterLink>
			</Link>
			<Span
				fontWeight={400}
				mx={2}
			>
				/
			</Span>
			<Span fontWeight={500}>{match.subLabel}</Span>
		</Heading>
	);
};

type SidebarPageLayoutProps = {
	navItems: SidebarNavItem[];
};

export const NavigationEquippedPageLayout = ({
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
			pt={5}
		>
			<Stack
				px={5}
				gap={5}
				w="100%"
			>
				<MobileNav navItems={navItems} />
				<Box display={{ base: 'none', md: 'block' }}>
					<PageHeading navItems={navItems} />
				</Box>
				<Outlet />
			</Stack>
		</Box>
	</HStack>
);
