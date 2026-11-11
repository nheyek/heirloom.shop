import { useAuth0 } from '@auth0/auth0-react';
import { NavbarButton } from '@client/components/navbar/Navbar';
import { FaArrowRightToBracket } from 'react-icons/fa6';

export const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	const handleLogin = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: '/',
			},
		});
	};

	return (
		<NavbarButton onClick={handleLogin}>
			<FaArrowRightToBracket />
			Log In
		</NavbarButton>
	);
};
