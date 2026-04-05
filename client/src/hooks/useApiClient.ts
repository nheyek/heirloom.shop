import { useAuth0 } from '@auth0/auth0-react';
import { categoryContract } from '@common/contract';
import { initClient, tsRestFetchApi } from '@ts-rest/core';

export const useApiClient = () => {
	const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

	const fetchWithToken = (
		args: Parameters<typeof tsRestFetchApi>[0],
		token: string,
	) =>
		tsRestFetchApi({
			...args,
			headers: {
				...args.headers,
				Authorization: `Bearer ${token}`,
			},
		});

	return initClient(categoryContract, {
		baseUrl: '',
		baseHeaders: {},
		api: async (args) => {
			let token: string | null = null;
			try {
				token = await getAccessTokenSilently();
			} catch {
				// Not authenticated — proceed without a token
			}

			const response = token
				? await fetchWithToken(args, token)
				: await tsRestFetchApi(args);

			if (response.status === 401 && token !== null) {
				try {
					const freshToken = await getAccessTokenSilently({
						cacheMode: 'off',
					});
					return fetchWithToken(args, freshToken);
				} catch {
					await loginWithRedirect({
						appState: {
							returnTo:
								window.location.pathname +
								window.location.search,
						},
					});
				}
			}

			return response;
		},
	});
};
