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
	useBreakpointValue,
} from '@chakra-ui/react';
import { NavbarButton } from '@client/components/navbar/Navbar';
import { SubHeading } from '@client/components/textDisplay/SubHeading';
import {
	MENU_CONTENT_PADDING_Y,
	NAVBAR_HEIGHT,
} from '@client/constants';
import { useCategories } from '@client/providers/CategoriesProvider';
import { getCategoryPath } from '@client/utils/categoryUtils';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Link as RouterLink } from 'react-router-dom';

const MENU_WIDTH = 320;
const MENU_MAX_HEIGHT = '70svh';

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
				pl={parent ? 2 : 4}
				pr={2}
				py={2}
				justifyContent="space-between"
				borderBottomWidth={1}
			>
				{parent && (
					<IconButton
						variant="ghost"
						size="lg"
						onClick={() =>
							setParentId(parent.parentId ?? null)
						}
					>
						<LuChevronLeft />
					</IconButton>
				)}
				{parent ? (
					<Stack
						py={2}
						alignItems="center"
					>
						<SubHeading size="lg">
							{parent.title}
						</SubHeading>
						<Link
							asChild
							fontSize={18}
						>
							<RouterLink
								to={getCategoryPath(parent.id)}
								onClick={onClose}
							>
								View all
							</RouterLink>
						</Link>
					</Stack>
				) : (
					<SubHeading
						size="md"
						flex={1}
					>
						Categories
					</SubHeading>
				)}
				<CloseButton onClick={onClose} />
			</HStack>
			<Stack
				gap={0}
				minH={0}
				overflowY="auto"
				py={MENU_CONTENT_PADDING_Y}
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
							fontSize={20}
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

	const trigger = (
		<NavbarButton
			onClick={isMobile ? () => setOpen(true) : undefined}
			aspectRatio={1}
		>
			<Icon as={FaBars} />
		</NavbarButton>
	);

	if (isMobile) {
		return (
			<>
				{trigger}
				<Dialog.Root
					open={open}
					onOpenChange={(e) => setOpen(e.open)}
					size="full"
					lazyMount
					unmountOnExit
				>
					<Portal>
						<Dialog.Positioner top={NAVBAR_HEIGHT}>
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
			<Popover.Trigger asChild>{trigger}</Popover.Trigger>
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
