import { useAuth0 } from '@auth0/auth0-react';
import {
	Button,
	Flex,
	Menu,
	MenuItemProps,
	Portal,
	Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaHeart, FaUserCircle } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { PiSignOutBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { CLIENT_ROUTES } from '../../constants';

const MotionFlex = motion.create(Flex);

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
					<MotionFlex
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						boxShadow="md"
						borderRadius={5}
						overflow="hidden"
					>
						<Menu.Content
							gapY={2}
							boxShadow="none"
							animation="none"
						>
							<Link
								to={`/${CLIENT_ROUTES.saved}`}
							>
								<MenuItem value="saved">
									<FaHeart />
									<Text pl={1}>
										Favorites
									</Text>
								</MenuItem>
							</Link>

							<MenuItem
								value="logout"
								onClick={handleLogout}
							>
								<PiSignOutBold />
								<Text pl={1}>Log out</Text>
							</MenuItem>
						</Menu.Content>
					</MotionFlex>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};

const MenuItem = (props: MenuItemProps) => (
	<Menu.Item
		fontSize={16}
		cursor="pointer"
		py={2}
		{...props}
	>
		{props.children}
	</Menu.Item>
);
