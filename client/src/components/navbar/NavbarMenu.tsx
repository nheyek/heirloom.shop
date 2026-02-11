import { useAuth0 } from '@auth0/auth0-react';
import {
	Button,
	Menu,
	MenuItemProps,
	Portal,
	Text,
} from '@chakra-ui/react';
import { FaHeart, FaUserCircle } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { PiSignOutBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { CLIENT_ROUTES } from '../../constants';
import { AnimatedBox } from '../misc/AnimatedBox';

export const NavbarMenu = () => {
	const { logout } = useAuth0();

	const handleLogout = async () => {
		logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	};

	return (
		<Menu.Root>
			<Menu.Trigger
				asChild
				focusRing="none"
			>
				<Button
					variant="plain"
					color="#FFF"
					size="lg"
					px={0}
				>
					<FaUserCircle />
					<IoMdArrowDropdown />
				</Button>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<AnimatedBox display="flex">
						<Menu.Content
							gapY={2}
							animation="none"
						>
							<Link to={`/${CLIENT_ROUTES.favorites}`}>
								<MenuItem value="saved">
									<FaHeart />
									<Text pl={1}>favorites</Text>
								</MenuItem>
							</Link>

							<MenuItem
								value="logout"
								onClick={handleLogout}
							>
								<PiSignOutBold />
								<Text pl={1}>log out</Text>
							</MenuItem>
						</Menu.Content>
					</AnimatedBox>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};

const MenuItem = (props: MenuItemProps) => (
	<Menu.Item
		fontSize={18}
		cursor="pointer"
		py={2}
		{...props}
	>
		{props.children}
	</Menu.Item>
);
