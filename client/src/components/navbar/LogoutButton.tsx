import { useAuth0 } from '@auth0/auth0-react';
import { Button, IconButton, Menu, Portal } from '@chakra-ui/react';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { PiSignOutBold } from 'react-icons/pi';

export const LogoutButton = () => {
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
			<Menu.Trigger asChild focusRing="none">
				<Button variant="plain" size="lg" pl="10px" pr="0" gap="2px">
					<FaUserCircle />
					<IoMdArrowDropdown />
				</Button>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.Item value="logout" onClick={handleLogout} cursor="pointer">
							<PiSignOutBold />
							Log out
						</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};
