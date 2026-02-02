import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

const useApi = () => {
	const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

	const extractErrorMessage = (error: AxiosError): string => {
		const { response } = error;

		if (response?.data && typeof response.data === 'object' && 'message' in response.data) {
			return response.data.message as string;
		}

		if (error.message) {
			return error.message;
		}

		if (response?.statusText) {
			return response.statusText;
		}

		return 'http request failed';
	};

	const handleTokenRefresh = async (
		config: AxiosRequestConfig,
		callApi: (
			config: AxiosRequestConfig,
			retryCount: number,
		) => Promise<{ data: any; error: any }>,
	): Promise<{ data: any; error: any }> => {
		try {
			const newToken = await getAccessTokenSilently({
				cacheMode: 'off',
			});

			const retryConfig = {
				...config,
				headers: {
					...config.headers,
					Authorization: `Bearer ${newToken}`,
				},
			};

			return await callApi(retryConfig, 1);
		} catch (refreshError) {
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
	};

	const callApi = async (
		config: AxiosRequestConfig,
		retryCount = 0,
	): Promise<{ data: any; error: any }> => {
		try {
			const response = await axios(config);
			return {
				data: response.data,
				error: null,
			};
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;

				if (axiosError.response?.status === 401 && retryCount === 0) {
					return await handleTokenRefresh(config, callApi);
				}

				return {
					data: null,
					error: {
						message: extractErrorMessage(axiosError),
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
				error: { message },
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

	const getToken = async () => {
		const token = await getAccessTokenSilently();
		return token;
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
		const token = await getToken();

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
