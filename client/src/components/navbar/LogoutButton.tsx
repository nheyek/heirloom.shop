import { useAuth0 } from '@auth0/auth0-react';
import { Button, Menu, Portal } from '@chakra-ui/react';
import React from 'react';
import { FaHeart, FaUserCircle } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { PiSignOutBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '../../constants';

export const LogoutButton = () => {
	const { logout } = useAuth0();
	const navigate = useNavigate();

	const handleLogout = async () => {
		logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	};

	return (
		<Menu.Root>
			<Menu.Trigger asChild focusRing="none">
				<Button variant="plain" size="lg" pl="10px" pr="0" gap="2px">
					<FaUserCircle />
					<IoMdArrowDropdown />
				</Button>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content
						boxShadow="md"
						animation="fade-in"
						animationDuration="fast"
					>
						<Menu.Item 
							value="saved" 
							onClick={() => navigate(`/${CLIENT_ROUTES.saved}`)} 
							cursor="pointer"
							fontSize="16px"
							py="2"
						>
							<FaHeart />
							Saved Listings
						</Menu.Item>
						<Menu.Item 
							value="logout" 
							onClick={handleLogout} 
							cursor="pointer"
							fontSize="16px"
							py="2"
						>
							<PiSignOutBold />
							Log out
						</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};
