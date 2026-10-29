import { HStack, Icon } from '@chakra-ui/react';
import { NavbarButton } from '@client/components/navbar/Navbar';
import { CategoryBreadcrumb } from '@client/components/navigation/CategoryBreadcrumb';
import { FaBars } from 'react-icons/fa6';

const NAVBAR_TEXT_COLOR = 'white';

export const NavbarCategoryNav = (props: {
	categoryId: string;
	compact?: boolean;
}) => (
	<HStack
		gap={1}
		minW={0}
	>
		<NavbarButton>
			<Icon
				h={5}
				w={5}
				as={FaBars}
			/>
		</NavbarButton>
		<CategoryBreadcrumb
			categoryId={props.categoryId}
			color={NAVBAR_TEXT_COLOR}
		/>
	</HStack>
);
