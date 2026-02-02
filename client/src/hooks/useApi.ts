import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosRequestConfig } from 'axios';

const useApi = () => {
	const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

	const getToken = async (options?: GetTokenSilentlyOptions | undefined) =>
		await getAccessTokenSilently({
			authorizationParams: {
				audience: process.env.AUTH0_AUDIENCE,
			},
			...options,
		});

	const callApi = async (
		config: AxiosRequestConfig,
		retryCount = 0,
	): Promise<{ data: any; error: any }> => {
		try {
			const response = await axios(config);
			const { data } = response;

			return {
				data,
				error: null,
			};
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				const { response } = axiosError;

				// Handle 401 - attempt token refresh
				if (response?.status === 401 && retryCount === 0) {
					try {
						// Attempt to refresh the token silently
						const newToken = await getToken({
							cacheMode: 'off', // Force refresh
						});

						// Retry the request with the new token
						const retryConfig = {
							...config,
							headers: {
								...config.headers,
								Authorization: `Bearer ${newToken}`,
							},
						};

						// Recursive call with retryCount = 1 to prevent infinite loops
						return await callApi(retryConfig, 1);
					} catch (refreshError) {
						// Token refresh failed - redirect to login with return URL
						const currentPath = window.location.pathname + window.location.search;
						await loginWithRedirect({
							appState: { returnTo: currentPath },
						});

						return {
							data: null,
							error: {
								message: 'Authentication required. Redirecting to login...',
							},
						};
					}
				}

				// Handle other errors
				let message = 'http request failed';

				if (response && response.statusText) {
					message = response.statusText;
				}

				if (axiosError.message) {
					message = axiosError.message;
				}

				if (response && response.data && response.data.message) {
					message = response.data.message;
				}

				return {
					data: null,
					error: {
						message,
					},
				};
			}

			let message = 'unknown error';
			if (error instanceof Error) {
				message = error.message;
			}
			if (typeof error === 'string') {
				message = error;
			}

			return {
				data: null,
				error: {
					message,
				},
			};
		}
	};

	const getPublicResource = async (endpoint: string) => {
		const config = {
			url: `/api/${endpoint}`,
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		};

		const { data, error } = await callApi(config);

		return {
			data: data || null,
			error,
		};
	};

	const getProtectedResource = async (endpoint: string) => {
		const token = await getToken();

		const config = {
			url: `/api/${endpoint}`,
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data, error } = await callApi(config);

		return {
			data: data || null,
			error,
		};
	};

	const postResource = async (endpoint: string, payload: any) => {
		const token = await getToken();

		const config = {
			url: `/api/${endpoint}`,
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: payload,
		};

		const { data, error } = await callApi(config);

		return {
			data: data || null,
			error,
		};
	};

	const deleteResource = async (endpoint: string) => {
		const token = getToken();

		const config = {
			url: `/api/${endpoint}`,
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data, error } = await callApi(config);

		return {
			data: data || null,
			error,
		};
	};

	return { getPublicResource, getProtectedResource, postResource, deleteResource };
};

export default useApi;
