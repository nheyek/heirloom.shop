import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export const Auth0ProviderWithNavigate = (props: { children: ReactNode }) => {
	const navigate = useNavigate();

	const domain = process.env.AUTH0_DOMAIN;
	const clientId = process.env.AUTH0_CLIENT_ID;
	const redirectUri = `${location.protocol}//${location.host}/callback`;

	const onRedirectCallback = (appState?: AppState) => {
		navigate(appState?.returnTo || window.location.pathname);
	};

	if (!(domain && clientId && redirectUri)) {
		return null;
	}

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			authorizationParams={{
				redirect_uri: redirectUri,
			}}
			onRedirectCallback={onRedirectCallback}
		>
			{props.children}
		</Auth0Provider>
	);
};
