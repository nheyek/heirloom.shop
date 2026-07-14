import { useAuth0 } from '@auth0/auth0-react';
import { Menu, Portal, Text } from '@chakra-ui/react';
import {
	NavMenuContent,
	NavMenuItem,
} from '@client/components/misc/NavMenu';
import { NavbarButton } from '@client/components/navbar/Navbar';
import { CLIENT_ROUTES } from '@client/constants';
import { FaHeart, FaUserCircle } from 'react-icons/fa';
import { FaArrowRightFromBracket, FaScroll } from 'react-icons/fa6';
import { IoMdArrowDropdown } from 'react-icons/io';
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
				<NavbarButton
					pr={1}
					pl={2}
					gap={1}
				>
					<FaUserCircle />
					<IoMdArrowDropdown />
				</NavbarButton>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<NavMenuContent width={150}>
						<Link to={`/${CLIENT_ROUTES.orders}`}>
							<NavMenuItem
								value="orders"
								isFirst
							>
								<FaScroll />
								<Text>Orders</Text>
							</NavMenuItem>
						</Link>

						<Link to={`/${CLIENT_ROUTES.favorites}`}>
							<NavMenuItem value="saved">
								<FaHeart />
								<Text>Favorites</Text>
							</NavMenuItem>
						</Link>

						<NavMenuItem
							value="logout"
							onClick={handleLogout}
						>
							<FaArrowRightFromBracket />
							<Text>Log Out</Text>
						</NavMenuItem>
					</NavMenuContent>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};
