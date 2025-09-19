import { useAuth0 } from '@auth0/auth0-react';
import { Button, IconButton, Menu, Portal } from '@chakra-ui/react';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

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
				<IconButton variant="plain" size="lg">
					<FaUserCircle />
				</IconButton>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.Item value="logout" onClick={handleLogout}>
							Log out
						</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};
