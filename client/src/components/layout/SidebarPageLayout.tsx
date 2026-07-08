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
import {
	DESKTOP_NAVBAR_HEIGHT_SPACING_UNITS,
	FONT_DECORATIVE,
	FONT_DISPLAY_SANS,
	SIDEBAR_WIDTH_PX,
} from '@client/theme';
import { IconType } from 'react-icons';
import { IoMdArrowDropdown } from 'react-icons/io';
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
			top={DESKTOP_NAVBAR_HEIGHT_SPACING_UNITS}
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

type MobileNavProps = {
	navItems: SidebarNavItem[];
};

const MobileNav = ({ navItems }: MobileNavProps) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const current = navItems.find(({ route }) =>
		pathname.startsWith(`/${route}`),
	);

	return (
		<Box display={{ base: 'block', md: 'none' }}>
			<Menu.Root
				onSelect={(details) => navigate(`/${details.value}`)}
			>
				<Menu.Trigger asChild>
					<Button
						size="xl"
						variant="subtle"
						borderRadius="md"
						justifyContent="space-between"
						fontWeight={500}
						fontSize={20}
						fontFamily={FONT_DISPLAY_SANS}
						w="100%"
						px={4}
						py={3}
					>
						<HStack gap={3}>
							{current && (
								<Box
									fontSize={20}
									flexShrink={0}
								>
									<current.icon />
								</Box>
							)}
							<Text>{current?.label}</Text>
						</HStack>
						<IoMdArrowDropdown />
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
										fontFamily={FONT_DISPLAY_SANS}
										px={3}
										py={2}
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
		const subLabel =
			parentMatch.children?.find(({ path }) =>
				path.startsWith(':') ? true : path === subId,
			)?.label ?? subId;
		return (
			<Heading
				fontSize={32}
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
				<Span fontWeight={500}>{subLabel}</Span>
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
			pt={{ base: 5, md: 8 }}
		>
			<Stack
				px={5}
				w="100%"
				gap={5}
				fontFamily={FONT_DISPLAY_SANS}
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
