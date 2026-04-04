import { useAuth0 } from '@auth0/auth0-react';
import { categoryContract } from '@common/contract';
import { initClient, tsRestFetchApi } from '@ts-rest/core';

export const useApiClient = () => {
	const { getAccessTokenSilently } = useAuth0();

	return initClient(categoryContract, {
		baseUrl: '',
		baseHeaders: {},
		api: async (args) => {
			try {
				const token = await getAccessTokenSilently();
				return tsRestFetchApi({
					...args,
					headers: {
						...args.headers,
						Authorization: `Bearer ${token}`,
					},
				});
			} catch {
				// Not authenticated — send request without token
				// Server middleware will 401 if the route requires it
				return tsRestFetchApi(args);
			}
		},
	});
};
