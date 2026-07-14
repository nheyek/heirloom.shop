import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';
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
		<Button
			variant="ghost"
			color="#FFF"
			_hover={{ bg: 'whiteAlpha.200' }}
			onClick={handleLogin}
			size="lg"
		>
			<FaArrowRightToBracket />
			Log In
		</Button>
	);
};
