import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

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
			variant="plain"
			color="#FFF"
			fontSize={20}
			onClick={handleLogin}
		>
			sign in
		</Button>
	);
};
