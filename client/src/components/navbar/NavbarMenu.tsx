import { useAuth0 } from '@auth0/auth0-react';
import { Menu, MenuItemProps, Portal, Text } from '@chakra-ui/react';
import { NavBarIconButton } from '@client/components/navbar/NavBar';
import { CLIENT_ROUTES } from '@client/constants';
import { FaHeart, FaUserCircle } from 'react-icons/fa';
import { FaScroll } from 'react-icons/fa6';
import { IoMdArrowDropdown } from 'react-icons/io';
import { PiSignOutBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';

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
		<Menu.Root size="md">
			<Menu.Trigger
				asChild
				focusRing="none"
			>
				<NavBarIconButton px={3}>
					<FaUserCircle />
					<IoMdArrowDropdown />
				</NavBarIconButton>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content
						gapY={2}
						_open={{
							animation: 'fade-in 0.25s ease-out',
						}}
					>
						<Link to={`/${CLIENT_ROUTES.orders}`}>
							<MenuItem value="orders">
								<FaScroll />
								<Text pl={1}>Orders</Text>
							</MenuItem>
						</Link>

						<Link to={`/${CLIENT_ROUTES.favorites}`}>
							<MenuItem value="saved">
								<FaHeart />
								<Text pl={1}>Favorites</Text>
							</MenuItem>
						</Link>

						<MenuItem
							value="logout"
							onClick={handleLogout}
						>
							<PiSignOutBold />
							<Text pl={1}>Log Out</Text>
						</MenuItem>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};

const MenuItem = (props: MenuItemProps) => (
	<Menu.Item
		fontSize={20}
		cursor="pointer"
		py={2}
		px={3}
		gap={2}
		{...props}
	>
		{props.children}
	</Menu.Item>
);
