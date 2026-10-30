import {
	Button,
	CloseButton,
	Dialog,
	HStack,
	Icon,
	IconButton,
	Link,
	Popover,
	Portal,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { NavbarButton } from '@client/components/navbar/Navbar';
import { useCategories } from '@client/providers/CategoriesProvider';
import { navbarHeight } from '@client/theme';
import { getCategoryPath } from '@client/utils/categoryUtils';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Link as RouterLink } from 'react-router-dom';

const MENU_WIDTH = 320;
const MENU_MAX_HEIGHT = '70svh';

const CategoryMenuIcon = () => (
	<Icon
		h={5}
		w={5}
		as={FaBars}
	/>
);

type PanelProps = {
	onClose: () => void;
};

const CategoryMenuPanel = ({ onClose }: PanelProps) => {
	const { getCategory, getChildCategories } = useCategories();
	const [parentId, setParentId] = useState<string | null>(null);

	const parent = parentId ? getCategory(parentId) : undefined;

	return (
		<Stack
			gap={0}
			maxH="inherit"
		>
			<HStack
				px={4}
				py={2}
				justifyContent="space-between"
				borderBottomWidth={1}
				fontSize={22}
				fontWeight={500}
			>
				{parent && (
					<IconButton
						variant="ghost"
						size="md"
						onClick={() =>
							setParentId(parent.parentId ?? null)
						}
					>
						<LuChevronLeft />
					</IconButton>
				)}
				{parent ? (
					<Link asChild>
						<RouterLink
							to={getCategoryPath(parent.id)}
							onClick={onClose}
						>
							{parent.title}
						</RouterLink>
					</Link>
				) : (
					<Text flex={1}>Categories</Text>
				)}
				<CloseButton
					onClick={onClose}
					mr={-2.5}
				/>
			</HStack>
			<Stack
				gap={0}
				minH={0}
				overflowY="auto"
			>
				{getChildCategories(parentId).map((category) => {
					const hasChildren =
						getChildCategories(category.id).length > 0;
					return (
						<Button
							key={category.id}
							asChild={!hasChildren}
							variant="ghost"
							width="100%"
							justifyContent="space-between"
							fontSize={22}
							fontWeight={400}
							px={4}
							py={3}
							h="auto"
							borderRadius={0}
							{...(hasChildren && {
								onClick: () =>
									setParentId(category.id),
							})}
						>
							{hasChildren ? (
								<>
									{category.title}
									<Icon as={LuChevronRight} />
								</>
							) : (
								<RouterLink
									to={getCategoryPath(category.id)}
									onClick={onClose}
								>
									{category.title}
								</RouterLink>
							)}
						</Button>
					);
				})}
			</Stack>
		</Stack>
	);
};

export const CategoryMenu = () => {
	const isMobile = useBreakpointValue({ base: true, md: false });
	const [open, setOpen] = useState(false);
	const close = () => setOpen(false);

	if (isMobile) {
		return (
			<>
				<NavbarButton onClick={() => setOpen(true)}>
					<CategoryMenuIcon />
				</NavbarButton>
				<Dialog.Root
					open={open}
					onOpenChange={(e) => setOpen(e.open)}
					size="full"
					lazyMount
					unmountOnExit
				>
					<Portal>
						<Dialog.Positioner top={navbarHeight}>
							<Dialog.Content height="100%">
								<CategoryMenuPanel onClose={close} />
							</Dialog.Content>
						</Dialog.Positioner>
					</Portal>
				</Dialog.Root>
			</>
		);
	}

	return (
		<Popover.Root
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
			positioning={{ placement: 'bottom-start' }}
			lazyMount
			unmountOnExit
		>
			<Popover.Trigger asChild>
				<Button
					variant="ghost"
					color="white"
					gap={2}
					px={3}
					fontSize={20}
					fontWeight={500}
					_hover={{ bg: 'whiteAlpha.200' }}
					_expanded={{ bg: 'whiteAlpha.200' }}
				>
					<CategoryMenuIcon />
					Categories
				</Button>
			</Popover.Trigger>
			<Portal>
				<Popover.Positioner>
					<Popover.Content
						width={MENU_WIDTH}
						maxH={MENU_MAX_HEIGHT}
						overflow="hidden"
					>
						<CategoryMenuPanel onClose={close} />
					</Popover.Content>
				</Popover.Positioner>
			</Portal>
		</Popover.Root>
	);
};
